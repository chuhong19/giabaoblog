const newsRouter = require('./news');
const meRouter = require('./me');
const gamesRouter = require('./games');
const siteRouter = require('./site');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/games', gamesRouter);
    app.use('/', siteRouter);
}

module.exports = route;
