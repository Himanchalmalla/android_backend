const mongoose = require('mongoose');

const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema( {
        first_name: {
            type: String
        },

        last_name: {
            type: String
        },
        gender:{
           type:String
        },

        user_type:{
        type:String
        },

        email: {
            type: String
        },
        contact:{
         type:String
        },

        password:{
        type:String
        },

})

  

const User = mongoose.model('User_request', userSchema)

module.exports = User;