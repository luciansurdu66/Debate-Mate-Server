const Match = require("../models/match");

const getMatches = async (req, res) => {
    try {
        const matches = await Match.findAll();
        res.json(matches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMatch = async (req, res) => {
    const { id } = req.params;
    try {
        const match = await Match.findOne({ where: { id } });
        if (!match) {
            return res.status(404).json({ error: "Match not found" });
        }
        res.json(match);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createMatch = async (req, res) => {
    const { championshipId, roundNumber } = req.params;
    const { team1, team2 } = req.body;
    try {
        const match = await Match.create({ championshipId, roundNumber, team1, team2 });
        res.json(match);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMatch = async (req, res) => {
    const { id } = req.params;
    const { governmentTeamId, oppositionTeamId } = req.body;
    try {
        const match = await Match.findOne({ where: { id } });
        if (!match) {
            return res.status(404).json({ error: "Match not found" });
        }
        match.governmentTeamId = governmentTeamId;
        match.oppositionTeamId = oppositionTeamId;
        await match.save();
        res.json(match);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMatch = async (req, res) => {
    const { id } = req.params;
    try {
        const match = await Match.findOne({ where: { id } });
        if (!match) {
            return res.status(404).json({ error: "Match not found" });
        }
        await match.destroy();
        res.json({ message: "Match deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getMatches, getMatch, createMatch, updateMatch, deleteMatch };