// Переклади сайту. Ключ — український текст елемента з HTML (пробіли й переноси не важливі).
// Якщо змінюєш текст у index.html, зміни й ключ тут, інакше елемент лишиться українською.
const TRANSLATIONS = {
	en: {
		'Вікна Хаус — пластикові вікна та скління балконів':
			'Vikna Haus — plastic windows and balcony glazing',
		'Виготовлення та встановлення пластикових вікон Rehau, скління балконів, котеджів і комерційних об\'єктів. Безкоштовний замір.':
			'Manufacturing and installation of Rehau plastic windows, glazing of balconies, cottages and commercial buildings. Free measurement.',
		'Вікна Хаус':
			'Vikna Haus',
		'Послуги':
			'Services',
		'Виробництво':
			'Production',
		'Про компанію':
			'About us',
		'Портфоліо':
			'Portfolio',
		'Питання та відповіді':
			'FAQ',
		'Контакти':
			'Contacts',
		'Заявка на замір':
			'Book a measurement',
		'Розрахувати вартість':
			'Calculate the cost',
		'<span>Вікна Хаус —</span> <br> Професійний підхід до скління':
			'<span>Vikna Haus —</span> <br> A professional approach to glazing',
		'Сучасні вікна та балконні конструкції за доступними цінами':
			'Modern windows and balcony systems at affordable prices',
		'Кваліфіковано вирішуємо завдання будь-якої складності':
			'We handle tasks of any complexity',
		'Гарантія найвищої якості нашої продукції':
			'Guaranteed top quality of our products',
		'Викличте замірника додому':
			'Book a free home measurement',
		'Представтеся, будь ласка':
			'Your name',
		'Номер телефону':
			'Phone number',
		'Я погоджуюся на обробку персональних даних відповідно до <a href="#">Політики конфіденційності</a>':
			'I agree to the processing of personal data in accordance with the <a href="#">Privacy Policy</a>',
		'Наші послуги':
			'Our services',
		'Встановлення пластикових вікон':
			'Plastic window installation',
		'Пластикові вікна Rehau від перевіреного виробника з гарантією якості':
			'Rehau plastic windows from a trusted manufacturer with a quality guarantee',
		'Скління балконів та лоджій':
			'Balcony and loggia glazing',
		'Склимо та оздоблюємо балкони й лоджії. Тепле та холодне скління, виготовлення виносів і дахів. Беремося за складні об\'єкти':
			'We glaze and finish balconies and loggias. Warm and cold glazing, extensions and roofs. We take on complex projects',
		'Скління котеджів і дач':
			'Cottage and country house glazing',
		'Скління та оздоблення під ключ: від котеджів і дач до терас та альтанок. Для кожного об\'єкта виділяємо особистого технолога':
			'Turnkey glazing and finishing: from cottages and country houses to terraces and gazebos. Every project gets a dedicated technologist',
		'Скління комерційних об\'єктів':
			'Commercial glazing',
		'Реалізуємо складні проєкти скління торгових центрів, ресторанів, виробничих приміщень та офісів':
			'We deliver complex glazing projects for shopping centres, restaurants, industrial premises and offices',
		'Закрити':
			'Close',
		'Кольорові вікна':
			'Coloured windows',
		'Ламінування плівкою, ламінування в масі, 3D-ламінування, а також фарбування вікон.':
			'Foil lamination, through-colour lamination, 3D lamination and window painting.',
		'Ламінація':
			'Lamination',
		'Пластикові вікна можуть бути будь-якого кольору — як усередині, так і зовні.':
			'Plastic windows can be any colour you like, inside and out.',
		'Підвіконня':
			'Window sills',
		'Якісне підвіконня не дряпається, витримує великі навантаження й служитиме вам довгі роки.':
			'A quality window sill doesn\'t scratch, withstands heavy loads and will serve you for many years.',
		'Кольорові ручки':
			'Coloured handles',
		'Оригінальні віконні ручки підкреслять дизайн вікна. Підберемо колір ручок відповідно до кольору всієї конструкції.':
			'Original window handles emphasise the design of the window. We\'ll match the handle colour to the colour of the whole unit.',
		'Провітрювачі':
			'Trickle vents',
		'Постійне оновлення повітря в кімнаті знижує ризик алергії, покращує сон і позитивно впливає на самопочуття.':
			'A constant supply of fresh air reduces the risk of allergies, improves sleep and helps you feel better.',
		'Москітні сітки':
			'Insect screens',
		'Комахи залишаться на вулиці, а ваша кішка — у квартирі. Встановлюємо сітки на пластикові вікна будь-яких форм і розмірів.':
			'Insects stay outside, and your cat stays inside. We fit screens to plastic windows of any shape and size.',
		'Скління балконів і лоджій':
			'Balcony and loggia glazing',
		'Склимо та оздоблюємо балкони й лоджії. Тепле та холодне скління, виготовлення виносів і дахів. Беремося за складні об\'єкти.':
			'We glaze and finish balconies and loggias. Warm and cold glazing, extensions and roofs. We take on complex projects.',
		'Тепле скління':
			'Warm glazing',
		'Тепле скління дає змогу перетворити балкон чи лоджію на повноцінне житлове приміщення.':
			'Warm glazing turns a balcony or loggia into a fully fledged living space.',
		'Холодне скління':
			'Cold glazing',
		'Холодне скління підійде, якщо балкон чи лоджія використовуються для зберігання речей.':
			'Cold glazing is a good fit if the balcony or loggia is used for storage.',
		'Панорамне скління':
			'Panoramic glazing',
		'Скління від підлоги до стелі: максимум природного світла та чудовий краєвид.':
			'Floor-to-ceiling glazing: maximum natural light and a great view.',
		'Скління з виносом':
			'Extended glazing',
		'Спосіб збільшити площу та об\'єм балкона чи лоджії.':
			'A way to increase the area and volume of a balcony or loggia.',
		'Скління з дахом':
			'Glazing with a roof',
		'Зведення даху для будинків з високою стелею та квартир на останніх поверхах.':
			'Roof construction for houses with high ceilings and top-floor apartments.',
		'Об\'єднання з кімнатою':
			'Merging with a room',
		'Перепланування, що додає метри корисної площі та покращує житлові умови.':
			'A redesign that adds usable floor space and improves living conditions.',
		'Скління та оздоблення під ключ: від котеджів і дач до терас та альтанок. Для кожного об\'єкта виділяємо особистого технолога.':
			'Turnkey glazing and finishing: from cottages and country houses to terraces and gazebos. Every project gets a dedicated technologist.',
		'Фігурні вікна':
			'Shaped windows',
		'Арочні, трапецієподібні, трикутні, круглі та багатокутні вікна.':
			'Arched, trapezoid, triangular, round and polygonal windows.',
		'Алюмінієві конструкції':
			'Aluminium systems',
		'Ідеальний варіант для великої площі скління: зимові сади, тераси тощо.':
			'Ideal for large glazed areas: winter gardens, terraces and more.',
		'Дерев\'яні вікна':
			'Wooden windows',
		'Екологічне та натуральне рішення для скління будь-якого об\'єкта.':
			'An eco-friendly, natural solution for glazing any building.',
		'Портальні системи':
			'Portal systems',
		'Ексклюзивні розсувні дверні та балконні конструкції для преміальних квартир і будинків: панорамний вид та економія простору.':
			'Exclusive sliding door and balcony systems for premium apartments and houses: panoramic views and space savings.',
		'Ролети та ворота':
			'Roller shutters and gates',
		'Захисні ролети для приватних будинків, ролетні ворота.':
			'Protective roller shutters for private houses, roller gates.',
		'Реалізуємо складні проєкти скління торгових центрів, ресторанів, виробничих приміщень та офісів.':
			'We deliver complex glazing projects for shopping centres, restaurants, industrial premises and offices.',
		'Багатоквартирні будинки':
			'Apartment buildings',
		'Виготовлення та монтаж вікон ПВХ під ключ. Запрошуємо до партнерства забудовників.':
			'Turnkey manufacturing and installation of PVC windows. We invite developers to partner with us.',
		'Офісні приміщення':
			'Offices',
		'Встановлення пластикових вікон, офісних перегородок, дверей і вхідних груп.':
			'Installation of plastic windows, office partitions, doors and entrance groups.',
		'Соціальні об\'єкти':
			'Public buildings',
		'Склимо дитячі садки, школи, медичні заклади.':
			'We glaze kindergartens, schools and medical facilities.',
		'Торговельні об\'єкти':
			'Retail',
		'Скління магазинів, торгових центрів і вітрин.':
			'Glazing for shops, shopping centres and shop windows.',
		'Спортивні об\'єкти':
			'Sports facilities',
		'Склимо спортивні зали, басейни, криті спорткомплекси.':
			'We glaze gyms, swimming pools and indoor sports complexes.',
		'Виробничі приміщення':
			'Industrial premises',
		'Встановлюємо вікна на складах і промислових будівлях відповідно до вимог бізнесу.':
			'We install windows in warehouses and industrial buildings to meet business requirements.',
		'Стандартний':
			'Standard',
		'Бізнес':
			'Business',
		'Преміум':
			'Premium',
		'Ексклюзивний':
			'Exclusive',
		'Профіль вікна Rehau у розрізі':
			'Cross-section of a Rehau window profile',
		'Зберігають тепло в домі, захищають від шуму та пасують до будь-якого інтер\'єру. Практичний вибір.':
			'Keeps your home warm, blocks noise and suits any interior. A practical choice.',
		'Монтажна глибина':
			'Installation depth',
		'60/60 мм':
			'60/60 mm',
		'Товщина склопакета':
			'Glass unit thickness',
		'24/31 мм':
			'24/31 mm',
		'Кількість камер':
			'Number of chambers',
		'Опір теплопередачі':
			'Thermal resistance',
		'0,70 м²·°C/Вт':
			'0.70 m²·°C/W',
		'Сертифікований виробник Rehau':
			'Certified Rehau manufacturer',
		'Інноваційний віконний завод':
			'Innovative window factory',
		'Лідер з переробки профілю Rehau в Україні':
			'Leading Rehau profile processor in Ukraine',
		'Високотехнологічне автоматизоване обладнання':
			'High-tech automated equipment',
		'Широкий асортимент продукції':
			'Wide product range',
		'Опис':
			'About',
		'Як ми працюємо':
			'How we work',
		'Відгуки':
			'Reviews',
		'Сертифікати':
			'Certificates',
		'Допомагаємо клієнтам підібрати рішення з урахуванням побажань щодо характеристик вікна та бюджету. Вікно служить багато років, тому для нас дуже важливо, щоб ви зробили правильний вибір.':
			'We help clients choose a solution that fits their window requirements and budget. A window lasts for many years, so it\'s very important to us that you make the right choice.',
		'Безкоштовний виїзд':
			'Free visit',
		'Безкоштовно виїжджаємо в усі населені пункти області':
			'We visit every town in the region free of charge',
		'Працюємо щодня':
			'Open every day',
		'З 9:00 до 21:00 без вихідних і свят':
			'9:00 to 21:00, including weekends and holidays',
		'Зразки з собою':
			'Samples on hand',
		'Показуємо зразки профільних систем та оздоблювальних матеріалів':
			'We show samples of profile systems and finishing materials',
		'Вартість':
			'Price',
		'Точну вартість замовлення називаємо на місці':
			'We give you the exact price on site',
		'Допомагаємо клієнтам обрати оптимальне рішення з урахуванням їхніх вимог до вікон і бюджету. Вікна купують на довгі роки, тому ми дуже уважно ставимося до кожного вибору.':
			'We help clients choose the best solution for their window requirements and budget. Windows are bought for years, so we take every choice seriously.',
		'Професіоналізм':
			'Professionalism',
		'Бригада професійних майстрів для встановлення та обслуговування':
			'A team of professional installers for installation and maintenance',
		'Вигідні ціни':
			'Great prices',
		'Найкращі ціни на ринку пластикових вікон':
			'The best prices on the plastic window market',
		'Мобільність':
			'Mobility',
		'Укладаємо договір на місці':
			'We sign the contract on site',
		'Довіра':
			'Trust',
		'99% клієнтів рекомендують нас друзям':
			'99% of clients recommend us to their friends',
		'Швидкість':
			'Speed',
		'Стислі терміни виготовлення':
			'Short production times',
		'Контроль якості':
			'Quality control',
		'Бездоганна якість і контроль виробів ПВХ':
			'Flawless quality and control of PVC products',
		'Залишити заявку на замір':
			'Request a measurement',
		'Приклад виконаної роботи':
			'Example of completed work',
		'Скільки часу потрібно для виготовлення пластикових вікон?':
			'How long does it take to make plastic windows?',
		'Стандартні вікна виготовляємо за 5–7 робочих днів після заміру. Нестандартні конструкції — ламіновані, фігурні чи алюмінієві — до 14 днів.':
			'We make standard windows within 5–7 working days after measurement. Non-standard units — laminated, shaped or aluminium — take up to 14 days.',
		'Які способи оплати?':
			'What payment methods do you accept?',
		'Готівкою, банківською карткою або безготівковим переказом. Можлива оплата частинами: передоплата під час укладання договору, решта — після монтажу.':
			'Cash, bank card or bank transfer. You can pay in instalments: a deposit when signing the contract and the rest after installation.',
		'Де я можу побачити зразки?':
			'Where can I see samples?',
		'Зразки профілів, фурнітури та оздоблення замірник привезе з собою. Також їх можна переглянути в нашому офісі.':
			'The surveyor will bring samples of profiles, hardware and finishes. You can also see them at our office.',
		'Навіщо викликати замірника, якщо я можу сам надати розміри?':
			'Why call a surveyor if I can give you the measurements myself?',
		'Замірник враховує стан прорізу, монтажні зазори та укоси. Помилка навіть у кілька сантиметрів може зробити вікно непридатним, тому за точність розмірів відповідаємо ми.':
			'The surveyor takes into account the condition of the opening, installation gaps and reveals. An error of even a few centimetres can make a window unusable, so we take responsibility for accurate measurements.',
		'Я хочу оздобити балкон. Ви допоможете?':
			'I want to finish my balcony. Can you help?',
		'Так. Склимо, утеплюємо та оздоблюємо балкони під ключ: від демонтажу старої рами до встановлення підвіконня та освітлення.':
			'Yes. We glaze, insulate and finish balconies turnkey: from removing the old frame to installing the sill and lighting.',
		'Чи потрібно наймати вантажників для підйому?':
			'Do I need to hire movers to carry the windows up?',
		'Ні, наші майстри самі акуратно доставлять і піднімуть вікна до квартири.':
			'No, our installers will carefully deliver the windows and carry them up to your apartment.',
		'Безкоштовна консультація:':
			'Free consultation:',
		'м. Іваново, вул. Генерала Хлєбнікова, буд. 54, оф. 303':
			'Office 303, 54 Generala Khliebnikova St., Ivanovo',
		'Монтаж вікон мають виконувати лише фахівці. Нам довіряють сотні родин. Дізнайтеся, яке рішення підійде саме вам, і придбайте якісні вікна за доступною ціною.':
			'Windows should only be installed by professionals. Hundreds of families trust us. Find out which solution suits you best and buy quality windows at an affordable price.',
		'Залишилися питання?':
			'Still have questions?',
		'Ваше питання':
			'Your question',
		'Я погоджуюся на обробку <a href="#">персональних даних</a>':
			'I agree to the processing of <a href="#">personal data</a>',
		'Надіслати':
			'Send',
		'© ТОВ «Вікна Хаус», 2011–2022':
			'© Vikna Haus LLC, 2011–2022',
		'Політика конфіденційності':
			'Privacy Policy',
		'Користувацька угода':
			'Terms of Use',
		'Калькулятор вартості вікна':
			'Window cost calculator',
		'Орієнтовна ціна за хвилину. Точну вартість назве замірник після безкоштовного виїзду.':
			'An estimated price in a minute. The surveyor will give you the exact price after a free visit.',
		'Кількість стулок':
			'Number of sashes',
		'Одна':
			'One',
		'Дві':
			'Two',
		'Три':
			'Three',
		'Розміри, мм':
			'Dimensions, mm',
		'Ширина':
			'Width',
		'Висота':
			'Height',
		'Профіль':
			'Profile',
		'Склопакет':
			'Glass unit',
		'Однокамерний':
			'Single-chamber',
		'Двокамерний':
			'Double-chamber',
		'Енергозберігаючий':
			'Energy-saving',
		'Стулки, що відчиняються':
			'Opening sashes',
		'Додатково':
			'Extras',
		'Відлив':
			'Outer sill',
		'Москітна сітка':
			'Insect screen',
		'Укоси':
			'Reveals',
		'Монтаж':
			'Installation',
		'Кількість вікон':
			'Number of windows',
		'Менше':
			'Fewer',
		'Більше':
			'More',
		'Орієнтовна вартість':
			'Estimated cost',
		'Ціни орієнтовні та не є публічною офертою':
			'Prices are approximate and do not constitute a public offer',
		'Не вдалося надіслати. Спробуйте ще раз або зателефонуйте нам.':
			'Couldn\'t send. Please try again or give us a call.',
		'Дякуємо за заявку!':
			'Thank you for your request!',
		'Замірник зателефонує вам протягом 15 хвилин.':
			'Our surveyor will call you within 15 minutes.',
		'Надіслати ще одну заявку':
			'Send another request',
		'Дякуємо за питання!':
			'Thank you for your question!',
		'Ми відповімо найближчим часом.':
			'We\'ll get back to you shortly.',
		'Поставити ще одне питання':
			'Ask another question',
		'Меню':
			'Menu',
		'Нагору':
			'Back to top',
	},
};
