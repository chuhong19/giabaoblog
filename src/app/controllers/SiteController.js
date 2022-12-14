
const Game = require('../models/Game');
const {mutipleMongooseToObject} = require('../../util/mongoose');

class SiteController {

    // [GET] /
    index(req, res, next) {
        Game.find({})
            .then(games => {
                res.render('home', { 
                    games: mutipleMongooseToObject(games)
                });
            })
            .catch(next);
    }
}

module.exports = new SiteController;