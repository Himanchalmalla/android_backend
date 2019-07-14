const authStudent = function(req, res, next){
    console.log("this is middleware");
    next();
    }
    module.exports = authStudent