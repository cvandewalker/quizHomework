var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerElement = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var answerButtonElement = document.getElementById("answer-buttons");
var currentQuesitonsIndex;
var correctScore = document.getElementById("rightAnswer");
var wrongScore = document.getElementById("wrongAnswer");
var highscoreContainerEl = document.getElementById("highscoreContainer");
var countdownEl = document.getElementById("countdown");
var highScoreList = document.getElementById("highscore-list");
var scoreInputEl = document.getElementById("scoreInput");
var submitScoreBtn = document.getElementById("submitScore");
var scoresList = [];

init();


startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
   location.reload();
});

function renderScores() {

highScoreList.innerHTML="";

for (var i = 0; i < scoresList.length; i++) {
        var highScore = scoresList[i];
        var li = document.createElement("li");
        li.textContent = highScore;
        li.setAttribute("data-index", i);
        var button = document.createElement("button");
        button.textContent = "Clear";
        li.appendChild(button);
        highScoreList.appendChild(li); 
    }
}

function init() {
    var storedScores = JSON.parse(localStorage.getItem("scoresList"));
    if (storedScores !== null) {
        scoresList = storedScores
    }
    renderScores();
}

function storeScoresList() {
    localStorage.setItem("scoresList", JSON.stringify(scoresList));  
}

submitScoreBtn.addEventListener("click", function(event){
    event.preventDefault();
    var scoreText = scoreInputEl.value.trim();
    var totalScore = correctScore.innerText - wrongScore.innerText;
    if (scoreText === "") {
        return;
    }
    
    scoresList.push(scoreText + ":  " + totalScore);
    scoreInputEl.value = "";
    
    storeScoresList();
    renderScores();
});

highScoreList.addEventListener("click", function(event){
    var element = event.target;
    if (element.matches("button") === true) {
        var index = element.parentElement.getAttribute("data-index");
        scoresList.splice(index, 1);
        storeScoresList();
        renderScores();
    }
});



function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ?  minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0 || currentQuesitonsIndex > questions.length -1) {
            
           nextButton.classList.remove("hide");
           questionContainerElement.classList.add("hide");
           highscoreContainerEl.classList.remove("hide");
           countdownEl.classList.add("hide");
           
        }
      
    }, 1000);
}





function startGame() {
    startButton.classList.add("hide");
    nextButton.classList.remove("hide");
    highscoreContainerEl.classList.add("hide");
    currentQuesitonsIndex = 0;
    questionContainerElement.classList.remove("hide");
    var twoMinutes = 60 * 2,
        display = document.querySelector('#countdown');
    startTimer(twoMinutes, display);
    setNextQuestion();
}

function setNextQuestion() {
    if (currentQuesitonsIndex === questions.length) {
        return;
    } else {
    resetState();
    showQuestion(questions[currentQuesitonsIndex]);
    }
}

function showQuestion(question) {
    questionElement.innerText = question.title;
    for (var i = 0; i < question.choices.length; i++) {
      const button = document.createElement("button");
      button.innerText = question.choices[i]; 
      button.classList.add("btn");
      button.addEventListener("click", selectAnswer)
      answerButtonElement.appendChild(button);
    }
    
}

function resetState() {
    nextButton.classList.add("hide");
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}


function selectAnswer(e) {
    var selectedButton = e.target;
    if (questions[currentQuesitonsIndex].answer == selectedButton.innerText) {
        document.getElementById("body").style.backgroundColor = "green";
        correctScore.innerText++;
    } else {
        document.getElementById("body").style.backgroundColor = "red"; 
        wrongScore.innerText++;
    }

        currentQuesitonsIndex++;
        setNextQuestion();
   }
   
   
   



var questions = [
    {
        title: "About how much liquid can the average adult bladder hold?",
        choices: ["one cup", "two cups", "one quart", "one-half gallon"],
        answer: "two cups"
    },
    {
        title: "which of the following was not invented by Thomas Edison?",
        choices: ["light bulb", "movie projector", "phonograph", "telegraph"],
        answer: "telegraph"
    },
    {
        title: "which color replaced light brown in M&M candies?",
        choices: ["green", "red", "blue", "dark brown"],
        answer: "blue"
    },
    {
        title: "which was not one of the original 13 colonies?",
        choices: ["Pennsylvania", "New Hampshire", "Georgia", "Vermont"],
        answer: "Vermont"
    },
    {
        title: "which of the following is NOT an acronym?",
        choices: ["radar", "radio", "scuba", "laser"],
        answer: "radio"
    },
    {
        title: "what is the most general classification applied to living things by biologists?",
        choices: ["phyla", "classes", "kingdoms", "orders"],
        answer: "kingdoms"
    },
    {
        title: "in Roman mythology, who was the god of wine?",
        choices: ["Mercury", "Heracles", "Bacchus", "Cupid"],
        answer: "Bacchus"
    },
    {
        title: "how many ways are there to make change for a quarter?",
        choices: ["6", "12", "18", "24"],
        answer: "12"
    },
    {
        title: "which color is the 'A' button on the controller sold with the original Nintendo Entertainment System?",
        choices: ["blue", "red", "green", "black"],
        answer: "red"
    },
    {
        title: "what is the sum of the whole numbers from 1 to 100?",
        choices: ["4900", "4321", "5000", "5050"],
        answer: "5050"
    }];