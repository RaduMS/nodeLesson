const express = require ('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', function (req, res) {

    mongoose.connect('mongodb://localhost/mongo-exercises')
        .then(()=> console.log('Connected to MongoDB'))
        .catch(err => console.log('Could not connect to MongoDB:',err));

    const coursesSchema = mongoose.Schema({
        name: String,
        author: String,
        tags: [String],
        date: Date,
        isPublished: Boolean,
        price: Number
    });

    let Course = mongoose.model('Course', coursesSchema);

    async function getCourses() {
        let pageNumber = 2;
        let pageSize = 10;

        const courses = await Course
            .find({isPublished: true, tags: 'backend'})
            .sort({name: 1})
            .select({name: 1, author: 1});

        console.log('Cursurile sunt:');
        console.log(courses);

        return courses;
    }

    async function getCourses2() {
        let pageNumber = 2;
        let pageSize = 10;

        const courses = await Course
            .find({isPublished: true, tags:  {$in : ['backend', 'frontend']}})
            // .or([{tags: 'backend'}, {tags: 'frontend'}])
            .sort("-price")
            .select('name author price');

        console.log('Cursurile sunt:');
        console.log(courses);

        return courses;
    }
// getCourses2();

    async function getCourses3() {
        let pageNumber = 2;
        let pageSize = 10;

        const courses = await Course
            .find({isPublished: true, tags:  {$in : ['backend', 'frontend']}})
            .or([
                {price: {$gte : 15}},
                {name: /.*by.*/i }
            ])
            .sort("-price")
            .select('name author price');

        console.log('Cursurile sunt:');
        console.log(courses);


        return courses;
    }
    getCourses3();

    console.log("Before");

    getCourses().then(function (respons) {
        res.send(respons);
    })

});

module.exports = router;