"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import NewsletterForm from "@/components/quiz/NewsletterForm";
import { resultContent } from "@/lib/scoring";

export default function CoursePage() {
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const storedScores = sessionStorage.getItem("quizScores");
        if (!storedScores) {
            router.push("/quiz");
            return;
        }
        setVerified(true);
    }, [router]);

    if (!verified) return null;

    const content = resultContent["GRUEN"];

    return (
        <div className="min-h-screen pb-12 flex flex-col items-center justify-center text-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl bg-[#1a1a1a] border border-[var(--color-gold)] p-8 md:p-12 rounded-lg shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-gold)]" />

                <div className="text-6xl mb-6">{content.emoji}</div>

                <h1 className="text-3xl md:text-4xl font-serif text-[var(--color-gold)] mb-6 uppercase">
                    {content.headline}
                </h1>

                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    "{content.text}"
                </p>

                <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
                    Du kennst die Basics. Aber willst du wissen, wie Profis Motoren optimieren?
                    Hol dir meine Profi-Tipps direkt in dein Postfach.
                </p>

                <NewsletterForm result="GRUEN" score={15} />

            </motion.div>
        </div>
    );
}
