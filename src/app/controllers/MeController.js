
const Game = require('../models/Game');
const {mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');

class MeController {

    // [GET] /me/stored/games
    storedGames (req, res, next) {
       
        let courseQuery = Game.find({});

        if (req.query.hasOwnProperty('_sort')){
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        Promise.all([courseQuery, Game.countDocumentsDeleted()])
            .then(([games, deletedCount]) => 
                res.render('me/stored-games', {
                    deletedCount,
                    games: mutipleMongooseToObject(games),
                }) 
            )
            .catch(next);
    }

    // [GET] /me/trash/games
    trashGames (req, res, next) {
        Game.findDeleted({})
            .then(games => res.render('me/trash-games', {
                games: mutipleMongooseToObject(games)
            }))
            .catch(next);
    }

}
module.exports = new MeController;