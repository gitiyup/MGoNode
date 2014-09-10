var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    MongoClient = mongo.MongoClient;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
var client = new MongoClient(server);
var db;

// Open database connection
client.open(function(err, mongoclient) {
    if(!err) {
        db = mongoclient.db('userdb');
        console.log("Connected to 'userdb' database");
        db.collection('users', {strict:true}, function(err, collection) {
            if (err) {
                // Create users collection if it doesn't exist
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
    
var populateDB = function() {
    var users = [
                 {
                     userName : 'bcooper',
                     password : 'hungover',
                     firstName : 'Bradley',
                     lastName : 'Cooper',
                     age : 36,
                     city : 'Beverly Hills',
                     profession : 'Actor',
                     salary : 10000000,
                 },
                 {
                     userName : 'agarfield',
                     password : 'arachnophobia',
                     firstName : 'Andrew',
                     lastName : 'Garflied',
                     age : 26,
                     city : 'Hollywood',
                     profession : 'Actor',
                     salary : 8500000,
                 },
                 {
                     userName : 'estone',
                     password : 'goodjane',
                     firstName : 'Emma',
                     lastName : 'Stone',
                     age : 24,
                     city : 'Hollywood',
                     profession : 'Actress',
                     salary : 8500000,
                 },
                 {
                     userName : 'mbay',
                     password : 'octomus',
                     firstName : 'Michael',
                     lastName : 'Bay',
                     age : 45,
                     city : 'Malibu',
                     profession : 'Producer',
                     salary : 15000000,
                 },
                 {
                     userName : 'mscor',
                     password : 'octomus',
                     firstName : 'Martin',
                     lastName : 'Scorcese',
                     age : 68,
                     city : 'Newport Beach',
                     profession : 'Director',
                     salary : 12200000,
                 }
                ];
    
    // Insert users collection
    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });
 
};