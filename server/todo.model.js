const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ToDo = new Schema({
    description: {
        type: String,
    },
    responsible: {
        type: String,
    },
    priority: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
    }
});

module.exports = mongoose.model('ToDo', ToDo);