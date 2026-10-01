// FAQ на <details>/<summary>: відкривається й без JS, а тут лише додаємо плавну анімацію висоти
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll('.question__card-item').forEach((details) => {
	const summary = details.querySelector('summary');
	const answer = details.querySelector('.question__card-answer');
	let animation = null;

	function animateHeight(from, to, onFinish) {
		animation?.cancel();
		answer.style.overflow = 'hidden';

		animation = answer.animate({ height: [`${from}px`, `${to}px`] }, { duration: 300, easing: 'ease' });
		animation.onfinish = () => {
			animation = null;
			answer.style.overflow = '';
			onFinish?.();
		};
	}

	summary.addEventListener('click', (event) => {
		if (reduceMotion.matches) {
			return; // без анімації — стандартна поведінка браузера
		}

		event.preventDefault();

		// Поточна висота з урахуванням анімації, що ще триває (якщо клікнули посеред неї)
		const current = answer.getBoundingClientRect().height;
		const isClosing = details.hasAttribute('data-closing');

		if (!details.open || isClosing) {
			details.removeAttribute('data-closing');
			details.open = true;
			animateHeight(current, answer.scrollHeight);
		} else {
			// Поки йде анімація закриття, details лишається open — позначаємо це для іконки «+/−»
			details.setAttribute('data-closing', '');
			animateHeight(current, 0, () => {
				details.open = false;
				details.removeAttribute('data-closing');
			});
		}
	});
});
