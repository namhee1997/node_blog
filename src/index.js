const express = require('express');
const morgan = require('morgan');
const expHbs = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;
const db = require('./config/db');


//connect db
db.connect();

const routes = require("./routes");

app.use(express.static(path.join(__dirname, 'public'))); // set cứng theo đường dẫn http://localhost:3000/img/logo.jpg

app.use(express.urlencoded({
    extended: true
}));//để lấy giá trị submit
app.use(express.json());//xml , fetch , axios ....

//HTTP
app.use(morgan('combined'));

//ENGINE
app.engine('hbs', expHbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, 'resources', 'views'));

// routes init
routes(app);


app.listen(port, () => {

    console.log(`App listening on port ${port}`)
});