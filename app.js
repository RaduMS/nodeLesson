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

const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require ('express');
const app = express();

var logger = require('./logger');
console.log(logger);

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
app.use(morgan('tiny'));
app.use(function (req, res, next) {
    console.log('logger ... ');
    next();
});
app.use(logger.log2);
const port = process.env.PORT || 3001;
var courses = [
    {id:1, name: "math"},
    {id:2, name: "english"},
    {id:3, name: "german"}
];

app.get('/', function (req, res) {
    res.send('hellow world');
});

app.get('/api/courses', function (req, res) {
    res.send(courses);
});

app.post('/api/courses', function (req, res) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    console.log(result);

    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // use JOI validation insted of this
    // if (!req.body.name || req.body.name.length < 3){
    // //    error 400
    //     res.status(400).send('Name is require and should have minimum tree character');
    //     return;
    // }

    const course = {
        id : courses.length + 1,
        name : req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', function (req, res) {
    var course = courses.find( elem => elem.id === parseInt(req.params.id));
    if (!course){
        res.status(404).send('no course whit id: ' + parseInt(req.params.id));
    } else {
        res.send(course);
    }
});

app.put('/api/courses/:id', function (req, res) {
    // look up the course
    var course = courses.find( elem => elem.id === parseInt(req.params.id));
    if (!course){
        res.status(404).send('no course whit id: ' + parseInt(req.params.id));
        return;
    }

    // validate
    var {error} = validateCourse(req.body);
    console.log(error);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }

    // update course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', function (req, res) {
    // look up the course
    var course = courses.find( elem => elem.id === parseInt(req.params.id));
    if (!course){
        res.status(404).send('no course whit id: ' + parseInt(req.params.id));
        return;
    }

    // delete course
    var index = courses.indexOf(course);
    courses.splice(index, 1); 

    res.send(course);
});

app.get('/api/posts/:year/:month', function (req, res) {
    res.send(req.params);
    res.send(req.query);
});

app.listen(port , function () {
   console.log(`Listening port: ${port}`);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}



