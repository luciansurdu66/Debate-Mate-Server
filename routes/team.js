const express = require('express');
const router = express.Router();
const teamControlelr = require('../controllers/teamController');

router.get('/', teamControlelr.getTeams);
router.get('/:id', teamControlelr.getTeam);
router.post('/', teamControlelr.createTeam);
router.put('/:id', teamControlelr.updateTeam);
router.delete('/:id', teamControlelr.deleteTeam);

module.exports = router;