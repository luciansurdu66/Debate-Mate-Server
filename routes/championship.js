const express = require('express');
const router = express.Router();
const championshipController = require('../controllers/championshipController');

router.get('/', championshipController.getChampionships);
router.get('/:id', championshipController.getChampionship);
router.post('/', championshipController.createChampionship);
router.put('/:id', championshipController.updateChampionship);
router.delete('/:id', championshipController.deleteChampionship);
router.get('/:championshipId/rounds/:roundNumber/matches', championshipController.getRoundData);

module.exports = router;