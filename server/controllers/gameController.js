const db = require('../models/teammateModels');

const gameController = {
  addGame(req, res, next) {
    try {
      const { name } = req.body;
      const { type } = req.body;
      const { datetime } = req.body;
      const { location } = req.body;
      const { maxplayers } = req.body;

      if (name == undefined || type == undefined || datetime == undefined || location == undefined || maxplayers == undefined) {
        return next({
          log: 'gameController: ERROR: Missing required fields',
          status: '400',
          message: {
            err: 'Error occured in gameController.addGame Missing required fields',
          },
        });
      }

      const queryString = `INSERT INTO games (name, type, datetime, location, maxplayers) VALUES ('${name}', '${type}', '${datetime}', '${location}', '${maxplayers}');`;

      db.query(queryString).then((data) => {
        res.locals.newGame = data;
        return next();
      });
    } catch (err) {
      return next({
        log: `gameeController.addGame: ERROR ${err}`,
        message: {
          err: 'gameeController.addGame: ERROR: Game not created',
        },
      });
    }
  },

  addUserToGame(req, res, next) {
    try {
      const { userId } = req.cookies;
      const { gameId } = req.body;

      const queryString = `INSERT INTO users_games (user_id, game_id) VALUES ('${userId}', '${gameId}')`;
      db.query(queryString).then((data) => {
        res.locals.userAddedToGame = data;
        return next();
      });
    } catch (err) {
      return next({
        log: `gameeController.addGame: ERROR ${err}`,
        message: {
          err: 'gameeController.addGame: ERROR: Game not created',
        },
      });
    }
  },
};
module.exports = gameController;

// if (!deleted) {
//   return next({
//     log: 'StudentController.deleteStudent: ERROR: Student not found',
//     status: '400',
//     message: {
//       err: 'Error occured in StudentController.deleteStudent. Student not found.',
//     },
//   });
// }

// "INSERT INTO users (username, password, email, location) VALUES ('weston', '1234', 'abc@gmail.com', 'portalnd')";
