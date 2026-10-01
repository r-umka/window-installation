// Перемикач мов. Українська — це сам HTML, інші мови — у translations.js.
// Елементи з data-i18n перекладаються цілком, data-i18n-attr="placeholder alt" — перелічені атрибути.
const i18n = (() => {
	const DEFAULT_LANG = 'uk';
	const STORAGE_KEY = 'lang';
	const URL_PARAM = 'lang';

	const listeners = [];
	const originals = new Map(); // елемент → його український текст і атрибути
	let currentLang = DEFAULT_LANG;

	const normalize = (text) => text.replace(/\s+/g, ' ').trim();

	function translate(text, lang) {
		const key = normalize(text);
		const result = TRANSLATIONS[lang]?.[key];

		if (result === undefined) {
			console.warn(`[i18n] Немає перекладу (${lang}):`, key);
			return text;
		}

		return result;
	}

	// Запам'ятовуємо оригінал, щоб повернутися до української без перезавантаження
	function remember(element) {
		if (originals.has(element)) {
			return originals.get(element);
		}

		const attrs = {};
		(element.dataset.i18nAttr || '').split(' ').filter(Boolean).forEach((name) => {
			attrs[name] = element.getAttribute(name);
		});

		const original = { html: element.hasAttribute('data-i18n') ? element.innerHTML : null, attrs };
		originals.set(element, original);
		return original;
	}

	function apply(lang) {
		document.querySelectorAll('[data-i18n], [data-i18n-attr]').forEach((element) => {
			const original = remember(element);

			if (original.html !== null) {
				element.innerHTML = lang === DEFAULT_LANG ? original.html : translate(original.html, lang);
			}

			Object.entries(original.attrs).forEach(([name, value]) => {
				element.setAttribute(name, lang === DEFAULT_LANG ? value : translate(value, lang));
			});
		});

		document.documentElement.lang = lang;

		document.querySelectorAll('[data-lang]').forEach((button) => {
			button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
		});
	}

	function setLang(lang) {
		if (lang !== DEFAULT_LANG && !TRANSLATIONS[lang]) {
			return;
		}

		currentLang = lang;
		apply(lang);

		// Сховище може бути недоступне (приватний режим тощо) — тоді просто не запам'ятовуємо
		try {
			localStorage.setItem(STORAGE_KEY, lang);
		} catch (error) {}

		updateUrl(lang);
		listeners.forEach((callback) => callback(lang));
	}

	// Мова в адресі (?lang=en): посиланням можна поділитися, і пошуковик бачить окрему англійську сторінку
	function urlLang() {
		const lang = new URLSearchParams(window.location.search).get(URL_PARAM);
		return lang === DEFAULT_LANG || TRANSLATIONS[lang] ? lang : null;
	}

	function updateUrl(lang) {
		const url = new URL(window.location.href);

		if (lang === DEFAULT_LANG) {
			url.searchParams.delete(URL_PARAM);
		} else {
			url.searchParams.set(URL_PARAM, lang);
		}

		// replaceState — без перезавантаження і без зайвого запису в історії «Назад»
		if (url.href !== window.location.href) {
			history.replaceState(null, '', url);
		}
	}

	function savedLang() {
		try {
			return localStorage.getItem(STORAGE_KEY);
		} catch (error) {
			return null;
		}
	}

	document.querySelectorAll('[data-lang]').forEach((button) => {
		button.addEventListener('click', () => setLang(button.dataset.lang));
	});

	// Пріоритет: мова з посилання, потім збережений вибір
	const initial = urlLang() || savedLang();
	if (initial && initial !== DEFAULT_LANG) {
		setLang(initial);
	} else if (initial === DEFAULT_LANG && urlLang()) {
		setLang(DEFAULT_LANG); // ?lang=uk — прибираємо параметр і запам'ятовуємо вибір
	}

	return {
		get lang() {
			return currentLang;
		},
		setLang,
		onChange(callback) {
			listeners.push(callback);
		},
	};
})();
