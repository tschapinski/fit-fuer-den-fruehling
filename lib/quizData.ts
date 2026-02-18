export type AnswerOption = {
  text: string;
  emoji?: string;
  points: number; // 3=Grün, 2=Gelb, 1=Rot, 0=Schlimmst
};

export type SliderConfig = {
  min: number;
  max: number;
  step: number;
  labels: { value: number; label: string; emoji: string }[];
  getPoints: (value: number) => number;
};

export type QuestionType = "choice" | "slider" | "image-choice";

export type Question = {
  id: number;
  type: QuestionType;
  question: string;
  dirksKommentar: string;
  icon: string; // Emoji icon for the question
  answers?: AnswerOption[];
  slider?: SliderConfig;
};

export const questions: Question[] = [
  {
    id: 1,
    type: "image-choice",
    icon: "🏍️",
    question: "Wann hast du dein Motorrad das letzte Mal bewegt?",
    dirksKommentar:
      "Mal ehrlich – wie lange steht die Kiste schon in der Garage?",
    answers: [
      {
        text: "Vor ein paar Tagen",
        emoji: "🔥",
        points: 3,
      },
      {
        text: "Ein paar Wochen her",
        emoji: "😅",
        points: 2,
      },
      {
        text: "Seit dem Herbst nicht mehr",
        emoji: "🥶",
        points: 1,
      },
      {
        text: "Ich weiß es ehrlich gesagt nicht",
        emoji: "🫣",
        points: 0,
      },
    ],
  },
  {
    id: 2,
    type: "slider",
    icon: "🔧",
    question: "Wie sicher fühlst du dich bei der Technik deines Motorrads?",
    dirksKommentar:
      "Sei ehrlich zu dir selbst – Dirk bewertet hier nicht, aber dein Motorrad schon.",
    slider: {
      min: 0,
      max: 10,
      step: 1,
      labels: [
        { value: 0, label: "Keine Ahnung", emoji: "😰" },
        { value: 3, label: "Unsicher", emoji: "🤔" },
        { value: 5, label: "Es geht so", emoji: "😐" },
        { value: 7, label: "Recht sicher", emoji: "💪" },
        { value: 10, label: "Voller Profi", emoji: "🏆" },
      ],
      getPoints: (value: number) => {
        if (value >= 8) return 3;
        if (value >= 5) return 2;
        if (value >= 3) return 1;
        return 0;
      },
    },
  },
  {
    id: 3,
    type: "choice",
    icon: "⛽",
    question: "Wie steht's um deine Bremsflüssigkeit und Bremsen?",
    dirksKommentar:
      'Dirk nennt das gern den "unsichtbaren Killer" – bitte nicht ignorieren!',
    answers: [
      {
        text: "Frisch gewechselt – alles top",
        emoji: "✅",
        points: 3,
      },
      {
        text: "Beim letzten Service... oder war das der davor?",
        emoji: "🤷",
        points: 1,
      },
      {
        text: "Es gibt Bremsflüssigkeit? Bremsen bremsen doch einfach so",
        emoji: "😬",
        points: 0,
      },
    ],
  },
  {
    id: 4,
    type: "image-choice",
    icon: "⚙️",
    question: "Die Kette – dein Draht zur Straße. Wie sieht sie aus?",
    dirksKommentar:
      'Stichwort: "Trocken wie die Sahara"... kennst du dieses Geräusch?',
    answers: [
      {
        text: "Geschmiert & perfekt gespannt",
        emoji: "🏁",
        points: 3,
      },
      {
        text: "Leicht rostig, fährt aber noch",
        emoji: "🔗",
        points: 1,
      },
      {
        text: "Welche Kette? Ich dachte das Ding fährt automatisch",
        emoji: "🤡",
        points: 0,
      },
    ],
  },
  {
    id: 5,
    type: "slider",
    icon: "💡",
    question:
      "Reifen, Elektrik, Beleuchtung – wie viel hast du nach dem Winter gecheckt?",
    dirksKommentar:
      "Nichts ist peinlicher als mit Standlicht zur Polizeikontrolle...",
    slider: {
      min: 0,
      max: 10,
      step: 1,
      labels: [
        { value: 0, label: "Gar nichts", emoji: "🙈" },
        { value: 3, label: "Kurzer Blick", emoji: "👀" },
        { value: 5, label: "Das Wichtigste", emoji: "📋" },
        { value: 7, label: "Fast alles", emoji: "🔍" },
        { value: 10, label: "Komplett-Check", emoji: "🛠️" },
      ],
      getPoints: (value: number) => {
        if (value >= 8) return 3;
        if (value >= 5) return 2;
        if (value >= 3) return 1;
        return 0;
      },
    },
  },
];
