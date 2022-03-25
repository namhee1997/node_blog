
class NewsController {

    //[get /news]
    index(req, res) {
        res.render('news');
    }

    //[get |single| /news/:slug]
    single(req, res) {
        res.send('SINGLE NEWS');
    }
}

module.exports = new NewsController;