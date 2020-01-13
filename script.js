const startButton = document.getElementById("start-btn");
const introText = document.getElementById("welcome");
const questionEl = document.getElementById("question-container");
const commentEl = document.getElementById("comment");
let timeLeft = 75;
let currentQuestion = 0;
let score = "";
//var scoreData = [];


startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", startTimer);



//This allows the initial welcome info to "disappear" after the start button is
function startQuiz() {
    startButton.classList.add("hide")
    introText.classList.add("hide")
    questionEl.classList.remove("hide")
    renderQuestions()
};

//This is for the timer to begin running after "start quiz" button is clicked
function startTimer() {
    let quizTimer = setInterval(function () {
        document.getElementById("countdown").innerHTML = timeLeft;
        timeLeft -= 1;
        timeLeft.textContent = "" + timeLeft;
        //preventing the timer from going into negative numbers
        if (timeLeft <= 0) {
            clearInterval(timeLeft);
            document.getElementById("countdown").innerHTML = "Time is up";
        }
    }, 1000)
}


const renderQuestions = function () {
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

function nextQuestion() {
    var rightAnswer = this.getAttribute("data-answer")
    var choiceLi = this.textContent

    if (rightAnswer === choiceLi) {
        commentEl.textContent = "Correct";
        setTimeout(() => {
            questionEl.innerHTML = "";
            currentQuestion++;
            commentEl.innerHTML = "";
            renderQuestions();
        }, 1000);
    }
    else {
        commentEl.textContent = "Wrong";
        setTimeout(() => {
            questionEl.innerHTML = "";
            currentQuestion++;
            commentEl.innerHTML = "";
            timeLeft = timeLeft - 10;
            renderQuestions();
        }, 1000);
    }
}






/* will need to use this to store the user's score and initials when they are finished w/quiz
function scoreData () {
    localStorage.setItem("scoreData", JSON.stringify (scoreData));

}


remember to use JSON.stringify(); to make an object / value into a stringify  &
JSON.parse(); to parse the string */