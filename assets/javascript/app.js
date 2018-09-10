$(document).ready(function() {

//variables
var counter = 0 // increment variable
var timeLeft = 30; // start value for remaining time
var intervalId;
var totalGuesses = 0; // counter for if a question was attempted

var selectedArray = [];
var tempAnswer;
var answerArray = ["Hartsfield-Jackson Atlanta International Airport", "Airbus A380-800", "Daocheng Yading Airport", "Auckland to Doha", "Singapore Changi International Airport"];
var scoreArray = [];

$("#start").on("click", start); // button to start the timer
$("#pause").on("click", pause); // button to pause the timer
$("#resume").on("click", run); // button to resume the timer
$("#reset-timer").on("click", resetTimer); // button to resume the timer
$("#cheat-mode").on("click", cheatMode); // cheat mode to display timing controls


//functions 
function run() { // function that executes the timer
    clearInterval(intervalId); // clears any initial interalID
    intervalId = setInterval(increment, 1000); // intervalId is assigned to setInterval with increment function and 1000 millisecond intervals as parameters)
}

function increment() {
    if (timeLeft > counter){
    counter++;
    $("#timer").html("<h2>" + (timeLeft - counter) + " seconds left " + " </h2>");
    }
    else if (timeLeft == counter){
        pause();
        $("#timer").html("<h2>" + " Time's Up " + " </h2>");

        for (var i=1; i < 6; i++) {
            tempAnswer = $("input[name=q" + i + "]:checked");
            selectedArray.push(tempAnswer.val());
            if (tempAnswer.length > 0){
                totalGuesses++;
            }
            else {
                $("#card-selected-q" + i).html("No radio button selected");
            }
            $("#card-answer-q" + i).html(answerArray[(i-1)] + " is the correct answer.");
        }

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

function cheatMode(){
    $("#collaspeCheatMode").css("display","flex");
}

function checkAnswer(){

    for (var j = 0; j < answerArray.length; j++) {
        if (selectedArray[j] == answerArray[j]){
            scoreArray.push(1);
        }
        else{
            scoreArray.push(0);
        }
    }

    totalScore = scoreArray.reduce(function(a,b){
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

})
