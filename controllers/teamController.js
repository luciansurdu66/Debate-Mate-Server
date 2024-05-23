const Team = require("../models/team");

const getTeams = async (req, res) => {
    try {
        const teams = await Team.findAll();
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTeam = async (req, res) => {
    const { id } = req.params;
    try {
        const team = await Team.findOne({ where: { id } });
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }
        res.json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTeam = async (req, res) => {
    const { name, debater1Id, debater2Id, debater3Id } = req.body;
    try {
        const team = await Team.create({ name, debater1Id, debater2Id, debater3Id });
        res.json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTeam = async (req, res) => {
    const { id } = req.params;
    const { name, debater1Id, debater2Id, debater3Id } = req.body;
    try {
        const team = await Team.findOne({ where: { id } });
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }
        team.name = name;
        team.debater1Id = debater1Id;
        team.debater2Id = debater2Id;
        team.debater3Id = debater3Id;
        await team.save();
        res.json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTeam = async (req, res) => {
    const { id } = req.params;
    try {
        const team = await Team.findOne({ where: { id } });
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }
        await team.destroy();
        res.json({ message: "Team deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getTeams, getTeam, createTeam, updateTeam, deleteTeam };