import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

router.post("/generate", async (req: Request, res: Response) => {
    try {
        const { deviceType, quantity, leaseDuration, extraServices } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ message: "AI API Key is missing." });
        }

        const promptText = `
You are a B2B IT Equipment Leasing pricing AI for Zeta.
Calculate a smart quote based on these inputs:
Device Type: ${deviceType}
Quantity: ${quantity}
Lease Duration (Months): ${leaseDuration}
Extra Services: ${extraServices.join(", ")}

Respond ONLY with a valid JSON object in this exact structure:
{
  "monthlyTotal": number,
  "unitPrice": number,
  "setupFee": number,
  "roiJustification": "A short, persuasive 2-sentence sales pitch explaining why this is a good deal compared to buying upfront."
}
`;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`,
            {
                contents: [{ parts: [{ text: promptText }] }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-goog-api-key': apiKey
                }
            }
        );

        const textResponse = response.data.candidates[0].content.parts[0].text;
        
        // Try to parse the JSON output
        const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("Invalid response format from AI");
        }

        const quoteData = JSON.parse(jsonMatch[0]);

        res.json({ data: quoteData });
    } catch (error: any) {
        console.error("AI Quote Generation Error:", error.response?.data || error.message);
        res.status(500).json({ message: "Failed to generate AI quote" });
    }
});

export default router;
