// Populate database
require('./models/createusers.js');

// Dependencies
var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path');

// Use express
var app = express();

// Application settings
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// Set up routes
app.post('/authenticate', routes.authenticate);
app.get('/user/:city/:profession', routes.getUser);
app.get('/component-statuses', routes.getCompStatuses);
app.get('/files', routes.getFiles);

// Create server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
