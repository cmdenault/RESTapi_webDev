// an Express.js server that manages entities through the following endpoints

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser'); // bodyParser.json() middleware to ensure the request body contains JSON data.


var indexRouter = require('./routes/index'); 
var usersRouter = require('./routes/users'); 

var authors = require('./routes/authors') // gets the router from authors.js
var books = require('./routes/books')



var app = express(); // create app variable; express() creates an application for our server


//app.listen(3003); 
app.use(logger('dev')); 
app.use(express.json()); // looks for json inputs, so i can make an author obj in my console and stringify fetch it to test my commands
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 


app.use((req, res, next) => {
    const startTime = new Date()
    next()
    const endTime = new Date()
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/authors', authors); // any /author url will get sent to the author.js router
app.use('/books', books); // any /books url will get sent to the books.js router

module.exports = app; // exports our app for other files to use


/* 
npx express-generator --no-view (in an empty project folder, this will generate package.json, etc.)
npm install (our dependencies, like "start": "node ./bin/www" in scripts)
npm start (starts the server!)
*/

// when creating brand new proj. make folder and run these to generate neccesarry base files
// npx express-generator --no-view (uses express generator to make package.json)
// npm install (installs described dependencies, run if you add new ones as well)
// npm start to run  (http://localhost:3001 is URL)

// cmd C to stop server