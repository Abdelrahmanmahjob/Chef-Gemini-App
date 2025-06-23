require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and 
suggests a recipe they could make with some or all of those ingredients.
You don't need to use every ingredient they mention in your recipe. 
The recipe can include additional ingredients they didn't mention,
but try not to include too many extra ingredients.
Format your response in markdown to make it easier to render to a web page 
`;

app.post('/api/recipe', async (req, res) => {
    const { ingredients } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const prompt = `${SYSTEM_PROMPT}\n\nI have ${ingredients.join(", ")}. Please give me a recipe you'd recommend I make!`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const data = await response.text();
        res.json({ recipe: data });
    } catch (err) {
        res.status(500).json({ error: "Error fetching recipe", details: err.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));