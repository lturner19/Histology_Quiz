var startButton = document.getElementById("start-btn");
var introText = document.getElementById("welcome");
var elQuestion = document.getElementById("question-container");
var timeLeft = 75;
var currentQuestion = 0;
var quizArray = [{
    question: "Commonly used data types do Not include:",
    choice: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
},
{
    question: "The condition in an if/else statement is enclosed within _____",
    choice: ["quotes", "curly brackets", "parentheses", "space brackets"],
    answer: "curly brackets"
},
{
    question: "The Arrays in JavaScript can be used to store _____",
    choice: ["numbers and strings", "other arrays", "all of the above"],
    answer: "all of the above"
},
{
    question: "String values must be enclosed within __ when being assigned to variables.",
    choice: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
},
{
    question: "A very useful tool used during development and debugging for printing content to the debugger is",
    choice: ["JavaScript", "terminal/bash", "for loops", "console log"],
    answer: "console log"
},
{
    question: "What is a variable used for ?",
    choice: ["Store data", "Create functions", "Style HTML", "Create elements"],
    answer: "Store data"
}
]

startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", setTime);
var main = document.getElementById("question-container");

//This allows the initial welcome info to "disappear" after the start button is
function startQuiz() {
    startButton.classList.add("hide")
    introText.classList.add("hide")
    elQuestion.classList.remove("hide")

};

quizArray.forEach(function (question, indexQuestion) {
    var div = document.createElement("div");

    if (currentQuestion !== indexQuestion) {
        div.setAttribute("class", "hide");
    }

    var hTwo = document.createElement("h2");
    hTwo.textContent = "Question: " + question.question;

    var ul = document.createElement("ul");

    question.choice.forEach(function (choiceList) {
        var li = document.createElement("li");
        li.textContent = choiceList;
        ul.append(li);
    });

    div.append(hTwo);
    div.append(ul);
    main.append(div);

});


//This is for the timer to begin running after "start quiz" button is clicked
function setTime() {
    var quizTimer = setInterval(function () {
        document.getElementById("countdown").innerHTML = timeLeft;
        timeLeft -= 1;
        timeLeft.textContent = "" + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timeLeft);
            document.getElementById("countdown").innerHTML = "Time is up";
        }
    }, 1000)
}
