const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const MySchema = new Schema({
    rollNo: {
        type: Number,
        required: true,
        unique: true,
        trim: true
       
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:[true,"EmailAddress Is already in use"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address");
            }
        }
    }
});


const schemaData = new mongoose.model("MySchema",MySchema);

module.exports = schemaData;