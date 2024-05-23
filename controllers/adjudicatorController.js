const Adjudicator = require("../models/adjudicator");
const multer = require("multer");
const xlsx = require("xlsx");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
let adjudicators = []; // Define debaters in a scope accessible to both functions

const getAdjudicators = async (req, res) => {
    try {
        const adjudicators = await Adjudicator.findAll();
        res.json(adjudicators);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAdjudicator = async (req, res) => {
    const { id } = req.params;
    try {
        const adjudicator = await Adjudicator.findOne({ where: { id } });
        if (!adjudicator) {
            return res.status(404).json({ error: "Adjudicator not found" });
        }
        res.json(adjudicator);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createAdjudicator = async (req, res) => {
    const { name, club, email } = req.body;
    try {
        const adjudicator = await Adjudicator.create({ name, club, email });
        res.json(adjudicator);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAdjudicator = async (req, res) => {
    const { id } = req.params;
    const { name, club, email } = req.body;
    try {
        const adjudicator = await Adjudicator.findOne({ where: { id } });
        if (!adjudicator) {
            return res.status(404).json({ error: "Adjudicator not found" });
        }
        adjudicator.name = name;
        adjudicator.club = club;
        adjudicator.email = email;
        await adjudicator.save();
        res.json(adjudicator);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAdjudicator = async (req, res) => {
    const { id } = req.params;
    try {
        const adjudicator = await Adjudicator.findOne({ where: { id } });
        if (!adjudicator) {
            return res.status(404).json({ error: "Adjudicator not found" });
        }
        await adjudicator.destroy();
        res.json({ message: "Adjudicator deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const importAdjudicators = async (req, res) => {
    try {
        const file = req.file;
        const workbook = xlsx.read(file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);
        adjudicators = data.map((adjudicator, index) => ({
            id: index + 1,
            name: adjudicator.Name,
            club: adjudicator.Club,
            email: adjudicator.Email,
        }));
        await Adjudicator.bulkCreate(adjudicators); 
        res.json({ success: true, message: "Adjudicators imported successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to import adjudicators controller",
        });
    }
};

module.exports = {
    getAdjudicators,
    getAdjudicator,
    createAdjudicator,
    updateAdjudicator,
    deleteAdjudicator,
    importAdjudicators,
    upload
};
