const newsRoutes = require('./news')
const siteRoutes = require('./site')
const courseRoutes = require('./course')
const meRoutes = require('./me')


function routes(app) {
    app.use('/news', newsRoutes);
    app.use('/course', courseRoutes);
    app.use('/me', meRoutes);
    app.use('/', siteRoutes);

}

module.exports = routes;