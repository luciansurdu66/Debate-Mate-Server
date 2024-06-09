const Motion = require("../models/motion");
const axios = require("axios");
const OpenAI = require("openai");
const getMotions = async (req, res) => {
    try {
        const motions = await Motion.findAll();
        res.json({ motions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const generateMotion = async (req, res) => {
    console.log(req.body);
    const topic = req.body.topic;
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Genereaza o singura moțiune pentru WSDC pe topicul " + topic,
                },
            ],
            temperature: 0.5,
        });

        
        console.log(response.choices[0].message.content);
        const motion = new Motion({ topic, details: response.choices[0].message.content });
        await motion.save();

        res.status(201).json(motion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getMotions,
    generateMotion,
};
