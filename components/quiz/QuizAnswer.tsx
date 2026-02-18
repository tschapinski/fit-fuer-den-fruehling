"use client";

import { motion } from "framer-motion";
import { Answer } from "@/lib/quizData";
import clsx from "clsx";

type Props = {
    answer: Answer;
    index: number;
    selected: boolean;
    onSelect: () => void;
};

const letters = ["A", "B", "C", "D"];

export default function QuizAnswer({ answer, index, selected, onSelect }: Props) {
    return (
        <motion.button
            whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.03)" }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={onSelect}
            className={clsx(
                "w-full text-left p-6 mb-4 rounded-sm border transition-all duration-300 relative group flex items-center gap-6 backdrop-blur-sm",
                selected
                    ? "bg-white/10 border-white text-white"
                    : "bg-black/80 border-[#333] hover:border-[#666] text-[#cccccc] hover:bg-black/90"
            )}
        >
            {/* Letter Drop Cap */}
            <div
                className={clsx(
                    "flex-shrink-0 w-8 text-2xl font-[family-name:var(--font-rye)] font-bold text-[#666]",
                    selected ? "text-white" : "group-hover:text-white transition-colors"
                )}
            >
                {letters[index]}
            </div>

            {/* Text */}
            <div className="flex-grow">
                <span className="text-base md:text-lg font-light tracking-wide">
                    {answer.text}
                </span>
            </div>
        </motion.button>
    );
}
