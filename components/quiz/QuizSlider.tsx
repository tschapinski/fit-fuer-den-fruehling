"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SliderConfig } from "@/lib/quizData";

type Props = {
    config: SliderConfig;
    onConfirm: (value: number, points: number) => void;
};

export default function QuizSlider({ config, onConfirm }: Props) {
    const [value, setValue] = useState(5);
    const [isDragging, setIsDragging] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    // Find the current label based on value
    const getCurrentLabel = useCallback(() => {
        const sortedLabels = [...config.labels].sort(
            (a, b) => b.value - a.value
        );
        for (const label of sortedLabels) {
            if (value >= label.value) return label;
        }
        return config.labels[0];
    }, [value, config.labels]);

    const currentLabel = getCurrentLabel();

    const handleTrackInteraction = useCallback(
        (clientX: number) => {
            if (!trackRef.current) return;
            const rect = trackRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percentage = x / rect.width;
            const rawValue =
                config.min + percentage * (config.max - config.min);
            const steppedValue =
                Math.round(rawValue / config.step) * config.step;
            const clampedValue = Math.max(
                config.min,
                Math.min(config.max, steppedValue)
            );
            setValue(clampedValue);
            setHasInteracted(true);
        },
        [config.min, config.max, config.step]
    );

    const handlePointerDown = (e: React.PointerEvent) => {
        setIsDragging(true);
        handleTrackInteraction(e.clientX);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        handleTrackInteraction(e.clientX);
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    // Key press support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                setValue((v) => Math.min(config.max, v + config.step));
                setHasInteracted(true);
            } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                setValue((v) => Math.max(config.min, v - config.step));
                setHasInteracted(true);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [config.max, config.min, config.step]);

    const percentage =
        ((value - config.min) / (config.max - config.min)) * 100;

    // Get color for the fill based on value
    const getColor = () => {
        if (value >= 7) return "#C9A96E";
        if (value >= 4) return "#f5a623";
        return "#cc2936";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full"
        >
            {/* Current Emoji & Label Display */}
            <div className="flex flex-col items-center mb-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentLabel.emoji}
                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-6xl mb-3"
                    >
                        {currentLabel.emoji}
                    </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={currentLabel.label}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="text-xl font-medium text-white tracking-wide"
                    >
                        {currentLabel.label}
                    </motion.span>
                </AnimatePresence>
                <span className="text-[#666] text-sm mt-1 font-mono">{value}/10</span>
            </div>

            {/* Slider Track */}
            <div
                className="relative w-full h-16 flex items-center select-none touch-none"
                ref={trackRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                role="slider"
                aria-valuemin={config.min}
                aria-valuemax={config.max}
                aria-valuenow={value}
                tabIndex={0}
            >
                {/* Track Background */}
                <div className="absolute w-full h-2 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] overflow-hidden">
                    {/* Fill */}
                    <motion.div
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{ backgroundColor: getColor() }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                </div>

                {/* Tick Marks */}
                <div className="absolute w-full flex justify-between px-0">
                    {Array.from(
                        { length: config.max - config.min + 1 },
                        (_, i) => config.min + i
                    ).map((tick) => (
                        <div
                            key={tick}
                            className={`w-[2px] h-3 rounded-full transition-colors duration-200 ${tick <= value ? "bg-white/30" : "bg-[#2a2a2a]"
                                }`}
                        />
                    ))}
                </div>

                {/* Thumb */}
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                    animate={{ left: `${percentage}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ marginLeft: "-16px" }}
                >
                    <div
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${isDragging
                                ? "scale-125 shadow-[0_0_20px_rgba(201,169,110,0.5)]"
                                : "shadow-[0_0_10px_rgba(201,169,110,0.3)]"
                            }`}
                        style={{
                            backgroundColor: getColor(),
                            borderColor: "rgba(255,255,255,0.3)",
                        }}
                    />
                </motion.div>
            </div>

            {/* Label Ticks */}
            <div className="relative w-full mt-2 h-8">
                {config.labels.map((label) => {
                    const labelPos =
                        ((label.value - config.min) / (config.max - config.min)) *
                        100;
                    return (
                        <button
                            key={label.value}
                            onClick={() => {
                                setValue(label.value);
                                setHasInteracted(true);
                            }}
                            className="absolute -translate-x-1/2 text-xs text-[#555] hover:text-white transition-colors duration-200 cursor-pointer whitespace-nowrap"
                            style={{ left: `${labelPos}%` }}
                        >
                            {label.label}
                        </button>
                    );
                })}
            </div>

            {/* Confirm Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hasInteracted ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
                className="mt-12 flex justify-center"
            >
                <motion.button
                    onClick={() => {
                        if (hasInteracted) {
                            onConfirm(value, config.getPoints(value));
                        }
                    }}
                    disabled={!hasInteracted}
                    whileHover={hasInteracted ? { scale: 1.02 } : {}}
                    whileTap={hasInteracted ? { scale: 0.98 } : {}}
                    className={`px-12 py-4 text-lg font-bold uppercase tracking-[0.15em] border transition-all duration-300 ${hasInteracted
                            ? "bg-[#0a0a0a] border-[#C9A96E] text-white hover:bg-[#1a1508] cursor-pointer"
                            : "bg-[#0a0a0a] border-[#2a2a2a] text-[#444] cursor-not-allowed"
                        }`}
                    style={{ borderRadius: 2 }}
                >
                    Weiter →
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
