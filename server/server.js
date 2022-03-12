// require express and bodyParser
const express = require('express');
const bodyParser = require('body-parser');

let history = [];
let result;

//set up server
const app = express();
const PORT = 5000;

//server static files
app.use(express.static('server/public'));

//body parser config
app.use(bodyParser.urlencoded({ extended: true }));

function calculator(calculation) {
    // run appropriate calculation
    if (calculation.operator == '+') {
        result = Number(calculation.firstNumber) + Number(calculation.secondNumber);
    } else if (calculation.operator == '-') {
        result = Number(calculation.firstNumber) - Number(calculation.secondNumber)
    } else if (calculation.operator == '/') {
        result = Number(calculation.firstNumber) / Number(calculation.secondNumber)
    } else if (calculation.operator == '*') {
        result = Number(calculation.firstNumber) * Number(calculation.secondNumber)
    }
};

app.post('/calculation', function (req, res) {
    console.log('POST /calculation', req.body);
    // run calculation of request
    calculator(req.body);
    //set result key equal to the result of the calculation
    req.body.result = result;
    // push all needed equation information into history array
    history.push(req.body);
    //send response status
    res.sendStatus(201);
    //display updated object with result
    console.log(req.body);
    
});

app.get('/calculation', function (req, res) {
    console.log('GET /calculation');
    // send result of latest calculation
    res.send(`${result}`);
});

app.post('/history', function(req, res) {
    console.log('POST /history');
    if (req.body.showHistory === 'yes') {
        res.sendStatus(200);
    } else {
        res.sendStatus(401)
    }
    
});

app.get('/history', function(req, res) {
    console.log('GET /history');
    //send history to client
    res.send(history)    
});



//start server
app.listen(PORT, function () {
    console.log('Server running on port', PORT);
});