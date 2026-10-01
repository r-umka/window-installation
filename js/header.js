const header = document.querySelector('.header');
const menuBtn = document.querySelector('.header__menu-btn');
const menuList = document.querySelector('.header__list');
const menuLinks = document.querySelectorAll('.header__list a[href^="#"]');

// Бургер-меню
const isMenuOpen = () => menuList.classList.contains('active');

function setMenuOpen(open) {
	menuList.classList.toggle('active', open);
	menuBtn.classList.toggle('active', open);
	menuBtn.setAttribute('aria-expanded', String(open));
}

function closeMenu() {
	setMenuOpen(false);
}

menuBtn.addEventListener('click', () => setMenuOpen(!isMenuOpen()));

menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

// Esc закриває меню й повертає фокус на бургер
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' && isMenuOpen()) {
		closeMenu();
		menuBtn.focus();
	}
});

// Клік поза меню й бургером — закриваємо
document.addEventListener('click', (event) => {
	if (isMenuOpen() && !menuList.contains(event.target) && !menuBtn.contains(event.target)) {
		closeMenu();
	}
});

// Компактна шапка з тінню після початку прокрутки
function updateHeader() {
	header.classList.toggle('header--scrolled', window.scrollY > 10);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Підсвічує пункт меню секції, яка зараз посередині екрана
const linkBySection = new Map();

menuLinks.forEach((link) => {
	const target = document.querySelector(link.getAttribute('href'));
	const section = target && target.closest('section');

	if (section) {
		linkBySection.set(section, link);
	}
});

const sectionObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		const link = linkBySection.get(entry.target);

		if (entry.isIntersecting) {
			menuLinks.forEach((item) => item.classList.remove('active'));
			link.classList.add('active');
		} else {
			link.classList.remove('active');
		}
	});
}, { rootMargin: '-50% 0px -50% 0px' });

linkBySection.forEach((link, section) => sectionObserver.observe(section));
