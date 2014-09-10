var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost:27017/userdb');
var UserSchema = require('../models/user.js').UserSchema;
var User = db.model('users', UserSchema);
var fs = require('fs');

/**
 * POST /authenticate
 *   Authenticates a user name and password.
 
 * Request Body:
 * { userName: <user_name>, password: <password> }
 * 
 * Response Body:
 * { authenticated: true | false }
 */
exports.authenticate = function(req, res) {
    User.findOne(req.body, function(err, user) {
        if (err) {
            return console.log(err);
        } else if (!user){
            // return false if user not found
            res.json({authenticated: false});            
        } else {
            if(req.body.password === user.password) {
                // return true if user found and password matches
                res.json({authenticated: true});
            } else {
                // return false is password mismatch
                res.json({authenticated: false});
            }
        }
    });
};

/**
 * GET /user/{city}/{profession}
 *   Gets a user filtered by city and grouped by profession
 
 * URL Parameters:
 *   city - city string value to filter by
 *   profession - profession string value to group by
 * 
 * Response Body:
 * { <profession>: [{ firstName: <firstName>, lastName: <lastName>, city: <city> }, ...] }
 */
exports.getUser = function(req, res) {
    User.find({city: req.param('city'), profession: req.param('profession')}, 'firstName lastName city', function(err, users) {
        if(err) {
            return console.log(err);
        } else {
            var ret = {};
            ret[req.param('profession')] = users;
            res.json(ret);
        }
    });
};

/**
 * GET /files
 *   Returns list of files in given directory
 
 * Query Parameters:
 *   directory - directory path to list
 *   
 * Response Body:
 * [ file_name, ...]
 */
exports.getFiles = function(req, res) {
    fs.readdir(req.query.directory, function(err, files) {
        res.send(files);
    });
};

/**
 * GET /component-statuses
 *   Returns the status of dependent components (just Mongo DB)
 
 * Response Body:
 * { mongodbStatus: OK | Bad, errorDetails: <error_details_message> }
 * 
 * Note:
 * errorDetails in response if mongodbStatus: Bad
 */
exports.getCompStatuses = function(req, res) {
    var testUser = {
            userName : 'SuperTester',
            password : 'kryptonite',
            firstName : 'Clark',
            lastName : 'Kent',
            age : 100,
            city : 'Metropolis',
            profession : 'superhero',
            salary : 10
    };
    
    var user = new User(testUser);
    user.save(function(err, user) {
       if(err) {
           console.log(err);
           res.json(500, {mongodbStatus: 'Bad', errorDetails: 'Mongo DB Error: Cannot save data'});
       } else {
           // Insert passed. Now find it.
           User.findOne(testUser, function(err, foundUser) {
               if(err) {
                   console.log(err);
                   res.json(500, {mongodbStatus: 'Bad', errorDetails: 'Mongo DB Error: Cannot retrieve data'});
               } else {
                   // Find passed. Now remove it.
                   foundUser.remove(function(err) {
                       if(err) {
                           console.log(err);
                           res.json(500, {mongodbStatus: 'Bad', errorDetails: 'Mongo DB Error: Cannot delete data'});
                       } else {
                           // Remove passed. Return OK.
                           res.json({mongodbStatus: 'OK'});
                       }
                   });
               }
           });
       }
    });
};