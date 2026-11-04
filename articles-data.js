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
  }
};
// Язык статей: ?lang=en в адресе или выбор, сохранённый на главной
window.BEENGO_LANG = (()=>{let l=null;try{l=new URLSearchParams(location.search).get('lang')||localStorage.getItem('beengo-lang')}catch(e){}return l==='en'?'en':'ru'})();
window.beengoArticles = lang => lang!=='en' ? window.BEENGO_ARTICLES : window.BEENGO_ARTICLES.map(a=>Object.assign({},a,window.BEENGO_ARTICLES_EN[a.id]||{}));
window.beengoCats = lang => { const C={}; for(const k in window.BEENGO_CATS) C[k]=Object.assign({},window.BEENGO_CATS[k],lang==='en'?{name:window.BEENGO_CATS_EN[k]}:{}); return C; };
window.beengoSetLang = lang => { try{localStorage.setItem('beengo-lang',lang)}catch(e){} const u=new URL(location.href); if(lang==='en')u.searchParams.set('lang','en'); else u.searchParams.delete('lang'); location.replace(u.toString()); };
