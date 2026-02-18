"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { questions, Question } from "@/lib/quizData";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizAnswer from "@/components/quiz/QuizAnswer";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizQuestionPage() {
    const router = useRouter();
    const params = useParams();
    const step = Number(params?.step) || 1;
    const question: Question | undefined = questions.find((q) => q.id === step);

    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!question) {
            if (step > questions.length) {
                router.push("/quiz/ergebnis");
            } else {
                router.push("/quiz"); // Invalid step
            }
        }
    }, [step, question, router]);

    const handleSelect = (answerIndex: number, points: number) => {
        setSelectedAnswerIndex(answerIndex);

        // Save Score
        const currentScores = JSON.parse(sessionStorage.getItem("quizScores") || "{}");
        currentScores[step] = points;
        sessionStorage.setItem("quizScores", JSON.stringify(currentScores));

        // Wait and Navigate
        setTimeout(() => {
            const nextStep = step + 1;
            if (nextStep > questions.length) {
                router.push("/quiz/ergebnis");
            } else {
                router.push(`/quiz/frage/${nextStep}`);
                setSelectedAnswerIndex(null);
            }
        }, 400); // delay for visual feedback
    };

    if (!question) return null;

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-8 overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                    src="/images/Timeless_Motors_1.8.1.jpg"
                    alt="Timeless Motors Werkstatt"
                    fill
                    className="object-cover object-center"
                    quality={100}
                    priority
                />
                <div className="absolute inset-0 bg-black/85" />
            </div>

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-start pt-8">
                {/* Progress Header */}
                <QuizProgress currentStep={step} totalSteps={questions.length} />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                    >
                        {/* Question */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-rye)] font-bold text-white mb-6 uppercase tracking-tight leading-[1.1]">
                            {question.question}
                        </h1>

                        {/* Subtext (Comment) */}
                        <p className="text-[#888] italic text-lg mb-12 font-serif">
                            {question.dirksKommentar}
                        </p>

                        {/* Answers */}
                        <div className="w-full">
                            {question.answers.map((answer, index) => (
                                <QuizAnswer
                                    key={index}
                                    answer={answer}
                                    index={index}
                                    selected={selectedAnswerIndex === index}
                                    onSelect={() => handleSelect(index, answer.points)}
                                />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="relative z-10 mt-16 text-white/30 text-xs uppercase tracking-[0.2em] font-medium text-center pb-8">
                Timeless Motors · Eichelweg 9/1 · 69168 Wiesloch
            </div>

        </div>
    );
}
