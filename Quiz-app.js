// QUIZ DATA
const quizData = [
    {
        question: "Which language is mainly used to style web pages?",
        options: ["HTML", "JavaScript", "CSS", "Python"],
        correct: 2
    },
    {
        question: "Which HTML tag is used to display the largest heading?",
        options: ["<h6>", "<heading>", "<h1>", "<head>"],
        correct: 2
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        correct: 3
    },
    {
        question: "What does DOM stand for?",
        options: [
            "Document Object Model",
            "Data Object Method",
            "Digital Object Management",
            "Document Oriented Machine"
        ],
        correct: 0
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["#", "//", "<!-- -->", "/* */"],
        correct: 1
    },
    {
        question: "Which of the following is NOT a programming language?",
        options: ["Python", "Java", "HTML", "C++"],
        correct: 2
    },
    {
        question: "Which method is used to select an element by ID in JavaScript?",
        options: [
            "getElementById()",
            "querySelectorAll()",
            "getElementsByClass()",
            "selectById()"
        ],
        correct: 0
    },
    {
        question: "Which event occurs when a button is clicked?",
        options: ["onhover", "onchange", "onclick", "onsubmit"],
        correct: 2
    },
    {
        question: "Which operator is used to compare both value and type in JavaScript?",
        options: ["=", "==", "===", "!="],
        correct: 2
    },
    {
        question: "What will typeof [] return in JavaScript?",
        options: ["array", "object", "list", "undefined"],
        correct: 1
    }
];


// VARIABLES
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let wrongAnswers = [];

let timeLeft = 10;
let timerInterval;

// DOM ELEMENTS
const questionEl = document.getElementById("question");
let optionButtons = document.querySelectorAll(".option");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

// TIMER FUNCTIONS
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 10;
    timerEl.innerText = `Time Left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            autoNext();
        }
    }, 1000);
}

// Auto move if time ends
function autoNext() {
    const correctIndex = quizData[currentQuestion].correct;

    wrongAnswers.push({
        question: quizData[currentQuestion].question,
        selected: "No Answer",
        correct: quizData[currentQuestion].options[correctIndex]
    });

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}


// LOAD QUESTION

function loadQuestion() {
    const q = quizData[currentQuestion];

    questionEl.innerText = q.question;

    optionButtons.forEach((btn, index) => {
        btn.innerText = q.options[index];
        btn.disabled = false;
        btn.style.background = "#e0e0e0";
    });

    selectedAnswer = null;
    startTimer();
}

// SELECT ANSWER
function selectAnswer(index) {
    clearInterval(timerInterval);
    selectedAnswer = index;

    const correctIndex = quizData[currentQuestion].correct;

    optionButtons.forEach((btn, i) => {
        btn.disabled = true;

        if (i === correctIndex) {
            btn.style.background = "#90ee90"; // correct
        } else if (i === index) {
            btn.style.background = "#ff7f7f"; // wrong
        }
    });
}

// NEXT QUESTION
function nextQuestion() {
    if (selectedAnswer === null) {
        alert("Please select an answer!");
        return;
    }

    const correctIndex = quizData[currentQuestion].correct;

    if (selectedAnswer === correctIndex) {
        score++;
    } else {
        wrongAnswers.push({
            question: quizData[currentQuestion].question,
            selected: quizData[currentQuestion].options[selectedAnswer],
            correct: quizData[currentQuestion].options[correctIndex]
        });
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// SHOW RESULT
function showResult() {
    clearInterval(timerInterval);
    timerEl.style.display = "none";

    questionEl.innerText = "Quiz Completed 🎉";
    document.querySelector(".options").innerHTML = "";

    nextBtn.style.display = "none";
    restartBtn.style.display = "block";

    let resultHTML = `<h3>Your Score: ${score} / ${quizData.length}</h3>`;

    if (wrongAnswers.length > 0) {
        resultHTML += `<h3>Wrong Answers ❌</h3>`;

        wrongAnswers.forEach((item, index) => {
            resultHTML += `
                <div style="margin-bottom:10px; text-align:left;">
                    <p><b>Q${index + 1}:</b> ${item.question}</p>
                    <p style="color:red;">Your Answer: ${item.selected}</p>
                    <p style="color:green;">Correct Answer: ${item.correct}</p>
                </div>
            `;
        });
    } else {
        resultHTML += `<p style="color:green;">Excellent! All answers are correct 🎯</p>`;
    }

    scoreEl.innerHTML = resultHTML;
}

// RESTART QUIZ
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    wrongAnswers = [];

    timerEl.style.display = "block";
    scoreEl.innerHTML = "";

    const optionsDiv = document.querySelector(".options");

    optionsDiv.innerHTML = `
        <button class="option" onclick="selectAnswer(0)"></button>
        <button class="option" onclick="selectAnswer(1)"></button>
        <button class="option" onclick="selectAnswer(2)"></button>
        <button class="option" onclick="selectAnswer(3)"></button>
    `;

    // 🔥 VERY IMPORTANT: reselect buttons
    optionButtons = document.querySelectorAll(".option");

    nextBtn.style.display = "block";
    restartBtn.style.display = "none";

    loadQuestion();
}
// START QUIZ

loadQuestion();