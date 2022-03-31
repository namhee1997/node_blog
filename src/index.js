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
    helpers: {
        sum: (a, b) => a + b,
        sortTable: (fieldName, sort) => {

            let sortTypeCheck = fieldName == sort.column ? sort.type : "default";

            const icons = {
                default: "elevator",
                asc: "sort-ascending",
                desc: "sort-descending",
            }
            const typeSorts = {
                default: "desc",
                asc: "desc",
                desc: "asc",
            }

            let icon = icons[sortTypeCheck]
            let typeSort = typeSorts[sortTypeCheck]

            return `<a href="?_sort&column=${fieldName}&type=${typeSort}">
                        <span class="oi" data-glyph="${icon}"></span>
                    </a>`;
        },
    }
}));
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, 'resources', 'views'));

// routes init
routes(app);


app.listen(port, () => {

    console.log(`App listening on port ${port}`)
});