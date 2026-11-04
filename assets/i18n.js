/* Beengo Study — переключение языка rus / eng.
   Словарь: русская фраза → английская. Чтобы поправить перевод — меняйте правую часть. */
(()=>{
const EN={
// шапка / меню
'Почему именно Китай?':'Why China?','Боли и Решения':'Pains & Solutions','Программы':'Programs','Отзывы':'Reviews','Процесс':'Process','Связаться с нами':'Contact us','Меню':'Menu',
// первый экран
'Наша':'Our','студентка':'student','Алсу':'Alsu',
'«Спокойно обращайтесь в Beengo, они вам действительно помогут. Сейчас я получаю качественное образование без самостоятельного поиска!»':'“Feel free to turn to Beengo — they will really help you. Now I’m getting a quality education without having to search on my own!”',
'Смотреть историю поступления':'Watch the admission story','НАБОР НА 2026-2027 ГОД':'ADMISSIONS 2026–2027',
'Поступите в топовый':'Get into a top','университет Китая':'Chinese university',
'Beengo Study помогает абитуриентам со всего СНГ подобрать специальность, оформить академические документы и получить приглашение от вуза':'Beengo Study helps applicants from across the CIS choose a major, prepare academic documents and receive an invitation from a university',
'Подбираем программы':'Programs for','под любой бюджет':'any budget','От грантов и скидок до контрактного обучения':'From grants and discounts to paid tuition',
'Бесплатный разбор шансов':'Free chances assessment','Приём на грант 2026/27 закрывается':'Grant applications for 2026/27 close on','31 марта':'March 31',
'Это бесплатно и ни к чему не обязывает. Ваши данные в безопасности.':'It’s free and with no obligation. Your data is safe.',
'Успешных поступлений':'Successful admissions','Учебных заведений-партнеров':'Partner institutions','7+ лет':'7+ years','Опыта в сфере образования':'Of experience in education',
'Студентка Beengo Алсу':'Beengo student Alsu',
// почему Китай
'Китай — это маршрут к международной карьере и жизни будущего':'China is a route to an international career and the life of the future',
'Для студента':'For students','Для родителей':'For parents',
'Диплом, за которым охотятся работодатели':'A degree employers are hunting for',
'Доступ к практике и стажировкам в глобальных IT- и технологических гигантах.':'Access to practice and internships at global IT and tech giants.',
'Кампусы как из фильмов про будущее':'Campuses straight out of sci-fi movies',
'Роботы-доставщики, пропускная система по биометрии, огромные лаборатории и спорткомплексы.':'Delivery robots, biometric entry, huge labs and sports complexes.',
'Деньги на жизнь и путешествия':'Money for living and travel',
'Грант покрывает не только учёбу и современное общежитие, но и даёт ежемесячную стипендию на карманные расходы.':'A grant covers not only tuition and a modern dorm, but also gives a monthly stipend for pocket money.',
'Путешествия по всей Азии':'Travel across Asia',
'На скоростных поездах можно легко объездить всю страну, а на каникулах дешево слетать в соседние азиатские страны.':'High-speed trains make it easy to travel the whole country, and on holidays you can fly cheaply to neighbouring Asian countries.',
'Статус':'Status','Степени ведущих вузов Китая официально признаются ведомствами по всему СНГ.':'Degrees from China’s leading universities are officially recognised by authorities across the CIS.','Диплом признан':'Degree recognised',
'0 поводов для тревоги':'0 reasons to worry','Закрытые кампусы, охрана 24/7 и один из самых низких уровней уличной преступности в мире.':'Gated campuses, 24/7 security and one of the lowest street crime rates in the world.',
'Робот-доставщик, вход по биометрии, современный кампус':'Delivery robot, biometric entry, modern campus','Робот-доставщик в кампусе':'Delivery robot on campus','Вход по биометрии':'Biometric entry','Современный кампус':'Modern campus',
'Кампус: вход по Face ID, охрана, студенты':'Campus: Face ID entry, security, students','Охрана 24/7':'24/7 security','Закрытый кампус':'Gated campus','Вход по Face ID':'Face ID entry',
'Бюджет':'Budget','Доступная альтернатива Европе и США без потери качества образования.':'An affordable alternative to Europe and the US with no loss in quality of education.','Стоимость обучения: США, Европа, Китай':'Tuition costs: USA, Europe, China',
'Контроль':'Discipline','В вузах Китая строгая система посещаемости, формирующая дисциплину.':'Chinese universities have a strict attendance system that builds discipline.','Приложение кампуса: посещаемость и расписание':'Campus app: attendance and schedule',
// программы
'Сравните форматы и состав программ, чтобы выбрать подходящее направление.':'Compare program formats and content to choose the right path.',
'Языковой год':'Language year','Длительность:':'Duration:','0,5-1 год':'0.5–1 year','Требования:':'Requirements:','Обучение с нуля':'Start from zero','Этапы обучения:':'Study stages:',
'Интенсивное изучение китайского языка':'Intensive Chinese language study','Подготовка к экзаменам HSK':'HSK exam preparation','Что входит:':'What’s included:',
'Погружение в культуру и повседневную жизнь':'Immersion in culture and everyday life','Краткосрочные и летние программы':'Short-term and summer programs','Узнать подробнее':'Learn more',
'Колледж':'College','1+2 / 1+3 года':'1+2 / 1+3 years','После 9 или 11 класса':'After grade 9 or 11','1 год изучения китайского языка':'1 year of Chinese language','2-3 года обучения по специальности':'2–3 years of major studies',
'Практическое образование: IT, бизнес, дизайн, технологии, гостиничный сервис и другие направления':'Practical education: IT, business, design, technology, hospitality and more',
'Доступная стоимость обучения':'Affordable tuition','База для перехода на бакалавриат':'A foundation for moving on to a bachelor’s',
'Бизнес':'Business','Дизайн':'Design','Технологии':'Technology','Гостиничный сервис':'Hospitality','и другие направления':'and more',
'Бакалавриат':'Bachelor’s','1+4 / 4 года':'1+4 / 4 years','После 11 класса':'After grade 11','4 года обучения по специальности':'4 years of major studies',
'Программы на английском или китайском языке':'Programs in English or Chinese','Помощь с документами':'Help with documents','Требования зависят от выбранной программы':'Requirements depend on the chosen program',
'Инженерия':'Engineering','Экономика':'Economics','Медицина':'Medicine','Искусство':'Arts',
'Магистратура':'Master’s','2-3 года':'2–3 years','После бакалавриата':'After a bachelor’s','Углублённое обучение и научные исследования':'Advanced study and research',
'Международные стажировки и проекты':'International internships and projects','Программы на китайском и английском языках':'Programs in Chinese and English','Инновации':'Innovation',
// боли
'Самостоятельное поступление - это риски':'Applying on your own means risks','С Beengo Study -':'With Beengo Study —','четкая':'a clear','система':'system',
'Ошибка в одной анкете или упущенный дедлайн могут стоить целого года. Мы берем всю сложную рутину на себя.':'One mistake in an application or a missed deadline can cost a whole year. We take all the complicated routine off your hands.',
'Поступать самому':'Applying on your own','Языковой барьер и регламенты':'Language barrier and regulations',
'Сайты большинства университетов на китайском языке. Внутренние требования комиссий не очевидны, из-за чего легко упустить дедлайн подачи.':'Most university websites are in Chinese. Admission committees’ internal requirements are not obvious, so it’s easy to miss a deadline.',
'Ошибки в пакете документов':'Mistakes in documents','Ошибки в переводах или отсутствие нужной печати приводят к автоматическому отклонению заявки приемной комиссией.':'Translation errors or a missing stamp lead to automatic rejection by the admission committee.',
'Поступление вслепую':'Applying blindly','Сложно объективно оценить свой средний балл (GPA). Подача документов только в один вуз наугад часто заканчивается потерей времени и учебного года.':'It’s hard to objectively assess your GPA. Applying to just one random university often ends in losing time and an academic year.',
'С Beengo Study':'With Beengo Study','Прямой контакт с университетами':'Direct contact with universities',
'Ведем официальную деловую коммуникацию с деканатами на китайском языке и держим все дедлайны под строгим контролем.':'We handle official business communication with deans’ offices in Chinese and keep every deadline under strict control.',
'Двойной аудит и официальные шаблоны':'Double audit and official templates',
'Выдаем проверенные бланки, помогаем составить сильное мотивационное письмо и досконально проверяем каждый файл перед отправкой в КНР.':'We provide verified forms, help write a strong motivation letter and thoroughly check every file before sending it to China.',
'Страховка зачисления (98% успеха)':'Admission insurance (98% success)',
'Проводим аудит ваших оценок и подаем документы сразу в 3–5 проверенных вузов с запасом по баллам, чтобы вы гарантированно получили приказ о зачислении.':'We audit your grades and apply to 3–5 trusted universities at once with a safety margin, so you are guaranteed to receive an admission letter.',
// документы
'Какие документы нужны для поступления?':'What documents do you need to apply?',
'Никакой сложной бюрократии. Передайте нам базовые оригиналы или сканы — остальное мы берем на себя.':'No complicated bureaucracy. Send us basic originals or scans — we take care of the rest.',
'список:':'checklist:','Заграничный паспорт':'International passport','от 1,5 лет действия':'valid for 1.5+ years','Документ об образовании':'Education certificate','Аттестат, диплом или табель с оценками':'School certificate, diploma or transcript',
'Медицинская справка':'Medical certificate','Выдаем готовый бланк':'We provide the form','Сертификаты HSK/IELTS':'HSK/IELTS certificates','только при наличии, не обязательно для старта с нуля':'only if you have them, not required to start from zero',
'Справка о несудимости':'Police clearance certificate','Фотографии 3×4':'3×4 photos','на белом фоне':'on a white background','Получить список документов в PDF':'Get the document list in PDF',
'Папка с документами':'Folder with documents',
// финансы
'Гранты, скидки и платное обучение: подберем вариант под ваш бюджет':'Grants, discounts and paid tuition: we’ll find an option for your budget',
'Полные и частичные гранты':'Full and partial grants','Для абитуриентов с высоким средним баллом или знанием языка. Покрывает 100% стоимости обучения, проживание, а иногда и стипендию.':'For applicants with a high GPA or language skills. Covers 100% of tuition, accommodation and sometimes a stipend.',
'Академические скидки':'Academic discounts','Для студентов со стабильными хорошими оценками. Скидки от 20% до 70% на оплату обучения или бесплатное проживание.':'For students with consistently good grades. 20% to 70% off tuition or free accommodation.',
'Платный контракт':'Paid contract','Для гарантированного поступления без жесткого конкурса. Цены сопоставимы с вузами СНГ, но дают международный диплом.':'For guaranteed admission without tough competition. Prices are comparable to CIS universities, but you get an international degree.',
'Шапка выпускника с надписью «Грант»':'Graduation cap labelled “Grant”','Студенческий билет со скидкой 20–70%':'Student card with a 20–70% discount','Документ «Гарантированное поступление» с ручкой':'“Guaranteed admission” document with a pen',
// о компании
'О компании':'About us','Beengo Study - официальный представитель вузов Китая,':'Beengo Study is an official representative of Chinese universities,','а не просто посредник':'not just an intermediary',
'Мы не рассылаем заявки наугад. За':'We don’t send applications at random. In','+7 лет':'over 7 years','мы выстроили прямые партнерские отношения с университетами.':'we have built direct partnerships with universities.',
'Мы знаем внутренние требования приемных комиссий, поэтому беремся только за те кейсы, в которых':'We know the internal requirements of admission committees, so we only take on cases we are','уверены':'confident in',
'Официальный договор':'Official contract','Прописываем все наши обязательства юридически.':'All our obligations are legally set out.','98% зачислений':'98% admitted','Делаем подачу сразу в 3–5 вузов для подстраховки.':'We apply to 3–5 universities at once to be safe.',
'Свои люди в Китае':'Our own people in China','У нас есть кураторы на местах, которые решат любой вопрос.':'We have on-site coordinators who can solve any issue.',
'лет опыта':'years of experience','помогаем поступать в вузы Китая':'helping students get into Chinese universities',
'Наши студенты':'Our students','Студентка с приглашением (Offer of Admission)':'Student with an Offer of Admission','Приглашения из китайских университетов':'Invitations from Chinese universities',
'Наши студенты получили приглашения в университеты Китая':'Our students received invitations to Chinese universities','Студент с официальным приглашением':'Student with an official invitation','Студент Beengo с полученной визой':'Beengo student with a visa',
'Фото 1':'Photo 1','Фото 2':'Photo 2','Фото 3':'Photo 3','Фото 4':'Photo 4','Фото 5':'Photo 5','Предыдущее фото':'Previous photo','Следующее фото':'Next photo',
// география
'Мы выстроили удаленный процесс оформления так, чтобы абитуриенты из любого города могли легко подать документы без лишних поездок.':'We built a remote process so applicants from any city can easily submit documents without unnecessary trips.',
'🇷🇺 Россия':'🇷🇺 Russia','🇰🇿 Казахстан':'🇰🇿 Kazakhstan','🇺🇿 Узбекистан':'🇺🇿 Uzbekistan','🇰🇬 Кыргызстан':'🇰🇬 Kyrgyzstan','🇧🇾 Беларусь':'🇧🇾 Belarus','🇦🇿 Азербайджан':'🇦🇿 Azerbaijan',
'Карта стран, откуда к нам приходят студенты: Россия, Беларусь, Казахстан, Азербайджан, Кыргызстан, Узбекистан':'Map of countries our students come from: Russia, Belarus, Kazakhstan, Azerbaijan, Kyrgyzstan, Uzbekistan',
// истории
'Город:':'City:','До:':'Before:','После:':'After:','Результат с Beengo:':'Result with Beengo:','Назад':'Back','Вперёд':'Next','Смотреть видео-отзыв':'Watch video review',
'Сиань':'Xi’an','Цзиньхуа':'Jinhua','Лэшань':'Leshan','Жетиген':'Zhetigen','Айбек':'Aibek','Сауле, 19 лет':'Saule, 19',
'Страх запутаться в документах на стипендию и упустить шанс':'Afraid of getting lost in scholarship paperwork and missing the chance',
'Полный грант (обучение + жилье + стипендия)':'Full grant (tuition + housing + stipend)','Команда взяла на себя визу, все переводы и оформление.':'The team took care of the visa, all translations and paperwork.',
'Не знал, как найти подходящий университет и общаться с приёмной комиссией':'Didn’t know how to find the right university or talk to the admission committee',
'Поступил в университет в Цзиньхуа и учится в Китае':'Got into a university in Jinhua and is studying in China',
'Взяли на себя все сложные этапы: подбор вуза, переговоры с приёмной комиссией и подачу документов.':'They handled all the hard parts: choosing a university, talking to the admission committee and submitting documents.',
'«Взяли на себя все сложные этапы, которые я бы не смог сделать один. Подача получилась очень лёгкой и быстрой»':'“They took on all the hard steps I couldn’t have done alone. Applying was very easy and fast”',
'Боялся, что без поддержки не справится с поступлением в Китай':'Was afraid he couldn’t manage admission to China without support',
'Поступил на языковой год в Сиани и сейчас учится в Китае':'Enrolled in a language year in Xi’an and is now studying in China',
'Объяснили каждый шаг и помогли на всех этапах — процесс оказался намного легче.':'They explained every step and helped at every stage — the process turned out much easier.',
'«Без вашей поддержки у меня бы не получилось. Спасибо за вовлечённость и за этот шанс!»':'“I couldn’t have done it without your support. Thank you for your dedication and for this chance!”',
'Не знала, какой вуз и программу выбрать и как правильно подать документы':'Didn’t know which university and program to choose or how to apply correctly',
'Учится в Technical College на языковой программе на китайском языке':'Studies at a Technical College in a Chinese-language program',
'Подобрали вуз и программу, помогли заполнить заявку, собрать документы, получить приглашение и подробно объяснили, как получить визу.':'They chose a university and program, helped fill in the application, collect documents, get an invitation and explained in detail how to get a visa.',
'«Китайский диплом очень ценится, а Китай — развивающаяся страна. Beengo помогли на всех этапах поступления»':'“A Chinese degree is highly valued, and China is a growing country. Beengo helped at every stage of admission”',
// вузы
'Работаем напрямую и без посредников. Это дает нашим абитуриентам приоритет при рассмотрении заявок и доступ к максимальным квотам на гранты и скидки.':'We work directly, with no intermediaries. This gives our applicants priority in application review and access to the largest grant and discount quotas.',
'Технические и IT-специальности':'Engineering & IT majors','Красивое здание кампуса':'Beautiful campus building','Сианьский нефтяной университет (XSYU)':'Xi’an Shiyou University (XSYU)','Сайт университета ↗':'University website ↗',
'Гуманитарные науки и бизнес':'Humanities & business','Студенческий городок':'Student campus','Чжэцзянский педагогический университет (ZJNU)':'Zhejiang Normal University (ZJNU)',
'Экономика и международная торговля':'Economics & international trade','Современные лаборатории':'Modern laboratories','Шанхайский университет (Shanghai University)':'Shanghai University','Вузы-партнёры':'Partner universities',
// шаги
'1 ШАГ':'STEP 1','2 ШАГ':'STEP 2','3 ШАГ':'STEP 3','4 ШАГ':'STEP 4','5 ШАГ':'STEP 5',
'Анализ профиля и подбор вузов':'Profile analysis and university selection','Мы не предлагаем стандартные списки. Работа начинается с детального разбора вашей ситуации':'We don’t offer standard lists. Work starts with a detailed review of your situation',
'Оцениваем средний балл аттестата (GPA), уровень языка и финансовые ожидания.':'We assess your GPA, language level and financial expectations.',
'Анализируем шансы на получение грантов или академических скидок.':'We analyse your chances of getting grants or academic discounts.',
'Формируем персональный шорт-лист из 3–5 надежных университетов, где ваши сильные стороны сработают лучше всего, и согласовываем финальный выбор направлений с вами.':'We build a personal shortlist of 3–5 reliable universities where your strengths will work best, and agree on the final choice with you.',
'Сбор и проверка документов':'Collecting and checking documents','Помогаем собрать идеальный пакет документов без ошибок, которые могут стоить вам зачисления.':'We help you put together a perfect, error-free document package — mistakes could cost you admission.',
'Предоставляем четкие шаблоны и инструкции от агентства для сбора всех необходимых справок и выписок.':'We provide clear templates and instructions for collecting all required certificates and transcripts.',
'Проводим тщательную проверку и аудит каждого документа на соответствие строгим требованиям китайских вузов.':'We thoroughly check and audit every document against the strict requirements of Chinese universities.',
'Консультируем по правильному оформлению мотивационных и рекомендательных писем (без нотариального заверения и переводов с нашей стороны).':'We advise on writing motivation and recommendation letters properly (notarisation and translations are not done by us).',
'Подача заявок в университеты':'Applying to universities','Берем на себя всю бюрократию и общение с приемными комиссиями.':'We take on all the bureaucracy and communication with admission committees.',
'Грамотно заполняем анкеты и загружаем досье на порталы выбранных университетов.':'We fill in application forms correctly and upload your file to the chosen universities’ portals.',
'Ведем прямые переговоры и официальную переписку с представителями вузов.':'We negotiate directly and handle official correspondence with university representatives.',
'Оперативно реагируем на запросы приемной комиссии и отслеживаем статусы ваших заявок в режиме реального времени.':'We respond quickly to admission committee requests and track your application status in real time.',
'Получение приказа о зачислении':'Receiving the admission letter','Самый долгожданный этап — подтверждение вашего места в университете.':'The most awaited stage — confirmation of your place at the university.',
'Получаем официальное письмо о зачислении (Admission Notice) от университета.':'We receive the official Admission Notice from the university.',
'Контролируем выпуск формы JW201/JW202, необходимой для оформления студенческой визы.':'We make sure the JW201/JW202 form needed for the student visa is issued.',
'Убеждаемся, что за вами закреплен грант, скидка или место в общежитии (если это было предусмотрено условиями).':'We confirm that your grant, discount or dorm place is secured (if included in the terms).',
'Финальная подготовка':'Final preparation','к переезду':'for the move','Помогаем спокойно собраться и уверенно стартовать в новой стране.':'We help you pack calmly and start confidently in a new country.',
'Подготавливаем вас к самостоятельному получению визы и комфортному старту в Китае.':'We prepare you to get your visa yourself and to start comfortably in China.',
'Даем памятку по покупке билетов, сборам чемодана и правилам въезда в страну.':'We give you a guide on buying tickets, packing and entry rules.',
'Консультируем по первым шагам после прибытия в Китай: регистрация в кампусе, заселение и подключение местной связи.':'We advise on your first steps after arriving in China: campus registration, move-in and getting a local SIM.',
'1 минута · 3 вопроса':'1 minute · 3 questions','Узнайте шансы за одну минуту':'Find out your chances in one minute',
'Ответьте на 3 коротких вопроса — и узнаете, на какой грант и программу можете рассчитывать.':'Answer 3 short questions and find out which grant and program you can count on.','Пройти тест':'Take the test',
// статьи
'Коротко и по делу — о программах, документах и студенческой жизни.':'Short and to the point — about programs, documents and student life.',
'Все':'All','Поступление':'Admission','Документы':'Documents','Жизнь в Китае':'Life in China','Стипендии':'Scholarships',
'Как выбрать программу обучения в Китае':'How to choose a study program in China','Разбираемся в языковых курсах, колледжах, бакалавриате и магистратуре — чтобы сопоставить формат, сроки и свои цели.':'A look at language courses, colleges, bachelor’s and master’s programs — to match format, timing and your goals.',
'Читать статью полностью':'Read the full article','Какие документы нужны для поступления':'What documents you need to apply','Базовый список, этапы подготовки и то, от чего зависят требования университета.':'The basic list, preparation stages and what university requirements depend on.',
'Сколько стоит жизнь студента в Китае':'How much student life in China costs','Из чего складываются расходы на жильё, питание, транспорт и повседневные траты.':'What makes up the costs of housing, food, transport and everyday spending.',
'Читать все статьи':'Read all articles','Найти ответ':'Find an answer',
// чек-лист
'Скачайте наш подробный чек-лист: «Пошаговый план поступления на грант в Китай в 2026/2027 году».':'Download our detailed checklist: “A step-by-step plan for getting a grant in China in 2026/2027”.',
'Пошаговый план поступления на грант в Китай в 2026/2027 году':'A step-by-step plan for getting a grant in China in 2026/2027',
'Куда прислать чек-лист?':'Where should we send the checklist?','Куда прислать':'Where to send','Телеграм':'Telegram','Скачать чек-лист бесплатно':'Download the checklist for free','Без спама, только полезный PDF':'No spam, just a useful PDF',
'ваш_никнейм':'your_username','5–32 символа: латиница, цифры, _':'5–32 characters: Latin letters, digits, _','Код страны':'Country code',
'Готово! Отправим в WhatsApp ✓':'Done! We’ll send it to WhatsApp ✓','Готово! Отправим в Телеграм ✓':'Done! We’ll send it to Telegram ✓',
// FAQ
'Вопрос-ответ':'FAQ','Отвечаем на самые частые вопросы студентов и родителей.':'Answers to the most common questions from students and parents.',
'Нужно ли знать китайский язык?':'Do I need to know Chinese?','Нет. На «Языковом годе» учатся с нуля, а на бакалавриате есть англоязычные программы.':'No. The Language Year starts from zero, and there are English-taught bachelor’s programs.',
'Что, если мне откажут в визе?':'What if my visa is refused?','При полном пакете от университета (Admission Notice и форма JW201/JW202) студенческую визу обычно выдают без проблем. Если отказ всё же случится — разберём причину и поможем подготовить повторную подачу.':'With the full package from the university (Admission Notice and JW201/JW202 form), student visas are usually issued without problems. If a refusal does happen, we’ll find the reason and help you reapply.',
'Сколько денег давать ребенку с собой?':'How much money should my child take?','Зависит от города и формата обучения. Если у студента грант со стипендией, базовые расходы во многом покрыты. На консультации посчитаем бюджет на первый месяц под ваш вуз и город.':'It depends on the city and study format. If the student has a grant with a stipend, basic expenses are largely covered. At the consultation we’ll calculate a first-month budget for your university and city.',
'Котируется ли китайский диплом дома?':'Is a Chinese degree valued back home?','Да, дипломы ведущих вузов КНР ценятся работодателями. Для отдельных профессий может понадобиться процедура признания диплома — подскажем, как это сделать в вашей стране.':'Yes, degrees from China’s leading universities are valued by employers. Some professions may require degree recognition — we’ll explain how to do it in your country.',
// заявка
'Оставьте заявку - мы свяжемся с вами и ответим на':'Leave a request — we’ll contact you and answer','все вопросы':'all your questions',
'Заполните форму и наш специалист подберет для Вас оптимальную программу и поможет с поступлением в Китай':'Fill in the form and our specialist will pick the best program for you and help you get into a Chinese university',
'дней':'days','часов':'hours','минут':'minutes','секунд':'seconds','Грант 2026/27':'Grant 2026/27','до 31 марта':'until March 31','Приём на грант закрывается через':'Grant applications close in','Успейте подать заявку':'Apply in time','Приём на грант 2026/27 закрывается 31 марта':'Grant applications for 2026/27 close on March 31',
'Количество грантовых мест ограничено — подаём документы в порядке очереди':'Grant places are limited — applications are submitted in order of arrival',
'Ваше имя':'Your name','Ваш телефон':'Your phone','Интересующая программа':'Program of interest',
'0,5–1 год · с нуля':'0.5–1 year · from zero','1+2 / 1+3 года · после 9 или 11 класса':'1+2 / 1+3 years · after grade 9 or 11','1+4 / 4 года · после 11 класса':'1+4 / 4 years · after grade 11','2–3 года · после бакалавриата':'2–3 years · after a bachelor’s',
'Оставить заявку':'Send request','Имя Фамилия':'Full name','Расскажите о своих целях':'Tell us about your goals','Спасибо! 🎉':'Thank you! 🎉','Заявка принята. Мы свяжемся с вами в ближайшее время.':'Request received. We’ll contact you shortly.',
// футер
'Официальный партнер':'Official partner','вузов КНР':'of Chinese universities','Поступите в топовый университет Китая':'Get into a top Chinese university','Ваш надёжный партнёр для поступления в университеты Китая.':'Your reliable partner for admission to Chinese universities.',
'Заполнить форму':'Fill in the form','Наш адрес:':'Our address:','График работы:':'Working hours:','Пн-Вс, 10:00 – 19:00':'Mon–Sun, 10:00 – 19:00','Навигация':'Navigation','Обратная связь':'Feedback','Консультация':'Consultation',
'Наши контакты':'Our contacts','Номер телефона':'Phone number','Мы онлайн':'We’re online','Beengo Study. Все права защищены':'Beengo Study. All rights reserved','Политика конфиденциальности':'Privacy policy','Написать в WhatsApp':'Message us on WhatsApp',
// квиз
'Шаг':'Step','из 4':'of 4','Какое у вас образование?':'What is your education?','Подберём подходящую ступень обучения':'We’ll pick the right level of study',
'Окончил 9 класс':'Finished grade 9','или заканчиваю':'or finishing now','Окончил 11 класс':'Finished grade 11','Колледж / техникум':'College / vocational school','есть диплом СПО':'have a vocational diploma','есть диплом или учусь':'have a degree or studying',
'Какой бюджет на обучение в год?':'What is your yearly study budget?','Это поможет понять, на что делать ставку: грант, скидку или контракт':'This helps decide what to aim for: a grant, a discount or a paid contract',
'Только грант':'Grant only','хочу учиться бесплатно':'I want to study for free','До $3 000':'Up to $3,000','готов частично оплачивать':'ready to pay partially','рассматриваю контракт':'considering a paid contract','Больше $6 000':'Over $6,000','важно качество вуза':'university quality matters',
'Какой язык вы знаете?':'Which language do you know?','Можно начать и с нуля — у нас есть языковой год':'You can start from zero — we have a language year',
'Пока никакой':'None yet','начну с нуля':'I’ll start from zero','Английский':'English','средний уровень и выше':'intermediate or higher','Китайский':'Chinese','изучаю / есть HSK':'studying / have HSK','Оба языка':'Both','английский и китайский':'English and Chinese',
'← Назад':'← Back','Оставьте контакты — менеджер свяжется с вами и подберёт программы под ваш бюджет.':'Leave your contacts — a manager will get in touch and pick programs for your budget.','Отправить заявку':'Submit request','Закрыть':'Close','Результат':'Result',
};
// заголовки секций (разбиты на слова для анимации) — переводим целиком
const H2={
'Почему именно Китай?':'Why China?',
'Выберите направление обучения в Китае':'Choose your study path in China',
'Форматы финансирования':'Funding options',
'Официальный представитель вузов в Китае':'Official representative of Chinese universities',
'Истории наших студентов, которые уже живут и учатся в Китае':'Stories of our students who<br>already live and study in China',
'Работаем напрямую с 50+ университетами':'We work directly with 50+ universities',
'5 понятных шагов к вашему зачислению':'5 clear steps to <span>your admission</span>',
'Топ-3 материала, которые нужно изучить перед переездом':'Top 3 reads<br>before you move',
'Все еще сомневаетесь? Сделайте первый шаг':'Still hesitating?<br>Take the first step',
};
const RX=[[/^Более (\d+)$/,'Over $1',/^Over (\d+)$/,'Более $1']];
const RU={};for(const k in EN)if(!(EN[k] in RU))RU[EN[k]]=k;
const ATTR=['placeholder','alt','aria-label','title','data-s','data-p','data-prefix'];
EN['Более ']='Over ';RU['Over ']='Более ';
let lang='ru';
const norm=s=>s.replace(/\s+/g,' ').trim();
const tr=(s,to)=>{const d=to==='en'?EN:RU,k=norm(s);if(!k)return null;
  if(d[k]!==undefined){const m=s.match(/^(\s*)[\s\S]*?(\s*)$/);return m[1]+d[k]+m[2]}
  for(const r of RX){const [a,b]=to==='en'?[r[0],r[1]]:[r[2],r[3]];if(a.test(k))return k.replace(a,b)}
  return null};
const skip=n=>{const p=n.parentElement;return !p||p.closest('script,style,select')||p.closest('.h2.wsplit')};
const fixText=(root,to)=>{
  if(root.nodeType===3){if(!skip(root)){const t=tr(root.nodeValue,to);if(t!==null&&t!==root.nodeValue)root.nodeValue=t}return}
  if(root.nodeType!==1)return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n,list=[];while(n=w.nextNode())list.push(n);
  list.forEach(n=>{if(skip(n))return;const t=tr(n.nodeValue,to);if(t!==null&&t!==n.nodeValue)n.nodeValue=t});
  const els=[root,...root.querySelectorAll('*')];
  els.forEach(e=>{if(e.closest&&e.closest('select'))return;ATTR.forEach(a=>{const v=e.getAttribute&&e.getAttribute(a);if(v){const t=tr(v,to);if(t!==null)e.setAttribute(a,t)}})})};
// заголовки
const split=h=>{const walk=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const parts=c.textContent.split(/(\s+)/);const f=document.createDocumentFragment();
  parts.forEach(t=>{if(!t)return;if(/^\s+$/.test(t)){f.appendChild(document.createTextNode(t));return}const sp=document.createElement('span');sp.className='w';sp.textContent=t;f.appendChild(sp)});c.replaceWith(f)}
  else if(c.nodeType===1&&c.tagName!=='BR')walk(c)})};walk(h);[...h.querySelectorAll('.w')].forEach((w,i)=>w.style.setProperty('--wi',i))};
const heads=[...document.querySelectorAll('.h2')].filter(h=>h.querySelector('.w')).map(h=>{
  const c=h.cloneNode(true);c.querySelectorAll('br').forEach(b=>b.replaceWith(' '));const key=norm(c.textContent);
  h.classList.add('wsplit');return {h,ru:h.innerHTML,en:H2[key]}}).filter(x=>x.en);
const setHeads=to=>heads.forEach(x=>{if(to==='en'){const t=document.createElement('div');t.innerHTML=x.en;split(t);x.h.innerHTML=t.innerHTML}else x.h.innerHTML=x.ru});
const TITLE={ru:document.title,en:'Beengo Study — admission to Chinese universities'};
const mo=new MutationObserver(ms=>{if(lang!=='en')return;ms.forEach(m=>{if(m.type==='characterData')fixText(m.target,'en');else m.addedNodes.forEach(n=>fixText(n,'en'))})});
const apply=to=>{if(to===lang)return;lang=to;mo.disconnect();
  document.documentElement.lang=to;document.title=TITLE[to];fixText(document.body,to);setHeads(to);
  document.querySelectorAll('.lang button').forEach(b=>b.classList.toggle('on',(b.textContent.trim()==='eng')===(to==='en')));
  if(to==='en')mo.observe(document.body,{subtree:true,childList:true,characterData:true});
  try{localStorage.setItem('beengo-lang',to)}catch(e){}
  document.querySelectorAll('a[href]').forEach(a=>{const h=a.getAttribute('href');const m=h.match(/^(articles?\.html)(\?lang=en)?(#.*)?$/);if(m)a.setAttribute('href',m[1]+(to==='en'?'?lang=en':'')+(m[3]||''))});
  dispatchEvent(new Event('resize'))};
window.beengoLang=()=>lang;
document.querySelectorAll('.lang button').forEach(b=>b.onclick=()=>apply(b.textContent.trim()==='eng'?'en':'ru'));
let saved=null;try{saved=new URLSearchParams(location.search).get('lang')||localStorage.getItem('beengo-lang')}catch(e){}
if(saved==='en')apply('en');
})();
