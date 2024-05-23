const express = require("express");
const router = express.Router();
const {
    getAdjudicators,
    createAdjudicator,
    deleteAdjudicator,
    getAdjudicator,
    updateAdjudicator,
    importAdjudicators,
    upload,
} = require("../controllers/adjudicatorController");

router.get("/", getAdjudicators);

router.post("/", createAdjudicator);

router.delete("/:id", deleteAdjudicator);

router.get("/:id", getAdjudicator);

router.put("/:id", updateAdjudicator);

router.post("/import", upload.single("file"), importAdjudicators);
module.exports = router;
