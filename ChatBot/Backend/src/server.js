const express = require('express');
const cors = require('cors');
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyBJQ6Vw85vj9tQK5UI2-uWClINgjmt1uHc";

async function runChat(inputMessage) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
            {
                role: "user",
                parts: [{ text: inputMessage }],
            },
            {
                role: "model",
                parts: [{ text: "Placeholder response to end the conversation" }],
            },
            {
                role: "user",
                parts: [{ text: "Thank you for the information." }], // Ending with a user role
            },
        ],
    });

    const result = await chat.sendMessage(inputMessage);
    const response = result.response;
    const text = response.text;
    return text;
}

app.post('/chat', async (req, res) => {
    const userInput = req.body.message;
    const botResponse = await runChat(userInput);
    res.json({ message: botResponse });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
