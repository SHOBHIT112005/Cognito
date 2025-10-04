import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/chat', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post(`${process.env.OLLAMA_API_URL}/api/chat`, {
            model: 'mistral',
            messages: [{ role: 'user', content: prompt }],
            stream: false
        });

        res.json({ reply: response.data.message.content });
    } catch (error) {
        console.error('Ollama Error:', error.message);
        res.status(500).json({ error: 'Failed to get response from AI assistant.' });
    }
});

export default router;
