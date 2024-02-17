var express = require('express');
var todocontroller = require('./controllers/todocontroller');
var app = express();

//set up template engine
app.set('view engine','ejs')

//static files
app.use(express.static('./public'));

//fire contrillers
todocontroller(app);

//listen to port
app.listen(3000);
console.log('You are connected to port 3000');