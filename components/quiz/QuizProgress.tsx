"use client";

import { motion } from "framer-motion";

type Props = {
    currentStep: number;
    totalSteps: number;
};

export default function QuizProgress({ currentStep, totalSteps }: Props) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full max-w-2xl flex items-center gap-4 mb-12">
            <span className="text-[#a0a0a0] font-mono text-sm tracking-widest uppercase flex-shrink-0">
                Frage {currentStep} / {totalSteps}
            </span>
            <div className="h-[1px] bg-[#333] flex-grow relative">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-[#555]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
}
