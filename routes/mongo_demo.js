const express = require ('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', {useUnifiedTopology: true, useNewUrlParser: true})
    .then(()=> console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB:',err));

const coursesSchema = mongoose.Schema({
    name1: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
});

// let Course = mongoose.model('Course', coursesSchema);

const router = express.Router();

router.get('/', function (req, res) {
//
//     async function createCourse() {
//         const course1 = new Course({
//             name: 'Node.js cours',
//             author: 'Mosh',
//             tags: ['node', 'backend'],
//             isPublished: true
//         });
//         const result = await course1.save();
//
//         console.log(result);
//     }
// // createCourse();
//
//     async function getCourses() {
//
//         let pageNumber = 1;
//         let pageSize = 10;
//
//         // use comparison query operators:
//         // eq (equal)
//         // ne (not equal)
//         // gt (greater than)
//         // gte (greater then or equal to)
//         // lt (les than)
//         // lte (les than or equal to)
//         // in
//         // nin (not in)
//
//         // use logical query operators
//         // or
//         // and
//
//         // use regular expresion
//         // /^Mosh/ incepa cu Mosh
//         // /Mosh$/ se termina cu Mosh
//         // /Mosh$/i nu e case sensitive
//         // /*Mosh*/ stringul contine Mosh
//
//         const courses = await Course
//             // .find({author: 'Mosh'}) // author este un filtru
//             .find()
//             // .find({price: {$gte : 10 , $lte: 20}})
//             // .find({price: {$in : [10, 15, 20]}})
//             // .or([{author: 'mosh'}, {isPublished: true}])
//             .skip((pageNumber - 1) * pageSize)
//             // .limit(10)
//             .limit(pageSize)
//             .sort({name: 1})  // 1 este acendend -1 este descendent
//             // .select({name:1, tags: 1}); // name si tags sunt proprietatile returnate de baza de date
//             // .count();
//         // console.log(courses);
//         return courses;
//     }
//
//     async function updateCorse(id){
//         const course = await Course.findById(id);
//         if (!course) return ;
//
//         course.set({
//             name: 'Express course',
//             author: 'Another Author'
//         });
//
//         // course.name = 'Express course', // in loc de set
//
//         course.save();
//     }
//
//     async function updateCorse2(id){
//         const result = await Course.update({_id: id}, {
//             $set: {
//                 author:'Mosh',
//                 isPublished: false
//             }
//         });
//         console.log(result);
//     }
//
//     async function updateCorse3(id){
//         const course = await Course.findByIdAndUpdate(id, {
//             $set: {
//                 name: 'Express course',
//                 author:'Mosh altul',
//                 isPublished: true
//             }
//         },{new: true}); // cu new: true iti course nu va fi cel initial ci cel cu datele modificate
//         console.log(course);
//     }
//
//     async function deleteCourse(id) {
//         const result = await Course.deleteOne({_id: id});
//         // const course = await Course.findByIdAndRemove(id);
//         console.log(course);
//     }
//
//     getCourses().then(function (respons) {
//         var course2id = respons[1].id;
//         updateCorse3(course2id);
//     });
//
//     getCourses().then(function (respons) {
//         res.send(respons);
//     });
//
//     console.log("Before");
});

module.exports = router;