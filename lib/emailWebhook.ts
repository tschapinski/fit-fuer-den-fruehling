export type LeadData = {
    firstName: string;
    email: string;
    result: "GRUEN" | "GELB" | "ROT";
    score: number;
};

export async function sendLeadToWebhook(data: LeadData): Promise<boolean> {
    // CONFIG: Replace with your actual KlickTipp / ActiveCampaign Webhook URL
    const WEBHOOK_URL = process.env.EMAIL_WEBHOOK_URL || "https://hook.eu1.make.com/placeholder-webhook";

    try {
        console.log("Sending lead to webhook:", WEBHOOK_URL, data);
        // In a real scenario:
        // const response = await fetch(WEBHOOK_URL, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data),
        // });
        // return response.ok;

        // Simulation
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    } catch (error) {
        console.error("Webhook Error:", error);
        return false;
    }
}
