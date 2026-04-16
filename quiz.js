const numberOfQuestions=3;
let score = 0;
let currentQuestionIndex = 0;
let activeQuestionsArray = [];

/**
 * Represents a quiz question with multiple choice answers.
 *
 * @class Question
 * @param {string} text - The question text to display
 * @param {string[]} choices - Array of answer choice strings
 * @param {string} answer - The correct answer (must match one of the choices exactly)
 *
 * @example
 * const question = new Question(
 *   "What is 2+2?",
 *   ["3", "4", "5", "6"],
 *   "4"
 * );
 */
class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  /**
   * Checks if the provided choice matches the correct answer.
   *
   * @method isCorrectAnswer
   * @param {string} choice - The user's selected answer choice
   * @returns {boolean} True if the choice matches the correct answer, false otherwise
   *
   * @example
   * question.isCorrectAnswer("4") // returns true if "4" is the correct answer
   */
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

const questions = [
  new Question(
    "What is an object in OOP?",
    [
      "A function that returns a value",
      "A collection of related data and behavior",
      "A type of loop",
      "A conditional statement",
    ],
    "A collection of related data and behavior",
  ),
  new Question(
    "What is a class?",
    [
      "A built-in JavaScript function",
      "A type of variable",
      "A blueprint for creating objects",
      "A method that runs automatically",
    ],
    "A blueprint for creating objects",
  ),
  new Question(
    "What does encapsulation mean?",
    [
      "Inheriting properties from another class",
      "Bundling data and methods that operate on that data together",
      "Creating multiple instances of a class",
      "Overriding a parent method",
    ],
    "Bundling data and methods that operate on that data together",
  ),
  new Question(
    "What is inheritance in OOP?",
    [
      "When a class acquires properties and methods from another class",
      "When two objects share the same name",
      "When a method calls itself",
      "When a variable is declared inside a function",
    ],
    "When a class acquires properties and methods from another class",
  ),
  new Question(
    "What is polymorphism?",
    [
      "Having multiple constructors in one class",
      "The ability of different objects to respond to the same method in different ways",
      "Hiding internal implementation details",
      "Creating a class inside another class",
    ],
    "The ability of different objects to respond to the same method in different ways",
  ),
  new Question(
    "What is abstraction?",
    [
      "Making all properties public",
      "Copying one object into another",
      "Hiding complex implementation and exposing only what's necessary",
      "Declaring a variable without a value",
    ],
    "Hiding complex implementation and exposing only what's necessary",
  ),
  new Question(
    "What is a constructor?",
    [
      "A method that destroys an object",
      "A special method that runs when an object is created",
      "A method inherited from a parent class",
      "A function that returns a boolean",
    ],
    "A special method that runs when an object is created",
  ),
  new Question(
    "What does the keyword this refer to inside a class method?",
    [
      "The parent class",
      "The global window object",
      "The current instance of the class",
      "The method itself",
    ],
    "The current instance of the class",
  ),
  new Question(
    "What is method overriding?",
    [
      "Calling a method twice",
      "Defining a method in a child class that already exists in the parent class",
      "Creating two methods with the same name in one class",
      "Preventing a method from being inherited",
    ],
    "Defining a method in a child class that already exists in the parent class",
  ),
  new Question(
    "Which of the following best describes an instance?",
    [
      "A copy of a method",
      "A specific object created from a class",
      "A class that extends another class",
      "A property with no value",
    ],
    "A specific object created from a class",
  ),
];

/**
 * Shuffles an array of questions and returns a random subset of the specified amount.
 *
 * @param {Array} questions - The array of question objects to shuffle
 * @param {number} amount - The number of random questions to return
 * @returns {Array} An array containing the specified amount of randomly selected questions
 */
function getRandomQuestions(questions, amount=numberOfQuestions) {
  const shuffledQuestions = [...questions];
  for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQuestions[i], shuffledQuestions[j]] = [
      shuffledQuestions[j],
      shuffledQuestions[i],
    ];
  }

  return shuffledQuestions.slice(0, amount);
}

/**
 * Initializes and starts the quiz by setting up the active questions array,
 * resetting the score and question index, and displaying the first question.
 *
 * @function startQuiz
 * @returns {void}
 *
 * @description
 * Sets up the quiz state by:
 * - Retrieving a random selection of 5 questions from the questions array
 * - Resetting the current question index to 0
 * - Resetting the score to 0
 * - Updating the UI to display the initial score and question count
 * - Hiding the welcome container and showing the quiz container
 * - Loading the first question
 *
 * @requires questions - Array of question objects available for the quiz
 * @requires getRandomQuestions - Function to retrieve random questions from the pool
 * @requires loadQuestion - Function to display the current question on the screen
 *
 * @global activeQuestionsArray - Stores the selected questions for current quiz session
 * @global currentQuestionIndex - Tracks which question is currently being displayed
 * @global score - Tracks the user's current quiz score
 */
function startQuiz() {
  activeQuestionsArray = getRandomQuestions(questions, numberOfQuestions);
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("score").innerHTML = `${score} points`;
  document.getElementById("question-number").innerHTML =
    `Question 1 of ${activeQuestionsArray.length}`;
  document.getElementById("welcome-container").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  loadQuestion();
}

/**
 * Loads and displays the current question and its answer choices.
 *
 * @function loadQuestion
 * @returns {void}
 *
 * @description
 * Retrieves the current question from the active questions array,
 * displays it in the DOM, and creates clickable buttons for each answer choice.
 * Each button has an event listener that calls handleAnswer when clicked.
 *
 * @requires activeQuestionsArray - Array of Question objects for the current quiz session
 * @requires currentQuestionIndex - Index of the current question to display
 * @requires handleAnswer - Function to process the user's answer selection
 *
 * @global activeQuestionsArray - Stores the selected questions for current quiz session
 * @global currentQuestionIndex - Tracks which question is currently being displayed
 */
function loadQuestion() {
  const currentQuestion = activeQuestionsArray[currentQuestionIndex];
  document.getElementById("question-text").innerHTML = currentQuestion.text;
  const choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = "";
  const finalScreenContainer = document.getElementById("result-container");
  if(!finalScreenContainer.classList.contains("hidden"))
    finalScreenContainer.classList.add("hidden");

  for (let choice of currentQuestion.choices) {
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", function(){
      handleAnswer(currentQuestion, choice);
    });
    choicesContainer.appendChild(button);
  }
}

/**
 * Processes the user's answer selection and updates the quiz state.
 *
 * @function handleAnswer
 * @param {Question} currentQuestion - The current question object being answered
 * @param {string} choice - The user's selected answer choice
 * @returns {void}
 *
 * @description
 * Evaluates if the selected answer is correct:
 * - If correct: increments the score and updates the score display
 * - If incorrect: displays a wrong answer message in the UI
 * Advances to the next question or completes the quiz when all questions are answered.
 * When moving to the next question, hides the wrong answer message.
 * When quiz is complete, displays the final score and shows the result container.
 *
 * @requires currentQuestion.isCorrectAnswer() - Method to validate the answer
 * @requires loadQuestion - Function to display the next question
 *
 * @global currentQuestionIndex - Incremented after processing answer
 * @global score - Incremented if answer is correct
 * @global activeQuestionsArray - Used to check if more questions remain
 */
async function handleAnswer(currentQuestion, choice) {
  if(choice === undefined){
    return;
  }
  if (currentQuestion.isCorrectAnswer(choice)) {
    score++;
    document.getElementById("score").innerHTML = score ===1? `${score} point`:`${score} points`;
  } else {
    document.getElementById("wrong-answer-msg").classList.remove("hidden");
    await new Promise(r => setTimeout(r, 1500));
  }
  currentQuestionIndex++;

  document.getElementById("wrong-answer-msg").classList.add("hidden")
  if (currentQuestionIndex < activeQuestionsArray.length) {
    document.getElementById("question-number").innerHTML =
      `Question ${currentQuestionIndex + 1} of ${activeQuestionsArray.length}`;
    loadQuestion();
  } else {
    document.getElementById("quiz-container").classList.add("hidden");
    const finalScore = document.getElementById("final-score");
    if(score===0){
      finalScore.innerHTML = `You absolutely failed this with ${score} points`;
    }
    else{
      finalScore.innerHTML=`CONGRATULATIONS! You survived with ${score} points`;
    }
    document.getElementById("result-container").classList.remove("hidden");
  }
}

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("restart-btn").addEventListener("click", startQuiz);
