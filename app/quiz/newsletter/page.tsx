"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import NewsletterForm from "@/components/quiz/NewsletterForm";
import { calculateResult } from "@/lib/scoring";

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

    const calculatedResult = calculateResult(score);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 text-center overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                    src="/images/DSC_2942.jpg"
                    alt="Motorrad Werkstatt Hintergrund"
                    fill
                    className="object-cover object-center"
                    quality={100}
                    priority
                />
                <div className="absolute inset-0 bg-black/85" />
            </div>

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-[#1a1a1a]/90 backdrop-blur-sm p-8 rounded border border-[#3a3a3a] shadow-xl"
                >
                    <h3 className="text-white font-bold mb-4 tracking-widest text-xl md:text-2xl uppercase font-[family-name:var(--font-rye)]">
                        Hol dir die Gratis-Checkliste
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        Trag dich ein und ich schick dir meine persönliche Checkliste – damit du entspannt in die neue Saison starten kannst. 🏍️
                    </p>
                    <NewsletterForm result={calculatedResult} score={score} />
                </motion.div>

            </div>
        </div>
    );
}
