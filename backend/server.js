require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// Use Together AI API (completely FREE, reliable, no rate limits)
// Get your free API key: https://www.together.ai/
// Free tier: 1M tokens/month (plenty!)
const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY || "YOUR_TOGETHER_API_KEY_HERE";
const TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions";

// Helper: sleep for ms milliseconds
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

app.get("/", (req, res) => res.json({ status: "AI Chat Server running on port 5001 (Together AI - FREE)" }));

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ reply: "No message provided." });
    }

    if (TOGETHER_API_KEY === "YOUR_TOGETHER_API_KEY_HERE") {
        return res.status(500).json({
            reply: "❌ API key not configured. Get your FREE key at: https://www.together.ai/",
        });
    }

    // Retry up to 3 times on failure
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const response = await axios.post(
                TOGETHER_API_URL,
                {
                    model: "meta-llama/Llama-2-70b-chat-hf", // Reliable model
                    messages: [
                        { role: "system", content: "You are a helpful healthcare chatbot. Provide accurate medical information and be friendly. Keep responses concise and practical." },
                        { role: "user", content: userMessage }
                    ],
                    temperature: 0.7,
                    max_tokens: 512,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${TOGETHER_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    timeout: 30000,
                }
            );

            const reply = response.data.choices[0]?.message?.content || "No response generated.";
            console.log(`[OK] Reply sent (attempt ${attempt})`);
            return res.json({ reply });

        } catch (error) {
            const status = error?.response?.status;
            const errorMsg = error?.response?.data?.error?.message || error?.message;
            
            console.error(`[Attempt ${attempt}/3] Error:`, status, errorMsg);

            if (attempt < 3) {
                // Wait 2 seconds before retry
                await new Promise(r => setTimeout(r, 2000));
                continue;
            }

            // Final error response
            if (status === 401 || status === 403) {
                return res.json({
                    reply: "❌ API key invalid. Get your FREE key: https://www.together.ai/",
                });
            }

            if (status === 429) {
                return res.json({
                    reply: "⚠️ Rate limited. Please wait a moment and try again.",
                });
            }

            console.error("Full error:", error);
            return res.json({
                reply: "⚠️ Connection error. Please try again.",
            });
        }
    }
});

app.listen(5001, () => {
    console.log("✅ Server running on port 5001 (Together AI)");
});
