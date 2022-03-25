const newsRoutes = require('./news')
const siteRoutes = require('./site')


function routes(app) {
    app.use('/news', newsRoutes);
    app.use('/', siteRoutes);

}

module.exports = routes;