const Cours = require('../models/CourseModels');
const { muntipeMongooseToObject } = require("../util/mongoose");
class meController {

    //[get |search| /search]
    me(req, res, next) {

        //dùng promise để thêm countDocument vào cours
        Promise.all([Cours.find({}), Cours.countDocumentsDeleted()])
            .then(([cours, countDocument]) => res.render('me/stored-courses', {
                countDocument,
                cours: muntipeMongooseToObject(cours)
            }
            ))
            .catch(next)
    }

    trash(req, res, next) {

        ////them sort bằng tay-- nên dùng middelweres
        let courseQuery = Cours.findDeleted({});

        if (req.query.hasOwnProperty("_sort")) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        courseQuery.then(e => res.render('me/trash-courses', {
            cours: muntipeMongooseToObject(e)
        }))
            .catch(next)

    }

    //[post /me/delete/courses]
    deletes(req, res, next) {
        switch (req.body.handleSubmit) {
            case "delete":
                Cours.delete({ _id: { $in: req.body.CourseIds } }) //xóa tạm
                    .then(e => res.redirect("back"))
                    .catch(next)
                break;

            default:
                res.json({ data: "data is default!" })
                break;
        }
    }

    //[post /me/restore/courses]
    restoreCourses(req, res, next) {
        switch (req.body.handleSubmit) {
            case "restore":
                Cours.restore({ _id: { $in: req.body.CourseIds } }) //xóa tạm
                    .then(e => res.redirect("back"))
                    .catch(next)
                break;

            case "deleteDestroy":
                Cours.deleteOne({ _id: { $in: req.body.CourseIds } }) //xóa tạm
                    .then(e => res.redirect("back"))
                    .catch(next)
                break;

            default:
                res.json({ data: "data is default!" })
                break;
        }
    }

}

module.exports = new meController;