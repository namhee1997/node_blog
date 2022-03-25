const express = require('express');
const routes = express.Router();

const newsController = require('../app/controllers/NewsController');

routes.use("/:slug", newsController.single);
routes.use("/", newsController.index);

module.exports = routes;