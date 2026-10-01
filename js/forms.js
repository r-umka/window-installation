// Форми заявок: маска телефону, перевірка полів і відправка без перезавантаження сторінки

const FORM_TEXT = {
	uk: {
		sending: 'Надсилаємо…',
		phoneInvalid: 'Введіть номер повністю: +380 (XX) XXX-XX-XX',
	},
	en: {
		sending: 'Sending…',
		phoneInvalid: 'Please enter the full number: +380 (XX) XXX-XX-XX',
	},
};

const formText = () => FORM_TEXT[i18n.lang] || FORM_TEXT.uk;

/* ---------- Маска телефону +380 (XX) XXX-XX-XX ---------- */

const PHONE_PREFIX = '380';
const PHONE_DIGITS = 12; // 380 + 9 цифр

// Приводимо будь-який ввід до 380XXXXXXXXX: «067…», «67…», «+38 067…», «80…»
function normalizePhoneDigits(value) {
	let digits = value.replace(/\D/g, '');

	if (!digits) return '';
	if (digits.startsWith('380')) {
		// вже у правильному форматі
	} else if (digits.startsWith('80')) {
		digits = `3${digits}`;
	} else if (digits.startsWith('0')) {
		digits = `38${digits}`;
	} else if (!PHONE_PREFIX.startsWith(digits)) {
		digits = PHONE_PREFIX + digits;
	}

	return digits.slice(0, PHONE_DIGITS);
}

// Роздільники додаємо лише перед наступною цифрою, тому Backspace працює природно
function formatPhone(digits) {
	const rest = digits.slice(3);
	let result = `+${digits.slice(0, 3)}`;

	if (rest.length > 0) result += ` (${rest.slice(0, 2)}`;
	if (rest.length > 2) result += `) ${rest.slice(2, 5)}`;
	if (rest.length > 5) result += `-${rest.slice(5, 7)}`;
	if (rest.length > 7) result += `-${rest.slice(7, 9)}`;

	return result;
}

// Після форматування ставимо курсор після тієї ж кількості цифр, що й до нього
function caretAfterDigits(value, digitCount) {
	let seen = 0;

	for (let i = 0; i < value.length; i++) {
		if (/\d/.test(value[i])) seen++;
		if (seen === digitCount) return i + 1;
	}

	return value.length;
}

function isPhoneComplete(value) {
	return value.replace(/\D/g, '').length === PHONE_DIGITS;
}

function validatePhone(input) {
	const valid = !input.value || isPhoneComplete(input.value);
	input.setCustomValidity(valid ? '' : formText().phoneInvalid);
}

function initPhoneMask(input) {
	input.addEventListener('focus', () => {
		if (!input.value) {
			input.value = '+380 (';
		}
	});

	input.addEventListener('blur', () => {
		// Лишився тільки префікс — очищаємо, щоб знову було видно підказку
		if (input.value.replace(/\D/g, '') === PHONE_PREFIX) {
			input.value = '';
		}
		validatePhone(input);
	});

	input.addEventListener('input', () => {
		const caret = input.selectionStart ?? input.value.length;
		const digitsBeforeCaret = input.value.slice(0, caret).replace(/\D/g, '').length;
		const digits = normalizePhoneDigits(input.value);

		input.value = digits ? formatPhone(digits) : '';

		// Якщо до номера додали 380, курсор зсувається на ці цифри
		const shift = Math.max(0, digits.length - input.value.replace(/\D/g, '').length);
		const position = caretAfterDigits(input.value, digitsBeforeCaret + shift);
		input.setSelectionRange(position, position);

		validatePhone(input);
	});
}

document.querySelectorAll('input[type="tel"]').forEach(initPhoneMask);

/* ---------- Відправка ---------- */

// TODO: підключити реальну відправку (Telegram-бот, Formspree тощо).
// Поки що заявка нікуди не йде — лише виводиться в консоль, щоб було видно, що відправилося б.
async function sendForm(form) {
	const data = Object.fromEntries(new FormData(form));
	console.info('[forms] Заявка (відправку ще не підключено):', data);

	await new Promise((resolve) => setTimeout(resolve, 700));
}

function setSending(form, isSending) {
	const button = form.querySelector('[type="submit"]');

	if (isSending) {
		button.dataset.label = button.innerHTML;
		button.textContent = formText().sending;
	} else if (button.dataset.label) {
		button.innerHTML = button.dataset.label;
		delete button.dataset.label;
	}

	button.disabled = isSending;
	form.classList.toggle('form--sending', isSending);
}

function showSuccess(form) {
	form.classList.add('form--sent');
	form.querySelector('[data-form-success]').hidden = false;
	form.querySelector('.form__success-title').focus();
}

function resetForm(form) {
	// Приховані поля (розрахунок з калькулятора) заповнюються до відкриття форми — зберігаємо їх
	const hidden = [...form.querySelectorAll('input[type="hidden"]')].map((input) => [input, input.value]);

	form.reset();
	hidden.forEach(([input, value]) => {
		input.value = value;
	});

	form.classList.remove('form--sent', 'form--validated');
	form.querySelector('[data-form-success]').hidden = true;
	form.querySelector('[data-form-error]').hidden = true;
	form.querySelectorAll('input[type="tel"]').forEach((input) => input.setCustomValidity(''));
}

document.querySelectorAll('form.form').forEach((form) => {
	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		form.querySelectorAll('input[type="tel"]').forEach(validatePhone);

		if (!form.checkValidity()) {
			// Підсвічуємо помилки лише після першої спроби відправити, а не одразу
			form.classList.add('form--validated');
			form.reportValidity();
			return;
		}

		form.querySelector('[data-form-error]').hidden = true;
		setSending(form, true);

		try {
			await sendForm(form);
			showSuccess(form);
		} catch (error) {
			console.error('[forms] Помилка відправки:', error);
			form.querySelector('[data-form-error]').hidden = false;
		} finally {
			setSending(form, false);
		}
	});

	form.querySelector('[data-form-reset]')?.addEventListener('click', () => {
		resetForm(form);
		form.querySelector('input:not([type="hidden"])').focus();
	});

	form.querySelector('[data-form-close]')?.addEventListener('click', closeModal);
});

// Модалка з формою щоразу відкривається з чистою формою, а не з «Дякуємо» від минулого разу
document.querySelectorAll('.modal').forEach((modal) => {
	modal.addEventListener('modal:open', () => {
		modal.querySelectorAll('form.form--sent').forEach(resetForm);
	});
});

// Перемкнули мову — оновлюємо текст помилки телефону, якщо він уже показаний
i18n.onChange(() => {
	document.querySelectorAll('input[type="tel"]').forEach((input) => {
		if (input.validationMessage) validatePhone(input);
	});
});
