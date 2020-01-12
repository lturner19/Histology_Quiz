var startButton = document.getElementById("start-btn");
var introText = document.getElementById("welcome");
var elQuestion = document.getElementById("question-container");
var timeLeft = 90;
var currentQuestion = 0;
var currentAnswer = 0;
var quizArray = [{
    question: "The most commonly used fixative for skin biopsies is:",
    choice: ["Michel's", "Schiff's", "Formalin", "AZF"],
    answer: "formalin"
},
{
    question: "When embedding, _______ cuts are used to help the epidermis lay flat.",
    choice: ["saline", "relaxing", "notch", "filleting"],
    answer: "relaxing"
},
{
    question: "______ is used to stain cell nuclei, while ______ is used for the cytoplasm ",
    choice: ["Hematoxylin, Eosin", "Bluing, Eosin", "Eosin, Hematoxylin", "Water, Nuclear Fast Red"],
    answer: "Hematoxylin, Eosin"
},
{
    question: "What angle should the epidermis be to the knife to ensure a cleaner cut?",
    choice: ["50", "90", "180", "45"],
    answer: "45"
},
{
    question: "How is a shave biopsy embedded?",
    choice: ["on edge", "on end", "dermis flat down on chuck surface", "all of the above"],
    answer: "on edge"
},
{
    question: "What is the acceptable range of microns for each section?",
    choice: ["20-30uM", "3-6uM", "6-9uM", "10-15uM"],
    answer: "6-9uM"
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

var renderQuestions = function () {
    //This gets the questions from the array
    quizArray.forEach(function (question, indexQuestion) {
        var div = document.createElement("div");

        if (currentQuestion !== indexQuestion) {
            div.setAttribute("class", "hide");
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
            ul.append(li);

        });
        // adding the created elements to the DOM
        div.append(hTwo);
        div.append(ul);
        main.append(div);
    });
}
renderQuestions();



//This is for the timer to begin running after "start quiz" button is clicked
function setTime() {
    var quizTimer = setInterval(function () {
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
