const hiraganaData = [
  { character: 'あ', reading: 'あ', options: ['あ', 'い', 'う', 'え'] },
  { character: 'い', reading: 'い', options: ['え', 'い', 'う', 'あ'] },
  { character: 'う', reading: 'う', options: ['あ', 'え', 'う', 'い'] },
  { character: 'え', reading: 'え', options: ['い', 'う', 'え', 'あ'] },
  { character: 'お', reading: 'お', options: ['お', 'あ', 'い', 'う'] },
  { character: 'か', reading: 'か', options: ['か', 'き', 'く', 'け'] },
  { character: 'き', reading: 'き', options: ['け', 'き', 'く', 'か'] },
  { character: 'く', reading: 'く', options: ['か', 'け', 'く', 'き'] },
  { character: 'け', reading: 'け', options: ['き', 'く', 'け', 'か'] },
  { character: 'こ', reading: 'こ', options: ['こ', 'か', 'き', 'く'] }
];

let currentQuestionIndex = 0;
let score = 0;
let quizzes = [];

function initializeQuiz() {
  quizzes = hiraganaData.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  if (currentQuestionIndex >= quizzes.length) {
    endQuiz();
    return;
  }

  const quiz = quizzes[currentQuestionIndex];
  document.getElementById('characterDisplay').textContent = quiz.character;
  
  const options = quiz.options.sort(() => Math.random() - 0.5);
  const buttons = document.querySelectorAll('.option-btn');
  
  buttons.forEach((btn, index) => {
    btn.textContent = options[index];
    btn.dataset.answer = options[index];
    btn.onclick = () => checkAnswer(btn);
    btn.style.backgroundColor = '';
    btn.disabled = false;
  });
  
  document.getElementById('resultDisplay').textContent = '';
  document.getElementById('nextBtn').style.display = 'none';
}

function checkAnswer(button) {
  const quiz = quizzes[currentQuestionIndex];
  const selectedAnswer = button.dataset.answer;
  const isCorrect = selectedAnswer === quiz.reading;
  
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(btn => btn.disabled = true);
  
  if (isCorrect) {
    button.style.backgroundColor = '#4CAF50';
    document.getElementById('resultDisplay').textContent = '正解！';
    document.getElementById('resultDisplay').style.color = '#4CAF50';
    score++;
  } else {
    button.style.backgroundColor = '#f44336';
    const correctBtn = Array.from(buttons).find(btn => btn.dataset.answer === quiz.reading);
    if (correctBtn) {
      correctBtn.style.backgroundColor = '#4CAF50';
    }
    document.getElementById('resultDisplay').textContent = '不正解...';
    document.getElementById('resultDisplay').style.color = '#f44336';
  }
  
  document.getElementById('scoreCount').textContent = score;
  document.getElementById('nextBtn').style.display = 'block';
}

function nextQuestion() {
  currentQuestionIndex++;
  loadQuestion();
}

function endQuiz() {
  document.getElementById('characterDisplay').textContent = 'お疲れ様！';
  document.getElementById('resultDisplay').textContent = '最終スコア: ' + score + '/10';
  document.getElementById('resultDisplay').style.color = '#333';
  document.querySelectorAll('.option-btn').forEach(btn => btn.style.display = 'none');
  document.getElementById('nextBtn').textContent = 'もう一度';
  document.getElementById('nextBtn').onclick = () => location.reload();
}

document.getElementById('nextBtn').onclick = nextQuestion;

window.addEventListener('DOMContentLoaded', initializeQuiz);