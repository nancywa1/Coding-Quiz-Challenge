var startButton = document.getElementById("start-btn")
console.dir(startButton)
var mainPage = document.getElementById('home')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answersButtonsElement = document.getElementById('answer-buttons')
var gameEnd = document.getElementById('endgame')
var submitName = document.getElementById('submitname')
var correctAn = document.getElementById('correct')
var wrongAn = document.getElementById('wrong')
// var name=document.querySelector("input[name='initials']").value
console.dir(submitName)
var viewScores=document.getElementById('scorelist')
let shuffledquestions = [], currentQuestionIndex = []
var score=[]
// var scorePoints = 100
let finalScore = 0
let timeSecond = 60;
var timeh = document.getElementById("timerbox")
var listPlayer = document.querySelector("#scorelist")
var highScoreList = document.querySelector("#high-score-list")
var nameV= document.getElementById("nameinitials")
// var playerNameInput = document.querySelector("input[name='initials']").value
// console.log(playerNameInput)

startButton.addEventListener('click', startGame)


function startGame() {
    countDownTimer()
    // var startButton= document.addEventListener('click',countDown)
    startButton.classList.add('hide')
    mainPage.style.display = "none"
    shuffledquestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledquestions[currentQuestionIndex])
}

function showQuestion(question) {

    questionElement.innerHTML = question.question

    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct[0]
        }
        // console.log(answer.correct)
        button.addEventListener('click', selectAnswer)
        answersButtonsElement.appendChild(button)
    })
}

function resetState() {
    while (answersButtonsElement.firstChild) {
        answersButtonsElement.removeChild(answersButtonsElement.firstChild)
    }
}


function selectAnswer(e) {
    const selectedButton = e.target
    const correct=selectedButton.dataset.correct

    if(correct){
        console.log(correct)
        finalScore=finalScore+25
        correctAn.classList.remove('msg1')
    }
    else{
        finalScore=finalScore+0
        timeSecond=timeSecond-10
        wrongAn.classList.remove('msg2')

    }

    if (shuffledquestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++
    } else {
        questionContainerElement.classList.add('hide')
        endGame()
    }
    setTimeout(function(){
        setNextQuestion()
        correctAn.classList.add('msg1')
        wrongAn.classList.add('msg2')
    },2000);
    console.log(finalScore)
    typeof finalScore;
    var mostRecentScore=localStorage.setItem("highScore",finalScore)
    console.log(mostRecentScore)
}



var questions = [
    {
        question: "String values must be enclosed within __ when being assigned to variables.",
        answers: [
            { text: '1. commas', correct: false },
            { text: '2. curly brackets', correct: false },
            { text: '3. quotes', correct: true },
            { text: '4. parenthesis', correct: false }
        ]

    },
    {
        question: "A very usefull tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: '1. JaveScript', correct: false },
            { text: '2. terminal/bash', correct: false },
            { text: '3. for loops', correct: false },
            { text: '4. console log', correct: true }
        ]

    },
    {
        question: "Commonly used data types DO Not Include",
        answers: [
            { text: '1. strings', correct: false },
            { text: '2. booleans', correct: false },
            { text: '3. alerts', correct: true },
            { text: '4. numbers', correct: false }
        ]

    },
    {
        question: "The condition in an if / else statement is enclosed with __",
        answers: [
            { text: '1. quotes', correct: false },
            { text: '2. curly brackets', correct: true },
            { text: '3. parenthesis', correct: false },
            { text: '4. square brackets', correct: false }
        ]

    }

]
function endGame() {
    timeSecond=0
    displayTime()
    
    gameEnd.classList.remove('end')
    console.log("gameEnd")
    // submitName.addEventListener('click', viewScores)
    console.dir(submitName)

}


function myFunction (){
    // const submitName = event.target
    gameEnd.classList.add('end')
   viewScores.classList.remove('viewscore')
   createScoreLi () 

}


// var gameHandler = function (event) {




var playerNameInput = ""

var scoreHistory = {
    name: playerNameInput,
    score: finalScore

    // score: playerScore
  };
//   console.log(scoreHistory.name)
//   createScoreLi(scoreHistory)
// 
// }



var createScoreLi = function () {
    document.getElementById("scorelist").style.display = "block";
    var playerNameInput = document.querySelector("input[name='initials']").value
    // window.localStorage['playerNameInput'] = document.getElementById("input[name='initials']").value;

    // localStorage.getItem(playerNameInput)

    console.log ( window.localStorage['playerNameInput'])
    var nameList = document.createElement("li");
    nameList.className = "name-list";
  
    var scoreList = document.createElement("div");
    scoreList.className = "score-list";

    nameList.innerHTML = playerNameInput+ " "+ finalScore
    
    scoreHistory.name=playerNameInput;
    scoreHistory.score=finalScore;
    highScoreList.appendChild(nameList)
    listPlayer.appendChild(highScoreList)
    finalScore = 0

  };


// timeh.innerHTML = 'Timer:' + timeSecond;
function countDownTimer(){
    var countDown = setInterval(() => {
        timeSecond--;
        // timeh.innerHTML='Timer:'+timeSecond;
    
        
        if (timeSecond <= 0 || timeSecond < 1) {
            
            clearInterval(countDown)
            window.alert('Timeout')
            gameEnd.classList.add('end')
            questionContainerElement.classList.add('hide')
            viewScores.classList.add('viewscore')
    
            endGame()
        } else {
            displayTime(timeSecond)
        }
    }, 1000)
}


function displayTime(second) {
    timeh.innerHTML = 'Timer:' + timeSecond
}

var returnHome=document.getElementById("go-back")
returnHome.addEventListener('click',reStart)

function reStart(){

    document.getElementById("scorelist").style.display = "none";
    mainPage.style.display = "block"
    startButton.classList.remove('hide')
    timeSecond=60
    startButton.addEventListener('click', startGame)

}


var clearScore=document.getElementById("clear-scores")

clearScore.addEventListener('click',clearHighScore)

function clearHighScore(){
    document.getElementById("high-score-list").innerHTML=""
}

















