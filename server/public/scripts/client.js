console.log('Client Loaded');

$(handleReady)

let operator;

function handleReady() {
    console.log('JQuery Loaded');
    $('.operator').on('click', handleOperator);
    $('#submit').on('click', handleSubmit);
    $('#submit').on('click', getHistory);
    $('#clear').on('click', handleClear);
}; // end handleReady

function getCalculation() {
    console.log('Getting calculation');

    $.ajax({
        url: '/calculation',
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        renderResults(response)
    }).catch(function (error) {
        console.log(error);
        alert('ERROR IN GET')
    })

};// end getCalculation

function handleClear() {
    $('input').val('');
}; // end handleClear

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
    }).then(function (response) {
        console.log(response);

        getCalculation();

        $('input').val('')
    })
}; // end handleSubmit

function handleHistory() {
    console.log('Getting history...');

    $.ajax({
        url: '/history',
        method: 'POST',
        data: {
            showHistory: 'yes'
        }
    }).then(function (response) {
        console.log(response);
        getHistory();
    })

}; // end handleHistory

function getHistory() {
    console.log('Getting history');

    $.ajax({
        url: '/history',
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        //clear history to not double-up
        $('#history').empty();
        // loop history array and append all history to DOM
        for (calculation of response) {
            $('#history').append(`<li>${calculation.firstNumber} ${calculation.operator} 
            ${calculation.secondNumber} = ${calculation.result}</li>`)
        }
    }).catch(function (error) {
        console.log(error);
        alert('ERROR IN HISTORY GET')
    })

}; // end getHistory

function renderResults(results) {
    console.log(results);
    //show results on DOM
    $('#answer').empty();
    $('#answer').append(`<li>${results}</li>`);
};// end renderResults