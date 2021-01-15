import Quiz from "./quiz.js";
import Question from "./question.js";

const questionEl = document.querySelector('.quiz__question');
const trackerEl = document.querySelector('.quiz__tracker')
const progressEl = document.querySelector('.progress__inner');
const taglineEl = document.querySelector('.quiz__tagline');
const choicesEl = document.querySelector('.quiz__choices');
const nextEl = document.querySelector('.next');
const restartEl = document.querySelector('.restart'); 

//Questions
const q1 = new Question(
    "Who's the first president of the United States?",
    ['Martin Luther King', 'Abraham Lincoln', 'George Washington', 'Barack Obama'],
    2
);
const q2 = new Question(
    "When was Javascript created?",
    ["June 1995", "May 1995", "July 1885", "Sep 1996"],
    1
  )
const q3 = new Question(
    "What does CSS stand for?",
    ["County Sheriff Service", "Cascading sexy sheets", "Cascading style sheets"],
    2
  )
const q4 = new Question(
    "The full form of HTML is...",
    ["Hyper Text Markup Language", "Hold The Mic", "ERROR"],
    0
  )
const q5 = new Question(
    "console.log(typeof []) would return what?",
    ["Array", "Object", "null", "array"],
    1
  )

const questions = [q1, q2, q3, q4, q5];
const quiz = new Quiz(questions);

const renderQuestion = () => questionEl.textContent = quiz.getCurrentQuestion().question;

const renderTracker = () => trackerEl.textContent = `${quiz.currentIndex + 1} out of ${quiz.questions.length}`

const renderChoices = () => {
    const currentChoices = quiz.getCurrentQuestion().choices;
    let markup = '';
    currentChoices.forEach((choice, index) => {
        markup += `
            <li class="quiz__choice">
                <input type="radio" name="choice" class="quiz__input" id="${index}">
                <label for="${index}" class="quiz__label">
                <i></i>
                ${choice}
                </label>
            </li>
        `
    }); 
    choicesEl.innerHTML = markup;
}

const renderProgress = () => progressEl.style.width = `${quiz.currentIndex / quiz.questions.length * 100}%`;
      
    
const renderAll = () => {
    //1. render the question
    renderQuestion();
    //2. render the tracker
    renderTracker();
    //3. render the progress
    renderProgress();
    //4. render the choices
    renderChoices();
}


nextEl.addEventListener('click', () => {
    const currentQuestion = quiz.getCurrentQuestion();
    const choices = choicesEl.querySelectorAll('.quiz__input');
    let selectedChoice = '';

    for(let choice of choices) {
        if(choice.checked === true) {
            selectedChoice = +choice.id;
        }
    }

    if(selectedChoice === '') alert('Choose your answer');

    else {
        if(currentQuestion.isCorrect(selectedChoice)) quiz.scoreUp();

        quiz.nextQuestion();
        renderAll();
    }
})








renderAll();