const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    name : {
        type:String,
        required : true,
        min:3,
        max:255
    },
    email : {
        type:String,
        required : true,
        min:6,
        max:255
    },
    password : {
        type:String,
        required : true,
        min:6,
        max:1024
    },
    role : {
        type:String,
        required : true,
        min:6,
        max:10,
        default:"null"
    },
    date : {
        type:Date,
        required : true,
       default:Date.now()
    }
})

module.exports = mongoose.model('User',userSchema)