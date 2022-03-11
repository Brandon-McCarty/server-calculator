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
app.use(bodyParser.urlencoded({extended: true}));

app.post('/calculation', function(req, res) {
    console.log('POST /calculation', req.body);
    history.push(req.body);
    calculator(req.body);
    res.sendStatus(201);
})

app.get('/calculation', function(req, res) {
    console.log('GET /calculation');
    res.send(`${result}`);
})

function calculator (calculation) {
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
}



//start server
app.listen(PORT, function() {
    console.log('Server running on port', PORT);    
})