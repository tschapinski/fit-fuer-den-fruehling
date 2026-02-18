"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Result } from "@/lib/scoring";

type Props = {
    result: Result;
    score: number;
};

type FormData = {
    firstName: string;
    email: string;
};

export default function NewsletterForm({ result, score }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleRegistration = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/submit-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, result, score }),
            });

            if (response.ok) {
                router.push("/quiz/danke");
            } else {
                alert("Ups! Etwas ist schiefgelaufen. Bitte versuche es noch einmal.");
            }
        } catch (error) {
            console.error(error);
            alert("Netzwerkfehler. Bitte prüfe deine Verbindung.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const buttonText = result === "ROT"
        ? "🔒 Ja! Ich will meinen 20% Code + Dirks Insider-Tipps"
        : "✅ Ja, schick mir Dirks kostenlosen Frühlings-Tipp";

    return (
        <form onSubmit={handleSubmit(handleRegistration)} className="w-full max-w-md mx-auto space-y-4 mt-8">
            <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-[#c8a97e]">Vorname</label>
                <input
                    {...register("firstName", { required: "Bitte verrate Dirk deinen Vornamen." })}
                    className="w-full p-4 bg-[#0a0a0a] border border-[#3a3a3a] text-white focus:border-[#c8a97e] focus:outline-none transition-colors"
                    placeholder="Dein Vorname"
                />
                {errors.firstName && <p className="text-[#cc2936] text-sm mt-1">{errors.firstName.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-[#c8a97e]">E-Mail Adresse</label>
                <input
                    {...register("email", {
                        required: "Ohne E-Mail kann ich dir den Code nicht schicken.",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Das sieht nicht nach einer echten E-Mail aus..."
                        }
                    })}
                    className="w-full p-4 bg-[#0a0a0a] border border-[#3a3a3a] text-white focus:border-[#c8a97e] focus:outline-none transition-colors"
                    placeholder="deine.email@beispiel.de"
                />
                {errors.email && <p className="text-[#cc2936] text-sm mt-1">{errors.email.message}</p>}
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-[#d4581a] hover:bg-[#b04615] text-white font-bold py-4 px-6 uppercase tracking-wider text-lg shadow-lg disabled:opacity-50 transition-all mt-4"
            >
                {isSubmitting ? "Sende..." : buttonText}
            </motion.button>

            <p className="text-center text-xs text-gray-500 mt-4">
                Kein Spam. Kein Quatsch. Nur echtes Schrauber-Wissen. Jederzeit abmeldbar.
            </p>
        </form>
    );
}
