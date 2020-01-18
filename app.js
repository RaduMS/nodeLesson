console.log("ceva");
// console.log( module);

// var logger = require('./logger');
//
// console.log(logger);
// logger.log('asta a fost logat de logger');

// ======================================

// const path = require('path');
//
// var pathObj = path.parse(__filename);
//
// console.log(pathObj);


// ====================================

// const fs = require('fs');
//
// const files = fs.readdirSync('./');
// console.log(files);
//
// fs.readdir('./', function (err, files) {
//    if (err) console.log("error", err);
//    else console.log('results', files)
// });

// ====================================
//
// var logger = require('./logger');
//
// console.log(logger);
// logger.log('asta a fost logat de logger');

// ================= Buidl APIs whit Node and Express =======================


const startupDebugger = require('debug')('app:startup'); // debug package este fololsit pentru a face debugging in node
const dbDebugger = require('debug')('app:db');
// config package este folosit pentu anumite conficgurati
// in functie de ce rulezi development productie ai setarile in json iar pentru setari default ai default.json
// custom-environment-variables.json e folosit pentru variabilele din enviroment pnetru a nu salva o parola
// spre exemplu in development.json parola de la mail
const config = require('config');
const morgan = require('morgan'); // used to log HTTP request [Third party - Middleware]
const helmet = require('helmet'); // used for HTTP headers [Third party - Middleware]
const courses = require('./routes/courses');
const express = require ('express');
const app = express();

var logger = require('./middleware/logger');
console.log(logger);

app.set('view engine', 'pug');
app.set('views', './views');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);
console.log(`Application Name: ${config.get('name')}`);
console.log(`Application mail: ${config.get('mail.hoast')}`);
console.log(`Application password: ${config.get('mail.password')}`);

logger.log('asta a fost logat de logger');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled... ');
    console.log('Morgan enabled... ');
}
dbDebugger('Connected to the data base ...');

app.use(function (req, res, next) {
    console.log('logger ...  ');
    next();
});
app.use(logger.log2);
const port = process.env.PORT || 3001;

app.get('/', function (req, res) {
    // res.send('hellow world');
    res.render('index', {
        title: "My express app",
        message: 'Hello pug template engine'
    })
});

app.get('/api/posts/:year/:month', function (req, res) {
    res.send(req.params);
    res.send(req.query);
});

app.listen(port , function () {
   console.log(`Listening port: ${port}`);
});
