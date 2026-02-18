"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Copy } from "lucide-react";

type Props = {
    code: string;
};

export default function CouponDisplay({ code }: Props) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-[#1a1a1a] border-2 border-[var(--color-gold)] p-6 md:p-8 rounded-lg text-center relative overflow-hidden group mb-8"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-gold)]" />

            <h3 className="text-[var(--color-gold)] uppercase tracking-widest text-sm font-bold mb-4">
                🎁 Dein exklusiver Newsletter-Bonus
            </h3>

            <div
                className="bg-black border border-[#3a3a3a] p-4 rounded flex items-center justify-center gap-4 cursor-pointer hover:border-white transition-colors"
                onClick={copyToClipboard}
            >
                <span className="text-2xl md:text-4xl font-mono font-bold tracking-widest text-white">
                    {code}
                </span>
                <Copy className={copied ? "text-green-500" : "text-gray-500"} size={20} />
            </div>

            {copied && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-500 text-xs mt-2 absolute bottom-2 left-0 w-full"
                >
                    Code kopiert!
                </motion.p>
            )}

            <p className="text-gray-400 text-sm mt-4">
                20% Rabatt auf den Kurs <br />
                <span className="text-white italic">"Motorrad fit für den Frühling"</span>
            </p>
        </motion.div>
    );
}
