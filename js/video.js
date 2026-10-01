// Відео в «Про компанію»: без автозавантаження (preload="none").
// Грає лише коли видиме на екрані: у прихованій вкладці або після прокрутки повз — пауза.
// Якщо відвідувач сам поставив паузу, більше не запускаємо його автоматично.
const autoplayVideos = document.querySelectorAll('video[data-autoplay]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
	const videoObserver = new IntersectionObserver((entries) => {
		entries.forEach(({ target: video, isIntersecting }) => {
			if (isIntersecting && !video.dataset.userPaused) {
				// Браузер може заборонити автозапуск — тоді просто лишається кнопка Play
				video.play().catch(() => {});
			} else if (!video.paused) {
				video.dataset.autoPaused = 'true';
				video.pause();
			}
		});
	}, { threshold: 0.5 });

	autoplayVideos.forEach((video) => {
		videoObserver.observe(video);

		video.addEventListener('pause', () => {
			// Паузу поставили ми (відео зникло з екрана) — це не рішення користувача
			if (video.dataset.autoPaused) {
				delete video.dataset.autoPaused;
				return;
			}
			if (!video.ended) {
				video.dataset.userPaused = 'true';
			}
		});

		video.addEventListener('play', () => {
			delete video.dataset.userPaused;
		});
	});
}
