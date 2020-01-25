const express = require ('express');
const router = express.Router();

router.get('/', function (req, res) {

    console.log("Before");
    getUser(1, function (user) {
        console.log(user);
        getRepositories (user.gitHubAcont, function (repo) {
            res.send(repo);
        });
    });
    console.log("After");

//    --------------------- Promise

    const p = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(1);
        },500);
        setTimeout(function () {
            reject(new Error('mesage erorr'))
        },100)
    });

    p.then(result => console.log(`Result ${result}`))
        .catch(err => console.log(`Error is ${err}`));

//    ---------------------

    getUserPromises(1)
        .then( user => getRepositoriesPromises(user))
        .then(repos => console.log(repos))
        .catch(err => console.log(err));

//    ---------------------

    // const resolvedPromise = Promise.reject(new Erorr('reson of rejection'));
    // resolvedPromise.catch(err => console.log(err));
    const resolvedPromise = Promise.resolve({id: 1, name: 'Resolved Promise'});
    resolvedPromise.then(result => console.log(result))

//    ---------------------

    const pormise1 = new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("Async operation 1 ...");
            resolve(1);
            // reject(new Error("something failed ..."));
        }, 6000)
    });


    const pormise2 = new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("Async operation 2 ....");
            resolve(2);
        }, 6000)
    });

    Promise.all([pormise1,pormise2])
        .then(result => console.log(result))
        .catch(err => console.log(err.message)) // dca una din promisuri da gresi totul da gresi

    // in cazul lui Promise.race() este primul promise rezolvat
    Promise.race([pormise1,pormise2])
        .then(result => console.log(result))
        .catch(err => console.log(err.message))

//    -------------------- Async and Await
    
    async function displayComits() {
        try {
            const user = await getUserPromises(1);
            const repos = await  getRepositoriesPromises(user);
            console.log("comit");
        }
        catch (err) {
            console.log(err.message);
        }

    }

    displayComits();

});

function getUser(id, callback) {
    setTimeout(function () {
        console.log("Reading from the data base...");
        callback({
            id: id,
            gitHubAcont: 'popescu'
        })
    }, 2000);
}


function getUserPromises(id) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("Reading from the data base wihit promeses...");
            resolve({
                id: id,
                gitHubAcont: 'popescu'
            })
        }, 4000);
    });
}

function getRepositories(username, callback) {
    setTimeout(function () {
        callback(['repo1','repo2', 'repo3']);
    }, 2000);
}

function getRepositoriesPromises(username) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(['repo1','repo2', 'repo3']);
        }, 2000);
    });
}

module.exports = router;