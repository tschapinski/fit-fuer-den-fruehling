"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import NewsletterForm from "@/components/quiz/NewsletterForm";
import { resultContent } from "@/lib/scoring";

export default function NewsletterPage() {
    const router = useRouter();
    const [score, setScore] = useState(0);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const storedScores = sessionStorage.getItem("quizScores");
        if (!storedScores) {
            router.push("/quiz");
            return;
        }
        const scores: Record<string, number> = JSON.parse(storedScores);
        const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0);
        setScore(totalPoints);
        setVerified(true);
    }, [router]);

    if (!verified) return null;

    const content = resultContent["GELB"];

    return (
        <div className="min-h-screen pb-12 flex flex-col items-center">
            <main className="max-w-2xl mx-auto px-4 mt-16 text-center flex flex-col items-center">

                {/* Dirk's Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="text-6xl mb-4">{content.emoji}</div>
                    <p className="text-xl md:text-2xl font-serif text-[var(--color-gold)] mb-4 uppercase">
                        {content.headline}
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                        {content.text}
                    </p>
                </motion.div>

                {/* Form */}
                <div className="w-full max-w-md bg-[#1a1a1a] p-8 rounded border border-[#3a3a3a]">
                    <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">
                        Hol dir die Gratis-Checkliste
                    </h3>
                    <NewsletterForm result="GELB" score={score} />
                </div>

            </main>
        </div>
    );
}
