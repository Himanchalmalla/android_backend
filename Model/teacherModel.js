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
        profile_image:{
            type:String
        },
        tokens:[{
            token:{
            type:String,
            required:true,
               }
           }]
})
userSchema.methods.generateAuthToken = async function () {   
    const teach = this 
    const token = jwt.sign({ _id: teach._id.toString() }, 'thisismynewcourse')    
    teach.tokens = teach.tokens.concat({ token :token }) 
    await teach.save() 
    return token
}

userSchema.statics.checkCrediantialsDb = async (email, password) =>{
   const teach1 = await Teach.findOne({email : email, password : password})
   return teach1;
   }
const Teach = mongoose.model('teacher', userSchema)
module.exports = Teach;