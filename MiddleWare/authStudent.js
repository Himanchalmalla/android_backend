const jwt = require("jsonwebtoken")
const Student = require('../Model/studentModel') 
 
const authStudent = async (req, res, next) => {    
    try {    
        const token = req.header('Authorization').replace('Bearer ', '')     
        const decoded = jwt.verify(token, 'thisismynewcourse')    
        const student = await Student.findOne({ _id: decoded._id, 'tokens.token': token }) 
 
    if (!student) {        
        throw new Error()      
        } 
     
    req.token = token     
    req.student = student      
    next()   
    } catch (e) {    
    res.status(401).send({ error: 'Pleaseuthenticate.' })     } } 
    module.exports = authStudent 