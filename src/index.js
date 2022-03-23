const express = require('express');
const morgan = require('morgan');
const expHbs = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;

//HTTP
app.use(morgan('combined'));

//ENGINE
app.engine('hbs', expHbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, 'resources', 'views'));

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/news', (req, res) => {
    res.render('news');
});

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)
});