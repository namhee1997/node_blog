const Course = require("../models/CourseModels")
const { mongooseToObject } = require("../util/mongoose");
class CourseController {

    //[get /course/:slug]
    show(req, res, next) {

        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render("single/single", {
                    course: mongooseToObject(course)
                })
            })
            .catch(next)
    }

    //[get /course/create]
    create(req, res, next) {
        res.render("create/create");
    }

    //[post /course/store]
    store(req, res, next) {
        const innerHtml = req.body;
        innerHtml.images = `https://img.youtube.com/vi/${req.body.videourl}/sddefault.jpg`

        const course = new Course(innerHtml);
        course.save()
            .then(() => res.redirect(`/`))
            .catch(err => { })
    }

}

module.exports = new CourseController();