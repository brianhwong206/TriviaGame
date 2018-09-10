$(document).ready(function() {

//variables
var counter = 0 // time increment variable
var timeLeft = 30; // start value for remaining time
var intervalId;
var totalGuesses = 0; // counter for if a question was attempted

var selectedArray = [];
var tempAnswer; // variable that temporarily holds the user selected input during for loop and is passed to user's answer array.
var answerArray = ["Hartsfield-Jackson Atlanta International Airport", "Airbus A380-800", "Daocheng Yading Airport", "Auckland to Doha", "Singapore Changi International Airport"];
var scoreArray = [];

$("#start").on("click", start); // button to start the timer
$("#pause").on("click", pause); // button to pause the timer
$("#resume").on("click", run); // button to resume the timer
$("#reset-timer").on("click", resetTimer); // button to resume the timer
$("#submit").on("click", submit); // button to resume the timer
$("#reset").on("click", reset); // button to reset radio buttons and timer 


//functions 
function run() { // function that executes the timer
    clearInterval(intervalId); // clears any initial interalID
    intervalId = setInterval(increment, 1000); // intervalId is assigned to setInterval with increment function and 1000 millisecond intervals as parameters)
}

function increment() {
    if (timeLeft > counter){ // condition only runs if the timeLeft value is greater than the counter value
    counter++; // counter counts up to timeLeft value
    $("#timer").html("<h2>" + (timeLeft - counter) + " seconds left " + " </h2>"); // displays the time remaining on html
    }
    else if (timeLeft == counter){ 
        pause();
        $("#timer").html("<h2>" + " Time's Up " + " </h2>"); // display's Time's Up on html
        storeUserSelection();
        checkAnswer();
        console.log(selectedArray); // prints user answers in an array.
    }
}

function pause() {
    clearInterval(intervalId);
}
function start(){
    run();
    $(".questions-container").css("visibility", "visible");
    $(".submit-container").css("visibility", "visible");
}

function storeUserSelection(){
    for (var i=1; i < 6; i++) {
        tempAnswer = $("input[name=q" + i + "]:checked"); // stores user selected radio button into tempAnswer variable
        selectedArray.push(tempAnswer.val()); // adds tempAnswer.val to user selected array
        if (tempAnswer.length > 0){ // checks to see if a radio button was selected
            totalGuesses++;
        }
        else {
            $("#card-selected-q" + i).html("No radio button selected");
        }
        $("#card-answer-q" + i).html(answerArray[(i-1)] + " is the correct answer.");
    }
}

function checkAnswer(){ // a new array is created to tally up the score

    for (var j = 0; j < answerArray.length; j++) {
        if (selectedArray[j] == answerArray[j]){ // comparing two arrays index 0 to index 0, index 1 to index 1
            scoreArray.push(1); // score one if correct
        }
        else{
            scoreArray.push(0); // score zero if incorrect
        }
    }

    totalScore = scoreArray.reduce(function(a,b){ // total score reduces the scoreArray to a sum total
        return a + b ;
    },0);
    console.log(scoreArray); // prints the score Array
    console.log(totalScore); // prints the total score variable
}

function resetTimer(){
    $("#timer").html("<h2>" + "30 seconds left" + "</h2>");
    counter = 0
    run();
}

function submit(){
    pause();
    storeUserSelection();
    checkAnswer();
}

function reset(){
    pause();
    counter = 0;
    $("#timer").html("<h2>" + "30 seconds left" + "</h2>");
    $(".questions-container").css("visibility", "hidden");
    $('.radio-button').prop('checked', false);
}

})
