const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/', matchController.getMatches);
router.get('/:id', matchController.getMatch);
router.post('/', matchController.createMatch);
router.put('/:id', matchController.updateMatch);
router.delete('/:id', matchController.deleteMatch);
router.post('/score', matchController.createScore);
router.get('/score', matchController.getScore);
router.get('/score/:id', matchController.getScoreByDebater);
router.get('/score/championship/:championshipId', matchController.getScoreByChampionship);
module.exports = router;