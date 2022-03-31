const Course = require("../models/CourseModels")
const { mongooseToObject, muntipeMongooseToObject } = require("../util/mongoose");
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
        req.body.images = `https://img.youtube.com/vi/${req.body.videourl}/sddefault.jpg`

        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect(`/me/stored/courses`))
            .catch(err => { })
    }
    //[get /course/:id/edit]
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(e => res.render("edit/edit", {
                resource: mongooseToObject(e)
            }))
            .catch(next)

    }

    //[put /course/:id]
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(e => res.redirect("/me/stored/courses"))
            .catch(next)

    }

    //[delete /course/:id]
    delete(req, res, next) {
        Course.delete({ _id: req.params.id }) //xóa tạm
            .then(e => res.redirect("/me/stored/courses"))
            .catch(next)
    }

    //[PATCH /course/:id/restore]
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(e => res.redirect("back"))
            .catch(next)
    }

    //[DELETE /course/:id/destroy]
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id }) // xóa vĩnh viễn
            .then(e => res.redirect("back"))
            .catch(next)
    }

}

module.exports = new CourseController();