// // (function (exports, require, module, __filename, __dirname) {
//
//     console.log(__filename);
//     console.log(__dirname);
//     var url = 'http://mylogger.io/log';
//
//     function log(message) {
//         console.log(message);
//     }
//
//     module.exports.log = log;
// // });

var EventsEmitter = require('events');
var emitter = new EventsEmitter();

// Registre a listener

emitter.on('messageLogged', function () {
    console.log('Listener called');
});

function log(message) {
    console.log(message);

    // Register a event
    emitter.emit('messageLogged', {id: 1, url: "https"});
}

module.exports.log = log;