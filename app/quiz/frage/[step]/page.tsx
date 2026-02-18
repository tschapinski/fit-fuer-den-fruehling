"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { questions, Question } from "@/lib/quizData";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizAnswer from "@/components/quiz/QuizAnswer";
import QuizSlider from "@/components/quiz/QuizSlider";
import QuizImageChoice from "@/components/quiz/QuizImageChoice";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizQuestionPage() {
    const router = useRouter();
    const params = useParams();
    const step = Number(params?.step) || 1;
    const question: Question | undefined = questions.find((q) => q.id === step);

    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (!question) {
            if (step > questions.length) {
                router.push("/quiz/ergebnis");
            } else {
                router.push("/quiz");
            }
        }
    }, [step, question, router]);

    // Reset selection on step change
    useEffect(() => {
        setSelectedAnswerIndex(null);
        setIsTransitioning(false);
    }, [step]);

    const saveAndNavigate = (points: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);

        // Save Score
        const currentScores = JSON.parse(sessionStorage.getItem("quizScores") || "{}");
        currentScores[step] = points;
        sessionStorage.setItem("quizScores", JSON.stringify(currentScores));

        // Navigate
        setTimeout(() => {
            const nextStep = step + 1;
            if (nextStep > questions.length) {
                router.push("/quiz/ergebnis");
            } else {
                router.push(`/quiz/frage/${nextStep}`);
            }
        }, 500);
    };

    const handleChoiceSelect = (answerIndex: number, points: number) => {
        setSelectedAnswerIndex(answerIndex);
        saveAndNavigate(points);
    };

    const handleSliderConfirm = (_value: number, points: number) => {
        saveAndNavigate(points);
    };

    const handleImageChoiceSelect = (answerIndex: number, points: number) => {
        setSelectedAnswerIndex(answerIndex);
        saveAndNavigate(points);
    };

    if (!question) return null;

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 md:p-8 overflow-hidden">

            {/* Background Image */}
            <div className="fixed inset-0 w-full h-full pointer-events-none">
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
                <QuizProgress
                    currentStep={step}
                    totalSteps={questions.length}
                    questionIcon={question.icon}
                />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.35 }}
                        className="w-full"
                    >
                        {/* Question */}
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-rye)] font-bold text-white mb-4 uppercase tracking-tight leading-[1.15]">
                            {question.question}
                        </h1>

                        {/* Subtext (Comment) */}
                        <p className="text-[#888] italic text-base md:text-lg mb-10 font-serif">
                            {question.dirksKommentar}
                        </p>

                        {/* Render based on question type */}
                        {question.type === "choice" && question.answers && (
                            <div className="w-full">
                                {question.answers.map((answer, index) => (
                                    <QuizAnswer
                                        key={index}
                                        answer={answer}
                                        index={index}
                                        selected={selectedAnswerIndex === index}
                                        onSelect={() => handleChoiceSelect(index, answer.points)}
                                    />
                                ))}
                            </div>
                        )}

                        {question.type === "slider" && question.slider && (
                            <QuizSlider
                                config={question.slider}
                                onConfirm={handleSliderConfirm}
                            />
                        )}

                        {question.type === "image-choice" && question.answers && (
                            <div className={`grid gap-3 ${(question.answers?.length || 0) <= 3
                                ? "grid-cols-1 md:grid-cols-3"
                                : "grid-cols-2 md:grid-cols-2"
                                }`}>
                                {question.answers.map((answer, index) => (
                                    <QuizImageChoice
                                        key={index}
                                        answer={answer}
                                        index={index}
                                        selected={selectedAnswerIndex === index}
                                        onSelect={() => handleImageChoiceSelect(index, answer.points)}
                                        total={question.answers?.length || 0}
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="relative z-10 mt-16 text-white/30 text-xs uppercase tracking-[0.2em] font-medium text-center pb-8">
                DIRK BECHMANN
            </div>

        </div>
    );
}
