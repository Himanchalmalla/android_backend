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

        subject:{
            type:String
        },

        semister:{
            type:String
        },

        section:{
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
    const stud = this 
    const token = jwt.sign({ _id: stud._id.toString() }, 'thisismynewcourse')    
    ///  console.log(token);  
         stud.tokens = stud.tokens.concat({ token :token }) 
          await stud.save(); 

return token
}
userSchema.statics.checkCrediantialsDb = async (email, password) =>{
   const stud1 = await Stud.findOne({email : email, password : password})
   return stud1;
  }



const Stud = mongoose.model('student', userSchema)

module.exports = Stud;