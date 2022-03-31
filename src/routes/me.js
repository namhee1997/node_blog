const express = require('express');
const routes = express.Router();

const meController = require('../app/controllers/meController');

routes.get("/stored/courses", meController.me);
routes.get("/trash/courses", meController.trash);
routes.post("/delete/courses", meController.deletes);
routes.post("/restore/courses", meController.restoreCourses);

module.exports = routes;