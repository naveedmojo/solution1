const questions = [
  { id: 1, text: 'How satisfied are you with our products?', type: 'rating' },
  {
    id: 2,
    text: 'How fair are the prices compared to similar retailers?',
    type: 'rating',
  },
  {
    id: 3,
    text: 'How satisfied are you with the value for money of your purchase?',
    type: 'rating',
  },
  {
    id: 4,
    text: 'On a scale of 1-10, how would you recommend us to your friends and family?',
    type: 'recommendation',
  },
  { id: 5, text: 'What could we do to improve our service?', type: 'text' },
];

let currentQuestion = 0;
let customerSessionId = generateSessionId();
let answers = {};

function startSurvey() {
  document.getElementById('welcome-container').style.display = 'none';
  document.getElementById('survey-screen').style.display = 'block';
  showQuestion();
}

function showQuestion() {
  document.getElementById('question-number').textContent = `${
    currentQuestion + 1
  }/${questions.length}`;
  document.getElementById('question-text').textContent =
    questions[currentQuestion].text;

  const ratingOptions = document.getElementById('rating-options');
  const recommendationOptions = document.getElementById(
    'recommendation-options'
  );
  const textInput = document.getElementById('text-input');

  ratingOptions.style.display = 'none';
  recommendationOptions.style.display = 'none';
  textInput.style.display = 'none';

  if (questions[currentQuestion].type === 'rating') {
    ratingOptions.style.display = 'block';
  } else if (questions[currentQuestion].type === 'recommendation') {
    recommendationOptions.style.display = 'block';
  } else if (questions[currentQuestion].type === 'text') {
    textInput.style.display = 'block';
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function nextQuestion() {
  saveAnswer();
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
    clearRadioSelection();
  } else {
    saveSurveyData();
  }
}

function skipQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  }
}

function saveAnswer() {
  const questionId = questions[currentQuestion].id;

  if (questions[currentQuestion].type === 'rating') {
    const ratingOptions = document.getElementsByName('rating');
    for (const option of ratingOptions) {
      if (option.checked) {
        answers[questionId] = parseInt(option.value);
        break;
      }
    }
  } else if (questions[currentQuestion].type === 'recommendation') {
    const recommendationOptions = document.getElementsByName('recommendation');
    for (const option of recommendationOptions) {
      if (option.checked) {
        answers[questionId] = parseInt(option.value);
        break;
      }
    }
  } else if (questions[currentQuestion].type === 'text') {
    const improvementText = document.getElementById('improvement-text').value;
    answers[questionId] = improvementText;
  }
}

function saveSurveyData() {
  // Save the survey answers in localStorage using the customer session ID and answers object
  localStorage.setItem(customerSessionId, JSON.stringify(answers));
  // Show confirmation dialog
  answers = {};
  currentQuestion = 0;
  document.getElementById('survey-screen').style.display = 'none';
  document.getElementById('welcome-container').style.display = 'block';
  alert('Thanku For Your Feedback');
  location.reload();
}
function generateSessionId() {
  // Generate a random session ID for each customer's session
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
function clearRadioSelection() {
  const ratingOptions = document.getElementsByName('rating');
  for (const option of ratingOptions) {
    option.checked = false;
  }

  const recommendationOptions = document.getElementsByName('recommendation');
  for (const option of recommendationOptions) {
    option.checked = false;
  }
}
