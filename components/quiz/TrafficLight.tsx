"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Result } from "@/lib/scoring";
import clsx from "clsx";

type Props = {
    result: Result;
};

export default function TrafficLight({ result }: Props) {
    const [activeLight, setActiveLight] = useState<Result | null>(null);

    useEffect(() => {
        const sequence = async () => {
            // Blink Sequence
            setActiveLight("ROT");
            await new Promise((r) => setTimeout(r, 400));
            setActiveLight("GELB");
            await new Promise((r) => setTimeout(r, 400));
            setActiveLight("GRUEN");
            await new Promise((r) => setTimeout(r, 400));

            // Flash the result
            setActiveLight(null);
            await new Promise((r) => setTimeout(r, 200));
            setActiveLight(result);
        };

        sequence();
    }, [result]);

    const getLightClass = (color: Result) => {
        const isActive = activeLight === color;
        const base = "w-16 h-16 md:w-20 md:h-20 rounded-full border-2 transition-all duration-300";

        if (!isActive) return clsx(base, "bg-white/5 border-white/10 shadow-none");

        if (color === "ROT") return clsx(base, "bg-red-500 border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.6)]");
        if (color === "GELB") return clsx(base, "bg-yellow-500 border-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.6)]");
        if (color === "GRUEN") return clsx(base, "bg-green-500 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.6)]");

        return base;
    };

    return (
        <div className="bg-[#111] p-6 rounded-3xl border-4 border-[#333] inline-flex flex-row items-center gap-4 shadow-2xl relative">
            {/* Vizor/Cap over lights could be added with CSS but simple circles are fine */}
            <motion.div className={getLightClass("ROT")} animate={{ scale: activeLight === "ROT" ? 1.1 : 1 }} />
            <motion.div className={getLightClass("GELB")} animate={{ scale: activeLight === "GELB" ? 1.1 : 1 }} />
            <motion.div className={getLightClass("GRUEN")} animate={{ scale: activeLight === "GRUEN" ? 1.1 : 1 }} />
        </div>
    );
}
