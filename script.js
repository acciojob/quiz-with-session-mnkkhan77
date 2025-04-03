// Select the container where questions will be displayed
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const resultElement = document.getElementById("score");

// Questions array
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Retrieve progress from session storage
const userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Function to render questions
function renderQuestions() {
  questionsElement.innerHTML = "";
  questions.forEach((question, i) => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `<p>${question.question}</p>`;
    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", "true");
      }
      choiceElement.addEventListener("change", () => {
        saveAnswer(i, choice);
        choiceElement.setAttribute("checked", "true");
      });
      
      const label = document.createElement("label");
      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      questionElement.appendChild(label);
    });
    questionsElement.appendChild(questionElement);
  });
}

// Function to save user selection to session storage
function saveAnswer(questionIndex, answer) {
  userAnswers[questionIndex] = answer;
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Function to calculate and display score
function submitQuiz() {
  let score = 0;
  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });
  
  // Store score in local storage
  localStorage.setItem("score", score);
  
  // Display score
  resultElement.innerText = `Your score is ${score} out of ${questions.length}.`;
}

// Display previous score if available
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  resultElement.innerText = `Your last score was ${storedScore} out of ${questions.length}.`;
}

// Attach event listener to submit button
submitButton.addEventListener("click", submitQuiz);

// Render the questions
renderQuestions();