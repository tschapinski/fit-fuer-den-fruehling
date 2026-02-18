"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function QuizLandingPage() {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 text-center overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                    src="/images/tm-2.jpg"
                    alt="Timeless Motors Hintergrund"
                    fill
                    className="object-cover object-center"
                    quality={100}
                    priority
                />
                <div className="absolute inset-0 bg-black/85" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-5xl w-full flex flex-col items-center space-y-8">

                {/* Top Label */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-[#a0a0a0] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4"
                >
                    Kostenloser Schnellcheck · 2 Minuten
                </motion.div>

                {/* Headline */}
                <motion.h1
                    className="text-4xl md:text-5xl lg:text-7xl font-bold uppercase leading-none text-white drop-shadow-2xl font-[family-name:var(--font-rye)] tracking-tighter"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Ist dein Motorrad<br />
                    <span className="block mt-2">fit für den Frühling?</span>
                </motion.h1>

                {/* Subheadline Brand */}
                <motion.p
                    className="text-[#a0a0a0] text-xs md:text-sm tracking-[0.2em] uppercase font-sans mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Timeless Motors by Dirk Bechmann
                </motion.p>

                {/* Description */}
                <motion.div
                    className="text-[#cccccc] text-sm md:text-base max-w-2xl text-center space-y-2 font-light"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <p>7 ehrliche Fragen. Dirks direkte Diagnose.</p>
                    <p>Grünes, gelbes oder rotes Licht – du weißt danach genau, ob dein Motorrad auf die Straße darf.</p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    className="grid grid-cols-3 gap-8 md:gap-16 py-8 border-t border-white/10 mt-8 w-full max-w-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <div className="flex flex-col items-center">
                        <span className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-rye)] text-white">7</span>
                        <span className="text-[#a0a0a0] text-[10px] md:text-xs uppercase tracking-widest mt-2">Fragen</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-rye)] text-white">2&apos;</span>
                        <span className="text-[#a0a0a0] text-[10px] md:text-xs uppercase tracking-widest mt-2">Minuten</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-rye)] text-white">20+</span>
                        <span className="text-[#a0a0a0] text-[10px] md:text-xs uppercase tracking-widest mt-2">Jahre Erfahrung</span>
                    </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="w-full flex justify-center mt-8"
                >
                    <Link href="/quiz/frage/1">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-black/80 text-white border border-white/20 font-bold text-lg md:text-xl py-5 px-16 uppercase tracking-[0.15em] hover:bg-black transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-sm"
                        >
                            Check Starten →
                        </motion.button>
                    </Link>
                </motion.div>



            </div>
        </div>
    );
}
