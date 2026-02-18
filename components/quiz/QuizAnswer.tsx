"use client";

import { motion } from "framer-motion";
import { AnswerOption } from "@/lib/quizData";
import clsx from "clsx";

type Props = {
    answer: AnswerOption;
    index: number;
    selected: boolean;
    onSelect: () => void;
};

const letters = ["A", "B", "C", "D"];

export default function QuizAnswer({ answer, index, selected, onSelect }: Props) {
    return (
        <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.35, ease: "easeOut" }}
            onClick={onSelect}
            className={clsx(
                "w-full text-left mb-3 relative group flex items-center overflow-hidden",
                "border transition-colors duration-200",
                selected
                    ? "bg-[#1a1508] border-[#C9A96E] text-white"
                    : "bg-[#0a0a0a] border-[#2a2a2a] text-[#b0b0b0] hover:border-[#444] hover:text-white"
            )}
            style={{ borderRadius: 2 }}
        >
            {/* Gold left accent bar – animates in on hover/selected */}
            <div
                className={clsx(
                    "absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-200",
                    selected
                        ? "bg-[#C9A96E] opacity-100"
                        : "bg-[#C9A96E] opacity-0 group-hover:opacity-100"
                )}
            />

            {/* Subtle gold glow overlay on hover */}
            <div
                className={clsx(
                    "absolute inset-0 pointer-events-none transition-opacity duration-200",
                    selected
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                )}
                style={{
                    background: "linear-gradient(90deg, rgba(201,169,110,0.07) 0%, transparent 40%)"
                }}
            />

            {/* Emoji Badge */}
            {answer.emoji && (
                <div
                    className={clsx(
                        "relative z-10 flex-shrink-0 w-14 flex items-center justify-center self-stretch py-5",
                        "text-2xl transition-transform duration-200",
                        selected ? "scale-110" : "group-hover:scale-110"
                    )}
                >
                    {answer.emoji}
                </div>
            )}

            {/* Letter Badge (fallback if no emoji) */}
            {!answer.emoji && (
                <div
                    className={clsx(
                        "relative z-10 flex-shrink-0 w-14 flex items-center justify-center self-stretch py-5",
                        "text-lg font-[family-name:var(--font-rye)] font-bold transition-colors duration-200",
                        selected
                            ? "text-[#C9A96E]"
                            : "text-[#444] group-hover:text-[#C9A96E]"
                    )}
                >
                    {letters[index]}
                </div>
            )}

            {/* Divider */}
            <div
                className={clsx(
                    "relative z-10 self-stretch w-px transition-colors duration-200",
                    selected ? "bg-[#C9A96E]/30" : "bg-[#1e1e1e] group-hover:bg-[#333]"
                )}
            />

            {/* Answer Text */}
            <div className="relative z-10 flex-grow px-6 py-5">
                <span className="text-base md:text-lg font-light tracking-wide leading-snug">
                    {answer.text}
                </span>
            </div>
        </motion.button>
    );
}
