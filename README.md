# MGoNode
Implemented using Node JS Express and Mongoose JS as Mongo DB client.  Node JS Express and Mongoose JS seemed like the best choice for implementing the prescribed 4 RESTful JSON API's


## Installation and Startup
- Node JS and NPM must be installed and ready to run.
- Make sure Mongo DB server is also installed locally and running on port 27017.
- In MGoNode base directory, run "npm install"
- Run app with "node app.js"


## Usage

### Endpoint 1
POST /authenticate
  Authenticates a user name and password.
 
Request Body:
  { userName: <user_name>, password: <password> }
 
Response Body:
  { authenticated: true | false }


### Endpoint 2
GET /user/{city}/{profession}
  Gets a user filtered by city and grouped by profession
 
URL Parameters:
  city - city string value to filter by
  profession - profession string value to group by

Response Body:
  { <profession>: [{ firstName: <firstName>, lastName: <lastName>, city: <city> }, ...] }
  

### Endpoint 3
GET /files
  Returns list of files in given directory
 
Query Parameters:
  directory - directory path to list
  
Response Body:
  [ file_name, ...]


### Endpoint 4
GET /component-statuses
  Returns the status of dependent components (just Mongo DB)
 
Response Body:
  { mongodbStatus: OK | Bad, errorDetails: <error_details_message> }
   
Note:
  errorDetails in response if mongodbStatus: Bad



## Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
