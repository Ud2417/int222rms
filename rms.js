var express               = require("express"),
app                   = express(),
bodyParser            = require('body-parser'),
fileUpload            = require('express-fileupload'),
Student   = require("./models/students"),
User       = require("./models/user"),
bodyParser  = require("body-parser"),
mongoose    = require("mongoose"),
mongoXlsx   = require('mongo-xlsx'),
RegistrationNo  = require("RegistrationNo"),
LocalStrategy    = require("RegistrationNo-local"),
LocalMongoose   = require("local-mongoose");
const session   = require('express-session');
var MongoStore = require("connect-mongo")(session);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/myView");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
secret: "your favorite colour",
resave: false,
saveUninitialized: false,
store: new MongoStore({ mongooseConnection: mongoose.connection }),
cookie: { maxAge: 180 * 60 *1000 }
}));

app.use(express.static(__dirname + "/public"));
app.use(RegistrationNo.initialize());
app.use(RegistrationNo.session());
app.use(fileUpload());
var model = null;
RegistrationNo.use(new LocalStrategy(User.authenticate()));
RegistrationNo.serializeUser(User.serializeUser());
RegistrationNo.deserializeUser(User.deserializeUser());
app.get("/", function(req ,res){
    res.render("index");
});

app.get("/staff-home", function(req, res){
    res.render("staff-home");
});
app.post("/staff-home", RegistrationNo.authenticate("local", {
    failureRedirect: "/staff-home"
}) ,function(req, res){
    console.log("ho");
    res.redirect("my-user-profile/"+req.user._id);
});

app.get("/teacher-reg", function(req, res){
    res.render("teacher-reg");
});
app.post("/teacher-reg", function(req, res, next){
    User.register(new User(
        {
            username: req.body.username
        }), req.body.password, function(err, user){

        if(err){
            console.log(err);
            return res.render('teacher-reg');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/my-user-profile/"+req.user._id);
        });
    });
});
app.get("/my-user-profile/:id", function(req, res){

    User.findById(req.params.id, function(err, foundUserMy){
        if(err){
                console.log(err);
            }else{
                console.log(foundUserMy);
                res.render("my-user-profile", {foundUser: foundUserMy});
            }
    });
});
app.post("/batch-add/:id", function(req, res){
    var array_batch = { "batch": req.body.batch, "subject": req.body.subject, "sem": req.body.sem};
    User.findById(req.params.id, function(err, foundUserMy){
        if(err){
                console.log(err);
            }else{
                console.log(foundUserMy);
                foundUserMy.batch.push(array_batch);
                foundUserMy.save();
                res.redirect("/my-user-profile/"+req.user._id);
            }
    });
});

app.get("/staff-mark-view/:batch/:subject/:sem", function(req, res){
    var sem_var = req.params.sem;
    if(sem_var == "SEM1"){
        var query = Student.find({'BATCH': req.params.batch}).select('SEM1 REGNO NAME BATCH');
        query.exec(function (err, someValue) {
            if (err) console.log(err);
            console.log(someValue);
            var subject = req.params.subject;
            console.log("--->");
            someValue.subject = subject;
            console.log(someValue.subject);
            res.render("students-edit-view",{foundStudent: someValue});
        });
    }else if(sem_var == "SEM2"){
        var query = Student.find({'BATCH': req.params.batch}).select('SEM2 REGNO NAME BATCH');
        query.exec(function (err, someValue) {
            if (err) console.log(err);
            console.log(someValue);
            var subject = req.params.subject;
            console.log("--->");
            someValue.subject = subject;
            console.log(someValue.subject);
            res.render("students-edit-view-2s",{foundStudent: someValue});
        });
    }
    else if(sem_var == "SEM3"){
        var query = Student.find({'BATCH': req.params.batch}).select('SEM3 REGNO NAME BATCH');
        query.exec(function (err, someValue) {
            if (err) console.log(err);
            console.log(someValue);
            var subject = req.params.subject;
            console.log("--->");
            someValue.subject = subject;
            console.log(someValue.subject);
            res.render("students-edit-view-3s",{foundStudent: someValue});
        });
    }
    else if(sem_var == "SEM4"){
        var query = Student.find({'BATCH': req.params.batch}).select('SEM4 REGNO NAME BATCH');
        query.exec(function (err, someValue) {
            if (err) console.log(err);
            console.log(someValue);
            var subject = req.params.subject;
            console.log("--->");
            someValue.subject = subject;
            console.log(someValue.subject);
            res.render("students-edit-view-4s",{foundStudent: someValue});
        });
    }
    else if(sem_var == "SEM5"){
        var query = Student.find({'BATCH': req.params.batch}).select('SEM5 REGNO NAME BATCH');
        query.exec(function (err, someValue) {
            if (err) console.log(err);
            console.log(someValue);
            var subject = req.params.subject;
            console.log("--->");
            someValue.subject = subject;
            console.log(someValue.subject);
            res.render("students-edit-view-5s",{foundStudent: someValue});
        });
    }
    else if(sem_var == "SEM6"){
        var query = Student.find({'BATCH': req.params.batch}).select('SEM6 REGNO NAME BATCH');
        query.exec(function (err, someValue) {
            if (err) console.log(err);
            console.log(someValue);
            var subject = req.params.subject;
            console.log("--->");
            someValue.subject = subject;
            console.log(someValue.subject);
            res.render("students-edit-view-6s",{foundStudent: someValue});
        });
    }
    else if(sem_var == "SEM7"){
        var query = Student.find({'BATCH': req.params.batch}).select('SEM7 REGNO NAME BATCH');
        query.exec(function (err, someValue) {
            if (err) console.log(err);
            console.log(someValue);
            var subject = req.params.subject;
            console.log("--->");
            someValue.subject = subject;
            console.log(someValue.subject);
            res.render("students-edit-view-7s",{foundStudent: someValue});
        });
    }
    else if(sem_var == "SEM8"){
        var query = Student.find({'BATCH': req.params.batch}).select('SEM8 REGNO NAME BATCH');
        query.exec(function (err, someValue) {
            if (err) console.log(err);
            console.log(someValue);
            var subject = req.params.subject;
            console.log("--->");
            someValue.subject = subject;
            console.log(someValue.subject);
            res.render("students-edit-view-8s",{foundStudent: someValue});
        });
    }
    
});
app.post("/staff-mark-view/student-grade-change", function(req, res){
    var name_tmp = req.body.changeSub; 
    var changeSem_tmp = req.body.changeSem;
    var myQuery = { 
        _id: req.body.changeId,
    };
    var changeSem_tmp = req.body.changeSem;
    var changeGrade_tmp = req.body.changeGrade;
    var changeSetValue = changeSem_tmp+"."+name_tmp;
    console.log("--------");
    console.log(changeSetValue);
    var setVar = {};
    var name = changeSetValue;
    setVar[name] = changeGrade_tmp;
    console.log(setVar);

    var newvalues = { $set: setVar};
    console.log(newvalues);
    Student.updateOne(myQuery, newvalues, function(err, res){
        if(err) console.log(err);
        console.log("SEM Grade Maupulated accordingly");
        console.log(res);
        
    });
    res.send("hi");
   res.redirect("/my-user-profile/"+req.user._id);
});
app.get("/staff-upload", function(req, res){
    res.render("staff-upload");
});

app.post("/staff-upload", function(req, res){
    if (!req.files)
    return res.status(400).send('No files were uploaded.');
    req.files.xlsxfile.mv('public/files/filename.xlsx', function(err) {
        if (err)
          return res.status(500).send(err);
     
        res.send('File uploaded!');
    });

    mongoXlsx.xlsx2MongoData('public/files/filename.xlsx', model, function(err, mongoData) {
    console.log('Mongo data:', mongoData[1]);
    var model = mongoXlsx.buildDynamicModel(mongoData);
    console.log(model);
    mongoData.forEach(function(entry) {
        console.log(entry);
        var stu = new Student(entry);
        stu.save(function(err, result){
        if(err){
            console.log(err);
        }else{}
    });
    });
    
    });
    
});
app.get("/user-roll-get",function(req, res){
    res.render("user-roll-get");
});

app.post("/user-roll-get", function(req, res){

    Student.find({'REGNO': req.body.regno}, function(err, lancer){
        if(err){
            console.log(err);
        }else {
            console.log(lancer);
            console.log(req.body.regno);
            res.render("student-info",{info: lancer});
        }
    });
});
app.get("/help-line", function(req, res){
res.render("help-line");
});
app.listen(3300, function(){
console.log("The Server Has Started at 3300");
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Server Has Started");
});
