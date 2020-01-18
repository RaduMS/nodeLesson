
const express = require ('express');
const router = express.Router();

const Joi = require('joi');

var courses = [
    {id:1, name: "math"},
    {id:2, name: "english"},
    {id:3, name: "german"}
];

router.get('/', function (req, res) {
    res.send(courses);
});

router.post('/', function (req, res) {
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

router.get('/:id', function (req, res) {
    var course = courses.find( elem => elem.id === parseInt(req.params.id));
    if (!course){
        res.status(404).send('no course whit id: ' + parseInt(req.params.id));
    } else {
        res.send(course);
    }
});

router.put('/:id', function (req, res) {
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

router.delete('/:id', function (req, res) {
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

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

module.exports = router;