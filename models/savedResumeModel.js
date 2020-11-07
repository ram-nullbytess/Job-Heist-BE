const mongoose = require('mongoose');
const savedResumeSchema = new mongoose.Schema ({
     
    resume_id : {
        type:String,
        required : true,
        min:3,
        max:255
    },
    saver_id : {
        type:String,
        required : true,
        min:3,
        max:255
    },
    date : {
        type:Date,
        required : true,
       default:Date.now()
    }
})

module.exports = mongoose.model('saved-Resume',savedResumeSchema);