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

const express = require ('express');
const app = express();
app.use(express.json());
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

app.post('api/courses', function (req, res) {
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


app.get('/api/posts/:year/:month', function (req, res) {
    res.send(req.params);
    res.send(req.query);
})

app.listen(port , function () {
   console.log(`Listening port: ${port}`);
});





