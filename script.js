const startButton = document.getElementById("start-btn");
const introText = document.getElementById("welcome");
const questionEl = document.getElementById("question-container");
const commentEl = document.getElementById("comment");
const quizScore = document.getElementById("form");
const ul = document.getElementById("user-list");
const scoreSubmit = document.getElementById("submit");
const userScore = document.getElementById("finalscore");
let initialsInput = document.getElementById("initials");
const highscorePage = document.getElementById("score-list");
let maxScore = 5;
let clearButton = document.getElementById("clear-btn btn");
const goButton = document.getElementById("go-btn btn");

timeLeft = 75;
let currentQuestion = 0;
let score = 0;
let scoreArray = [];

startButton.addEventListener("click", startQuiz); // initiates startQuiz function
startButton.addEventListener("click", startTimer);


//This allows the initial welcome info to "disappear" after the start button is clicked
function startQuiz() {
    startButton.classList.add("hide");
    introText.classList.add("hide");
    questionEl.classList.remove("hide");
    currentQuestion = 0;
    questionEl.innerHTML = "";
    timeLeft = 75;
    renderQuestions();

};

//This initiates the timer to begin running after "start quiz" button is clicked
function startTimer() {
    //decrements the timer
    let quizTimer = setInterval(function () {
        document.getElementById("countdown").innerHTML = timeLeft;
        timeLeft -= 1;
        timeLeft.textContent = "" + timeLeft;

        //preventing the timer from going into negative numbers
        if (timeLeft <= 0) {
            clearInterval(quizTimer);
            document.getElementById("countdown").innerHTML = "Time is up";
            showSummary();
        }
    }, 1000)
}
var highscoreButton = document.getElementById("score-page");
highscoreButton.addEventListener("click", function () {
    commentEl.innerHTML = "Please finish quiz to see highscores!"
    setTimeout(() => {
        commentEl.innerHTML = "";
    }, 1000);
})
const renderQuestions = function () {
    if (currentQuestion === quizArray.length) {
        score = timeLeft;
        timeLeft = 0;
    }
    //This gets the questions from the array
    quizArray.forEach(function (question, indexQuestion) {

        var div = document.createElement("div");

        //compares the question and choice in the array to see if they have the same index value, if not the question/choices not shown
        if (currentQuestion !== indexQuestion) {
            div.classList.add("hide");
        }
        //Creating an h2 tag dynamically
        var hTwo = document.createElement("h2");
        hTwo.textContent = "Question: " + question.question;

        //creating a ul tag dynamically
        var ul = document.createElement("ul");

        //This is getting the answers from the quiz array
        question.choice.forEach(function (choiceList) {
            var li = document.createElement("li");
            li.textContent = choiceList;
            li.setAttribute("data-answer", question.answer);
            li.onclick = nextQuestion;
            ul.append(li);

        });
        // adding the created elements to the DOM
        div.append(hTwo);
        div.append(ul);
        questionEl.append(div);
    });
}

//Function below validates answers and populates next question.
function nextQuestion() {
    var rightAnswer = this.getAttribute("data-answer")
    var choiceLi = this.textContent

    //comparing the answer from quizArray with all the choices in the quizArray
    if (rightAnswer === choiceLi) {
        commentEl.textContent = "Correct";
        currentQuestion++;

        //allows the "correct" to show up for 1 second after user clicks correct choice
        setTimeout(() => {
            questionEl.innerHTML = "";
            commentEl.innerHTML = "";
            renderQuestions();
        }, 1000);
    }
    else {
        commentEl.textContent = "Wrong";
        //allows the "wrong" to show up for 1 second after user clicks incorrect answer
        setTimeout(() => {
            questionEl.innerHTML = "";
            currentQuestion++;
            commentEl.innerHTML = "";
            //decrements timer 15 seconds
            timeLeft = timeLeft - 15;
            renderQuestions();
        }, 1000);
    }
}

//allows the timeLeft to be shown as score and di
function showSummary() {
    var userMessage = "Your score is " + score
    userScore.textContent = userMessage;
    questionEl.classList.add("hide");
    quizScore.classList.remove("hide");
}

//dynamically creates li's for the users' scores to be shown
function renderScores() {
    ul.innerHTML = "";
    // Renders a new li for each score
    for (var i = 0; i < scoreArray.length; i++) {
        var array = scoreArray[i];
        var li = document.createElement("li");
        li.textContent = array;
        li.setAttribute("data-index", i);
        ul.appendChild(li);
    }
}

//Send scores to local storage when submit button is clicked
scoreSubmit.addEventListener("click", function (event) {
    event.preventDefault(); //prevents default submit action; not sending data to server
    var monogram = initialsInput.value.trim();

    if (monogram === "") { //forces the user to input initials
        return;
    }
    scoreArray.push(monogram + ' ' + score); //pushes scores to empty array.
    var storeScores = localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
    rankingPage();
})

//Allows scores to be returned from local storage
function rankingPage() {
    renderScores();
    quizScore.classList.add("hide");
    highscorePage.classList.remove("hide");
    var retrieveScores = JSON.parse(localStorage.getItem("scoreArray")) || [];
}

//goes back to the start page to replay quiz
goButton.addEventListener("click", function () {
    startQuiz();
    highscorePage.classList.add("hide");
    introText.classList.remove("hide");
    startButton.classList.remove("hide");
    questionEl.classList.add("hide");
})

//clears the local storage of highscore when clear button is clicked
clearButton.addEventListener("click", function () {
    localStorage.clear();
    ul.innerHTML = "";
})