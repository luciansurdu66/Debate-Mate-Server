const Championship = require("../models/championship");
const Round = require("../models/round");
const Match = require("../models/match");

const getChampionships = async (req, res) => {
    try {
        const championships = await Championship.findAll();
        res.json(championships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getChampionship = async (req, res) => {
    const { id } = req.params;
    try {
        const championship = await Championship.findOne({ where: { id } });
        if (!championship) {
            return res.status(404).json({ error: "Championship not found" });
        }
        res.json(championship);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createChampionship = async (req, res) => {
    const { name, rounds, teams } = req.body;
    try {
        const championship = await Championship.create({ name, rounds });
        // Ensure there's an even number of teams
        const teamsToUse = teams.length % 2 === 0 ? teams : teams.slice(0, -1);
        for (let i = 1; i <= rounds; i++) {
            const round = await Round.create({ championshipId: championship.id, number: i });
            // Create matches for each pair of teams
            for (let j = 0; j < teamsToUse.length; j += 2) {
                const team1 = teamsToUse[j];
                const team2 = teamsToUse[j + 1];
                await Match.create({ championshipId: championship.id, roundNumber: i, governmentTeamId: team1.id, oppositionTeamId: team2.id});
            }
        }
        res.json(championship);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateChampionship = async (req, res) => {
    const { id } = req.params;
    const { name, rounds } = req.body;
    try {
        const championship = await Championship.findOne({ where: { id } });
        if (!championship) {
            return res.status(404).json({ error: "Championship not found" });
        }
        championship.name = name;
        championship.rounds = rounds;
        await championship.save();
        res.json(championship);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteChampionship = async (req, res) => {
    const { id } = req.params;
    try {
        const championship = await Championship.findOne({ where: { id } });
        if (!championship) {
            return res.status(404).json({ error: "Championship not found" });
        }
        await championship.destroy();
        res.json({ message: "Championship deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getRoundData = async (req, res) => {
    try {
        const { championshipId, roundNumber } = req.params;
        const matches = await Match.findAll({ 
            where: { 
                championshipId: championshipId, 
                roundNumber: roundNumber 
            } 
        });
        res.json(matches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getChampionships,
    getChampionship,
    createChampionship,
    updateChampionship,
    deleteChampionship,
    getRoundData,
};
