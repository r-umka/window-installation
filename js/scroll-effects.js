// Ефекти прокрутки: поява блоків при появі на екрані та кнопка «Нагору»

/* ---------- Поява блоків ---------- */

// Що анімуємо. Блоки з одного списку, що стоять поруч, з'являються по черзі
const REVEAL_GROUPS = [
	'.title',
	'.services__card',
	'.menu, .products__body',
	'.schtandart__logo, .schtandart__block-1, .schtandart__block-btn',
	'.company__menu, .company__body',
	'.company__flex',
	'.company__btn-inner',
	'.question__card',
	'.contacts__body, .contacts__request',
];

const REVEAL_MS = 600; // тривалість з _scroll.scss
const STAGGER_MS = 100; // затримка між сусідніми блоками
const MAX_STAGGER = 5; // далі затримка не росте, щоб довгі списки не «повзли»

const revealReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function finishReveal(element) {
	// Прибираємо службові класи, щоб повернулись власні transform/transition блоку (напр. збільшення при наведенні)
	element.classList.remove('reveal', 'reveal--visible');
	element.style.transitionDelay = '';
}

if (!revealReducedMotion && 'IntersectionObserver' in window) {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach(({ target, isIntersecting }) => {
			if (!isIntersecting) return;

			observer.unobserve(target);
			target.classList.add('reveal--visible');

			// transitionend спливає й від дочірніх елементів — реагуємо лише на власну анімацію блоку
			const onEnd = (event) => {
				if (event.target !== target || event.propertyName !== 'opacity') return;
				target.removeEventListener('transitionend', onEnd);
				finishReveal(target);
			};
			target.addEventListener('transitionend', onEnd);

			// Запасний варіант: якщо анімація не відбулась (напр. блок приховано), все одно знімаємо класи
			setTimeout(() => finishReveal(target), REVEAL_MS + parseFloat(target.style.transitionDelay || 0) + 100);
		});
	}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

	REVEAL_GROUPS.forEach((selector) => {
		const elements = document.querySelectorAll(selector);

		elements.forEach((element) => {
			const siblings = [...element.parentElement.children].filter((child) => child.matches(selector));
			const order = Math.min(siblings.indexOf(element), MAX_STAGGER);

			element.classList.add('reveal');
			element.style.transitionDelay = `${order * STAGGER_MS}ms`;
			revealObserver.observe(element);
		});
	});
}

/* ---------- Кнопка «Нагору» ---------- */

const toTopButton = document.querySelector('.to-top');

function updateToTop() {
	// З'являється, коли прокрутили більше ніж на висоту екрана
	toTopButton.classList.toggle('to-top--visible', window.scrollY > window.innerHeight);
}

window.addEventListener('scroll', updateToTop, { passive: true });
updateToTop();

toTopButton.addEventListener('click', () => {
	// Плавність бере з CSS (scroll-behavior), тож при вимкнених анімаціях прокрутка миттєва
	window.scrollTo({ top: 0 });

	// Фокус на початок сторінки, щоб Tab продовжувався зверху, а не з кнопки
	document.querySelector('.header__logo a').focus({ preventScroll: true });
});
