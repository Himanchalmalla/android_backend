require('./Database/database');

const studentModel=require('./Model/studentModel');
const teacherModel=require('./Model/teacherModel');
const assignment=require('./Model/AssignmentModel');
const userModel=require('./Model/userModel');
const MiddleWareStudent=require('./MiddleWare/MiddlewareStudent');
const authStudent=require('./MiddleWare/authStudent');

const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const path = require('path');  
const multer = require('multer');

const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/images", express.static("images"));
app.use("/files", express.static("files"));

////----------Image----------////

var storage = multer.diskStorage({
destination: 'images',
filename: (req, file, callback) => {
let ext = path.extname(file.originalname);
callback(null, "user" + Date.now() + ext);
}
});
  
var imageFileFilter = (req, file, cb) => {
     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
     return cb(new Error('You can upload only image files!'), false);
     }
     cb(null, true);
     };
  
var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 100000000 }
    });
  
app.post('/uploadUserImages', upload.single('assignment'), (req, res) => {
    res.json(req.file.filename)
    console.log(req.file)
    });

////-------File-------////

var storage = multer.diskStorage({
    destination: "files",
    filename: function (req, file, callback){
    const ext = path.extname(file.originalname);
    callback(null, "assign" + Date.now() + ext);
    }
    });

var upload1 = multer({ storage: storage });
    app.post('/uploadAssignment', upload1.single('assignment'), (req, res) => {
    res.send(req.file)
    console.log(req.file)
    });
    
////----------User Request-----------////

app.post("/userRequest", (req, res) => { 
    console.log(req.body);
    var userData = new userModel(req.body); 
    userData.save().then(function(){
    alert("user Registered");
    console.log('user registered');     
    }).catch(function(e){res.send(e) });                    
    });

////------------Login-----------////
app.post('/loginStudent',async function(req, res){
    // const Student=new Student();
    const user=req.body.email;
    const password=req.body.password; 
    const student1 = await studentModel.checkCrediantialsDb(user,password);
    const token = await  student1.generateAuthToken();
    res.json({token:token,
        first_name:student1.first_name,
        _id:student1._id

    });        
    console.log("en");
    console.log("Token No=>"+token);        
    })
 
app.post('/loginTeacher',async function(req, res){
    const user=req.body.email;// user
    const password=req.body.password; // pw
    const teach1 = await teacherModel.checkCrediantialsDb(user,password);
    const token = await  teach1.generateAuthToken();
    res.json({token});        
    console.log("en");
    console.log(token);
    }) 

///-------- Assignment Teacher---------///
           //Student//

app.post("/addAssignment", (req, res) => { 
    console.log(req.body);
    var userData = new assignment(req.body); 
    userData.save().then(function(){
    alert("Assignment uploaded");
    }).catch(function(e){res.send(e) });                    
    });

app.get("/viewAssignment", function(req,res){
    assignment.find().then(function(assignment){
    res.send(assignment);
    }).catch(function(e){
    res.send(e);
    });
    });

app.post("/addTechAssignment",  (req, res) => { 
    console.log(req.body);
    var userData = new assignmentModel(req.body); 
    userData.save().then(function(){
    alert("Document uploaded");
    }).catch(function(e){res.send(e) });                    
    });


app.get("/viewAssignmentTeacher", function(req,res){
    assignmentModel.find().then(function(assignmentModel){
    res.send(assignmentModel);
    }).catch(function(e){
    res.send(e);
    });
    });


 app.get("/viewAssignmentTeacher/:id", function(req,res){
    uid = req.params.id.toString();
    assignmentModel.findById(uid).then(function (assignmentModel) {
    res.send(assignmentModel);
    }).catch(function (e) {
    res.send(e)
    });
    });


app.put('/updateAssignment/:id', function (req, res) {  
    uid = req.params.id.toString();
    console.log(uid);
    console.log(req.body);
    assignmentModel.findByIdAndUpdate(uid,req.body,{new: true}, (err,assignmentModel) => {
    res.send(assignmentModel);
    });
    });
///----------Get Value-----------//

app.get('/viewData', function(req, res){
    res.send(req.teach);
    console.log(req.body.first_name);
    console.log(req.teach);
})

app.get('/viewDataStudent',authStudent, function(req, res){
    res.send(req.student);
    console.log(req.body.first_name);
    console.log(req.student);
})

app.get("/viewStudent/:email", function(req,res){
    uid=req.params.email.toString();
    studentModel.find({'email':uid}).then(function (studentModel) {
    res.send(studentModel);
    }).catch(function (e) {
    res.send(e)
    });
    });

    app.get("/viewData/:id", function(req,res){
        uid = req.params.id.toString();
        studentModel.findById(uid).then(function (studentModel) {
         res.send(studentModel);
        }).catch(function (e) {
         res.send(e)
        });
        });   
 ////-------------Listen Port------------////
 
 app.listen(94);