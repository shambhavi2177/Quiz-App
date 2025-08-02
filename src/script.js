document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const startScreen = document.getElementById('start-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const scoreScreen = document.getElementById('score-screen');
  const startBtn = document.getElementById('start-btn');
  const nextBtn = document.getElementById('next-btn');
  const saveBtn = document.getElementById('save-btn');
  const endBtn = document.getElementById('end-btn');
  const restartBtn = document.getElementById('restart-btn');
  const userNameInput = document.getElementById('user-name');
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const scoreElement = document.getElementById('score');
  const questionNumberElement = document.querySelector('.w-24.h-24');

  // Quiz Data
  const quizQuestions = [
    {
      question: "What is the capital of India?",
      options: ["New Delhi", "Bengaluru", "Mumbai", "Chennai"],
      correctAnswer: "New Delhi"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correctAnswer: "Blue Whale"
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      correctAnswer: "JavaScript"
    },
    {
      question: "What year was JavaScript launched?",
      options: ["1996", "1995", "1994", "none of the above"],
      correctAnswer: "1995"
    }
  ];

  // Quiz State
  let currentQuestionIndex = 0;
  let score = 0;
  let selectedOption = null;
  let userName = '';

  // Initialize option buttons once
  function initializeOptionButtons() {
    optionsElement.innerHTML = '';
    
    for (let i = 0; i < 4; i++) {
      const button = document.createElement('button');
      button.id = `op-${i+1}`;
      button.className = 'option-btn border text-lg transition-all duration-200 py-3 px-6 bg-blue-900 text-white rounded-lg shadow-md hover:bg-blue-700';
      
      button.addEventListener('click', function() {
        // Only proceed if buttons are not disabled
        if (this.disabled) return;
        
        // Reset all buttons to default state
        document.querySelectorAll('.option-btn').forEach(btn => {
          btn.classList.remove('bg-amber-200', 'hover:bg-amber-200','text-black');
          btn.classList.add('bg-blue-900', 'hover:bg-blue-700','text-white');
        });
        
        // Highlight selected button
        this.classList.remove('bg-blue-900', 'hover:bg-blue-700','text-white');
        this.classList.add('bg-amber-200', 'hover:bg-amber-200','text-black');
        
        
        selectedOption = this.textContent;
        saveBtn.disabled = false;
      });
      
      optionsElement.appendChild(button);
    }
  }

  // Update button content for each question
  function updateQuestionOptions(question) {
    question.options.forEach((option, index) => {
      const button = document.getElementById(`op-${index+1}`);
      button.textContent = option;
      button.disabled = false;
      
      // Reset to initial state
      button.className = 'option-btn border text-lg transition-all duration-200 py-3 px-6 bg-blue-900 text-white rounded-lg shadow-md hover:bg-blue-700';
    });
  }

  // Show current question
  function showQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    questionElement.textContent = question.question;
    
    questionNumberElement.innerHTML = `<span class="relative bottom-[1px]">Q${currentQuestionIndex + 1}</span>`;
    
    updateQuestionOptions(question);
    
    nextBtn.disabled = true;
    saveBtn.disabled = true; // Disabled until an option is selected
    selectedOption = null;
  }

  // Save answer and show feedback
  function saveAnswer() {
    if (!selectedOption) {
      alert('Please select an option before saving.');
      return;
    }
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    document.querySelectorAll('.option-btn').forEach(button => {
      button.disabled = true;
      
      // Show correct answer in green
      if (button.textContent === currentQuestion.correctAnswer) {
        button.classList.remove('bg-blue-900', 'bg-amber-200');
        button.classList.add('bg-green-600', 'hover:bg-green-600');
      }
      // Show incorrect selection in red
      else if (button.textContent === selectedOption && selectedOption !== currentQuestion.correctAnswer) {
        button.classList.remove('bg-amber-200');
        button.classList.add('bg-red-600', 'hover:bg-red-600');
      }
    });
    
    if (selectedOption === currentQuestion.correctAnswer) {
      score++;
    }
    
    saveBtn.disabled = true;
    nextBtn.disabled = false;
  }

  // Move to next question
  function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }

  // Show final score
  function showScore() {
    quizScreen.classList.add('hidden');
    scoreScreen.classList.remove('hidden');
    scoreElement.textContent = `${score} out of ${quizQuestions.length}`;
  }

  // Initialize the app
  function init() {
    startScreen.classList.remove('hidden');
    quizScreen.classList.add('hidden');
    scoreScreen.classList.add('hidden');
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;
    userNameInput.value = '';
    
    initializeOptionButtons();
  }

  // Start the quiz
  function startQuiz() {
    userName = userNameInput.value.trim();
    if (!userName) {
      alert('Please enter your name to start the quiz.');
      return;
    }
    
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
  }

  // Event Listeners
  startBtn.addEventListener('click', startQuiz);
  saveBtn.addEventListener('click', saveAnswer);
  nextBtn.addEventListener('click', nextQuestion);
  endBtn.addEventListener('click', init);
  restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    quizScreen.classList.remove('hidden');
    scoreScreen.classList.add('hidden');
    showQuestion();
  });

  // Initialize the app
  init();
});

