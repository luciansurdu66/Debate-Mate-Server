const Round = require('../models/round');

const getRounds = async (req, res) => {
    try {
        const rounds = await Round.findAll();
        return res.json(rounds);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getRound = async (req, res) => {
    const { id } = req.params;

    try {
        const round = await Round.findOne({ where: { id } });

        if (!round) {
            return res.status(404).json({ message: "Round not found" });
        }

        return res.json(round);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const createRound = async (req, res) => {
    const { number, championshipId } = req.body;

    try {
        const round = await Round.create({ number, championshipId });
        return res.status(201).json(round);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateRound = async (req, res) => {
    const { id } = req.params;
    const { number, championshipId } = req.body;

    try {
        const round = await Round.findOne({ where: { id } });

        if (!round) {
            return res.status(404).json({ message: "Round not found" });
        }

        round.number = number;
        round.championshipId = championshipId;

        await round.save();

        return res.json(round);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteRound = async (req, res) => {
    const { id } = req.params;

    try {
        const round = await Round.findOne({ where: { id } });

        if (!round) {
            return res.status(404).json({ message: "Round not found" });
        }

        await round.destroy();

        return res.json({ message: "Round deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getRounds,
    getRound,
    createRound,
    updateRound,
    deleteRound,
};