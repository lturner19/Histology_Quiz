const startButton = document.getElementById("start-btn");
const introText = document.getElementById("welcome");
const questionEl = document.getElementById("question-container");
const commentEl = document.getElementById("comment");
const quizScore = document.getElementById("form");
const scoreSubmit = document.getElementById("submit-btn");
const highscorePage = document.getElementById("score-page");
const userScore = document.getElementById("finalscore");
let initialsInput = document.getElementById("initials");
timeLeft = 75;
let currentQuestion = 0;
let score = 0;


startButton.addEventListener("click", startQuiz); // initiates startQuiz function
startButton.addEventListener("click", startTimer);
//highscorePage.onclick = ;


//This allows the initial welcome info to "disappear" after the start button is clicked
function startQuiz() {
    startButton.classList.add("hide")
    introText.classList.add("hide")
    questionEl.classList.remove("hide")
    renderQuestions()
};

//This intiates the timer to begin running after "start quiz" button is clicked
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

const renderQuestions = function () {
    if (currentQuestion === quizArray.length) {
        score = timeLeft;
        timeLeft = 0;
    }
    //This gets the questions from the array
    quizArray.forEach(function (question, indexQuestion) {

        var div = document.createElement("div");

        if (currentQuestion !== indexQuestion) {
            div.classList.add("hide");
        }
        //Creating an h2 tag dynamically
        var hTwo = document.createElement("h2");
        hTwo.textContent = "Question: " + question.question;

        //creating a ul tag dynamically
        var ul = document.createElement("ul");

        //This is getting the answers from the array
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
            //decrements timer 10 seconds
            timeLeft = timeLeft - 10;
            renderQuestions();
        }, 1000);
    }
}

function showSummary() {
    var userMessage = "Your score is " + score
    userScore.textContent = userMessage;
    questionEl.classList.add("hide");
    quizScore.classList.remove("hide")
}

scoreSubmit.addEventListener("click", function () {
    var user = {
        monogram: initialsInput.value.trim(),
        timer: score
    };
    console.log(user);
    if (user.monogram === "") {
        commentEl.innerHTML = "";
        commentEl.textContent = "Error, initials cannot be blank";
    } else {
        localStorage.setItem("user", JSON.stringify(user));
    }
})


/*
will need to use this to store the user's time and initials when they are finished w/quiz
function scoreData () {
    localStorage.setItem("scoreData", JSON.stringify (scoreData));

}


remember to use JSON.stringify(); to make an object / value into a stringify  &
JSON.parse(); to parse the string  */