const questionElement = document.getElementById("question");
const options = document.querySelectorAll(".option");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let questions = [];

async function fetchQuestions() {
  const response = await fetch("https://opentdb.com/api.php?amount=16&difficulty=easy");
  const data = await response.json();
  questions = data.results;
  displayQuestion(currentQuestionIndex);
}

function displayQuestion(index) {
  const question = questions[index];
  questionElement.innerHTML = question.question;
  question.incorrect_answers.forEach((option, i) => {
    options[i].textContent = option;
  });
  options[3].textContent = question.correct_answer;
  nextButton.style.display = "none";
}

function checkAnswer(selectedIndex) {
  options[3].style.backgroundColor = "#2ecc71"; // Highlight correct answer
  if (selectedIndex !== 3) {
    options[selectedIndex].style.backgroundColor = "#e74c3c"; // Highlight incorrect answer
  }
  nextButton.style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(currentQuestionIndex);
    options.forEach((option) => {
      option.style.backgroundColor = "#3498db";
    });
  } else {
    questionElement.textContent = "Quiz Finished!";
    options.forEach((option) => {
      option.style.display = "none";
    });
    nextButton.style.display = "none";
  }
}

fetchQuestions();
