export type Answer = {
  text: string;
  points: number; // 3=Grün, 2=Gelb, 1=Rot
};

export type Question = {
  id: number;
  question: string;
  dirksKommentar: string; // Humorvoller Intro-Text in Dirks Stimme
  answers: Answer[];
};

export const questions: Question[] = [
  {
    id: 1,
    question: "Wann hast du dein Motorrad das letzte Mal aus dem Winterschlaf geholt?",
    dirksKommentar: "Dirk fragt sich das jedes Jahr wieder... 😅",
    answers: [
      { text: "Gerade eben – und es macht komische Geräusche", points: 2 },
      { text: "Letztes Frühjahr, hab's seitdem nie angerührt", points: 1 },
      { text: "Es steht noch in der Garage und ich trau mich nicht rein", points: 0 },
    ],
  },
  {
    id: 2,
    question: "Wann hast du zuletzt den Reifendruck geprüft?",
    dirksKommentar: "Der einzige Kontakt zur Straße – kein Witz, das ist lebenswichtig!",
    answers: [
      { text: "Heute Morgen natürlich – ich bin doch kein Anfänger", points: 3 },
      { text: "Irgendwann... war bestimmt noch gut", points: 1 },
      { text: "Reifen haben Druck? Seit wann?", points: 0 },
    ],
  },
  {
    id: 3,
    question: "Wie steht's um deine Bremsflüssigkeit?",
    dirksKommentar: "Dirk nennt das gern den 'unsichtbaren Killer' – bitte nicht ignorieren!",
    answers: [
      { text: "Frisch gewechselt – alles top", points: 3 },
      { text: "War beim letzten Service dabei... oder war das der davor?", points: 1 },
      { text: "Es gibt Bremsflüssigkeit? Ich dachte Bremsen bremsen einfach so", points: 0 },
    ],
  },
  {
    id: 4,
    question: "Wie sieht deine Kette aus?",
    dirksKommentar: "Stichwort: 'Trocken wie die Sahara'... kennst du das Geräusch?",
    answers: [
      { text: "Geschmiert, gespannt, top in Schuss", points: 3 },
      { text: "Bisschen rostig, aber fährt noch irgendwie", points: 1 },
      { text: "Welche Kette? Ich hab ein Automatik... glaube ich", points: 0 },
    ],
  },
  {
    id: 5,
    question: "Hast du Elektrik und Beleuchtung nach dem Winter gecheckt?",
    dirksKommentar: "Denn nichts ist peinlicher als mit Standlicht zur Polizeikontrolle...",
    answers: [
      { text: "Ja – alle Lichter, Batterie, alles geprüft", points: 3 },
      { text: "Es leuchtet irgendwas... reicht das nicht?", points: 1 },
      { text: "Die Elektrik checkt sich selbst, oder? Ich vertrau der Technik", points: 0 },
    ],
  },
];
