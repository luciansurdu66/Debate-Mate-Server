const express = require('express');
const router = express.Router();
const roundController = require('../controllers/roundController');

router.get('/', roundController.getRounds);
router.get('/:id', roundController.getRound);
router.post('/', roundController.createRound);
router.put('/:id', roundController.updateRound);
router.delete('/:id', roundController.deleteRound);

module.exports = router;