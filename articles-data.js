// Статьи Beengo Study. Тексты — черновики, их можно заменить на финальные.
// Каждая статья: id (часть ссылки), тема, заголовок, анонс, время чтения и разделы.
window.BEENGO_CATS = {
  admission: { name: 'Поступление', cls: 'cv-admission' },
  programs:  { name: 'Программы',   cls: 'cv-programs' },
  docs:      { name: 'Документы',   cls: 'cv-docs' },
  life:      { name: 'Жизнь в Китае', cls: 'cv-life' },
  grants:    { name: 'Стипендии',   cls: 'cv-grants' }
};

window.BEENGO_ARTICLES = [
  {
    id: 'kak-vybrat-programmu',
    cat: 'programs',
    title: 'Как выбрать программу обучения в Китае',
    lead: 'Разбираемся в языковых курсах, колледжах, бакалавриате и магистратуре — чтобы сопоставить формат, сроки и свои цели.',
    read: 6,
    sections: [
      { q: 'С чего начать выбор?', p: [
        'Начните не с вуза, а с цели. Кем вы хотите работать через 4–6 лет, в какой стране, на каком языке? От ответа зависит, нужна ли вам программа на китайском или на английском, и какой уровень образования имеет смысл.',
        'Запишите три вещи: желаемую специальность, бюджет на год и уровень языка сейчас. Этого достаточно, чтобы отсечь половину вариантов ещё до консультации.'
      ]},
      { q: 'Чем отличаются форматы обучения?', p: [
        'Языковой год (0,5–1 год) — интенсив китайского с нуля и подготовка к HSK. Подходит тем, кто планирует дальше поступать на бакалавриат на китайском.',
        'Колледж (1+2 или 1+3 года) — практическое образование после 9 или 11 класса: IT, бизнес, дизайн, сервис. Удобная ступень, чтобы потом перейти на бакалавриат.',
        'Бакалавриат (4 года или 1+4) и магистратура (2–3 года) — полноценные степени, которые признаются работодателями по всему миру.'
      ]},
      { q: 'На каком языке учиться?', p: [
        'Англоязычные программы позволяют начать сразу, но их меньше и они чаще платные. Китайскоязычных программ больше, а гранты на них выдают охотнее — зато нужен год языковой подготовки.',
        'Если вы планируете работать с Китаем, китайский язык — сильное преимущество само по себе.'
      ]},
      { q: 'Как сопоставить вуз и бюджет?', p: [
        'Рейтинг вуза важен, но не меньше важны город, стоимость жизни и шансы на грант. Иногда вуз из второй десятки с полным грантом выгоднее топового без скидок.',
        'Мы обычно подбираем 3–5 вузов разного уровня, чтобы у вас был выбор и подстраховка.'
      ]}
    ]
  },
  {
    id: 'kakie-dokumenty-nuzhny',
    cat: 'docs',
    title: 'Какие документы нужны для поступления',
    lead: 'Базовый список, этапы подготовки и то, от чего зависят требования университета.',
    read: 5,
    sections: [
      { q: 'Какой базовый пакет документов?', p: [
        'Загранпаспорт (срок действия от 1,5 лет), документ об образовании с оценками, медицинская справка по форме вуза, справка о несудимости и фотография 3×4 на белом фоне.',
        'Для магистратуры добавляется диплом бакалавра, а для части программ — рекомендательные письма и мотивационное письмо.'
      ]},
      { q: 'Нужны ли языковые сертификаты?', p: [
        'HSK или IELTS не всегда обязательны на старте. Для языкового года они не нужны, для бакалавриата на китайском обычно требуется HSK 4, на английском — IELTS от 5.5.',
        'Если сертификата пока нет, часть вузов допускает собеседование или внутренний тест.'
      ]},
      { q: 'Нужен ли перевод и нотариус?', p: [
        'Большинство вузов принимают документы с переводом на английский или китайский. Требования к заверению зависят от университета — мы проверяем их для каждого вуза из вашего списка.'
      ]},
      { q: 'Сколько времени занимает подготовка?', p: [
        'В среднем 3–6 недель. Дольше всего обычно делают справку о несудимости и медицинскую справку, поэтому их стоит заказывать первыми.'
      ]}
    ]
  },
  {
    id: 'skolko-stoit-zhizn',
    cat: 'life',
    title: 'Сколько стоит жизнь студента в Китае',
    lead: 'Из чего складываются расходы на жильё, питание, транспорт и повседневные траты.',
    read: 5,
    sections: [
      { q: 'Сколько стоит общежитие?', p: [
        'Комната в общежитии кампуса обычно стоит от 4 000 до 12 000 юаней в год в зависимости от города и количества соседей. При гранте проживание часто покрыто.'
      ]},
      { q: 'Во сколько обходится еда?', p: [
        'Столовые кампуса — самый выгодный вариант: полноценный обед стоит 15–30 юаней. В среднем на питание уходит 1 200–2 000 юаней в месяц.'
      ]},
      { q: 'Транспорт и связь', p: [
        'Метро и автобусы стоят 2–6 юаней за поездку, студентам часто положены скидки. Мобильная связь с интернетом — около 50–100 юаней в месяц.'
      ]},
      { q: 'Сколько брать с собой на первый месяц?', p: [
        'Рекомендуем рассчитывать на 1 000–1 500 долларов: залог за общежитие, медосмотр, SIM-карта, бытовые мелочи и запас на непредвиденное.'
      ]}
    ]
  },
  {
    id: 'grant-csc',
    cat: 'grants',
    title: 'Правительственный грант CSC: кому он подходит',
    lead: 'Что покрывает стипендия правительства Китая, какие требования и как повысить шансы.',
    read: 7,
    sections: [
      { q: 'Что покрывает грант?', p: [
        'Полный грант CSC покрывает обучение, проживание в общежитии, медицинскую страховку и ежемесячную стипендию на жизнь.'
      ]},
      { q: 'Кто может подать заявку?', p: [
        'Абитуриенты с хорошими оценками, мотивацией и подходящим возрастом: обычно до 25 лет на бакалавриат и до 35 лет на магистратуру.'
      ]},
      { q: 'Как повысить шансы?', p: [
        'Сильное мотивационное письмо, высокий средний балл и сертификат HSK заметно увеличивают шансы. Важно правильно выбрать вуз и программу под свой профиль.'
      ]}
    ]
  },
  {
    id: 'pervye-dni-v-kitae',
    cat: 'life',
    title: 'Первые дни в Китае: чек-лист после прилёта',
    lead: 'Регистрация, банковская карта, связь и приложения, без которых в Китае не обойтись.',
    read: 4,
    sections: [
      { q: 'Что сделать в первые 24 часа?', p: [
        'Заселиться в общежитие, пройти регистрацию в международном отделе вуза и встать на учёт в полиции по месту проживания.'
      ]},
      { q: 'Какие приложения установить?', p: [
        'WeChat и Alipay — для общения и оплаты, Baidu Maps или Amap — для навигации, а также переводчик, который работает без VPN.'
      ]},
      { q: 'Как оформить банковскую карту?', p: [
        'С паспортом и студенческим билетом в отделении банка рядом с кампусом. Карту потом привязывают к WeChat Pay и Alipay.'
      ]}
    ]
  },
  {
    id: 'kak-postupit-bez-kitayskogo',
    cat: 'admission',
    title: 'Можно ли поступить без знания китайского',
    lead: 'Какие программы доступны на английском и как работает языковой подготовительный год.',
    read: 5,
    sections: [
      { q: 'Есть ли программы на английском?', p: [
        'Да, многие вузы предлагают бакалавриат и магистратуру на английском: бизнес, IT, инженерия, медицина. Для поступления обычно нужен IELTS от 5.5 или собеседование.'
      ]},
      { q: 'Что такое подготовительный год?', p: [
        'Это год интенсивного китайского при университете. За него студенты выходят на уровень HSK 4 и переходят на основную программу на китайском.'
      ]},
      { q: 'Что выгоднее?', p: [
        'Китайскоязычные программы чаще дают гранты и открывают больше возможностей для работы. Англоязычные — быстрее по срокам. Выбор зависит от ваших целей.'
      ]}
    ]
  },
  {
    "id": "studencheskaya-viza-x1",
    "cat": "docs",
    "read": 5,
    "title": "Студенческая виза в Китай: X1 или X2",
    "lead": "Какую визу оформлять, какие документы понадобятся и что сделать в первые 30 дней после приезда.",
    "sections": [
      {
        "q": "Чем отличаются X1 и X2?",
        "p": [
          "Виза X1 нужна для учёбы дольше 180 дней: бакалавриат, магистратура, колледж и длинный языковой курс. Виза X2 — для коротких программ до 180 дней, например летней школы или семестра языка.",
          "Тип визы указан в документах от университета, поэтому выбирать его самостоятельно не придётся."
        ]
      },
      {
        "q": "Какие документы нужны?",
        "p": [
          "Загранпаспорт, письмо о зачислении (Admission Notice), форма JW201 или JW202 от университета, анкета, фотография и, для X1, медицинская справка по форме для иностранцев.",
          "Точный список и формат подачи зависят от консульства вашей страны — перед подачей стоит проверить требования на его сайте."
        ]
      },
      {
        "q": "Что сделать после приезда?",
        "p": [
          "Виза X1 даётся на въезд, поэтому в течение 30 дней после прибытия нужно оформить вид на жительство для учёбы. Университет подскажет порядок и поможет с записью.",
          "Если вы живёте не в общежитии, а в съёмной квартире, нужно зарегистрироваться в полиции по месту проживания в течение 24 часов после заселения."
        ]
      }
    ]
  },
  {
    "id": "motivatsionnoe-pismo",
    "cat": "admission",
    "read": 6,
    "title": "Как написать мотивационное письмо",
    "lead": "Структура письма, которое читают в приёмной комиссии, и ошибки, из-за которых его откладывают.",
    "sections": [
      {
        "q": "Зачем оно нужно?",
        "p": [
          "Мотивационное письмо показывает комиссии, почему вы выбрали программу, университет и Китай. Для грантов оно часто весит не меньше оценок: при одинаковом балле выбирают того, у кого понятная цель."
        ]
      },
      {
        "q": "Какая структура работает лучше всего?",
        "p": [
          "Начните с короткой истории, как вы пришли к выбору специальности. Затем — что вы уже сделали: олимпиады, проекты, курсы, языковая подготовка.",
          "Дальше объясните, почему именно эта программа и этот вуз, и чем вы займётесь после выпуска. Объём — около одной страницы."
        ]
      },
      {
        "q": "Каких ошибок избегать?",
        "p": [
          "Не пересказывайте резюме и не пишите общими фразами вроде «Китай — великая страна». Не отправляйте одно и то же письмо в разные вузы без изменений: комиссии это замечают.",
          "Перед отправкой попросите кого-то прочитать письмо вслух — так легче найти тяжёлые фразы и ошибки."
        ]
      }
    ]
  },
  {
    "id": "hsk-urovni",
    "cat": "programs",
    "read": 5,
    "title": "Экзамен HSK: уровни и подготовка",
    "lead": "Какой уровень HSK нужен для разных программ и сколько времени занимает подготовка.",
    "sections": [
      {
        "q": "Что такое HSK?",
        "p": [
          "HSK — международный экзамен по китайскому языку. Сертификат действует два года, поэтому сдавать его лучше ближе к поступлению."
        ]
      },
      {
        "q": "Какой уровень нужен?",
        "p": [
          "Для бакалавриата на китайском языке обычно требуют HSK 4, для магистратуры — HSK 4 или 5. Для языкового года сертификат не нужен: учёба начинается с нуля.",
          "Требования отличаются у разных вузов и программ, поэтому мы сверяем их для каждого университета из вашего списка."
        ]
      },
      {
        "q": "Сколько готовиться?",
        "p": [
          "С нуля до HSK 4 при интенсивных занятиях обычно уходит около года. Как раз столько длится языковой год в китайском университете, после которого студенты переходят на основную программу."
        ]
      }
    ]
  },
  {
    "id": "obshchezhitie-ili-kvartira",
    "cat": "life",
    "read": 4,
    "title": "Общежитие или квартира: где жить студенту",
    "lead": "Плюсы и минусы жизни в кампусе и в съёмной квартире, цены и что учесть при переезде.",
    "sections": [
      {
        "q": "Чем удобно общежитие?",
        "p": [
          "Комнаты на 1–4 человека, до учебных корпусов несколько минут пешком, рядом столовые, спортзал и библиотека. При гранте проживание в общежитии часто уже оплачено."
        ]
      },
      {
        "q": "Когда стоит снимать квартиру?",
        "p": [
          "Квартира даёт больше личного пространства, но обычно дороже и требует залога за 1–3 месяца. Многие студенты переезжают со второго курса, когда уже знают город и язык."
        ]
      },
      {
        "q": "Что учесть при съёме?",
        "p": [
          "Договор аренды, регистрация в полиции в течение 24 часов после заселения и оплата коммунальных услуг через WeChat или Alipay. Перед подписанием договора стоит показать его куратору."
        ]
      }
    ]
  },
  {
    "id": "kak-vybrat-gorod",
    "cat": "admission",
    "read": 5,
    "title": "Как выбрать город для учёбы в Китае",
    "lead": "Большие города или региональные центры: стоимость жизни, климат и возможности после учёбы.",
    "sections": [
      {
        "q": "Пекин и Шанхай или регион?",
        "p": [
          "В Пекине и Шанхае самые известные университеты и больше стажировок, но выше цены и конкурс на гранты. В Сиане, Чэнду, Ухане и других региональных центрах жизнь заметно дешевле, а сильных вузов тоже много."
        ]
      },
      {
        "q": "Как учесть климат?",
        "p": [
          "На севере зимы холодные и сухие, на юге — мягкая зима и влажное жаркое лето. Если вы плохо переносите жару или холод, это стоит учесть при выборе."
        ]
      },
      {
        "q": "Что ещё важно?",
        "p": [
          "Подумайте, где вы хотите работать после выпуска: в крупных городах больше международных компаний. Мы подбираем 3–5 вузов в разных городах, чтобы у вас был выбор."
        ]
      }
    ]
  },
  {
    "id": "granty-universitetov",
    "cat": "grants",
    "read": 5,
    "title": "Гранты и скидки от университетов",
    "lead": "Какие стипендии дают сами вузы и провинции, кроме правительственной CSC, и как на них подать.",
    "sections": [
      {
        "q": "Какие бывают стипендии?",
        "p": [
          "Кроме правительственного гранта CSC, есть стипендии провинций и городов, стипендии самих университетов и гранты на изучение китайского языка.",
          "Они бывают полными — обучение, общежитие и ежемесячная выплата — или частичными, когда покрывается часть стоимости."
        ]
      },
      {
        "q": "Кто может получить?",
        "p": [
          "Решение принимают по среднему баллу, мотивационному письму, уровню языка и иногда по собеседованию. Чем раньше подана заявка, тем больше шансов: места ограничены."
        ]
      },
      {
        "q": "Как повысить шансы?",
        "p": [
          "Подавать заявки сразу в несколько вузов разного уровня и на разные виды стипендий. Мы проверяем, на какие программы у вас есть шансы, и подаём документы в 3–5 университетов."
        ]
      }
    ]
  }
];

// ===== English versions (same ids) =====
window.BEENGO_CATS_EN = { admission:'Admission', programs:'Programs', docs:'Documents', life:'Life in China', grants:'Scholarships' };
window.BEENGO_ARTICLES_EN = {
  'kak-vybrat-programmu': {
    title: 'How to choose a study program in China',
    lead: 'A look at language courses, colleges, bachelor’s and master’s programs — to match format, timing and your goals.',
    sections: [
      { q: 'Where to start?', p: [
        'Start with your goal, not the university. What do you want to do in 4–6 years, in which country, in which language? The answer determines whether you need a program in Chinese or English, and which level of education makes sense.',
        'Write down three things: your desired major, your yearly budget and your current language level. That is enough to rule out half of the options even before a consultation.'
      ]},
      { q: 'How do study formats differ?', p: [
        'Language year (0.5–1 year) — intensive Chinese from zero and HSK preparation. Suits those who plan to continue to a Chinese-taught bachelor’s.',
        'College (1+2 or 1+3 years) — practical education after grade 9 or 11: IT, business, design, hospitality. A convenient step before moving on to a bachelor’s.',
        'Bachelor’s (4 years or 1+4) and master’s (2–3 years) — full degrees recognised by employers worldwide.'
      ]},
      { q: 'Which language to study in?', p: [
        'English-taught programs let you start right away, but there are fewer of them and they are more often paid. There are more Chinese-taught programs and grants for them are given more readily — but you need a year of language preparation.',
        'If you plan to work with China, Chinese is a strong advantage in itself.'
      ]},
      { q: 'How to match university and budget?', p: [
        'University ranking matters, but so do the city, the cost of living and grant chances. Sometimes a university outside the top 10 with a full grant is a better deal than a top one without discounts.',
        'We usually pick 3–5 universities of different levels so you have a choice and a safety net.'
      ]}
    ]
  },
  'kakie-dokumenty-nuzhny': {
    title: 'What documents you need to apply',
    lead: 'The basic list, preparation stages and what university requirements depend on.',
    sections: [
      { q: 'What is the basic document package?', p: [
        'International passport (valid for 1.5+ years), education certificate with grades, medical certificate on the university’s form, police clearance certificate and a 3×4 photo on a white background.',
        'For a master’s you also need a bachelor’s diploma, and some programs require recommendation letters and a motivation letter.'
      ]},
      { q: 'Do I need language certificates?', p: [
        'HSK or IELTS are not always required at the start. They are not needed for the language year; Chinese-taught bachelor’s programs usually require HSK 4, English-taught ones IELTS 5.5+.',
        'If you don’t have a certificate yet, some universities accept an interview or an internal test.'
      ]},
      { q: 'Do I need translation and notarisation?', p: [
        'Most universities accept documents translated into English or Chinese. Certification requirements depend on the university — we check them for every university on your list.'
      ]},
      { q: 'How long does preparation take?', p: [
        'On average 3–6 weeks. The police clearance and medical certificates usually take longest, so order them first.'
      ]}
    ]
  },
  'skolko-stoit-zhizn': {
    title: 'How much student life in China costs',
    lead: 'What makes up the costs of housing, food, transport and everyday spending.',
    sections: [
      { q: 'How much is a dorm?', p: [
        'A room in a campus dorm usually costs 4,000 to 12,000 yuan a year depending on the city and number of roommates. With a grant, accommodation is often covered.'
      ]},
      { q: 'How much does food cost?', p: [
        'Campus canteens are the best value: a full lunch costs 15–30 yuan. On average food takes 1,200–2,000 yuan a month.'
      ]},
      { q: 'Transport and mobile', p: [
        'Metro and buses cost 2–6 yuan per ride, and students often get discounts. A mobile plan with internet is about 50–100 yuan a month.'
      ]},
      { q: 'How much to bring for the first month?', p: [
        'We recommend planning for 1,000–1,500 US dollars: dorm deposit, medical check-up, SIM card, household items and a reserve for the unexpected.'
      ]}
    ]
  },
  'grant-csc': {
    title: 'The CSC government grant: who it suits',
    lead: 'What the Chinese Government Scholarship covers, the requirements and how to improve your chances.',
    sections: [
      { q: 'What does the grant cover?', p: [
        'A full CSC grant covers tuition, dorm accommodation, medical insurance and a monthly living stipend.'
      ]},
      { q: 'Who can apply?', p: [
        'Applicants with good grades, motivation and a suitable age: usually under 25 for a bachelor’s and under 35 for a master’s.'
      ]},
      { q: 'How to improve your chances?', p: [
        'A strong motivation letter, a high GPA and an HSK certificate noticeably increase your chances. Choosing the right university and program for your profile is important.'
      ]}
    ]
  },
  'pervye-dni-v-kitae': {
    title: 'First days in China: an after-arrival checklist',
    lead: 'Registration, a bank card, mobile and the apps you can’t do without in China.',
    sections: [
      { q: 'What to do in the first 24 hours?', p: [
        'Move into the dorm, register at the university’s international office and register with the local police.'
      ]},
      { q: 'Which apps to install?', p: [
        'WeChat and Alipay for messaging and payments, Baidu Maps or Amap for navigation, plus a translator that works without a VPN.'
      ]},
      { q: 'How to get a bank card?', p: [
        'With your passport and student card at a bank branch near campus. The card is then linked to WeChat Pay and Alipay.'
      ]}
    ]
  },
  'kak-postupit-bez-kitayskogo': {
    title: 'Can you get in without knowing Chinese?',
    lead: 'Which programs are available in English and how the preparatory language year works.',
    sections: [
      { q: 'Are there programs in English?', p: [
        'Yes, many universities offer English-taught bachelor’s and master’s programs: business, IT, engineering, medicine. Admission usually requires IELTS 5.5+ or an interview.'
      ]},
      { q: 'What is the preparatory year?', p: [
        'It is a year of intensive Chinese at the university. During it students reach HSK 4 and move on to the main Chinese-taught program.'
      ]},
      { q: 'Which is better?', p: [
        'Chinese-taught programs more often come with grants and open more job opportunities. English-taught ones are faster. The choice depends on your goals.'
      ]}
    ]
  },
  "studencheskaya-viza-x1": {
    "title": "Student visa for China: X1 or X2",
    "lead": "Which visa to apply for, what documents you need and what to do in the first 30 days after arrival.",
    "sections": [
      {
        "q": "What is the difference between X1 and X2?",
        "p": [
          "An X1 visa is for studies longer than 180 days: bachelor’s, master’s, college and long language courses. An X2 visa is for short programs of up to 180 days, such as a summer school or a language semester.",
          "The visa type is stated in your university documents, so you don’t have to choose it yourself."
        ]
      },
      {
        "q": "What documents are needed?",
        "p": [
          "Your passport, the Admission Notice, the JW201 or JW202 form from the university, an application form, a photo and, for X1, a medical certificate on the form for foreigners.",
          "The exact list and how to apply depend on the consulate in your country, so check its website before applying."
        ]
      },
      {
        "q": "What to do after arrival?",
        "p": [
          "An X1 visa is an entry visa, so within 30 days of arrival you need to get a residence permit for study. The university will explain the procedure and help you book an appointment.",
          "If you live in a rented flat rather than a dorm, you must register with the local police within 24 hours of moving in."
        ]
      }
    ]
  },
  "motivatsionnoe-pismo": {
    "title": "How to write a motivation letter",
    "lead": "The structure of a letter admission committees actually read, and the mistakes that get it put aside.",
    "sections": [
      {
        "q": "Why does it matter?",
        "p": [
          "A motivation letter shows the committee why you chose the program, the university and China. For grants it often matters as much as grades: with equal scores, the applicant with a clear goal is chosen."
        ]
      },
      {
        "q": "Which structure works best?",
        "p": [
          "Start with a short story of how you came to choose your major. Then show what you have already done: competitions, projects, courses, language preparation.",
          "Next, explain why this program and this university, and what you will do after graduation. Aim for about one page."
        ]
      },
      {
        "q": "Which mistakes to avoid?",
        "p": [
          "Don’t retell your CV or write general phrases like “China is a great country”. Don’t send the same letter to different universities unchanged: committees notice.",
          "Before sending, ask someone to read the letter aloud — it makes heavy sentences and mistakes easier to spot."
        ]
      }
    ]
  },
  "hsk-urovni": {
    "title": "The HSK exam: levels and preparation",
    "lead": "Which HSK level different programs require and how long preparation takes.",
    "sections": [
      {
        "q": "What is HSK?",
        "p": [
          "HSK is the international Chinese language exam. The certificate is valid for two years, so it is best taken closer to admission."
        ]
      },
      {
        "q": "Which level is required?",
        "p": [
          "Chinese-taught bachelor’s programs usually require HSK 4, master’s programs HSK 4 or 5. No certificate is needed for the language year: studies start from zero.",
          "Requirements differ between universities and programs, so we check them for every university on your list."
        ]
      },
      {
        "q": "How long to prepare?",
        "p": [
          "From zero to HSK 4 usually takes about a year of intensive study — exactly as long as a language year at a Chinese university, after which students move on to the main program."
        ]
      }
    ]
  },
  "obshchezhitie-ili-kvartira": {
    "title": "Dorm or flat: where to live as a student",
    "lead": "Pros and cons of living on campus and in a rented flat, prices and what to keep in mind when moving.",
    "sections": [
      {
        "q": "Why is a dorm convenient?",
        "p": [
          "Rooms for 1–4 people, a few minutes’ walk to classes, canteens, a gym and a library nearby. With a grant, dorm accommodation is often already paid for."
        ]
      },
      {
        "q": "When is it worth renting a flat?",
        "p": [
          "A flat gives more privacy but is usually more expensive and requires a deposit of 1–3 months. Many students move out in their second year, once they know the city and the language."
        ]
      },
      {
        "q": "What to consider when renting?",
        "p": [
          "A rental contract, police registration within 24 hours of moving in, and paying utilities via WeChat or Alipay. Show the contract to your coordinator before signing."
        ]
      }
    ]
  },
  "kak-vybrat-gorod": {
    "title": "How to choose a city to study in China",
    "lead": "Big cities or regional centres: cost of living, climate and opportunities after graduation.",
    "sections": [
      {
        "q": "Beijing and Shanghai or a regional city?",
        "p": [
          "Beijing and Shanghai have the best-known universities and more internships, but higher prices and tougher competition for grants. In Xi’an, Chengdu, Wuhan and other regional centres life is noticeably cheaper, and there are many strong universities too."
        ]
      },
      {
        "q": "How to factor in the climate?",
        "p": [
          "The north has cold, dry winters; the south has mild winters and hot, humid summers. If you don’t cope well with heat or cold, keep this in mind."
        ]
      },
      {
        "q": "What else matters?",
        "p": [
          "Think about where you want to work after graduation: big cities have more international companies. We pick 3–5 universities in different cities so you have a choice."
        ]
      }
    ]
  },
  "granty-universitetov": {
    "title": "Grants and discounts from universities",
    "lead": "Which scholarships universities and provinces offer besides the CSC government grant, and how to apply.",
    "sections": [
      {
        "q": "What scholarships are there?",
        "p": [
          "Besides the CSC government grant, there are provincial and city scholarships, university scholarships and grants for studying Chinese.",
          "They can be full — tuition, dorm and a monthly allowance — or partial, covering part of the cost."
        ]
      },
      {
        "q": "Who can get one?",
        "p": [
          "Decisions are based on GPA, the motivation letter, language level and sometimes an interview. The earlier you apply, the better your chances: places are limited."
        ]
      },
      {
        "q": "How to improve your chances?",
        "p": [
          "Apply to several universities of different levels and for different types of scholarships at once. We check which programs you have a chance at and apply to 3–5 universities."
        ]
      }
    ]
  }
};
// Язык статей: ?lang=en в адресе или выбор, сохранённый на главной
window.BEENGO_LANG = (()=>{let l=null;try{l=new URLSearchParams(location.search).get('lang')||localStorage.getItem('beengo-lang')}catch(e){}return l==='en'?'en':'ru'})();
window.beengoArticles = lang => lang!=='en' ? window.BEENGO_ARTICLES : window.BEENGO_ARTICLES.map(a=>Object.assign({},a,window.BEENGO_ARTICLES_EN[a.id]||{}));
window.beengoCats = lang => { const C={}; for(const k in window.BEENGO_CATS) C[k]=Object.assign({},window.BEENGO_CATS[k],lang==='en'?{name:window.BEENGO_CATS_EN[k]}:{}); return C; };
window.beengoSetLang = lang => { try{localStorage.setItem('beengo-lang',lang)}catch(e){} const u=new URL(location.href); if(lang==='en')u.searchParams.set('lang','en'); else u.searchParams.delete('lang'); location.replace(u.toString()); };
