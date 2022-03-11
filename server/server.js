// require express and bodyParser
const express = require('express');
const bodyParser = require('body-parser');

//set up server
const app = express();
const PORT = 5000;

//server static files
app.use(express.static('server/public'));

//body parser config
app.use(bodyParser.urlencoded({extended: true}));









//start server
app.listen(PORT, function() {
    console.log('Server running on port', PORT);    
})