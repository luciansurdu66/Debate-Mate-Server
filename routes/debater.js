const express = require("express");
const router = express.Router();
const {
    importDebaters,
    getDebaters,
    upload,
    createDebater,
    deleteDebater,
    getDebater,
} = require("../controllers/debaterController");

// Route to import debaters from Excel
router.post("/import", upload.single("file"), importDebaters);

// Route to get list of debaters
router.get("/", getDebaters);

router.post("/", createDebater);

router.delete("/:id", deleteDebater);

router.get("/:id", getDebater);

module.exports = router;
