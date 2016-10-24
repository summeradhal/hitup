var express = require('express');
var router = express.Router();

// 1. Connect to MongoDB.
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
// console.log(mongoClient);
var mongoUrl = 'mongodb://localhost:27017/hitup'
var db; //Global so all of our routes have access to the db connection



var bcrypt = require('bcrypt-nodejs');
var randToken = require('rand-token');

mongoClient.connect(mongoUrl, function(error, database){
    if(error){
        console.log(error); //Print out the error because there is one
    }else{
        db = database; //Set the database object that was passed back to our callback, to our global db.
        console.log("Connected to Mongo successfully.");
    }
});

// LOG IN --------------------------------------------------
router.post('/landing', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({'username': username}, function(err, docs) {
            if (err) {
                console.log("Error")
                console.log(err);
                res.json({
                    passFail: 0,
                    status: "Failed at findOne"
                });
            } else {
                if (docs == null) {
                    console.log("else docs")
                    console.log(docs);
                    res.json({
                        passFail: 0,
                        status: "Failed at findOne, doc is null"
                    });
                } else {
                    var passwordCheck = bcrypt.compareSync(password, docs.password);
                    console.log(passwordCheck);
                    if (passwordCheck) {
                        var token = randToken.generate(32);
                        console.log('token:' + token);
                        User.findOneAndUpdate({'_id': docs._id}, {$set: {'token': token}}, {upsert: true, new: true}, function(err, docs) {
                            console.log("password checked");
                            res.json({
                                passFail: 1,
                                status: "User found",
                                docs: docs
                            });
                        });
                    } else {
                            console.log("else pass")
                            res.json({
                                passFail: 0,
                                status: 'User name and password did not match.'
                            });
                    }
                }
            }                   
    });
}); //end of login router
// REGISTER --------------------------------------------------
router.post('/register', function(req, res, next) {
    var user = req.body.user;
    console.log(user);
    User.findOne({'username': user.username}, function (err, doc) {
            if (err) {
                console.log('error!');
                console.log(err);
                res.json({
                    passFail: 0,
                    status: "Failed at finding one" 
                });
            } else {
                if (doc == null) {
                    var newUser = new User({
                        username: user.username,
                        password: bcrypt.hashSync(user.password),
                        email: user.email,
                        first_name: user.fname,
                        last_name: user.lname
                    });
                    console.log(newUser);
                    newUser.save(function(err, saved, status) {
                        if (err) {
                            console.log(err);
                            res.json({
                                passFail: 0,
                                status: "Registration failed."
                            });
                        } else {
                            console.log(saved);
                            res.json({
                                passFail: 1,
                                status: "Registered!",
                                docs: saved,
                                token: token
                            });
                        }
                    });
                } else {
                    res.json({
                        passFail: 0,
                        status: "Found a match. Try a different username."
                    });
                }
            }
    });
});  // END OF REGISTER

module.exports = router;