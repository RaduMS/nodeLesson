const express = require ('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', {useUnifiedTopology: true, useNewUrlParser: true})
    .then(()=> console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB:',err));

const coursesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5, // built-in validators
        maxlength: 250 // built-in validators
        // match: /pattern/  // built-in validators
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'], // built-in validators
        lowercase: true,  // transforma totul in lowercase
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            // custom validation
            // validator: function (v) {
            //     return v && v.length > 0; // daca v e setat ca null atunci v.lenght nu exista si validarea da gresi
            // },
            // async validators isAsync is deprecated
            isAsync: true,
            validator: function(v, callback){
                setTimeout(() => {
                    // do async work
                    result = v && v.length > 0;

                    callback(result);
                }, 4000);
            },
            // validator: function(v){
            //     return Promise.resolve(tagsValidator(v));
            // },
            // validator: tagsValidator(v),
            message: 'A course should have at least one tag!'
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished; // built-in validators
        },
        min: 10, // built-in validators
        max: 150, // built-in validators
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

async function tagsValidator (v){
    setTimeout(() => {
        // do async work
        return  v && v.length > 0;
    }, 4000);
}

let Course = mongoose.model('Course', coursesSchema);

async function createCourse() {
    const course1 = new Course({
        name: "Exp",
        category: '-',
        author: 'Mosh',
        tags: [],
        isPublished: true,
        price: 200
    });

    try {
        const result = await course1.save();
        console.log(result);
    }
    catch (e) {
        // console.log(e.message);
        for (field in e.errors){
            console.log(e.errors[field].message);
        }
    }
}
createCourse();

const router = express.Router();

router.get('/', function (req, res) {


    async function getCourses() {

        const courses = await Course
            .find()
            // .or([{author: 'Mosh'}, {isPublished: true}])
            .sort({name: 1})  // 1 este acendend -1 este descendent
            .select({name:1, tags: 1}); // name si tags sunt proprietatile returnate de baza de date
        console.log(courses);
        return courses;
    }

    async function updateCorse(id){
        const course = await Course.findById(id);
        if (!course) return ;

        course.set({
            name: 'Express course',
            author: 'Another Author'
        });

        // course.name = 'Express course', // in loc de set

        course.save();
    }

    async function deleteCourse(id) {
        const result = await Course.deleteOne({_id: id});
        // const course = await Course.findByIdAndRemove(id);
        console.log(course);
    }

    // getCourses().then(function (respons) {
    //     var course2id = respons[1].id;
    //     updateCorse3(course2id);
    // });
    //
    getCourses().then(function (respons) {
        res.send(respons);
    });

    console.log("Before");
});

module.exports = router;