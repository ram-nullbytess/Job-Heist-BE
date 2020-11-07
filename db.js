const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// connect to database
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
         useFindAndModify: false 
    })
    .then(res => {

        console.log("MongoDB connection established successfully!");
      
      }, err => {
      
        console.log("There is an error while connecting to mongoDB : ", err);
      
      });
