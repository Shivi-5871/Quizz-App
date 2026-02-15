const questions= [
    {
        question:"Which is largest animal in the world?",
        answers : [
            {text:"shark", correct:false},
            {text:"Blue Whale", correct:true},
            {text:"Elephent", correct:false},
            {text:"Giraffe", correct:false},
        ]
    },
    {
        question:"Which is smallest country in the world?",
        answers : [
            {text:"Vatica City", correct:true},
            {text:"Goa", correct:false},
            {text:"Nepal", correct:false},
            {text:"Shri Lanka", correct:false},
        ]
    },
    {
        question:"Which is largest desert in the world?",
        answers : [
            {text:"Kalahari", correct:false},
            {text:"Gobie", correct:false},
            {text:"Sahara", correct:false},
            {text:"Antarctica", correct:true},
        ]
    },
    {
        question:"Which is smallest continent in the world?",
        answers : [
            {text:"Asia", correct:false},
            {text:"Australia", correct:true},
            {text:"Arctica", correct:false},
            {text:"Africa", correct:false},
        ]
    }
];


const questionElem = document.querySelector("#question");
const answerBtn = document.querySelector("#answer-btn");
const nextBtn = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score =0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextBtn.innerHTML = "Next";
    shuffleQuestion();
    showQuestion();
}

function shuffleQuestion() {
    questions.sort(() => Math.random() - 0.5);
};


function resetState(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElem.innerHTML = questionNo +". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button =document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct ==="true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showscore(){
    resetState();
    questionElem.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showscore();
    }
}

nextBtn.addEventListener("click",() =>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
})

var countdown = new Date().getTime() + 60000;
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countdown - now;
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    let count = document.querySelector("#timer").innerHTML = "Time Left : " + seconds + "s";
    if(distance < 0) {
        clearInterval(x);
        document.querySelector("#timer").innerHTML = "TIME OUT";
        disableOptions();
    }
}, 1000);

function disableOptions() {
    let options = document.querySelector("#answer-btn");
    options.forEach(option => {
        option.disabled = true;
    })
}


startQuiz();