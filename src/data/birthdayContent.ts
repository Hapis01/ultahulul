import type {
  BirthdayConfig,
  MusicConfig,
  MemoryItem,
  QuizQuestion,
  QuizScoreFeedback,
  MemoryGameCardItem,
  FunnySectionData,
  SpecialPhotoData,
  TimelineEvent,
  LoveLetterData,
  EmotionalMomentData,
  FinalSurpriseData,
  FinalLetterData,
} from '../types/birthday';

/**
 * =======================================================================
 * PUSAT KONFIGURASI UTAMA (EDIT DI SINI)
 * =======================================================================
 * Kamu bisa dengan mudah mengubah data diri, tanggal, password rahasia,
 * foto-foto, kuis, surat cinta, dan semua teks tanpa mengubah kode UI.
 */

export const birthdayConfig: BirthdayConfig = {
  fullName: 'Nurul Inayah',
  nickname: 'Ulul',
  petName: 'Sayang',
  age: 20,
  birthday: '2026-09-20',
  // Target waktu ulang tahun (Timezone Asia/Jakarta WIB = UTC+7)
  targetDateTime: '2026-09-20T00:00:00+07:00',
  secretCode: 'Nafisah',
  theme: 'blue',
};

export const musicConfig: MusicConfig = {
  title: 'Untuk Ulul, Sayangku',
  artist: 'Special Birthday Song',
  file: '/music/birthday.mp3',
};

export const openingContent = {
  line1: 'Untuk seseorang yang hari ini genap 20 tahun...',
  line2: 'Nurul Inayah.',
  line3: 'Sayang.',
  buttonText: 'Buka hadiahnya',
};

export const countdownContent = {
  targetDateLabel: '20 September 2026',
  birthdayTitle: 'Happy 20th Birthday, Ulul',
  todayIsYourDayText: 'Hari ini adalah harimu.',
  todaySubtitle: 'Dua puluh tahun yang indah di dunia, dan hari ini kita rayakan bersama.',
  countdownSubtitle: 'Menghitung setiap detik menuju hari kamuu...',
  nextButtonText: 'Mulai perjalanan kita',
};

export const introMessageContent = {
  salutation: 'Untuk kamu maniezz,',
  firstLine: 'Selamat ulang tahun yang ke 20 ya sayanggg.',
  bodyLines: [
    'Bertambah satu tahun lagi umur kamu.',
    'Dan entah kenapa, melihat kamu sampai di umur 20 tahun ini terlalu banyak hal yang mau disampaikan.',
    'Ini website kedua setelah kemarin kamu ultah abang bikin lagi yaa, semoga kamu ga bosen ya.',
    'Ada tawa, nostalgia, siket aaa tebak-tebakan, dan semua rasa bersyukur abangg punya kamuu.',
    'Buka satu per satu ya, nikmati setiap detiknya...'
  ],
  nextButtonText: 'Lanjut',
};

/**
 * DAFTAR FOTO KENANGAN (MEMORIES)
 * Letakkan foto kamu di: public/images/memories/photo-01.jpg, dst.
 * Jika foto belum ada, website tetap menampilkan kartu foto elegan dengan kamera.
 */
export const memoriesContent: MemoryItem[] = [
  {
    id: 1,
    image: '/images/memories/photo-01.jpg',
    title: 'Pertama Kali Berinteraksi',
    date: 'Awal Percakapan',
    caption: 'Ini awal kita chatingan ya berinteraksi, ya karena HEEMPEEES.',
    story: 'First impression abang ke kamu tuh orangnya lucu sih, soalnya baru awal chattingan aja uda disclaimer nama panggilan HAHAHA',
  },
  {
    id: 2,
    image: '/images/memories/photo-02.jpg',
    title: 'Pertama Kali Fotbar',
    date: 'Foto Masih Malu2',
    caption: 'Fotbar pertama kali setelah kita kenal.',
    story: 'Waktu itu kamu kasih kado ultah buat abang pas selesai kelas, dan dipanggil uswa lagi buat fotbar HAHAHA.',
  },
  {
    id: 3,
    image: '/images/memories/photo-03.jpg',
    title: 'Terakhir foto sebelum HMPS bubar',
    date: 'Ini juga masih malu2',
    caption: 'Kita yang foto mereka yang heboh.',
    story: 'Seingat abang sebelum kita mubes itu kita sempet lagi seret komunikasinya, terus selesai mubes ternyata kita foto bareng dan ternyata lagi pas pulangnya....',
  },
  {
    id: 4,
    image: '/images/memories/photo-04.jpg',
    title: 'Bukber versi kita',
    date: 'Kemana mana',
    caption: 'Bukber pertama kita bareng, karena kamu sendirian bukber dirumah jadi kasian.',
    story: 'Awalnya planning buat bukber ke wizzmie ternyata ramai, jadinya di mie aceh sebelahnya HAHAHA.',
  },
  {
    id: 5,
    image: '/images/memories/photo-05.jpg',
    title: 'Photobox cieee',
    date: 'Pertama kali nich',
    caption: 'Ini request dari seseorang yang tiba-tiba ngajak photobox.',
    story: 'Abis nonton bioskop pengennya enaknya makan cuma memang cewe aku pengertian banget soal keuangan, jadinya dia milih hujan hujan bareng aku dijalan HAHAHA.',
  },
  {
    id: 6,
    image: '/images/memories/photo-06.jpg',
    title: 'Makasi Sayang',
    date: 'Hari Terakhir Mahasiswa',
    caption: 'Ini kenangan yang ga bakal abang lupain.',
    story: 'Makasih banyak sayang karena udah hadir di hidup abang, support abang dalam berbagai hal, selalu doai abang, memang kedepannya mungkin jalan kita ga semulus itu tapi abang bakal tetap usahain kamu, karena kamu memang se worth it itu buat di kehidupan abang saat ini.',
  },
];

/**
 * MINI GAME 1: "SEBERAPA KENAL KAMU?" (QUIZ)
 */
export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Mana yang paling cocok menggambarkan kamuu?',
    options: [
      'Gampang ngambekk++ tapi gemesin',
      'Kalau digangguin dikit galaknya ga tanggung-tanggung',
      'Pengertian, sabar (kayanya)',
      'Semua jawaban di atas benar 100%'
    ],
    correctIndex: 3,
    sweetExplanation: 'Fakta tak terbatahkan, kalau kamu gampang ngambek terus di ganggu dikit udah kaya masuk kadang singa, tapi kamu pengertian dan sabar',
  },
  {
    id: 2,
    question: 'Apa warna favorit kamu yang bikin website ini dibuat bernuansa dreamy?',
    options: ['Merah Marun', 'Biru', 'Kuning Mustard', 'Hijau Sage'],
    correctIndex: 1,
    sweetExplanation: 'Benarrr, konon katanya kalau ada yang menghina warna biru nya hilang di telan oleh kakak penengah',
  },
  {
    id: 3,
    question: 'Apa nama panggilan yang selalu kamu suka kalau abang panggil?',
    options: ['Sayangggg', 'Boo', 'Ulul', 'Semuanya, tergantung mood'],
    correctIndex: 0,
    sweetExplanation: 'Panggilan "Sayang" yang selalu tulus dari abangg buat kamu',
  },
  {
    id: 4,
    question: 'Berapa umur kamu yang dirayakan dengan penuh cinta hari ini?',
    options: ['18 tahun', '19 tahun', '20 tahun boss!', '17 tahun selamanya'],
    correctIndex: 2,
    sweetExplanation: 'Genap 20 tahun! Selamat memasuki babak final kuliah ya maniezz',
  },
  {
    id: 5,
    question: 'Hal yang selalu kamu tekan dalam hubungan kita?',
    options: [
      'Kejujuran',
      'Komunikasi (Super Duper)',
      'Pengertian',
      'Semuanya benar'
    ],
    correctIndex: 3,
    sweetExplanation: 'Pasti selaluuu benar dong yaa kaan, kan ini hubungan yang paling sempurna di duniaaa.',
  },
];

export const quizFeedbacks: QuizScoreFeedback[] = [
  {
    minScore: 0,
    maxScore: 2,
    title: 'Waduh...',
    message: 'Kok aku jadi harus mempertanyakan hubungan kita... tapi tenang, aku tetap sayang kok! 😜',
  },
  {
    minScore: 3,
    maxScore: 4,
    title: 'Lumayan Banget!',
    message: 'Kamu masih aman! Terbukti kamu cukup perhatian sama hal-hal kecil tentang kita.',
  },
  {
    minScore: 5,
    maxScore: 5,
    title: 'Sempurna!',
    message: 'Nah, ini baru ulul abangg. Nilai 100 buat kamu yang selalu ada di pikiran abangg.',
  },
];

/**
 * MINI GAME 2: MEMORY CLICK (6 KARTU)
 */
export const memoryGameCards: MemoryGameCardItem[] = [
  {
    id: 1,
    iconName: 'heart',
    isSpecial: false,
    message: 'hehe, salah pilih 😜 coba kartu yang lain ya!',
  },
  {
    id: 2,
    iconName: 'star',
    isSpecial: false,
    message: 'Belum nemu nih... gimana sih kamu cupu 😜',
  },
  {
    id: 3,
    iconName: 'sparkles',
    isSpecial: true,
    message: 'Ketemu! 🎉 Kamu menemukan kejutan rahasia!',
    specialTitle: 'Kamu Selalu Bersinar',
    specialPhoto: '/images/memories/photo-02.jpg',
    specialNote: 'Seperti kartu ini yang bersinar di antara yang lain, begitulah kamu selalu menerangi hariku.',
  },
  {
    id: 4,
    iconName: 'moon',
    isSpecial: false,
    message: 'Hampir kena! Coba geser ke kartu sebelahnya 🌙',
  },
  {
    id: 5,
    iconName: 'camera',
    isSpecial: false,
    message: 'Masih belum... tapi boleh deh senyum dulu ke kamera 📸',
  },
  {
    id: 6,
    iconName: 'gift',
    isSpecial: false,
    message: 'Kotak ini kosong, tapi cintaku ke kamu ga pernah kosong ahayy 🎁',
  },
];

/**
 * MOMEN LUCU (FUNNY SECTION)
 */
export const funnySectionData: FunnySectionData = {
  title: 'Ngomong-ngomong...',
  cards: [
    '20 tahun sudah kamu hidup di dunia.',
    'Kok kamu tetap jamed ya? 😂',
    'Padahal kadang tingkah kamu lucu.',
    'Sayang juga sih, ga bisa dipungkiri.',
    'Yaudaa deh, untuk hari ini abangg maafkan 100%! 🤍',
  ],
  question: 'Kamu masih sayang aku kan?',
  yesButtonText: 'Tentu ❤️',
  noButtonTexts: [
    'Tidak',
    'Yakin nih?',
    'Serius ga sayang? 🥺',
    'Coba pencet lagi kalau bisa 😝',
    'Eits, kabur lagi tombolnya!',
    'Tombol ini ga mau kamu klik!',
    'udahhh, jangan bercanda 😠 Pencet yang biru aja ❤️',
  ],
  finalNoResponse: 'Sudah, jangan bercanda... abangg tahu kamu sayang abangg kan?',
};

/**
 * FOTO KHUSUS SINEMATIK
 */
export const specialPhotoData: SpecialPhotoData = {
  prefaceLines: [
    'Di antara banyak hal yang aku syukuri di dunia ini...',
    'ada kamu.',
  ],
  buttonText: 'Lihat',
  image: '/images/special/video.mp4',
  caption: 'Senyum yang selalu menjadi tempat pulang ternyaman bagiku.',
  postRevealLines: [
    'Terima kasih sudah hadir di hidup aku Nurul Inayah.',
    'Setiap hari bersama kamu adalah anugerah yang selalu abang syukuri.',
  ],
};

/**
 * SURAT CINTA (LOVE LETTER)
 */
export const loveLetterData: LoveLetterData = {
  salutation: 'Nurul Inayah,',
  paragraphs: [
    'Hari ini kamu genap 20 tahun.',
    'Abang tahu mungkin ulang tahun itu cuma sebuah angka yang bertambah setiap tahunnya. Tapi buat abang, umur 20 kamu adalah pengingat berharga kalau abang punya kesempatan buat ngelihat kamu tumbuh, belajar, berubah, dan menjadi sosok yang semakin luar biasa.',
    'Abang gatau persis akan seperti apa hari-hari dan susah payah kita di masa depan nanti.',
    'Tapi untuk hari ini, abang cuma ingin kamu tahu satu hal penting...',
    'Abang sangat bangga sama kamu.',
    'Dan abang bersyukur pernah, sedang, dan insyaAllah masih terus bisa menjadi bagian dari perjalanan hidup kamu.',
    'Selamat ulang tahun yang ke-20, ulul sayang.\nSemoga semua hal baik di dunia ini menemukan jalannya menuju kamu.',
  ],
  signoff: 'Dengan seluruh kasih sayangku,',
};

/**
 * MOMEN EMOSIONAL
 */
export const emotionalMomentData: EmotionalMomentData = {
  introLines: [
    'Sebentar...',
    'Abangg pengen ngucapin sesuatu yang mungkin jarang atau malu-malu abangg ucapkan langsung.',
    'Terima kasih.',
  ],
  thankYouLines: [
    'Terima kasih karena sudah bertahan sejauh ini melewati hari-hari yang mungkin tidak selalu mudah.',
    'Terima kasih sudah menjadi diri kamu yang tulus, apa adanya, dan luar biasa.',
    'Dan terima kasih karena pernah memilih untuk berjalan, berbagi cerita, dan melangkah bersamaku.',
  ],
  photo: '/images/special/emotional-moment.jpg',
  caption: 'Momen berharga yang selalu terukir rapi di ingatanku.',
  closingLine: 'Semoga di umur 20 ini, kamu lebih sering menemukan alasan untuk tersenyum lebar daripada harus meneteskan air mata.',
};

/**
 * TIMELINE PERJALANAN (THE MEMORY TIMELINE)
 */
export const timelineEvents: TimelineEvent[] = [
  {
    year: 'Awal 2025',
    date: 'Awal Percakapan',
    title: 'Pertama Kali Berinteraksi',
    story: 'Ini awal kita chatingan ya berinteraksi, ya karena HEEMPEEES..',
    caption: 'First impression abang ke kamu tuh orangnya lucu sih, soalnya baru awal chattingan aja uda disclaimer nama panggilan HAHAHA.',
    image: '/images/memories/photo-01.jpg',
  },
  {
    year: 'Pertengahan 2025',
    date: 'Makin Bertumbuh',
    title: 'Mulai Semakin Dekat',
    story: 'Tahun di mana kita saling memahami lebih dalam. Belajar mengerti kekurangan dan saling menguatkan.',
    caption: 'Banyak kekurangan dan kelemahan yang abang dan kamu lewati berdua, tapi itu bikin kita semakin dewasa dan saling menguatkan.',
    image: '/images/memories/photo-03.jpg',
  },
  {
    year: '2026 saat ini',
    date: '20 September 2026',
    title: 'Hari Ini: 20 Tahun Nurul dede kecil',
    story: 'Hari ini kamu genap 20 tahun. Sebuah tonggak baru, kedewasaan baru, dan doa terbaik abang yang selalu menyertai kamu di setiap hembusan nafas.',
    caption: 'Hari istimewa untuk orang paling istimewa.',
    image: '/images/memories/photo-07.jpg',
  },
];

/**
 * KOTAK HADIAH TERKUNCI (FINAL LOCK)
 */
export const finalLockContent = {
  title: 'Kayaknya ini yang terakhir...',
  subtitle: 'Sebuah kotak hadiah digital yang masih terkunci.',
  instruction: 'Masukkan kata rahasia untuk membukanya',
  placeholder: 'Kata sandi rahasia...',
  hint: 'Petunjuk: Nama orang ke-3 yang kita nanti',
  errorMessage: 'Kayaknya bukan itu kuncinya... coba cek lagi ya Sayang! 🔑',
  unlockingMessage: 'Cie bener, udah ga sabar ya jadi Ibu nih...',
};

/**
 * FINAL SURPRISE & CELEBRATION
 */
export const finalSurpriseData: FinalSurpriseData = {
  congratsTitle: 'HAPPY 20TH BIRTHDAY',
  highlightName: 'Nurul Inayah',
  nickname: 'Ulul',
  petName: 'Sayangku Tercinta',
  birthdayDateFormatted: '20 September 2026',
  wishingText: 'Semoga umur 20 ini menjadi pintu awal dari ribuan hal baik, kesehatan, keberkahan, serta kebahagiaan yang tak pernah surut.',
};

/**
 * SURAT PENUTUP TERAKHIR (FINAL LETTER)
 */
export const finalLetterData: FinalLetterData = {
  salutation: 'Sayang,',
  paragraphs: [
    'Selamat ulang tahun ke-20.',
    'Gada rasa letih buat ucapin kamu dari tadi, jadi ini terakhir dari abang.',
    'Semoga kamu selalu diberi kesehatan yang berlimpah, diberi keberanian untuk mengejar apa pun mimpi yang kamu inginkan, diberi hati yang kuat dan tabah ketika hari-hari terasa berat, dan diberi tak terhitung alasan untuk tersenyum manis setiap pagi.',
    'Abang mungkin tidak selalu bisa memberikan segala hal di dunia ini.',
    'Abang mungkin juga tidak selalu menjadi seseorang yang sempurna tanpa cela.',
    'Tapi satu hal yang pasti dan abang yakin dengan hati:\nAbang senang dan bersyukur pernah dipertemukan dengan kamu.',
    'Dan untuk hari ini, abang cuma ingin kamu merayakan dan menikmati harimu dengan penuh sukacita.',
    'Happy Birthday, Ulul.\n20 tahun yang berharga.\nSemoga semua cerita indah berikutnya sudah menunggumu dengan senyum di depan.',
    'I love you in every universe. ❤️',
  ],
  closing: 'Yang selalu mendoakan dan menyayangimu,',
  stayHereMessage: 'Kalau kamu masih di sini, berarti hadiahnya belum selesai...\nTerima kasih banyak sudah membaca sampai halaman terakhir ini. Nikmati harimu ya, Sayang.',
};
