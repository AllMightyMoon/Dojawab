// Quiz Data - Quantum Physics Reasoning Questions
const quizData = [
    {
        question: "In quantum mechanics, what does the wave function collapse represent?",
        options: [
            "A) The physical destruction of matter",
            "B) The transition from superposition to a definite state upon measurement",
            "C) The speed of light becoming zero",
            "D) The creation of new particles"
        ],
        correct: 1
    },
    {
        question: "According to Heisenberg's Uncertainty Principle, what cannot be precisely determined simultaneously?",
        options: [
            "A) Position and momentum of a particle",
            "B) Mass and energy of a particle",
            "C) Speed and direction of a particle",
            "D) Charge and spin of a particle"
        ],
        correct: 0
    },
    {
        question: "What is quantum tunneling?",
        options: [
            "A) A method of faster-than-light travel",
            "B) The process of digging tunnels at the atomic level",
            "C) The ability of particles to pass through energy barriers they classically shouldn't be able to cross",
            "D) A type of quantum computer algorithm"
        ],
        correct: 2
    },
    {
        question: "What is the key insight of the EPR paradox (Einstein-Podolsky-Rosen)?",
        options: [
            "A) Quantum mechanics is completely wrong",
            "B) Particles can communicate faster than light",
            "C) Energy and matter are interchangeable",
            "D) It questioned whether quantum mechanics provides a complete description of reality"
        ],
        correct: 3
    },
    {
        question: "What is the fundamental principle behind quantum entanglement?",
        options: [
            "A) Two particles remain connected regardless of distance, sharing correlated properties",
            "B) Particles can travel faster than light",
            "C) Particles can exist in multiple places simultaneously",
            "D) Energy cannot be created or destroyed"
        ],
        correct: 0
    },
    {
        question: "In the double-slit experiment, what happens when you observe which slit the electron passes through?",
        options: [
            "A) The electron stops moving",
            "B) The interference pattern disappears and the electron behaves like a particle",
            "C) The electron splits into two",
            "D) The slits close automatically"
        ],
        correct: 1
    },
    {
        question: "What does the Many-Worlds Interpretation of quantum mechanics propose?",
        options: [
            "A) There is only one universe, but it has many dimensions",
            "B) The universe is made of many small worlds called atoms",
            "C) Every quantum measurement creates parallel universes for each possible outcome",
            "D) Time travel creates multiple worlds"
        ],
        correct: 2
    },
    {
        question: "What makes quantum computers potentially more powerful than classical computers?",
        options: [
            "A) They use less electricity",
            "B) They are physically smaller",
            "C) They never make computational errors",
            "D) They can process information using quantum superposition and entanglement"
        ],
        correct: 3
    },
    {
        question: "What does Schrödinger's cat thought experiment illustrate?",
        options: [
            "A) The absurdity of applying quantum superposition to macroscopic objects",
            "B) The cruelty of quantum physicists",
            "C) How cats can survive in boxes",
            "D) The speed of radioactive decay"
        ],
        correct: 0
    },
    {
        question: "What is quantum decoherence?",
        options: [
            "A) When quantum particles lose their charge",
            "B) The process by which quantum systems lose their quantum behavior due to environmental interaction",
            "C) When atoms break apart into smaller pieces",
            "D) The inability to understand quantum mechanics"
        ],
        correct: 1
    }
];

// Game State
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let hasAnswered = false;

// DOM Elements
const landingScreen = document.getElementById('landing-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

const startQuizBtn = document.getElementById('start-quiz-btn');
const questionText = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options');
const feedback = document.getElementById('feedback');
const feedbackText = document.getElementById('feedback-text');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const progressFill = document.getElementById('progress-fill');
const questionCounter = document.getElementById('question-counter');
const finalScore = document.getElementById('final-score');
const scoreMessage = document.getElementById('score-message');

// Event Listeners
startQuizBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Initialize the app
function init() {
    showScreen('landing');
}

// Screen Management
function showScreen(screenName) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    setTimeout(() => {
        document.getElementById(`${screenName}-screen`).classList.add('active');
    }, 200);
}

// Start Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showScreen('quiz');
    displayQuestion();
}

// Display Current Question
function displayQuestion() {
    const question = quizData[currentQuestionIndex];
    hasAnswered = false;
    selectedAnswer = null;
    
    // Update question text
    questionText.textContent = question.question;
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressFill.style.width = `${progress}%`;
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    
    // Clear previous options and feedback
    answerOptions.innerHTML = '';
    feedback.classList.add('hidden');
    nextBtn.classList.add('hidden');
    
    // Create answer options
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'answer-option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectAnswer(index, optionElement));
        answerOptions.appendChild(optionElement);
    });
}

// Handle Answer Selection
function selectAnswer(answerIndex, optionElement) {
    if (hasAnswered) return;
    
    hasAnswered = true;
    selectedAnswer = answerIndex;
    
    const question = quizData[currentQuestionIndex];
    const isCorrect = answerIndex === question.correct;
    
    // Update score
    if (isCorrect) {
        score++;
    }
    
    // Visual feedback for all options
    const allOptions = document.querySelectorAll('.answer-option');
    allOptions.forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === answerIndex && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Show feedback message
    showFeedback(isCorrect);
    
    // Show next button after a short delay
    setTimeout(() => {
        nextBtn.classList.remove('hidden');
    }, 1000);
}

// Show Feedback Message
function showFeedback(isCorrect) {
    feedback.classList.remove('hidden');
    feedback.classList.remove('correct', 'incorrect');
    
    if (isCorrect) {
        feedback.classList.add('correct');
        feedbackText.textContent = '🎉 Correct! Well done!';
    } else {
        feedback.classList.add('incorrect');
        feedbackText.textContent = '❌ Incorrect. Keep learning!';
    }
}

// Next Question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

// Show Results
function showResults() {
    showScreen('results');
    
    const percentage = Math.round((score / quizData.length) * 100);
    finalScore.textContent = `${score}/${quizData.length} (${percentage}%)`;
    
    // Personalized messages based on score
    let message = '';
    if (percentage >= 90) {
        message = "🌟 Outstanding! You're a Quantum Physics Master!";
    } else if (percentage >= 80) {
        message = "🧠 Excellent! You're a Quantum Thinker!";
    } else if (percentage >= 70) {
        message = "⚡ Great job! You have solid quantum reasoning skills!";
    } else if (percentage >= 60) {
        message = "🔬 Good effort! Keep exploring the quantum world!";
    } else if (percentage >= 50) {
        message = "📚 Not bad! Time to dive deeper into quantum physics!";
    } else {
        message = "🌱 Keep learning! Quantum physics is a journey, not a destination!";
    }
    
    scoreMessage.textContent = message;
}

// Restart Quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    hasAnswered = false;
    showScreen('landing');
}

// Add some visual enhancements
function addVisualEffects() {
    // Add particle animation to background (lightweight CSS animation)
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(120deg); }
            66% { transform: translateY(5px) rotate(240deg); }
        }
        
        .floating-particles::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                radial-gradient(2px 2px at 20px 30px, rgba(0, 212, 255, 0.3), transparent),
                radial-gradient(2px 2px at 40px 70px, rgba(157, 78, 221, 0.3), transparent),
                radial-gradient(1px 1px at 90px 40px, rgba(255, 0, 110, 0.3), transparent),
                radial-gradient(1px 1px at 130px 80px, rgba(0, 212, 255, 0.3), transparent);
            background-repeat: repeat;
            background-size: 150px 100px;
            animation: float 20s infinite linear;
            pointer-events: none;
            z-index: -1;
        }
    `;
    document.head.appendChild(style);
    document.body.classList.add('floating-particles');
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    addVisualEffects();
});