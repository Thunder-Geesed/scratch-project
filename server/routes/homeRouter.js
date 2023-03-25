const express = require('express');
const router = express.Router();
const path = require('path');
const gameController = require('../controllers/gameController.js');
const gameRouter = require('./gameRouter');

router.get('/gameplayers/', (req, res) => {
  return res.sendStatus(200);
});

router.get('/games', gameController.getGames, (req, res) => {
  return res.json(res.locals.games);
});

router.post('/joingame', gameController.addUserToGame, (req, res) => {
  return res.sendStatus(200);
});

router.use('/creategame', gameRouter);

router.use(express.static(path.resolve(__dirname, '../../dist')));

module.exports = router;
