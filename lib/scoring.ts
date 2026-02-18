export type Result = "GRUEN" | "GELB" | "ROT";

export function calculateResult(totalPoints: number): Result {
    if (totalPoints >= 12) return "GRUEN";
    if (totalPoints >= 6) return "GELB";
    return "ROT";
}

export const resultContent = {
    GRUEN: {
        emoji: "🟢",
        label: "GRÜN – Profi!",
        headline: "Respekt! Du bist der Dirk unter den Hobby-Schraubern.",
        text: "Dein Motorrad könnte selbst durch den TÜV spazieren. Aber weißt du was? Auch Profis lernen noch dazu – und in meinem Kurs zeig ich dir ein paar Tricks, die selbst erfahrene Fahrer nicht kennen.",
        cta: "➡ Zum Kurs 'Motorrad fit für den Frühling'",
        ctaHref: "/quiz/kurs",
        showCoupon: false,
    },
    GELB: {
        emoji: "🟡",
        label: "GELB – Nachholbedarf",
        headline: "Na ja... nicht schlecht, nicht gut.",
        text: "Dein Motorrad fährt – aber wie lange noch? Du weißt jetzt wo du stehst. Ich zeig dir, was du in einer Stunde selbst in Ordnung bringen kannst – ohne Werkstatt-Rechnung.",
        cta: "➡ Gratis-Checkliste + Kurs-Info holen",
        ctaHref: "/quiz/newsletter",
        showCoupon: false,
    },
    ROT: {
        emoji: "🔴",
        label: "ROT – Dringender Handlungsbedarf!",
        headline: "Okay. Lass uns reden. Fahr das Ding NICHT auf die Autobahn.",
        text: "Aber keine Panik – ich hab genau das Richtige für dich. Ich hab schon Motorräder gesehen, die schlimmer dran waren. Die fahren heute noch. Aber ohne das richtige Wissen wird's teuer. Oder gefährlich.",
        cta: "➡ Jetzt 20% Rabatt sichern",
        ctaHref: "/quiz/angebot",
        showCoupon: true,
        couponCode: "FRUEHLING20",
        couponText: "20% Rabatt auf den Kurs 'Motorrad fit für den Frühling'",
    },
};
