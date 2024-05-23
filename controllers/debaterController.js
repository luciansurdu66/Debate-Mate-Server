const multer = require("multer");
const xlsx = require("xlsx");
const Debater = require("../models/debater");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
let debaters = []; // Define debaters in a scope accessible to both functions

const importDebaters = async (req, res) => {
    try {
        const file = req.file;
        const workbook = xlsx.read(file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);
        debaters = data.map((debater, index) => ({
            id: index + 1,
            name: debater.Name,
            club: debater.Club,
            team: debater.Team,
            score: debater.Score,
        }));
        await Debater.bulkCreate(debaters); // Insert debaters into the database
        res.json({ success: true, message: "Debaters imported successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to import debaters controller",
        });
    }
};

const getDebaters = async (req, res) => {
    try {
        const debaters = await Debater.findAll(); // Fetch all debaters from the database
        res.json(debaters);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to get debaters",
        });
    }
};

const createDebater = async (req, res) => {
    const { name, club, team, score } = req.body;
    try {
        const debater = await Debater.create({ name, club, team, score });
        res.json(debater);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create debater",
        });
    }
};

const deleteDebater = async (req, res) => {
    const { id } = req.params;
    try {
        const debater = await Debater.findOne({ where: { id } });
        if (!debater) {
            return res.status(404).json({ error: "Debater not found" });
        }
        await debater.destroy();
        res.json({ message: "Debater deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete debater",
        });
    }
};
module.exports = {
    importDebaters,
    getDebaters,
    upload,
    createDebater,
    deleteDebater,
};
