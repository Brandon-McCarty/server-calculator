console.log('Client Loaded');

$(handleReady)

let operator;

function handleReady() {
    console.log('JQuery Loaded');
    $('.operator').on('click', handleOperator);
    $('#submit').on('click', handleSubmit)
}

function getCalculation() {
    console.log('Getting calculation');

    $.ajax({
        url: '/calculation',
        method: 'GET'
    }).then(function(response) {
        console.log(response);
        renderResults(response)
    }).catch(function(error) {
        console.log(error);
        alert('ERROR IN GET')
    })
    
};

function handleOperator() {
    console.log($(this).data().operator);
    //assign operator for calculation
    if ($(this).data().operator == '+') {
        operator = '+';
    } else if ($(this).data().operator == '-') {
        operator = '-';
    } else if ($(this).data().operator == '*') {
        operator = '*';
    } else if ($(this).data().operator == '/') {
        operator = '/';
    }
}; // end handleOperator

function handleSubmit() {
    console.log('Submitting calculation....');


    
    $.ajax({
        url: '/calculation',
        method: 'POST',
        data: {
            firstNumber: $('#numOne').val(),
            secondNumber: $('#numTwo').val(),
            operator: `${operator}`,
            result: 0
        }
    }).then(function(response) {
        console.log(response);

        getCalculation();

        $('input').val('')
    })
}; // end handleSubmit

function renderResults(results) {
    console.log(results);
    //show results on DOM
    $('#answer').append(`<li>${results}</li>`)
}