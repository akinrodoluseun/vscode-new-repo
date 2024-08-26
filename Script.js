// script.js
const quizData = [
    {
        question: "What's your biggest regret?",
        options: ["Disobedient", "Not Studying", "Not Exercising", "Sleeping Late"],
        correct: ["Disobedient"]
    },
    {
        question: "When was the last time you cried?",
        options: ["Yesterday", "Last Month", "Last Week", "Last Year"],
        correct: ["Last Week"]
    },
    {
        question: "What's the last movie that made you cry?",
        options: ["The Notebook", "Titanic", "Chan chi", "Up"],
        correct: ["Chan chi"]
    },
    {
        question: "What's the last song that made you cry?",
        options: ["Rock Song", "Pop Song", "Classical Music", "Christian Song"],
        correct: ["Christian Song"]
    },
    {
        question: "What is the first thing God created in the Bible?",
        options: ["Light", "Heaven and Earth", "Animals", "Plants"],
        correct: ["Heaven and Earth"]
    }
];

let currentQuiz = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEls = document.querySelectorAll('.option');
const nextBtn = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

function loadQuiz() {
    deselectOptions();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    optionsEls.forEach((optionEl, index) => {
        optionEl.innerText = currentQuizData.options[index];
    });
}

function deselectOptions() {
    optionsEls.forEach(option => option.classList.remove('selected'));
}

function getSelectedAnswers() {
    const selectedOptions = [];
    optionsEls.forEach(option => {
        if (option.classList.contains('selected')) {
            selectedOptions.push(option.innerText);
        }
    });
    return selectedOptions;
}

function checkAnswers(selectedAnswers, correctAnswers) {
    return selectedAnswers.length === correctAnswers.length &&
        selectedAnswers.every(answer => correctAnswers.includes(answer));
}

function updateScore() {
    const selectedAnswers = getSelectedAnswers();
    const correctAnswers = quizData[currentQuiz].correct;
    if (checkAnswers(selectedAnswers, correctAnswers)) {
        score++;
    }
}

optionsEls.forEach(option => {
    option.addEventListener('click', () => {
        option.classList.toggle('selected');
    });
});

nextBtn.addEventListener('click', () => {
    updateScore();
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        document.getElementById('quiz').classList.add('hidden');
        scoreEl.innerText = `You answered ${score} out of ${quizData.length} questions correctly!`;
        scoreContainer.classList.remove('hidden');
    }
});

restartBtn.addEventListener('click', () => {
    score = 0;
    currentQuiz = 0;
    loadQuiz();
    scoreContainer.classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
});

loadQuiz();
