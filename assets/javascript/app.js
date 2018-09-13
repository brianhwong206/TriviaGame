$(document).ready(function() {

//variables
var counter = 0 // time increment variable
var timeLeft = 60; // start value for remaining time
var intervalId;
var totalGuesses = 0; // counter for if a question was attempted
var tempAnswer; // variable that temporarily holds the user selected input during for loop and is passed to user's answer array.
var selectedArray = []; // array to hold the user selected radio buttons
var answerArray = ["Hartsfield-Jackson Atlanta International Airport", "Airbus A380-800", "Daocheng Yading Airport, China", "Auckland, New Zealand to Doha, Qatar", "Singapore Changi Airport", "Singapore Airlines", "Boeing 737", "Hong Kong International Airport", "Chicago O'Hare International Airport", "San Francisco International Airport"]; // answer array 
var superArray=[
    ["What is the world's busiest airport by passenger traffic as of 2017?", ["Beijing Capital International Airport", "Dubai International Airport", "Hartsfield-Jackson Atlanta International Airport", "Los Angeles International Airport", "Tokyo Haneda International Airport"], "https://www.cnn.com/travel/article/worlds-busiest-airports-preliminary-2017/index.html", "Hartsfield-Jackson Atlanta International Airport"],
    ["What is the largest passenger aircraft currently in operation as of 2018?", ["Airbus Airbus A350-1000", "Airbus A380-800", "Boeing 747-8", "Boeing 777-300", "Boeing 787-800"], "https://www.aviationcv.com/aviation-blog/2015/top-largest-passenger-aircraft", "Airbus A380-800"],
    ["Which airport operates at the highest altitude as of 2018?", ["Daocheng Yading Airport, China", "El Alto International Airport, Peru", "Kangding Airport, China", "Ngari Gunsa Airport, China", "Qamdo Bamda Airport, China"], "https://www.airport-technology.com/features/feature-the-top-10-highest-altitude-airports-in-the-world", "Daocheng Yading Airport, China"],
    ["What is the longest active non-stop flight in the world as of Spring 2018?", ["Auckland, New Zealand to Doha, Qatar", "Auckland, New Zealand to Dubai, United Arab Emirates", "Houston, United States to Sydney, Australia", "Perth, Australia to London, England", "Singapore, Singapore to Los Angeles, United States"], "https://www.airfarewatchdog.com/blog/44252012/10-longest-nonstop-flights-in-the-world", "Auckland, New Zealand to Doha, Qatar"],
    ["Which airport won Skytrax's Best Airport in the World award in 2018?", ["Doha Hamad International Airport", "Hong Kong International Airport", "London Heathrow International Airport", "Seoul Incheon International Airport", "Singapore Changi Airport"], "https://www.cnn.com/travel/article/worlds-best-airports-2018/index.html", "Singapore Changi Airport"],
    ["Which airline won Skytrax's Best Airliner in the World award in 2018?", ["ANA All Nippon Airways", "Cathay Pacific Airways", "Emirates", "Qatar Airways", "Singapore Airlines"], "https://www.independent.co.uk/travel/news-and-advice/best-airlines-world-singapore-easyjet-lufthansa-skytax-awards-2018-a8452371.html"],
    ["What is the most successful selling jet aircraft in history?", ["Airbus A320", "Boeing 737", "Boeing 777", "Cessna 172", "McDonnell Douglas MD-80"], "https://www.telegraph.co.uk/travel/comment/the-most-popular-plane-ever-made", "Boeing 737"],
    ["What is the busiest airport in terms of total cargo handled in 2017?", ["Hong Kong International Airport", "Incheon International Airport", "Memphis International Airport", "Shanghai Pudong International Airport", "Ted Stevens Anchorage International Airport"], "http://www.airport-world.com/news/aci-news/6601-aci-figures-reveal-the-world-s-busiest-passenger-and-cargo-airports.html", "Hong Kong International Airport"],
    ["Which US airport has most runways as of 2017?", ["Boston Logan International Airport", "Chicago O'Hare International Airport", "Dallas-Ft. Worth International Airport", "Denver International Airport", "Hartsfield-Jackson Atlanta International Airport"], "http://www.boldmethod.com/blog/lists/2014/09/9-us-airports-with-the-most-runways", "Chicago O'Hare International Airport"],
    ["Which US airport experienced the most weather-related delays and delayed departures in 2017?", ["Chicago O’Hare International Airport", "John F. Kennedy International Airport", "Newark Liberty International Airport", "New York LaGuardia Airport", "San Francisco International Airport"], "https://www.rd.com/culture/most-weather-delayed-airports", "San Francisco International Airport"]
]; // superArray consists of [question, [selection-options], source, answer]
var scoreArray = []; // array to hold ones or zeros if the users got the correct answer
var accuracy; // percentage of correct answers divide by total questions attempted
var totalScore; // variable to hold the final  accuracy percentage
var questionTitle; // variable to add check or times mark next to question if correct or incorrect

// click actions
$("#start").on("click", start); // button to start the timer
$("#pause").on("click", pause); // button to pause the timer
$("#resume").on("click", run); // button to resume the timer
$("#reset-timer").on("click", resetTimer); // button to resume the timer
$("#submit").on("click", submit); // button to resume the timer
$("#reset").on("click", reset); // button to reset all radio buttons and timer 

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
        storeUserSelection();
        checkAnswer();
        window.scrollTo(0, 0); // jump to top of page
        if (totalGuesses>0){
            displayResult();
        }
        else {
            displayResultNoAttempt();
        }
        //$("#timer").html("<h2>" + " Time's Up. " + "Your score is " + accuracy + "%" + " </h2>"); // display's Time's Up on html
    }
}

function pause() {
    clearInterval(intervalId); 
}

function start(){
    run();
    $(".questions-container").css("display", "block"); // when start button is clicked, questions container is displayed
    $(".submit-container").css("display", "block"); // when start button is clicked, submit container is displayed
    $("#start").css("visibility", "hidden"); // start button will hide when the trivia quiz starts
    window.scrollTo(0, 0); // jump to top of page
}

function storeUserSelection(){
    for (var i=1; i < (answerArray.length + 1); i++) {
        tempAnswer = $("input[name=q" + i + "]:checked"); // stores user selected radio button into tempAnswer variable
        selectedArray.push(tempAnswer.val()); // adds tempAnswer.val to user selected array
        if (tempAnswer.length > 0){ // checks to see if a radio button was selected
            totalGuesses++;
            //$("#card-selected-q" + i).html(selectedArray[(i-1)] + " is the option you have selected.");
            $("#card-answer-q" + i).html(answerArray[(i-1)] + " is the correct answer.");
        }
        else {
            $("#card-selected-q" + i).html("No attempt made." + " " + '<i class="far fa-meh-blank"></i>');
        }
    }
}

function checkAnswer(){ // a new array is created to tally up the score, add visual marker when scoring answers

    for (var j = 0; j < answerArray.length; j++) {
        if (selectedArray[j] == answerArray[j]){ // comparing two arrays index 0 to index 0, index 1 to index 1
            scoreArray.push(1); // score one if correct
            questionTitle = $("#card-header"+(j+1)).attr("data-value");
            $("#card-header"+(j+1)).html(questionTitle + " " + '<i class="far fa-grin-wink"></i>'); // adds green smile if user selected correct answer
            $("#card-source-q" + (j+1)).css("display", "block"); // display source of trivia
        }
        else if (selectedArray[j] == null){
            scoreArray.push(0); // score zero if incorrect
            questionTitle = $("#card-header"+(j+1)).attr("data-value");
            $("#card-header"+(j+1)).html(questionTitle + " " + '<i class="far fa-question-circle"></i>'); // adds question mark if user made no attempt
        }
        else{ 
            scoreArray.push(0); // score zero if incorrect
            questionTitle = $("#card-header"+(j+1)).attr("data-value");
            $("#card-header"+(j+1)).html(questionTitle + " " + '<i class="far fa-frown-open"></i>'); // adds red frown mark if user selects incorrect answer
            $("#card-source-q" + (j+1)).css("display", "block"); // display source of trivia
        }
    }
    totalScore = scoreArray.reduce(function(a,b){ // total score reduces the scoreArray to a sum total
        return a + b ;
    },0);
    accuracy = (((totalScore)/totalGuesses)*100).toFixed(2);
    
    console.log("User score array: " + scoreArray); // prints the score Array
    console.log("Total Score: " + totalScore); // prints the total score variable
    console.log("Total Guesses: " + totalGuesses); // prints the total guesses variable
    console.log("Accuracy: " + accuracy + "%"); // prints the total guesses variable
    console.log("User Selection: " + selectedArray); // prints user answers in an array.
}

function resetTimer(){
    $("#timer").html("<h2>" + timeLeft + " seconds left" + "</h2>");
    counter = 0
    run();
}

function submit(){
    pause();
    storeUserSelection();
    checkAnswer();
    window.scrollTo(0, 0); // jump to top of page
    if (totalGuesses>0){
        displayResult();}
    else {
        displayResultNoAttempt()
    }
}

function reset(){
    pause(); // pauses the timer
    scoreArray = []; // empties out the score array
    selectedArray = []; // empties out the user selected items array
    totalScore = 0; // resets total score to 0
    totalGuesses = 0; // resets user total guess to 0
    counter = 0; // resets counter back to 0
    $("#timer").html("<h2>" + timeLeft + " seconds left" + "</h2>"); // timer countdown is reset
    $(".questions-container").css("display", "none"); // questions container will not be displayed if reset
    $(".submit-container").css("display", "none"); // submit container will not be displayed if reset
    $("#start").css("visibility", "visible", "text-align", "center",); // start button will be unhidden if reset
    $('.radio-button').prop('checked', false); // unchecks all radio buttons if reset

    for (var k=1; k < (answerArray.length + 1); k++){ // for loop that clears out all selected items, answers, check/times icons presented
        $("#card-selected-q" + k).html(""); // populates the target with blank
        $("#card-answer-q" + k).html(""); //populates the target with blank
        questionTitle = $("#card-header"+(k)).attr("data-value");
        $("#card-header"+(k)).html(questionTitle); // returns question title to original state
    }
    $(".card-source").css("display", "none"); // hides the source
}

function displayResult(){
    $("#timer").html("<h2>" + "Your score is " + accuracy + "%. </h2> <br>" + " <h5> You got " + totalScore  + " question(s) correct out of " + totalGuesses + " question(s) attempted. </h5>");
}

function displayResultNoAttempt(){
    $("#timer").html("<h2>" + "You did not attempt the trivia." + " " + '<i class="fas fa-sad-tear"></i>' + "</h2>");
}

})
