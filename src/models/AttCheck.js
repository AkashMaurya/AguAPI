const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttCheck = new Schema({
    RegID: {
        type: Number,
        unique: true,
        trim: true

    },
    Name: {
        type: String,

        trim: true

    },
    Email: {
        type: String,

        trim: true
    },
    Total: {
        type: String,

    },
    Warnings: {
        type: String,
    }


});


const attSchema = new mongoose.model("Attendance", AttCheck);

module.exports = attSchema;