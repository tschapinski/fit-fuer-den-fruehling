"use client";

import { motion } from "framer-motion";

type Props = {
    currentStep: number;
    totalSteps: number;
    questionIcon?: string;
};

export default function QuizProgress({ currentStep, totalSteps, questionIcon }: Props) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full max-w-2xl mb-12">
            {/* Step indicators */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {questionIcon && (
                        <motion.span
                            key={questionIcon}
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="text-2xl"
                        >
                            {questionIcon}
                        </motion.span>
                    )}
                    <span className="text-[#a0a0a0] font-mono text-sm tracking-widest uppercase">
                        Frage {currentStep} / {totalSteps}
                    </span>
                </div>

                {/* Percentage */}
                <motion.span
                    key={currentStep}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#C9A96E] font-mono text-sm font-bold"
                >
                    {Math.round(progress)}%
                </motion.span>
            </div>

            {/* Progress bar */}
            <div className="relative w-full h-[3px] bg-[#1a1a1a] rounded-full overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{
                        background: "linear-gradient(90deg, #C9A96E 0%, #e8d5b0 100%)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                {/* Glow */}
                <motion.div
                    className="absolute top-0 h-full rounded-full"
                    style={{
                        background: "linear-gradient(90deg, transparent 80%, rgba(201,169,110,0.6) 100%)",
                        filter: "blur(4px)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                />
            </div>

            {/* Step dots */}
            <div className="flex justify-between mt-3">
                {Array.from({ length: totalSteps }, (_, i) => (
                    <motion.div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i + 1 <= currentStep
                                ? "bg-[#C9A96E]"
                                : i + 1 === currentStep + 1
                                    ? "bg-[#3a3a3a] ring-1 ring-[#555]"
                                    : "bg-[#1a1a1a]"
                            }`}
                        initial={i + 1 === currentStep ? { scale: 0 } : {}}
                        animate={i + 1 === currentStep ? { scale: [0, 1.4, 1] } : {}}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                ))}
            </div>
        </div>
    );
}
