const newsRoutes = require('./news')
const siteRoutes = require('./site')
const courseRoutes = require('./course')


function routes(app) {
    app.use('/news', newsRoutes);
    app.use('/course', courseRoutes);
    app.use('/', siteRoutes);

}

module.exports = routes;