"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import NewsletterForm from "@/components/quiz/NewsletterForm";
import CouponDisplay from "@/components/quiz/CouponDisplay";
import { resultContent } from "@/lib/scoring";

export default function OfferPage() {
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

    const content = resultContent["ROT"];

    return (
        <div className="min-h-screen pb-12">
            {/* Alarm Bar */}
            <div className="bg-[var(--color-alert-red)] text-white text-center py-2 font-bold uppercase tracking-widest animate-pulse">
                🚨 Dein Motorrad braucht dringend Hilfe – aber Dirk hat die Lösung!
            </div>

            <main className="max-w-2xl mx-auto px-4 mt-8 text-center flex flex-col items-center">

                {/* Dirk's Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <p className="text-xl md:text-2xl font-serif text-[var(--color-gold)] mb-4">
                        "{content.headline}"
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        {content.text}
                    </p>
                </motion.div>

                {/* Coupon Box */}
                {content.showCoupon && content.couponCode && (
                    <CouponDisplay code={content.couponCode} />
                )}

                {/* Form */}
                <NewsletterForm result="ROT" score={score} />

                {/* Social Proof */}
                <div className="mt-12 opacity-70">
                    <p className="text-[var(--color-gold)]">⭐⭐⭐⭐⭐ 4.9 Sterne · Timeless Motors Wiesloch</p>
                </div>

            </main>
        </div>
    );
}
