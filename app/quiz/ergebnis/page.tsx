"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { calculateResult, resultContent, Result } from "@/lib/scoring";
import TrafficLight from "@/components/quiz/TrafficLight";
import Link from "next/link";

export default function ResultPage() {
    const router = useRouter();
    const [result, setResult] = useState<Result | null>(null);
    const [showContent, setShowContent] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        // Load Scores
        const storedScores = sessionStorage.getItem("quizScores");
        if (!storedScores) {
            router.push("/quiz"); // Redirect if no scores
            return;
        }

        const scores: Record<string, number> = JSON.parse(storedScores);
        const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0);
        setScore(totalPoints);

        const calcResult = calculateResult(totalPoints);
        setResult(calcResult);

        // Show content after traffic light animation (approx 2.5s)
        setTimeout(() => {
            setShowContent(true);
        }, 2500);

    }, [router]);

    if (!result) return <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center text-white">Lade Ergebnis...</div>;

    const content = resultContent[result];

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

            <div className="relative z-10 w-full flex flex-col items-center">
                {/* Traffic Light */}
                <div className="mb-8">
                    <TrafficLight result={result} />
                </div>

                {/* Result Content */}
                {showContent && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl w-full flex flex-col items-center gap-6"
                    >


                        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-gold)] font-serif">
                            {content.label}
                        </h2>

                        <div className="bg-[#1a1a1a]/90 border border-[#3a3a3a] p-6 md:p-8 rounded-lg shadow-xl w-full relative overflow-hidden backdrop-blur-sm">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-gold)]" />

                            <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
                                "{content.headline}"
                            </h3>

                            <p className="text-gray-300 text-lg leading-relaxed italic">
                                — {content.text}
                            </p>
                        </div>

                        {/* CTA Button */}
                        <Link href={content.ctaHref} className="w-full md:w-auto mt-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-[var(--color-gold)] text-black font-bold text-lg py-4 px-12 rounded shadow-lg tracking-wider hover:bg-[#d9b88c] transition-colors w-full md:w-auto"
                            >
                                {content.cta}
                            </motion.button>
                        </Link>

                    </motion.div>
                )}
            </div>
        </div>
    );
}
