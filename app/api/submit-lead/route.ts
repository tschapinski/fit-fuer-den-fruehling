import { NextResponse } from "next/server";
import { sendLeadToWebhook, LeadData } from "@/lib/emailWebhook";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, email, result, score } = body;

        // Validate Input
        if (!firstName || !email || !result) {
            return NextResponse.json(
                { success: false, message: "Bitte alle Felder ausfüllen." },
                { status: 400 }
            );
        }

        // Call Webhook
        const success = await sendLeadToWebhook({ firstName, email, result, score } as LeadData);

        if (!success) {
            console.warn("Webhook submission failed, but treating as success for user");
        }

        return NextResponse.json({
            success: true,
            message: "Lead erfolgreich übertragen"
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { success: false, message: "Interner Server Fehler" },
            { status: 500 }
        );
    }
}
