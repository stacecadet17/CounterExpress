// EXPRESS MODULE
var express = require("express");
var app = express();

//BODY PARSER
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


// SESSION
var session = require('express-session');
var app = express();
app.use(session({secret: 'codingdojorocks'}));  // string for encryption



// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');



app.get('/', function (req, res){
    if(req.session.counter){
      console.log("starting count");
      req.session.counter++;
    }
    else{
      req.session.counter = 1;
    }
    res.render('counts', {'count': req.session.counter});
});

// app.get('/add', function(req, res){
//     req.session.counter++;
//     res.redirect('/');
// });
//
// app.get('/reset', function(req, res){
//   req.session.count = 0;
//   res.redirect('/');
// });

// route to process new user form data:
app.post('/reset', function (req, res){
    req.session.counter = 0;
    console.log("POST DATA \n\n", req.body)
    //code to add user to db goes here!
    // redirect the user back to the root route.
    res.redirect('/')
});

app.post('/add', function (req, res){
    req.session.counter++;
    console.log("POST DATA \n\n", req.body)
    //code to add user to db goes here!
    // redirect the user back to the root route.
    res.redirect('/')
});



app.listen(8000, function() {
  console.log("listening on port 8000");
})
// this line will almost always be at the end of your server.js file (we only tell the server to listen after we have set up all of our rules)
