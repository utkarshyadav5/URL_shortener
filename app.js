var express = require('express');
var path = require('path')
var urlController = require(path.join(__dirname,'controllers/urlController'));

var app = express();

//static files
app.use(express.static(path.join(__dirname,'public')));

// firing controller
urlController(app);

app.listen(3000,function(){
    console.log('You are listening to port 3000');
});
