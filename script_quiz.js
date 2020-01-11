var startButton = document.getElementById("start-btn");
var introText = document.getElementById("welcome");
var elQuestion = document.getElementById("question-container");
var countDown = 75;
var questionArray = [
    {
        question: "Commonly used data types do Not include:",
        choice: ["strings", "booleans", "alerts", "numbers"]
    },
    {
        question: "The condition in an if/else statement is enclosed within _____",
        choice: ["quotes", "curly brackets", "parentheses", "space brackets"]
    },
    {
        question: "The Arrays in JavaScript can be used to store _____",
        choice: ["numbers and strings", "other arrays", "all of the above"]
    },
    {
        question: "String values must be enclosed within __ when being assigned to variables.",
        choice: ["commas", "curly brackets", "quotes", "parentheses"]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is",
        choice: ["JavaScript", "terminal/bash", "for loops", "console log"]
    },
    {
        question: "What is a variable used for ?",
        answer: ["Store data", "Create functions", "Style HTML", "Create elements"]
    }
]
startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", setTime);

function startQuiz() {
    startButton.classList.add("hide")
    introText.classList.add("hide")
    elQuestion.classList.remove("hide")
    setNextQuestion()
};


function setTime() {
    var quizTimer = setInterval(function () {
        document.getElementById("countdown").innerHTML = countDown;
        countDown--;
        countDown.textContent = "" + countDown;
        if (countDown === 0) {
            alert("Time is up!");
        }
    }, 1000);
}

function setNextQuestion() {

}