const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

let activeModal = null;
let lastTrigger = null;

function openModal(modal, trigger) {
	if (!modal) {
		return;
	}

	if (activeModal) {
		// Перехід з однієї модалки в іншу (напр. з послуги в калькулятор):
		// ховаємо поточну, а фокус потім повернемо на кнопку, що відкрила першу
		activeModal.classList.remove('open');
		activeModal.setAttribute('aria-hidden', 'true');
	} else {
		lastTrigger = trigger;

		// Компенсуємо ширину скролбару, щоб сторінка не «стрибала» при блокуванні прокрутки
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		document.body.style.paddingRight = `${scrollbarWidth}px`;
		document.body.classList.add('lock');
	}

	activeModal = modal;
	modal.dispatchEvent(new CustomEvent('modal:open'));
	modal.classList.add('open');
	modal.setAttribute('aria-hidden', 'false');
	// У модалці з формою курсор одразу в першому полі, в інших — на хрестику
	const focusTarget = modal.querySelector('[data-autofocus]') || modal.querySelector('.modal__btn-remove');
	focusTarget.focus();
}

function closeModal() {
	if (!activeModal) {
		return;
	}

	activeModal.classList.remove('open');
	activeModal.setAttribute('aria-hidden', 'true');
	document.body.classList.remove('lock');
	document.body.style.paddingRight = '';

	if (lastTrigger) {
		lastTrigger.focus();
	}

	activeModal = null;
	lastTrigger = null;
}

// Тримає фокус усередині модалки, поки вона відкрита
function trapFocus(event) {
	// Лише видимі елементи: приховані (напр. поля форми після «Дякуємо») фокус не отримують
	const focusable = [...activeModal.querySelectorAll(FOCUSABLE)].filter((element) => element.offsetParent !== null);
	const first = focusable[0];
	const last = focusable[focusable.length - 1];

	if (event.shiftKey && document.activeElement === first) {
		event.preventDefault();
		last.focus();
	} else if (!event.shiftKey && document.activeElement === last) {
		event.preventDefault();
		first.focus();
	}
}

// Будь-який елемент з data-modal="назва-класу" відкриває відповідну модалку
document.querySelectorAll('[data-modal]').forEach((trigger) => {
	const modal = document.querySelector(`.${trigger.dataset.modal}`);

	trigger.addEventListener('click', () => openModal(modal, trigger));

	// Кнопки й так реагують на Enter/пробіл, а картки (div) — ні
	if (trigger.tagName !== 'BUTTON') {
		trigger.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				openModal(modal, trigger);
			}
		});
	}
});

document.querySelectorAll('.modal').forEach((modal) => {
	modal.addEventListener('click', (event) => {
		// Клік по затемненому фону (а не по самому вікну) закриває модалку
		if (event.target === modal || event.target.closest('.modal__btn-remove')) {
			closeModal();
		}
	});
});

document.addEventListener('keydown', (event) => {
	if (!activeModal) {
		return;
	}

	if (event.key === 'Escape') {
		closeModal();
	} else if (event.key === 'Tab') {
		trapFocus(event);
	}
});
