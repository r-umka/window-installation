// Вкладки за стандартом WAI-ARIA: клік або стрілки ←/→, Home/End перемикають вкладку
function initTabs(tabSelector, contentSelector) {
	const tabs = [...document.querySelectorAll(tabSelector)];
	const contents = document.querySelectorAll(contentSelector);

	function select(tab) {
		const content = document.querySelector(tab.dataset.tab);

		if (!content) {
			return;
		}

		tabs.forEach((item) => {
			const isActive = item === tab;
			item.classList.toggle('active', isActive);
			item.setAttribute('aria-selected', String(isActive));
			// До вкладок Tab веде лише на активну, між іншими — стрілками
			item.tabIndex = isActive ? 0 : -1;
		});
		contents.forEach((item) => item.classList.toggle('active', item === content));
	}

	tabs.forEach((tab, index) => {
		tab.addEventListener('click', () => select(tab));

		tab.addEventListener('keydown', (event) => {
			const last = tabs.length - 1;
			const targets = {
				ArrowRight: index === last ? 0 : index + 1,
				ArrowLeft: index === 0 ? last : index - 1,
				Home: 0,
				End: last,
			};

			if (!(event.key in targets)) {
				return;
			}

			event.preventDefault();
			const next = tabs[targets[event.key]];
			next.focus();
			select(next);
		});
	});
}

initTabs('.menu__item', '.products__body-content');
initTabs('.company__menu-item', '.company__body-content');
