export const STAGES = [
  {
    id: 1,
    titleFa: "الفبا و صداهای جادویی",
    titleEn: "Alphabet & Phonics",
    city: "شیراز (باغ ارم)",
    cityEn: "Shiraz",
    landmark: "Eram Garden",
    icon: "🌺",
    color: "from-pink-500 to-rose-500",
    description: "شروع سفر از شهر شعر و گل؛ یادگیری صداهای زبان انگلیسی و حروف الفبا.",
    lesson: {
      intro: "انگلیسی ۲۶ حرف دارد، اما نکته مهم صداهای حروف است. برخی صداها مثل th و sh در فارسی متفاوت تلفظ می‌شوند.",
      keyPoints: [
        "حروف صدادار (A, E, I, O, U) روح کلمات هستند.",
        "ترکیب sh صدای «ش» می‌دهد (مثل She).",
        "ترکیب ch صدای «چ» می‌دهد (مثل Chocolate).",
        "ترکیب th نوک زبانی است (مثل Thanks و The)."
      ],
      vocabulary: [
        { en: "Love", fa: "عشق", ipa: "/lʌv/", example: "Love is patient and kind." },
        { en: "Smile", fa: "لبخند", ipa: "/smaɪl/", example: "Your smile brightens my day." },
        { en: "Heart", fa: "قلب", ipa: "/hɑːrt/", example: "You hold my heart." },
        { en: "Together", fa: "با هم", ipa: "/təˈɡeðər/", example: "We learn together." }
      ],
      personalExample: "علی همیشه می‌گوید: «Fatemeh, your smile is my favorite sound in the world.»"
    },
    flashcards: [
      { id: 'f1', front: "Love", back: "عشق / دوست داشتن", ipa: "/lʌv/", example: "I love you." },
      { id: 'f2', front: "Heart", back: "قلب / دل", ipa: "/hɑːrt/", example: "You have a pure heart." },
      { id: 'f3', front: "Smile", back: "لبخند / خندیدن", ipa: "/smaɪl/", example: "Keep smiling always." },
      { id: 'f4', front: "Together", back: "با هم / در کنار هم", ipa: "/təˈɡeðər/", example: "We grow together." }
    ],
    practice: [
      {
        type: "listen",
        prompt: "به صدا گوش دهید و کلمه صحیح را انتخاب کنید:",
        audioText: "Together",
        options: ["Together", "Forever", "Heart", "Weather"],
        answer: "Together"
      },
      {
        type: "arrange",
        prompt: "کلمات را مرتب کنید تا جمله ساخته شود: «ما با هم یاد می‌گیریم.»",
        chips: ["learn", "We", "together", "English"],
        answer: ["We", "learn", "English", "together"]
      },
      {
        type: "fill",
        prompt: "حرف صدادار خالی را پر کنید: H___art (به معنی قلب)",
        options: ["e", "o", "u", "i"],
        answer: "e"
      }
    ],
    exam: {
      timeLimitSeconds: 120,
      totalPoints: 100,
      questions: [
        {
          id: 'q1',
          points: 25,
          type: 'multiple-choice',
          question: "ترکیب حروف 'Th' در کلمه 'Thanks' چه صدایی می‌دهد؟",
          options: ["صدای ت معمولی", "صدای نوک زبانی بین ت و ث", "صدای ش", "صدای ف"],
          answer: 1
        },
        {
          id: 'q2',
          points: 25,
          type: 'audio',
          question: "به تلفظ کلمه گوش دهید؛ معنی این کلمه چیست؟",
          audioText: "Heart",
          options: ["چشم", "قلب", "خنده", "دست"],
          answer: 1
        },
        {
          id: 'q3',
          points: 25,
          type: 'arrange',
          question: "جمله درباره من و فاطمه را به انگلیسی مرتب کنید: «فاطمه لبخند زیبایی دارد.»",
          chips: ["a", "Fatemeh", "smile", "has", "beautiful"],
          answer: ["Fatemeh", "has", "a", "beautiful", "smile"]
        },
        {
          id: 'q4',
          points: 25,
          type: 'fill',
          question: "جای خالی را پر کنید: Ali and Fatemeh are _______ (با هم).",
          options: ["alone", "together", "never", "cold"],
          answer: 1
        }
      ],
      tieBreaker: {
        question: "سوال امتیازی طلایی: کدام کلمه انگلیسی به معنی «برای همیشه» است؟",
        options: ["Forever", "Yesterday", "Never", "Often"],
        answer: 0
      }
    },
    secretLoveNote: {
      titleEn: "A letter from Shiraz",
      titleFa: "نامه‌ای از شیراز به یاد تو",
      contentEn: "My dearest Fatemeh, every single step in this journey reminds me how lucky I am to have you. Learning English with you is the sweetest adventure of my life.",
      contentFa: "فاطمه نازنینم، هر قدم در این مسیر به من یادآوری می‌کند چقدر خوشبختم که تو را دارم. یادگیری انگلیسی در کنار تو، شیرین‌ترین ماجراجویی زندگی من است."
    }
  },
  {
    id: 2,
    titleFa: "معرفی خود و ضمایر",
    titleEn: "Self Introduction & Pronouns",
    city: "استانبول (پل بسفر)",
    cityEn: "Istanbul",
    landmark: "Bosphorus Bridge",
    icon: "🌉",
    color: "from-rose-500 to-purple-600",
    description: "روی پل بسفر میان دو قاره؛ یاد می‌گیریم چطور خودمان را به انگلیسی معرفی کنیم.",
    lesson: {
      intro: "ضمایر فاعلی اساس ساخت جمله هستند: I (من)، You (تو)، He (او مذکر)، She (او مؤنث)، We (ما)، They (آن‌ها).",
      keyPoints: [
        "برای گفتن «نام من ... است»: My name is Ali / My name is Fatemeh.",
        "فعل بودن (To Be): I am, You are, He/She is, We are.",
        "برای گفتن حس خود: I am so happy to be with you."
      ],
      vocabulary: [
        { en: "Name", fa: "نام / اسم", ipa: "/neɪm/", example: "My name is Fatemeh." },
        { en: "Happy", fa: "خوشحال", ipa: "/ˈhæp.i/", example: "I am happy with you." },
        { en: "Kind", fa: "مهربان", ipa: "/kaɪnd/", example: "Ali is very kind." },
        { en: "Always", fa: "همیشه", ipa: "/ˈɔːl.weɪz/", example: "I am always here for you." }
      ],
      personalExample: "فاطمه می‌گوید: «I am Fatemeh, and Ali is the kindest person I know.»"
    },
    flashcards: [
      { id: 'f5', front: "I am", back: "من هستم", ipa: "/aɪ æm/", example: "I am proud of you." },
      { id: 'f6', front: "You are", back: "تو هستی", ipa: "/juː ɑːr/", example: "You are my sunshine." },
      { id: 'f7', front: "We are", back: "ما هستیم", ipa: "/wiː ɑːr/", example: "We are a great team." },
      { id: 'f8', front: "Kind", back: "مهربان", ipa: "/kaɪnd/", example: "She is sweet and kind." }
    ],
    practice: [
      {
        type: "fill",
        prompt: "ضمیر مناسب را انتخاب کنید: ____ is Fatemeh and she is an artist.",
        options: ["He", "She", "It", "They"],
        answer: "She"
      },
      {
        type: "arrange",
        prompt: "مرتب کنید: «ما یک تیم فوق‌العاده هستیم.»",
        chips: ["great", "are", "We", "a", "team"],
        answer: ["We", "are", "a", "great", "team"]
      },
      {
        type: "listen",
        prompt: "به صدا گوش دهید و بگویید کدام ضمیر خوانده شد:",
        audioText: "You are my sunshine",
        options: ["I am", "You are", "They are", "We were"],
        answer: "You are"
      }
    ],
    exam: {
      timeLimitSeconds: 120,
      totalPoints: 100,
      questions: [
        {
          id: 'q5',
          points: 25,
          type: 'multiple-choice',
          question: "کدام گزینه برای تکمیل جمله «Ali and Fatemeh _____ in love» صحیح است؟",
          options: ["is", "am", "are", "be"],
          answer: 2
        },
        {
          id: 'q6',
          points: 25,
          type: 'arrange',
          question: "مرتب کنید: «نام من علی است.»",
          chips: ["name", "My", "Ali", "is"],
          answer: ["My", "name", "is", "Ali"]
        },
        {
          id: 'q7',
          points: 25,
          type: 'audio',
          question: "گوش دهید و مفهوم جمله را مشخص کنید:",
          audioText: "You make me very happy",
          options: ["تو مرا خوشحال می‌کنی", "من خسته‌ام", "تو کجا هستی", "فردا همدیگر را می‌بینیم"],
          answer: 0
        },
        {
          id: 'q8',
          points: 25,
          type: 'fill',
          question: "جای خالی: Fatemeh, you ____ the most beautiful person to me.",
          options: ["is", "are", "am", "do"],
          answer: 1
        }
      ],
      tieBreaker: {
        question: "سوال امتیازی: شکل مخفف I am در گفتگوی محاوره‌ای چیست؟",
        options: ["I'm", "Im'", "I'am", "Ime"],
        answer: 0
      }
    },
    secretLoveNote: {
      titleEn: "Sunset on the Bosphorus",
      titleFa: "غروب آفتاب روی بسفر",
      contentEn: "No matter how many continents we cross, my favorite place in the whole universe is right next to you, Fatemeh.",
      contentFa: "فرقی ندارد از چند قاره عبور کنیم؛ محبوب‌ترین نقطه در کل کائنات برای من، درست در کنار توست، فاطمه جانم."
    }
  },
  {
    id: 3,
    titleFa: "افعال پایه و خواسته‌ها",
    titleEn: "Basic Verbs & Desires",
    city: "دبی (برج خلیفه)",
    cityEn: "Dubai",
    landmark: "Burj Khalifa",
    icon: "🏙️",
    color: "from-purple-600 to-indigo-600",
    description: "زیر نور آسمان‌خراش‌ها؛ افعال پرکاربرد داشتن، خواستن و دوست داشتن را یاد می‌گیریم.",
    lesson: {
      intro: "چهار فعل طلایی برای مکالمه روزمره: Want (خواستن)، Have (داشتن)، Like (دوست داشتن)، Live (زندگی کردن).",
      keyPoints: [
        "I want a coffee = من یک قهوه می‌خواهم.",
        "I have a surprise for you = من یک سورپرایز برایت دارم.",
        "She likes music = او موسیقی دوست دارد (s سوم شخص مفرد).",
        "We want to travel the world = ما می‌خواهیم دور دنیا سفر کنیم."
      ],
      vocabulary: [
        { en: "Want", fa: "خواستن", ipa: "/wɑːnt/", example: "I want to hug you." },
        { en: "Have", fa: "داشتن", ipa: "/hæv/", example: "We have sweet dreams." },
        { en: "Like", fa: "دوست داشتن / پسندیدن", ipa: "/laɪk/", example: "Fatemeh likes gentle rain." },
        { en: "Dream", fa: "رویا / آرزو", ipa: "/driːm/", example: "You are my dream." }
      ],
      personalExample: "علی: «I want to make all your dreams come true, Fatemeh.»"
    },
    flashcards: [
      { id: 'f9', front: "I want", back: "من می‌خواهم", ipa: "/aɪ wɑːnt/", example: "I want you to be happy." },
      { id: 'f10', front: "I have", back: "من دارم", ipa: "/aɪ hæv/", example: "I have you in my life." },
      { id: 'f11', front: "She likes", back: "او دوست دارد", ipa: "/ʃiː laɪks/", example: "She likes sweet tea." },
      { id: 'f12', front: "Dream", back: "رویا / خواب", ipa: "/driːm/", example: "Dreams come true." }
    ],
    practice: [
      {
        type: "fill",
        prompt: "فعل مناسب: I _______ to spend every moment with you.",
        options: ["want", "wants", "wanted", "wanting"],
        answer: "want"
      },
      {
        type: "arrange",
        prompt: "مرتب کنید: «ما رویاهای بزرگی داریم.»",
        chips: ["big", "We", "dreams", "have"],
        answer: ["We", "have", "big", "dreams"]
      },
      {
        type: "listen",
        prompt: "به صدا گوش دهید و عبارت را تکمیل کنید:",
        audioText: "I want to hug you",
        options: ["I want to see you", "I want to hug you", "I have a gift", "She likes coffee"],
        answer: "I want to hug you"
      }
    ],
    exam: {
      timeLimitSeconds: 120,
      totalPoints: 100,
      questions: [
        {
          id: 'q9',
          points: 25,
          type: 'multiple-choice',
          question: "کدام جمله از نظر گرامری کاملاً صحیح است؟",
          options: ["Fatemeh want a cup of tea", "Fatemeh wants a cup of tea", "Fatemeh wanting tea", "Fatemeh to want tea"],
          answer: 1
        },
        {
          id: 'q10',
          points: 25,
          type: 'arrange',
          question: "مرتب کنید: «علی یک سورپرایز برای فاطمه دارد.»",
          chips: ["surprise", "Ali", "Fatemeh", "for", "has", "a"],
          answer: ["Ali", "has", "a", "surprise", "for", "Fatemeh"]
        },
        {
          id: 'q11',
          points: 25,
          type: 'audio',
          question: "معنی جمله‌ای که می‌شنوید چیست؟",
          audioText: "Do you have time for a walk?",
          options: ["آیا وقت داری برای پیاده‌روی؟", "ساعت چند است؟", "کجا می‌روی؟", "گرسنه‌ات است؟"],
          answer: 0
        },
        {
          id: 'q12',
          points: 25,
          type: 'fill',
          question: "جای خالی: We _______ the same dream.",
          options: ["share", "shares", "is", "am"],
          answer: 0
        }
      ],
      tieBreaker: {
        question: "سوال امتیازی: شکل منفی «I want» چیست؟",
        options: ["I don't want", "I no want", "I not want", "I am not want"],
        answer: 0
      }
    },
    secretLoveNote: {
      titleEn: "Looking at the Stars",
      titleFa: "نگاه به ستاره‌ها از بالاترین نقطه",
      contentEn: "Fatemeh, the highest tower in the world looks small compared to the greatness of my love for you.",
      contentFa: "فاطمه من، بلندترین برج جهان در برابر بزرگی عشقم به تو کوچک به نظر می‌رسد."
    }
  },
  {
    id: 4,
    titleFa: "زمان حال ساده و عادات شیرین",
    titleEn: "Simple Present & Daily Routines",
    city: "رم (کولوسئوم)",
    cityEn: "Rome",
    landmark: "Colosseum",
    icon: "🏛️",
    color: "from-indigo-600 to-rose-600",
    description: "در کوچه‌پس‌کوچه‌های تاریخی رم؛ کارهای روزمره و عادات قشنگ زندگی را بیان می‌کنیم.",
    lesson: {
      intro: "زمان حال ساده برای کارهایی است که به صورت عادت انجام می‌دهیم: Every day (هر روز), Every morning (هر صبح).",
      keyPoints: [
        "I wake up and think of you = بیدار می‌شوم و به تو فکر می‌کنم.",
        "Fatemeh reads a book every night = فاطمه هر شب کتاب می‌خواند.",
        "We drink coffee together = ما با هم قهوه می‌نوشیم.",
        "برای سوالی کردن از Do / Does استفاده می‌کنیم: Do you love me? Yes, I do!"
      ],
      vocabulary: [
        { en: "Wake up", fa: "بیدار شدن", ipa: "/weɪk ʌp/", example: "I wake up with a smile." },
        { en: "Think", fa: "فکر کردن", ipa: "/θɪŋk/", example: "I think about you." },
        { en: "Every day", fa: "هر روز", ipa: "/ˈev.ri deɪ/", example: "I love you more every day." },
        { en: "Listen", fa: "گوش دادن", ipa: "/ˈlɪs.ən/", example: "We listen to music." }
      ],
      personalExample: "«Every single morning, Ali sends a warm message to Fatemeh.»"
    },
    flashcards: [
      { id: 'f13', front: "Every morning", back: "هر روز صبح", ipa: "/ˈev.ri ˈmɔː.nɪŋ/", example: "Every morning is fresh." },
      { id: 'f14', front: "I think of you", back: "به تو فکر می‌کنم", ipa: "/aɪ θɪŋk əv juː/", example: "Always I think of you." },
      { id: 'f15', front: "Do you love me?", back: "آیا مرا دوست داری؟", ipa: "/duː juː lʌv miː/", example: "Yes, forever!" },
      { id: 'f16', front: "Drink coffee", back: "قهوه نوشیدن", ipa: "/drɪŋk ˈkɒf.i/", example: "We drink coffee together." }
    ],
    practice: [
      {
        type: "fill",
        prompt: "گزینه صحیح برای سوم شخص: Fatemeh _______ (to smile) whenever she sees Ali.",
        options: ["smiles", "smile", "smiling", "smiled"],
        answer: "smiles"
      },
      {
        type: "arrange",
        prompt: "مرتب کنید: «من هر روز به تو فکر می‌کنم.»",
        chips: ["every", "I", "think", "of", "you", "day"],
        answer: ["I", "think", "of", "you", "every", "day"]
      },
      {
        type: "listen",
        prompt: "به فایل صوتی گوش دهید و پاسخ دهید:",
        audioText: "Do you love me?",
        options: ["Yes, I do!", "No, I am not.", "I have a car.", "Where is Rome?"],
        answer: "Yes, I do!"
      }
    ],
    exam: {
      timeLimitSeconds: 120,
      totalPoints: 100,
      questions: [
        {
          id: 'q13',
          points: 25,
          type: 'multiple-choice',
          question: "پاسخ صحیح به سوال «Does Ali love Fatemeh?» چیست؟",
          options: ["Yes, he does! Very much.", "No, he don't.", "Yes, he is.", "He have love."],
          answer: 0
        },
        {
          id: 'q14',
          points: 25,
          type: 'arrange',
          question: "مرتب کنید: «ما هر عصر چای می‌نوشیم.»",
          chips: ["evening", "tea", "drink", "We", "every"],
          answer: ["We", "drink", "tea", "every", "evening"]
        },
        {
          id: 'q15',
          points: 25,
          type: 'audio',
          question: "معنی دقیق عبارتی که پخش می‌شود چیست؟",
          audioText: "You are my favorite habit",
          options: ["تو بهترین عادت زندگی منی", "من خسته‌ام", "کتاب می‌خوانم", "امروز هوا خوب است"],
          answer: 0
        },
        {
          id: 'q16',
          points: 25,
          type: 'fill',
          question: "جای خالی: Every day, our love _______ stronger.",
          options: ["grows", "grow", "growing", "grown"],
          answer: 0
        }
      ],
      tieBreaker: {
        question: "سوال امتیازی: قید زمان «همیشه» به انگلیسی چیست؟",
        options: ["Always", "Sometimes", "Rarely", "Never"],
        answer: 0
      }
    },
    secretLoveNote: {
      titleEn: "Eternal City, Eternal Love",
      titleFa: "شهر ابدی، عشق جاودانه",
      contentEn: "They call Rome the Eternal City, but the only thing truly eternal to me is the warmth I feel when I hold your hand, my Fatemeh.",
      contentFa: "رم را شهر ابدی می‌نامند، اما تنها چیزی که برای من واقعاً جاودانه است، گرمایی است که وقتی دستت را می‌گیرم احساس می‌کنم، فاطمه‌ام."
    }
  },
  {
    id: 5,
    titleFa: "غذا، نوشیدنی و سفارش در کافه",
    titleEn: "Food & Dining Out",
    city: "پاریس (برج ایفل)",
    cityEn: "Paris",
    landmark: "Eiffel Tower",
    icon: "🥐",
    color: "from-rose-500 to-amber-500",
    description: "کافه‌گردی در خیابان‌های پاریس؛ سفارش غذا و دسر مورد علاقه پارتنر به انگلیسی.",
    lesson: {
      intro: "مکالمات غذا خوردن و کافه یکی از کاربردی‌ترین بخش‌های زبان است: Can I have...? (می‌توانم داشته باشم؟)، I would like... (من میل دارم...).",
      keyPoints: [
        "I would like two coffees, please = من دو تا قهوه میل دارم، لطفاً.",
        "What is your favorite dish? = غذای مورد علاقه‌ات چیست؟",
        "It is delicious! = این غذا خیلی خوشمزه است!",
        "Can we have the bill, please? = می‌توانیم صورت‌حساب را داشته باشیم؟"
      ],
      vocabulary: [
        { en: "Delicious", fa: "خوشمزه و لذیذ", ipa: "/dɪˈlɪʃ.əs/", example: "This cake is delicious." },
        { en: "Coffee", fa: "قهوه", ipa: "/ˈkɒf.i/", example: "Hot coffee in cold weather." },
        { en: "Dinner", fa: "شام", ipa: "/ˈdɪn.ər/", example: "A romantic dinner for two." },
        { en: "Sweet", fa: "شیرین", ipa: "/swiːt/", example: "As sweet as honey." }
      ],
      personalExample: "«Ali reserves a cozy table by the window for Fatemeh's birthday dinner.»"
    },
    flashcards: [
      { id: 'f17', front: "I would like", back: "من میل دارم / می‌خواهم", ipa: "/aɪ wʊd laɪk/", example: "I would like some dessert." },
      { id: 'f18', front: "Delicious", back: "بسیار خوشمزه", ipa: "/dɪˈlɪʃ.əs/", example: "Your cooking is delicious." },
      { id: 'f19', front: "The bill, please", back: "صورت‌حساب لطفاً", ipa: "/ðə bɪl pliːz/", example: "Can we have the bill?" },
      { id: 'f20', front: "Sweet dessert", back: "دسر شیرین", ipa: "/swiːt dɪˈzɜːt/", example: "Ice cream is my favorite dessert." }
    ],
    practice: [
      {
        type: "fill",
        prompt: "عبارت مودبانه سفارش: I _______ like a hot chocolate, please.",
        options: ["would", "will", "can", "do"],
        answer: "would"
      },
      {
        type: "arrange",
        prompt: "مرتب کنید: «این خوشمزه‌ترین کیکی است که خوردم.»",
        chips: ["is", "cake", "delicious", "This", "very"],
        answer: ["This", "cake", "is", "very", "delicious"]
      },
      {
        type: "listen",
        prompt: "به تلفظ سفارش گوش دهید و گزینه معادل را بیابید:",
        audioText: "Two cups of tea for Ali and Fatemeh",
        options: ["یک فنجان چای", "دو فنجان چای برای علی و فاطمه", "دو فنجان قهوه تلخ", "یک برش کیک"],
        answer: "دو فنجان چای برای علی و فاطمه"
      }
    ],
    exam: {
      timeLimitSeconds: 120,
      totalPoints: 100,
      questions: [
        {
          id: 'q17',
          points: 25,
          type: 'multiple-choice',
          question: "در رستوران، محترمانه‌ترین روش سفارش کدام است؟",
          options: ["Give me tea now", "I would like a cup of tea, please", "I want tea fast", "Bring tea to me"],
          answer: 1
        },
        {
          id: 'q18',
          points: 25,
          type: 'arrange',
          question: "مرتب کنید: «یک شام رمانتیک برای ما دو نفر.»",
          chips: ["two", "dinner", "for", "romantic", "A"],
          answer: ["A", "romantic", "dinner", "for", "two"]
        },
        {
          id: 'q19',
          points: 25,
          type: 'audio',
          question: "معنی جمله صوتی چیست؟",
          audioText: "Enjoy your meal my love",
          options: ["نوش جان عشقم", "صورت‌حساب کجاست", "غذا شور است", "کافه بسته شد"],
          answer: 0
        },
        {
          id: 'q20',
          points: 25,
          type: 'fill',
          question: "جای خالی: Fatemeh, everything tastes better when I eat with _______.",
          options: ["you", "her", "him", "them"],
          answer: 0
        }
      ],
      tieBreaker: {
        question: "سوال امتیازی: کلمه انگلیسی «دستور پخت / رسپی» چیست؟",
        options: ["Recipe", "Receipt", "Menu", "Order"],
        answer: 0
      }
    },
    secretLoveNote: {
      titleEn: "Under the Eiffel Lights",
      titleFa: "زیر نورپردازی ایفل",
      contentEn: "Paris is famous for sweetness, but nothing in this entire French capital is sweeter than hearing you laugh across the table, Fatemeh.",
      contentFa: "پاریس به شیرینی معروف است، اما هیچ چیز در این پایتخت فرانسه شیرین‌تر از شنیدن صدای خنده تو از آن سوی میز نیست، فاطمه‌ام."
    }
  },
  {
    id: 6,
    titleFa: "زمان گذشته و مرور خاطرات",
    titleEn: "Past Tense & Memories",
    city: "بارسلون (ساگرادا فامیلیا)",
    cityEn: "Barcelona",
    landmark: "Sagrada Familia",
    icon: "🏰",
    color: "from-amber-500 to-rose-600",
    description: "در میان شاهکارهای گائودی؛ یاد می‌گیریم چطور از خاطرات گذشته و روزهای اول آشنایی بگوییم.",
    lesson: {
      intro: "زمان گذشته ساده (Past Simple) برای اتفاقاتی است که تمام شده‌اند: افعال باقاعده ed می‌گیرند (loved, looked)، افعال بی‌قاعده شکلشان عوض می‌شود (was, saw, met).",
      keyPoints: [
        "The day I met you was magical = روزی که دیدمت جادویی بود.",
        "We talked for hours = ما ساعت‌ها با هم صحبت کردیم.",
        "Yesterday, Fatemeh made my day = دیروز فاطمه روزم را ساخت.",
        "منفی گذشته با didn't: I didn't forget you = تو را فراموش نکردم."
      ],
      vocabulary: [
        { en: "Met", fa: "ملاقات کرد (گذشته meet)", ipa: "/met/", example: "We met on a sunny day." },
        { en: "Memory", fa: "خاطره", ipa: "/ˈmem.ər.i/", example: "A sweet memory with you." },
        { en: "Yesterday", fa: "دیروز", ipa: "/ˈjes.tə.deɪ/", example: "Yesterday was wonderful." },
        { en: "Fell in love", fa: "عاشق شد", ipa: "/fel ɪn lʌv/", example: "I fell in love instantly." }
      ],
      personalExample: "«Ali smiled and said: The best decision I ever made was falling in love with Fatemeh.»"
    },
    flashcards: [
      { id: 'f21', front: "I met you", back: "من تو را دیدم / ملاقات کردم", ipa: "/aɪ met juː/", example: "The moment I met you." },
      { id: 'f22', front: "We talked", back: "ما صحبت کردیم", ipa: "/wiː tɔːkt/", example: "We talked all night." },
      { id: 'f23', front: "Unforgettable", back: "فراموش‌نشدنی", ipa: "/ˌʌn.fəˈɡet.ə.bəl/", example: "An unforgettable memory." },
      { id: 'f24', front: "Was magical", back: "جادویی بود", ipa: "/wɒz ˈmædʒ.ɪ.kəl/", example: "That day was magical." }
    ],
    practice: [
      {
        type: "fill",
        prompt: "گذشته فعل see چیست؟ Yesterday I _______ (see) you in my dream.",
        options: ["saw", "seed", "seen", "seeing"],
        answer: "saw"
      },
      {
        type: "arrange",
        prompt: "مرتب کنید: «ما اوقات فوق‌العاده‌ای داشتیم.»",
        chips: ["a", "We", "had", "wonderful", "time"],
        answer: ["We", "had", "a", "wonderful", "time"]
      },
      {
        type: "listen",
        prompt: "گوش دهید و بگویید چه چیزی گفته شد:",
        audioText: "I fell in love with you",
        options: ["عاشق تو شدم", "تو را ندیدم", "فردا می‌آیم", "کجا بودی؟"],
        answer: "عاشق تو شدم"
      }
    ],
    exam: {
      timeLimitSeconds: 120,
      totalPoints: 100,
      questions: [
        {
          id: 'q21',
          points: 25,
          type: 'multiple-choice',
          question: "گذشته فعل «to be» برای فاعل «We» کدام است؟",
          options: ["was", "were", "been", "are"],
          answer: 1
        },
        {
          id: 'q22',
          points: 25,
          type: 'arrange',
          question: "مرتب کنید: «روزی که با فاطمه آشنا شدم جادویی بود.»",
          chips: ["was", "met", "I", "The", "magical", "Fatemeh", "day"],
          answer: ["The", "day", "I", "met", "Fatemeh", "was", "magical"]
        },
        {
          id: 'q23',
          points: 25,
          type: 'audio',
          question: "معنی جمله صوتی چیست؟",
          audioText: "You made my yesterday beautiful",
          options: ["تو دیروزم را زیبا کردی", "فردا کجایی؟", "قهوه خوردم", "کتاب خواندم"],
          answer: 0
        },
        {
          id: 'q24',
          points: 25,
          type: 'fill',
          question: "جای خالی: Ali never _______ (forget) Fatemeh's birthday.",
          options: ["forgot", "forgetted", "forgets", "forgetting"],
          answer: 0
        }
      ],
      tieBreaker: {
        question: "سوال امتیازی: شکل منفی گذشته جمله «I knew» چیست؟",
        options: ["I didn't know", "I not knew", "I wasn't know", "I did know not"],
        answer: 0
      }
    },
    secretLoveNote: {
      titleEn: "Masterpiece of Life",
      titleFa: "شاهکار زندگی",
      contentEn: "Gaudi spent decades building his cathedral, but building our memories together with you, Fatemeh, is the greatest masterpiece of my life.",
      contentFa: "گائودی دهه‌ها صرف ساختن کلیسایش کرد، اما ساختن خاطراتمان در کنار تو، فاطمه جان، والاترین شاهکار زندگی من است."
    }
  },
  {
    id: 7,
    titleFa: "زمان آینده و رویاهای مشترک",
    titleEn: "Future Tense & Shared Dreams",
    city: "ونیز (کانال‌های آب و گوندولا)",
    cityEn: "Venice",
    landmark: "Grand Canal",
    icon: "🛶",
    color: "from-rose-600 to-purple-600",
    description: "سوار بر قایق‌های گوندولا در ونیز؛ رویاها و برنامه‌های آینده دونفره را می‌سازیم.",
    lesson: {
      intro: "برای آینده از Will (قول‌ها و تصمیمات قلبی) و Going to (برنامه‌ریزی‌های قطعی) استفاده می‌کنیم: I will always love you.",
      keyPoints: [
        "We will travel to Italy = ما به ایتالیا سفر خواهیم کرد.",
        "I will always protect your smile = همیشه از لبخندت مراقبت خواهم کرد.",
        "We are going to build a warm home = ما قصد داریم خانه‌ای گرم بسازیم.",
        "آینده منفی با Won't (will not): I will never leave your side."
      ],
      vocabulary: [
        { en: "Will", fa: "خواهد بود / انجام خواهم داد", ipa: "/wɪl/", example: "I will be there for you." },
        { en: "Future", fa: "آینده", ipa: "/ˈfjuː.tʃər/", example: "Our future is bright." },
        { en: "Promise", fa: "قول دادن / عهد", ipa: "/ˈprɒm.ɪs/", example: "I promise you my heart." },
        { en: "Forever", fa: "تا ابد", ipa: "/fəˈr.ev.ər/", example: "Forever and always." }
      ],
      personalExample: "«Fatemeh and Ali promise: We will make our future as romantic as Venice.»"
    },
    flashcards: [
      { id: 'f25', front: "I will promise", back: "من قول می‌دهم", ipa: "/aɪ wɪl ˈprɒm.ɪs/", example: "I promise to support you." },
      { id: 'f26', front: "Our future", back: "آینده ما", ipa: "/ˈaʊər ˈfjuː.tʃər/", example: "Our future will be bright." },
      { id: 'f27', front: "We will travel", back: "ما سفر خواهیم کرد", ipa: "/wiː wɪl ˈtræv.əl/", example: "We will see the world." },
      { id: 'f28', front: "Forever and always", back: "تا ابد و همیشه", ipa: "/fəˈr.ev.ər ænd ˈɔːl.weɪz/", example: "I love you forever and always." }
    ],
    practice: [
      {
        type: "fill",
        prompt: "کدام کلمه آینده را نشان می‌دهد؟ I _______ always stand by you, Fatemeh.",
        options: ["will", "did", "was", "am"],
        answer: "will"
      },
      {
        type: "arrange",
        prompt: "مرتب کنید: «آینده ما پر از شادی خواهد بود.»",
        chips: ["be", "will", "future", "Our", "bright"],
        answer: ["Our", "future", "will", "be", "bright"]
      },
      {
        type: "listen",
        prompt: "به صوت گوش دهید و قول را انتخاب کنید:",
        audioText: "I will love you forever",
        options: ["من تا ابد عاشقت خواهم ماند", "من دیروز آمدم", "فردا باران می‌بارد", "ساعت چند می‌روی؟"],
        answer: "من تا ابد عاشقت خواهم ماند"
      }
    ],
    exam: {
      timeLimitSeconds: 120,
      totalPoints: 100,
      questions: [
        {
          id: 'q25',
          points: 25,
          type: 'multiple-choice',
          question: "مخفف «We will» در انگلیسی محاوره‌ای کدام است؟",
          options: ["We'll", "Well", "We'ill", "We're"],
          answer: 0
        },
        {
          id: 'q26',
          points: 25,
          type: 'arrange',
          question: "مرتب کنید: «ما روزی با هم به ونیز سفر خواهیم کرد.»",
          chips: ["one", "travel", "to", "Venice", "will", "We", "day"],
          answer: ["We", "will", "travel", "to", "Venice", "one", "day"]
        },
        {
          id: 'q27',
          points: 25,
          type: 'audio',
          question: "مفهوم جمله را مشخص کنید:",
          audioText: "Tomorrow will be a romantic day",
          options: ["فردا روزی رمانتیک خواهد بود", "امروز هوا سرد است", "دیروز باران بارید", "کتابم گم شد"],
          answer: 0
        },
        {
          id: 'q28',
          points: 25,
          type: 'fill',
          question: "جای خالی: Ali and Fatemeh _______ going to achieve their goals.",
          options: ["are", "is", "am", "be"],
          answer: 0
        }
      ],
      tieBreaker: {
        question: "سوال امتیازی: شکل منفی Will کدام است؟",
        options: ["Won't", "Willn't", "Not will", "Wont'"],
        answer: 0
      }
    },
    secretLoveNote: {
      titleEn: "Waterways to the Future",
      titleFa: "آب‌راه‌های رو به آینده",
      contentEn: "Venice has floating canals, but my heart is anchored securely in your love, Fatemeh. I look forward to all our tomorrows.",
      contentFa: "ونیز کانال‌های شناور دارد، اما قلب من در لنگرگاه عشق تو محکم ایستاده است، فاطمه‌ام. چشم‌انتظار تمام فردامان در کنار تو هستم."
    }
  },
  {
    id: 8,
    titleFa: "صفت‌ها، زیبایی و تحسین",
    titleEn: "Adjectives & Compliments",
    city: "پراگ (پل چارلز)",
    cityEn: "Prague",
    landmark: "Charles Bridge",
    icon: "🌉",
    color: "from-purple-600 to-rose-500",
    description: "در شهر پل‌های رمانتیک؛ بهترین صفت‌ها را برای توصیف و تحسین یکدیگر به کار می‌بریم.",
    lesson: {
      intro: "صفت‌ها قبل از اسم می‌آیند (a beautiful girl, a kind boy). برای درجه عالی: The most beautiful (زیباترین)، The kindest (مهربان‌ترین).",
      keyPoints: [
        "You look stunning today = امروز خیره‌کننده شده‌ای.",
        "Fatemeh has the softest voice = فاطمه آرامش‌بخش‌ترین صدا را دارد.",
        "Ali is strong and gentle = علی قوی و مهربان است.",
        "Everything about you is lovely = همه چیز درباره تو دوست‌داشتنی است."
      ],
      vocabulary: [
        { en: "Beautiful", fa: "زیبا", ipa: "/ˈbjuː.tɪ.fəl/", example: "You are truly beautiful." },
        { en: "Stunning", fa: "خیره‌کننده و مسحورکننده", ipa: "/ˈstʌn.ɪŋ/", example: "She looks stunning in pink." },
        { en: "Gentle", fa: "ملایم و باوقار", ipa: "/ˈdʒen.təl/", example: "Your gentle touch." },
        { en: "Special", fa: "خاص و منحصر‌به‌فرد", ipa: "/ˈspeʃ.əl/", example: "You are so special to me." }
      ],
      personalExample: "«Ali tells Fatemeh: You are not just beautiful on the outside, your soul is glowing.»"
    },
    flashcards: [
      { id: 'f29', front: "You look stunning", back: "خیره‌کننده به نظر می‌رسی", ipa: "/juː lʊk ˈstʌn.ɪŋ/", example: "You look stunning tonight." },
      { id: 'f30', front: "The most beautiful", back: "زیباترین", ipa: "/ðə məʊst ˈbjuː.tɪ.fəl/", example: "You are the most beautiful girl." },
      { id: 'f31', front: "So special", back: "خیلی خاص", ipa: "/səʊ ˈspeʃ.əl/", example: "You make every moment special." },
      { id: 'f32', front: "Warm and caring", back: "گرم و بامحبت", ipa: "/wɔːm ænd ˈkeə.rɪŋ/", example: "She has a warm and caring heart." }
    ],
    practice: [
      {
        type: "fill",
        prompt: "صفت عالی: Fatemeh is the _______ (kind) person I know.",
        options: ["kindest", "kinder", "more kind", "most kindest"],
        answer: "kindest"
      },
      {
        type: "arrange",
        prompt: "مرتب کنید: «تو زیباترین چشمان را داری.»",
        chips: ["eyes", "beautiful", "the", "have", "You", "most"],
        answer: ["You", "have", "the", "most", "beautiful", "eyes"]
      },
      {
        type: "listen",
        prompt: "به تعریف عاشقانه گوش دهید و متن را انتخاب کنید:",
        audioText: "You look absolutely stunning",
        options: ["تو کاملاً خیره‌کننده‌ای", "هوا ابری است", "خسته‌ای؟", "چه می‌خوری؟"],
        answer: "تو کاملاً خیره‌کننده‌ای"
      }
    ],
    exam: {
      timeLimitSeconds: 120,
      totalPoints: 100,
      questions: [
        {
          id: 'q29',
          points: 25,
          type: 'multiple-choice',
          question: "جایگاه درست صفت در جمله انگلیسی کجاست؟",
          options: ["قبل از اسم (a beautiful rose)", "بعد از اسم (a rose beautiful)", "آخر جمله اجباری", "فرقی ندارد"],
          answer: 0
        },
        {
          id: 'q30',
          points: 25,
          type: 'arrange',
          question: "مرتب کنید: «فاطمه مهربان‌ترین قلب را در دنیا دارد.»",
          chips: ["in", "heart", "Fatemeh", "the", "world", "kindest", "has", "the"],
          answer: ["Fatemeh", "has", "the", "kindest", "heart", "in", "the", "world"]
        },
        {
          id: 'q31',
          points: 25,
          type: 'audio',
          question: "صوت را بشنوید و انتخاب کنید:",
          audioText: "You are special to me",
          options: ["تو برای من خیلی خاصی", "امروز کجایی؟", "کتاب می‌خواهم", "ساعت ده است"],
          answer: 0
        },
        {
          id: 'q32',
          points: 25,
          type: 'fill',
          question: "جای خالی: Ali is always _______ and supportive.",
          options: ["loving", "cold", "angry", "late"],
          answer: 0
        }
      ],
      tieBreaker: {
        question: "سوال امتیازی: متضاد صفت «Cold» در مکالمات عاطفی چیست؟",
        options: ["Warm", "Freezing", "Dark", "Hard"],
        answer: 0
      }
    },
    secretLoveNote: {
      titleEn: "Golden City of Bohemia",
      titleFa: "شهر طلایی رویاها",
      contentEn: "Prague has a hundred spires, but you, Fatemeh, have a thousand qualities that make me fall in love with you over and over again.",
      contentFa: "پراگ صد مناره دارد، اما تو، فاطمه‌ام، هزار خصلت داری که باعث می‌شود هر بار عمیق‌تر عاشقت شوم."
    }
  },
  {
    id: 9,
    titleFa: "مکالمه دونفره و ابراز محبت",
    titleEn: "Romantic Conversations",
    city: "سنتورینی (غروب آبی و سفید)",
    cityEn: "Santorini",
    landmark: "Oia Sunset",
    icon: "🌅",
    color: "from-rose-500 to-indigo-600",
    description: "روی دیوارهای سفید مشرف به دریای اژه؛ دیالوگ‌های واقعی عاشقانه را بدون لکنت بیان می‌کنیم.",
    lesson: {
      intro: "مکالمات عاطفی زبان انگلیسی سرشار از اصطلاحات شیرین است: How was your day? (روزت چطور بود؟)، I missed your voice (دلم برای صدات تنگ شده بود).",
      keyPoints: [
        "I missed you so much today = امروز خیلی دلم برایت تنگ شد.",
        "Tell me about your day = از روزت برایم تعریف کن.",
        "You mean the world to me = تو برای من تمام دنیایی.",
        "I am so blessed to have you = من بسیار سعادتمندم که تو را دارم."
      ],
      vocabulary: [
        { en: "Miss", fa: "دلتنگ شدن", ipa: "/mɪs/", example: "I miss you every second." },
        { en: "Blessed", fa: "خوشبخت و پربرکت", ipa: "/ˈbles.ɪd/", example: "I feel blessed." },
        { en: "Treasure", fa: "گنج / باارزش شمردن", ipa: "/ˈtreʒ.ər/", example: "I treasure every moment." },
        { en: "Always", fa: "همیشه", ipa: "/ˈɔːl.weɪz/", example: "I am always by your side." }
      ],
      personalExample: "«Ali calls Fatemeh: No matter how busy my day gets, hearing your voice is my peace.»"
    },
    flashcards: [
      { id: 'f33', front: "I missed you", back: "دلم برایت تنگ شد", ipa: "/aɪ mɪst juː/", example: "I missed your smile." },
      { id: 'f34', front: "You mean the world to me", back: "تو به اندازه تمام دنیا برایم ارزش داری", ipa: "/juː miːn ðə wɜːld tuː miː/", example: "Truly, you mean the world to me." },
      { id: 'f35', front: "I treasure you", back: "من قدر تو را می‌دانم", ipa: "/aɪ ˈtreʒ.ər juː/", example: "I treasure our relationship." },
      { id: 'f36', front: "My peace", back: "آرامش من", ipa: "/maɪ piːs/", example: "Your voice is my peace." }
    ],
    practice: [
      {
        type: "fill",
        prompt: "اصطلاح عاطفی: You mean the _______ to me.",
        options: ["world", "city", "street", "clock"],
        answer: "world"
      },
      {
        type: "arrange",
        prompt: "مرتب کنید: «صدای تو همیشه به من آرامش می‌دهد.»",
        chips: ["peace", "voice", "Your", "me", "gives", "always"],
        answer: ["Your", "voice", "always", "gives", "me", "peace"]
      },
      {
        type: "listen",
        prompt: "به صوت گوش دهید و اصطلاح را مشخص کنید:",
        audioText: "You are the love of my life",
        options: ["تو عشق زندگی منی", "امروز غذا خوردی؟", "فردا هوا آفتابی است", "ساعت چند است؟"],
        answer: "تو عشق زندگی منی"
      }
    ],
    exam: {
      timeLimitSeconds: 120,
      totalPoints: 100,
      questions: [
        {
          id: 'q33',
          points: 25,
          type: 'multiple-choice',
          question: "بهترین ترجمه برای «I can't imagine my life without you» چیست؟",
          options: ["نمی‌توانم زندگی‌ام را بدون تو تصور کنم", "زندگی بدون تو راحت است", "من تو را نمی‌شناسم", "فردا بدون تو می‌روم"],
          answer: 0
        },
        {
          id: 'q34',
          points: 25,
          type: 'arrange',
          question: "مرتب کنید: «فاطمه، تو زیباترین بخش روز منی.»",
          chips: ["the", "Fatemeh", "part", "are", "of", "my", "day", "you", "best"],
          answer: ["Fatemeh", "you", "are", "the", "best", "part", "of", "my", "day"]
        },
        {
          id: 'q35',
          points: 25,
          type: 'audio',
          question: "معنی جمله‌ای که می‌شنوید چیست؟",
          audioText: "I am grateful for every second with you",
          options: ["قدردان هر ثانیه در کنار تو هستم", "ثانیه‌ها دیر می‌گذرند", "ساعت مچی خریدم", "فردا دیر می‌آیم"],
          answer: 0
        },
        {
          id: 'q36',
          points: 25,
          type: 'fill',
          question: "جای خالی: Ali whispered: I will _______ you until my last breath.",
          options: ["love", "forget", "leave", "lose"],
          answer: 0
        }
      ],
      tieBreaker: {
        question: "سوال امتیازی: عبارت «Sweet dreams» چه معنایی دارد؟",
        options: ["خواب‌های شیرین ببینی", "شیرینی می‌خواهم", "رویای بیداری", "خسته نباشی"],
        answer: 0
      }
    },
    secretLoveNote: {
      titleEn: "Aegean Sunset Promise",
      titleFa: "عهد غروب دریای اژه",
      contentEn: "The sunset of Santorini paints the sky with pink and purple, just like the colors of our app, Fatemeh. But nothing shines as brightly as your eyes.",
      contentFa: "غروب سنتورینی آسمان را با صورتی و بنفش نقاشی می‌کند، درست مثل رنگ‌های همین برنامه برای ما، فاطمه‌ام. اما هیچ نوری به درخشندگی چشمان تو نیست."
    }
  },
  {
    id: 10,
    titleFa: "مرور جامع و جشن تسلط کامل",
    titleEn: "Comprehensive Mastery & Review",
    city: "لندن (بیگ بن و چشم لندن)",
    cityEn: "London",
    landmark: "Big Ben & London Eye",
    icon: "🎡",
    color: "from-purple-700 via-rose-600 to-amber-500",
    description: "در کنار رود تیمز و ساعت بیگ بن؛ قله ۱۰ مرحله را جشن می‌گیریم و به تسلط کامل می‌رسیم!",
    lesson: {
      intro: "تبریک! شما تمام مبانی اصلی از الفبا، جمله‌سازی، زمان‌ها، احساسات تا مکالمه را آموختید. حالا وقت تسلط کامل است.",
      keyPoints: [
        "مرور زمان‌ها: I love (حال)، I loved (گذشته)، I will love (آینده).",
        "مکالمه مستقل: توانایی صحبت درباره زندگی، کار، علایق و سفر.",
        "اعتماد به نفس: ما دست در دست هم از صفر به قله رسیدیم.",
        "زبان انگلیسی اکنون زبان مشترک دوم عشق ماست."
      ],
      vocabulary: [
        { en: "Mastery", fa: "تسلط و استادی", ipa: "/ˈmɑː.stər.i/", example: "We achieved mastery together." },
        { en: "Victory", fa: "پیروزی و فتح قله", ipa: "/ˈvɪk.tər.i/", example: "A victory of love and learning." },
        { en: "Forever", fa: "همیشگی و ابدی", ipa: "/fəˈr.ev.ər/", example: "Forever proud of us." },
        { en: "Unstoppable", fa: "توقف‌ناپذیر", ipa: "/ʌnˈstɒp.ə.bəl/", example: "Together we are unstoppable." }
      ],
      personalExample: "«Ali and Fatemeh look at London's skyline, confident and fluent in English, ready for the world!»"
    },
    flashcards: [
      { id: 'f37', front: "We achieved it!", back: "ما بهش رسیدیم!", ipa: "/wiː əˈtʃiːvd ɪt/", example: "We achieved our dream." },
      { id: 'f38', front: "Proud of you", back: "به تو افتخار می‌کنم", ipa: "/praʊd əv juː/", example: "I am so proud of you, Fatemeh." },
      { id: 'f39', front: "Unstoppable team", back: "تیم شکست‌ناپذیر", ipa: "/ʌnˈstɒp.ə.bəl tiːm/", example: "Together we are unstoppable." },
      { id: 'f40', front: "Ready for the world", back: "آماده برای فتح دنیا", ipa: "/ˈred.i fɔːr ðə wɜːld/", example: "Hand in hand, ready for the world." }
    ],
    practice: [
      {
        type: "fill",
        prompt: "تکمیل عهد پایانی: Together, Ali and Fatemeh are _______ (توقف‌ناپذیر).",
        options: ["unstoppable", "slow", "tired", "alone"],
        answer: "unstoppable"
      },
      {
        type: "arrange",
        prompt: "مرتب کنید: «ما موفق شدیم زبان انگلیسی را با هم یاد بگیریم.»",
        chips: ["English", "learned", "We", "together", "have"],
        answer: ["We", "have", "learned", "English", "together"]
      },
      {
        type: "listen",
        prompt: "به پیام صوتی جشن پایان دوره گوش دهید:",
        audioText: "Congratulations my love, we did it!",
        options: ["تبریک عشق من، ما موفق شدیم!", "هنوز شروع نکرده‌ایم", "فردا امتحان داریم", "خسته‌ام"],
        answer: "تبریک عشق من، ما موفق شدیم!"
      }
    ],
    exam: {
      timeLimitSeconds: 150,
      totalPoints: 100,
      questions: [
        {
          id: 'q37',
          points: 25,
          type: 'multiple-choice',
          question: "کدام جمله خلاصه کامل مسیر آموزش زبان ماست؟",
          options: [
            "Ali and Fatemeh learned English step by step and won together.",
            "English is too difficult to learn.",
            "They never practiced their lessons.",
            "They forgot all the words."
          ],
          answer: 0
        },
        {
          id: 'q38',
          points: 25,
          type: 'arrange',
          question: "مرتب کنید: «عشق ما و یادگیری ما تا ابد ادامه دارد.»",
          chips: ["and", "learning", "forever", "Our", "will", "love", "continue"],
          answer: ["Our", "love", "and", "learning", "will", "continue", "forever"]
        },
        {
          id: 'q39',
          points: 25,
          type: 'audio',
          question: "معنی جمله صوتی نهایی چیست؟",
          audioText: "You are my best student and my greatest teacher",
          options: [
            "تو بهترین دانش‌آموز و بزرگ‌ترین معلم زندگی منی",
            "کتاب را ببند",
            "امروز امتحان لغو شد",
            "ساعت چند می‌رسی؟"
          ],
          answer: 0
        },
        {
          id: 'q40',
          points: 25,
          type: 'fill',
          question: "جای خالی: We started from zero and reached _______ percent fluency.",
          options: ["one hundred", "zero", "twenty", "ten"],
          answer: 0
        }
      ],
      tieBreaker: {
        question: "سوال امتیازی نهایی: عبارت «Cheers to our love» به چه معناست؟",
        options: ["به سلامتی عشق‌مان", "خداحافظ عشق من", "کجا رفتی؟", "دلم گرفته"],
        answer: 0
      }
    },
    secretLoveNote: {
      titleEn: "The Big Ben Chime of Our Love",
      titleFa: "طنین ناقوس بیگ بن برای پیوند ما",
      contentEn: "We reached Stage 10, Fatemeh! Every word we learned was a step closer to understanding each other across any language on earth. You are my forever partner, in English and in every breath.",
      contentFa: "به مرحله ۱۰ رسیدیم، فاطمه عزیزم! هر کلمه‌ای که یاد گرفتیم، یک قدم ما را در هر زبانی روی کره زمین به هم نزدیک‌تر کرد. تو یار همیشگی منی، به زبان انگلیسی و با هر دم و بازدمم."
    }
  }
];

