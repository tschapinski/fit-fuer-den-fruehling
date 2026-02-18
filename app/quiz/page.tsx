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
                    src="/images/DSC_2942.jpg"
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
                    className="text-[#a0a0a0] text-xs md:text-sm font-bold tracking-[0.2em] mb-4"
                >
                    Kostenloser Schnellcheck · 2 Minuten
                </motion.div>

                {/* Headline */}
                <motion.h1
                    className="text-4xl md:text-5xl lg:text-7xl font-bold leading-none text-white drop-shadow-2xl font-[family-name:var(--font-rye)] tracking-tighter"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Ist dein Motorrad<br />
                    <span className="block mt-2">fit für den Frühling?</span>
                </motion.h1>



                {/* Description */}
                <motion.div
                    className="text-[#cccccc] text-sm md:text-base max-w-2xl text-center space-y-2 font-light"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <p>Mache jetzt den Test und erfahre ob dein Motorrad bereits ready für den Frühling ist!</p>

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
                            whileHover={{
                                scale: 1.005,
                                textShadow: "0px 0px 8px rgb(255,255,255)",
                                borderColor: "rgba(255,255,255,0.5)",
                                boxShadow: "0px 0px 25px rgba(255,255,255,0.2)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="bg-black/90 text-white border border-white/20 font-bold text-lg md:text-xl py-5 px-16 uppercase tracking-[0.14em] shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-md"
                        >
                            Check Starten →
                        </motion.button>
                    </Link>
                </motion.div>



            </div>
        </div>
    );
}
