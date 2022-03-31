const express = require('express');
const morgan = require('morgan');
const expHbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override')
const app = express();
const port = 3000;
const db = require('./config/db');

const middelweresSort = require("./app/middlewares/sortMiddleware");


//connect db
db.connect();

const routes = require("./routes");

app.use(express.static(path.join(__dirname, 'public'))); // set cứng theo đường dẫn http://localhost:3000/img/logo.jpg

app.use(express.urlencoded({
    extended: true,
}));//để lấy giá trị submit
app.use(express.json());//xml , fetch , axios ....

//HTTP
app.use(morgan('combined'));

//method để truyền lên sửa
app.use(methodOverride('_method'));

//custom middlewerws
app.use(middelweresSort);

//ENGINE
app.engine('hbs', expHbs.engine({
    extname: '.hbs',
    helpers: require("./app/helper/handlebarHelper")
}));
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, 'resources', 'views'));

// routes init
routes(app);


app.listen(port, () => {

    console.log(`App listening on port ${port}`)
});