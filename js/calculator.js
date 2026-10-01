// Ціни в гривнях. Змінюй тут — калькулятор підхопить автоматично
const PRICES = {
	profile: {
		standard: { perM2: 3200 },
		business: { perM2: 4100 },
		premium: { perM2: 5300 },
		exclusive: { perM2: 6900 },
	},
	glass: {
		single: { perM2: 0 },
		double: { perM2: 550 },
		energy: { perM2: 950 },
	},
	openingSash: 1900, // фурнітура на одну стулку, що відчиняється
	extras: {
		sill: { perMeter: 650 }, // за погонний метр ширини
		drain: { perMeter: 350 },
		net: { perSash: 550 }, // на кожну стулку, що відчиняється
		slopes: { perMeter: 480 }, // за периметр без низу
		install: { perM2: 850 },
	},
	minArea: 1, // менші вікна рахуємо як 1 м²
};

// Тексти, які калькулятор генерує сам (решту перекладає i18n.js)
const CALC_TEXT = {
	uk: {
		locale: 'uk-UA',
		currency: 'грн',
		mm: 'мм',
		none: 'Жодна',
		hardware: 'Фурнітура',
		perPiece: 'шт.',
		yourCalc: 'Ваш розрахунок',
		profileItem: (name) => `Профіль «${name}»`,
		glassItem: (name) => `Склопакет ${name.toLowerCase()}`,
		windows: (n) => pluralizeUk(n, ['вікно', 'вікна', 'вікон']),
		profile: { standard: 'Стандартний', business: 'Бізнес', premium: 'Преміум', exclusive: 'Ексклюзивний' },
		glass: { single: 'Однокамерний', double: 'Двокамерний', energy: 'Енергозберігаючий' },
		extras: { sill: 'Підвіконня', drain: 'Відлив', net: 'Москітна сітка', slopes: 'Укоси', install: 'Монтаж' },
		tiltTurn: 'Поворотно-відкидна',
		fixed: 'Глуха',
		sashTooWide: (sashWidth, max, need) =>
			`Стулка шириною ${sashWidth} мм завелика: максимум ${max} мм. Для такої ширини потрібно щонайменше ${need} ${pluralizeUk(need, ['стулка', 'стулки', 'стулок'])}.`,
		sashTooNarrow: (sashWidth, min) => `Стулка шириною ${sashWidth} мм замала: мінімум ${min} мм.`,
		switchTo: (n) => `Змінити на ${n} ${pluralizeUk(n, ['стулку', 'стулки', 'стулок'])}`,
	},
	en: {
		locale: 'en-US',
		currency: 'UAH',
		mm: 'mm',
		none: 'None',
		hardware: 'Hardware',
		perPiece: 'pc',
		yourCalc: 'Your estimate',
		profileItem: (name) => `${name} profile`,
		glassItem: (name) => `${name} glass unit`,
		windows: (n) => (n === 1 ? 'window' : 'windows'),
		profile: { standard: 'Standard', business: 'Business', premium: 'Premium', exclusive: 'Exclusive' },
		glass: { single: 'Single-chamber', double: 'Double-chamber', energy: 'Energy-saving' },
		extras: { sill: 'Window sill', drain: 'Outer sill', net: 'Insect screen', slopes: 'Reveals', install: 'Installation' },
		tiltTurn: 'Tilt & turn',
		fixed: 'Fixed',
		sashTooWide: (sashWidth, max, need) =>
			`A ${sashWidth} mm sash is too wide: the maximum is ${max} mm. This width needs at least ${need} sashes.`,
		sashTooNarrow: (sashWidth, min) => `A ${sashWidth} mm sash is too narrow: the minimum is ${min} mm.`,
		switchTo: (n) => `Switch to ${n} ${n === 1 ? 'sash' : 'sashes'}`,
	},
};

const text = () => CALC_TEXT[i18n.lang] || CALC_TEXT.uk;

const LIMITS = {
	width: { min: 400, max: 3000 },
	height: { min: 400, max: 2500 },
	count: { min: 1, max: 50 },
	// Орієнтовні межі ширини однієї стулки для ПВХ-профілю, мм
	sash: { min: 400, maxOpening: 1000, maxFixed: 2000 },
};

const calcForm = document.querySelector('.calc');
const openingGroup = calcForm.querySelector('[data-calc-opening]');
const frame = calcForm.querySelector('[data-calc-frame]');
const sizeLabel = calcForm.querySelector('[data-calc-size]');
const breakdownList = calcForm.querySelector('[data-calc-breakdown]');
const totalOutput = calcForm.querySelector('[data-calc-total]');
const legendList = calcForm.querySelector('[data-calc-legend]');
const sashHint = calcForm.querySelector('[data-calc-hint]');

const formatPrice = (value, t = text()) => `${Math.round(value).toLocaleString(t.locale)} ${t.currency}`;
const clamp = (value, { min, max }) => Math.min(Math.max(value, min), max);

// 1 вікно, 2 вікна, 5 вікон
function pluralizeUk(n, [one, few, many]) {
	const mod10 = n % 10;
	const mod100 = n % 100;

	if (mod10 === 1 && mod100 !== 11) return one;
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
	return many;
}

// Варіанти «скільки стулок відчиняється» залежать від кількості стулок
function renderOpeningOptions(sashes) {
	const current = Number(calcForm.elements.opening?.value ?? 1);
	const selected = Math.min(current, sashes);

	openingGroup.innerHTML = '';

	for (let i = 0; i <= sashes; i++) {
		const label = document.createElement('label');
		label.className = 'calc__option';
		label.innerHTML = `<input type="radio" name="opening" value="${i}"${i === selected ? ' checked' : ''}><span>${i === 0 ? text().none : i}</span>`;
		openingGroup.append(label);
	}
}

// Схема вікна за правилами креслень: лінії сходяться до петель, ручка — з протилежного боку
const PREVIEW_RATIO = 4 / 3; // пропорції області під схему (як у CSS)

function renderPreview(width, height, sashes, opening) {
	// Вписуємо вікно в область схеми зі збереженням пропорцій
	const ratio = width / height;
	frame.style.width = `${Math.min(1, ratio / PREVIEW_RATIO) * 100}%`;
	frame.style.height = `${Math.min(1, PREVIEW_RATIO / ratio) * 100}%`;
	frame.innerHTML = '';

	let openCount = 0;

	for (let i = 0; i < sashes; i++) {
		const sash = document.createElement('div');
		sash.className = 'calc__sash';

		// Відчинні стулки — з країв, глухі — посередині
		const isOpening = i < Math.ceil(opening / 2) || i >= sashes - Math.floor(opening / 2);
		if (isOpening) {
			// Ліві стулки на петлях зліва, праві — справа, тож ручки дивляться до середини вікна
			const hinge = i >= Math.ceil(sashes / 2) ? 'right' : 'left';
			sash.classList.add('calc__sash--open', `calc__sash--hinge-${hinge}`);
			openCount++;
		}

		frame.append(sash);
	}

	sizeLabel.textContent = `${width} × ${height} ${text().mm}`;
	renderLegend(openCount, sashes - openCount);
}

// Підписи під схемою: лише ті типи стулок, що є у вікні
function renderLegend(openCount, fixedCount) {
	const t = text();
	const items = [
		[openCount, 'calc__sash calc__sash--open calc__sash--hinge-left', t.tiltTurn],
		[fixedCount, 'calc__sash', t.fixed],
	];

	legendList.innerHTML = items
		.filter(([count]) => count > 0)
		.map(([count, iconClass, label]) =>
			`<li class="calc__legend-item"><span class="calc__legend-icon ${iconClass}"></span>${label}${count > 1 ? ` × ${count}` : ''}</li>`)
		.join('');
}

// Попередження, якщо стулка виходить завеликою чи замалою для обраної ширини
function renderSashHint({ width, sashes, opening }) {
	const t = text();
	const limits = LIMITS.sash;
	const sashWidth = Math.round(clamp(width, LIMITS.width) / sashes);
	const max = opening > 0 ? limits.maxOpening : limits.maxFixed;
	let message = '';
	let suggestion = null;

	if (sashWidth > max) {
		suggestion = Math.ceil(clamp(width, LIMITS.width) / max);
		message = t.sashTooWide(sashWidth, max, suggestion);
	} else if (sashWidth < limits.min) {
		suggestion = Math.max(1, Math.floor(clamp(width, LIMITS.width) / limits.min));
		message = t.sashTooNarrow(sashWidth, limits.min);
	}

	// Пропонуємо лише варіанти, які є серед кнопок (1–3 стулки)
	const canSwitch = suggestion !== null && calcForm.querySelector(`[name="sashes"][value="${suggestion}"]`);

	sashHint.hidden = !message;
	sashHint.innerHTML = message
		+ (canSwitch ? ` <button class="calc__hint-btn" type="button" data-sashes="${suggestion}">${t.switchTo(suggestion)}</button>` : '');
}

sashHint.addEventListener('click', (event) => {
	const button = event.target.closest('[data-sashes]');
	if (!button) return;

	const radio = calcForm.querySelector(`[name="sashes"][value="${button.dataset.sashes}"]`);
	radio.checked = true;
	radio.dispatchEvent(new Event('input', { bubbles: true }));
	radio.focus();
});

function readValues() {
	const { elements } = calcForm;

	return {
		sashes: Number(elements.sashes.value),
		width: Number(elements.width.value) || LIMITS.width.min,
		height: Number(elements.height.value) || LIMITS.height.min,
		profile: elements.profile.value,
		glass: elements.glass.value,
		opening: Number(elements.opening.value),
		extras: [...calcForm.querySelectorAll('[name="extras"]:checked')].map((input) => input.value),
		count: Number(elements.count.value) || 1,
	};
}

function calculate(values, t = text()) {
	const width = clamp(values.width, LIMITS.width) / 1000;
	const height = clamp(values.height, LIMITS.height) / 1000;
	const area = Math.max(width * height, PRICES.minArea);
	const count = clamp(values.count, LIMITS.count);
	const { extras } = PRICES;

	const items = [
		{ name: t.profileItem(t.profile[values.profile]), price: area * PRICES.profile[values.profile].perM2 },
		{ name: t.glassItem(t.glass[values.glass]), price: area * PRICES.glass[values.glass].perM2 },
		{ name: t.hardware, price: values.opening * PRICES.openingSash },
	];

	const extraPrices = {
		sill: width * extras.sill.perMeter,
		drain: width * extras.drain.perMeter,
		net: values.opening * extras.net.perSash,
		slopes: (width + height * 2) * extras.slopes.perMeter,
		install: area * extras.install.perM2,
	};

	values.extras.forEach((key) => {
		items.push({ name: t.extras[key], price: extraPrices[key] });
	});

	const perWindow = items.reduce((sum, item) => sum + item.price, 0);

	return {
		items: items.filter((item) => item.price > 0),
		perWindow,
		total: perWindow * count,
		count,
	};
}

function render() {
	const t = text();
	const values = readValues();
	const result = calculate(values);

	renderPreview(
		clamp(values.width, LIMITS.width),
		clamp(values.height, LIMITS.height),
		values.sashes,
		values.opening,
	);

	breakdownList.innerHTML = result.items
		.map((item) => `<li class="calc__breakdown-item"><span>${item.name}</span><span>${formatPrice(item.price)}</span></li>`)
		.join('');

	if (result.count > 1) {
		breakdownList.insertAdjacentHTML(
			'beforeend',
			`<li class="calc__breakdown-item calc__breakdown-item--count"><span>× ${result.count} ${t.windows(result.count)}</span><span>${formatPrice(result.perWindow)} / ${t.perPiece}</span></li>`,
		);
	}

	totalOutput.textContent = formatPrice(result.total);
	renderSashHint(values);

	return { values, result };
}

// Число й повзунок розміру синхронізуються між собою
function syncSize(name, value, source) {
	const { elements } = calcForm;
	elements[name].value = value;
	elements[`${name}-range`].value = value;

	// Обмеження застосовуємо лише коли користувач закінчив вводити, щоб не заважати набору
	if (source === 'change') {
		const clamped = clamp(Number(value) || LIMITS[name].min, LIMITS[name]);
		elements[name].value = clamped;
		elements[`${name}-range`].value = clamped;
	}
}

calcForm.addEventListener('input', (event) => {
	const { name, value } = event.target;
	const sizeName = name.replace('-range', '');

	if (sizeName === 'width' || sizeName === 'height') {
		syncSize(sizeName, value, 'input');
	}

	if (name === 'sashes') {
		renderOpeningOptions(Number(value));
	}

	render();
});

calcForm.addEventListener('change', (event) => {
	const { name, value } = event.target;

	if (name === 'width' || name === 'height') {
		syncSize(name, value, 'change');
	}

	if (name === 'count') {
		event.target.value = clamp(Number(value) || 1, LIMITS.count);
	}

	render();
});

calcForm.querySelectorAll('[data-calc-step]').forEach((button) => {
	button.addEventListener('click', () => {
		const input = calcForm.elements.count;
		input.value = clamp(Number(input.value) + Number(button.dataset.calcStep), LIMITS.count);
		render();
	});
});

calcForm.addEventListener('submit', (event) => event.preventDefault());

// «Заявка на замір»: відкриваємо модалку з формою і передаємо в неї розрахунок
const orderModal = document.querySelector('.modal-order');
const orderCalcText = orderModal.querySelector('[data-order-calc]');
const orderCalcInput = orderModal.querySelector('[data-order-calc-input]');

let orderTotal = null; // сума з калькулятора, показана у формі заявки

function renderOrderCalculation() {
	orderCalcText.textContent = orderTotal === null ? '' : `${text().yourCalc}: ≈ ${formatPrice(orderTotal)}`;
	orderCalcText.hidden = orderTotal === null;
}

function setOrderCalculation(summary, total) {
	orderCalcInput.value = summary;
	orderTotal = total;
	renderOrderCalculation();
}

// Звичайні кнопки «Заявка на замір» відкривають форму без розрахунку
document.querySelectorAll('[data-modal="modal-order"]').forEach((button) => {
	button.addEventListener('click', () => setOrderCalculation('', null));
});

calcForm.querySelector('[data-calc-order]').addEventListener('click', (event) => {
	const { values, result } = render();

	// Для менеджера розрахунок завжди українською, незалежно від мови сайту
	const uk = CALC_TEXT.uk;
	const summary = [
		`${values.width}×${values.height} мм`,
		`стулок: ${values.sashes} (відчин.: ${values.opening})`,
		uk.profile[values.profile],
		uk.glass[values.glass],
		...values.extras.map((key) => uk.extras[key]),
		`${result.count} шт.`,
		`≈ ${formatPrice(result.total, uk)}`,
	].join(', ');

	setOrderCalculation(summary, result.total);
	openModal(orderModal, event.currentTarget);
});

// Зміна мови: перемальовуємо все, що калькулятор генерує сам
i18n.onChange(() => {
	renderOpeningOptions(Number(calcForm.elements.sashes.value));
	render();
	renderOrderCalculation();
});

renderOpeningOptions(Number(calcForm.elements.sashes.value));
render();
