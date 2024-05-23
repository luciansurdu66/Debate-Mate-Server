const express = require("express");
const router = express.Router();
const {
    importDebaters,
    getDebaters,
    upload,
    createDebater,
    deleteDebater,
} = require("../controllers/debaterController");

// Route to import debaters from Excel
router.post("/import", upload.single("file"), importDebaters);

// Route to get list of debaters
router.get("/", getDebaters);

router.post("/", createDebater);

router.delete("/:id", deleteDebater);

module.exports = router;
