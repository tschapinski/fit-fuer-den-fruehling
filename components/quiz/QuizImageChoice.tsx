"use client";

import { motion } from "framer-motion";
import { AnswerOption } from "@/lib/quizData";
import clsx from "clsx";

type Props = {
    answer: AnswerOption;
    index: number;
    selected: boolean;
    onSelect: () => void;
    total: number;
};

export default function QuizImageChoice({
    answer,
    index,
    selected,
    onSelect,
    total,
}: Props) {
    return (
        <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                delay: index * 0.1,
                duration: 0.4,
                ease: "easeOut",
            }}
            onClick={onSelect}
            className={clsx(
                "relative group flex flex-col items-center justify-center overflow-hidden",
                "border transition-all duration-300 cursor-pointer p-6 md:p-8",
                total <= 3 ? "w-full" : "w-full",
                selected
                    ? "bg-[#1a1508] border-[#C9A96E] shadow-[0_0_30px_rgba(201,169,110,0.15)]"
                    : "bg-[#0a0a0a] border-[#1e1e1e] hover:border-[#3a3a3a] hover:bg-[#0f0f0f]"
            )}
            style={{ borderRadius: 4 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Gold accent bar at top */}
            <div
                className={clsx(
                    "absolute top-0 left-0 right-0 h-[2px] transition-all duration-300",
                    selected
                        ? "bg-[#C9A96E] opacity-100"
                        : "bg-[#C9A96E] opacity-0 group-hover:opacity-50"
                )}
            />

            {/* Subtle glow on hover */}
            <div
                className={clsx(
                    "absolute inset-0 pointer-events-none transition-opacity duration-300",
                    selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
                style={{
                    background:
                        "radial-gradient(circle at 50% 30%, rgba(201,169,110,0.06) 0%, transparent 60%)",
                }}
            />

            {/* Emoji */}
            <motion.span
                className="text-4xl md:text-5xl mb-4 block"
                animate={selected ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.4 }}
            >
                {answer.emoji}
            </motion.span>

            {/* Text */}
            <span
                className={clsx(
                    "text-sm md:text-base text-center font-light tracking-wide leading-snug transition-colors duration-200",
                    selected ? "text-white" : "text-[#888] group-hover:text-white"
                )}
            >
                {answer.text}
            </span>

            {/* Selected indicator */}
            {selected && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#C9A96E] flex items-center justify-center"
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                    >
                        <path
                            d="M2 6L5 9L10 3"
                            stroke="#000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.div>
            )}
        </motion.button>
    );
}
