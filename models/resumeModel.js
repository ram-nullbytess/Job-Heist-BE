const mongoose = require('mongoose');
const resumeSchema = new mongoose.Schema ({
     
    user_id : {
        type:String,
        required : true,
        min:3,
        max:255
    },
    first_name : {
        type:String,
        required : true,
        min:3,
        max:255
    },
    last_name : {
        type:String,
        required : true,
        min:3,
        max:255
    },
    location : {
        type:String,
        required : true,
        min:3,
        max:255
    },
    experience : {
        type:Number,
        required : true,
        min:0,
        max:25
    },
    resume_headline : {
        type:String,
        required : true,
        min:3,
        max:255
    },
    current_salary : {
        type:String,
        required : true,
        min:4,
        max:15,
    }
    ,
    show_salary : {
        type:Boolean,
        required : true,
    }
    ,
    email : {
        type:String,
        required : true,
        min:3,
        max:25,
    }
    ,
    phone_number : {
        type:String,
        required : true,
        min:10,
        max:12,
    }
    ,
    show_phone : {
        type:Boolean,
        required : true
    }
    ,
    privacy : {
        type:String,
        required : true,
        min:5,
        max:10,
    }
    ,
    course : {
        type:String,
        required : true,
        min:3,
        max:255
    }
    ,
    college_university : {
        type:String,
        required : true,
        min:3,
        max:255
    }
    ,
    college_university_location : {
        type:String,
        required : true,
        min:3,
        max:255
    }
    ,
    education_from_month : {
        type:String,
        required : true,
        min:3,
        max:25,
    }
    ,
    education_from_year : {
        type:String,
        required : true,
        min:4,
        max:4
    }
    ,
    education_to_month : {
        type:String,
        required : true,
        min:3,
        max:25
    }
    ,
    education_to_year : {
        type:String,
        required : true,
        min:4,
        max:4
    }
    ,
    skills : {
        type:Array,
        required : true,
        default : []
    },
    date : {
        type:Date,
        required : true,
       default:Date.now()
    }
})

module.exports = mongoose.model('Resume',resumeSchema);
