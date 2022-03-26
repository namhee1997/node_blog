const Cours = require('../models/CourseModels');
const { muntipeMongooseToObject } = require("../util/mongoose");
class SiteController {

    //[get /]
    index(req, res, next) {

        //cach 1
        // Cours.find({}, (err, course) => {
        //     if (!err) {
        //         res.json(course);
        //         return;
        //     }
        //     next(err);//gom lai xu ly o noi khac middlewre
        // })
        //cach 2
        Cours.find({})
            // .then(courses => res.json(courses)) // tao api object
            .then(courses => {
                res.render('home', {
                    courses: muntipeMongooseToObject(courses)//ham tu viet de chuyen doi array sang object 
                })
            }) // truyen len handlebar web
            .catch(next);//.catch(err=>next(err))


        // res.render('home');
    }

    //[get |search| /search]
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController;