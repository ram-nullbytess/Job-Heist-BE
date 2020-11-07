const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema ({
     
    user_id : {
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
    company_name : {
        type:String,
        required : true,
        min:3,
        max:255
    },
    total_employee : {
        type:String,
        required : true,
        min:3,
        max:255
    },
    your_name : {
        type:String,
        required : true,
        min:3,
        max:255,
    }
    ,
    phone_number : {
        type:String,
        required : true,
        min:10,
        max:12,
    }
    ,
    jobtitle : {
        type:String,
        required : true,
        min:3,
        max:255,
    }
    ,
    role : {
        type:String,
        required : true,
        min:3,
        max:255,
    }
    ,
    job_type : {
        type:String,
        required : true,
        min:3,
        max:255,
    }
    ,
    min_experience : {
        type:Number,
        required : true,
        min:0,
        max:100,
    }
    ,
    max_experience : {
        type:Number,
        required : true,
        min:0,
        max:100,
    }
    ,
    min_salary : {
        type:String,
        required : true,
        min:4,
        max:10,
    }
    ,
    max_salary : {
        type:String,
        required : true,
        min:4,
        max:10,
    }
    ,
    maximum_hires : {
        type:String,
        required : true,
        min:3,
        max:50,
    }
    ,
    description : {
        type:String,
        required : true,
        min:3,
        max:1024,
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

module.exports = mongoose.model('Job',jobSchema);