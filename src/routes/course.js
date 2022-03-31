const express = require('express');
const routes = express.Router();

const courseController = require('../app/controllers/CourseController');

routes.get("/create", courseController.create);
routes.post("/store", courseController.store);
routes.delete("/:id", courseController.delete);
routes.put("/:id", courseController.update);
routes.patch("/:id/restore", courseController.restore);
routes.delete("/:id/force", courseController.forceDestroy);
routes.get("/:id/edit", courseController.edit);
routes.get("/:slug", courseController.show);

module.exports = routes;