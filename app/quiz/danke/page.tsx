"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 text-center overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                    src="/images/DSC_2942.jpg"
                    alt="Motorrad Werkstatt Hintergrund"
                    fill
                    className="object-cover object-center"
                    quality={100}
                    priority
                />
                <div className="absolute inset-0 bg-black/85" />
            </div>

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-[var(--color-gold)] mb-6"
                >
                    <CheckCircle size={80} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-bold font-serif text-white mb-6"
                >
                    Fast geschafft!
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-xl text-lg text-gray-300 space-y-4"
                >
                    <p>
                        &quot;Ich hab dir gerade eine E-Mail geschickt – da ist dein Code drin. Und eine kleine Bonus-Checkliste obendrauf. Weil du ehrlich warst.&quot;
                    </p>

                    <p className="text-sm text-gray-500 mt-8">
                        Bitte check auch deinen Spam-Ordner.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12"
                >
                    <a
                        href="https://www.all-in-wiesloch.de"
                        className="text-[var(--color-gold)] hover:text-white underline underline-offset-4 transition-colors tracking-widest text-sm"
                    >
                        ← Zurück zur Website
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
