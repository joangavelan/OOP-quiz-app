import Quiz from "./quiz.js";
import Question from "./question.js";

const App = (() => {
    const questionEl = document.querySelector('.quiz__question');
    const trackerEl = document.querySelector('.quiz__tracker')
    const progressEl = document.querySelector('.progress__inner');
    const taglineEl = document.querySelector('.quiz__tagline');
    const choicesEl = document.querySelector('.quiz__choices');
    const nextButton = document.querySelector('.next');
    const restartButton = document.querySelector('.restart'); 
    
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
    
    // helper functions
    const setValue = (elem, value) => elem.innerHTML = value;
    const getPercentage = (x, y) => Math.floor((x / y) * 100);  
    
    const renderQuestion = () => setValue(questionEl, quiz.getCurrentQuestion().question);
    
    const renderTracker = () => setValue(trackerEl, `${quiz.currentIndex + 1} of ${quiz.questions.length}`);
    
    const renderProgress = () => progressEl.style.width = getPercentage(quiz.currentIndex, quiz.questions.length) + '%';
    
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
        setValue(choicesEl, markup);
    }
    
    const renderEndScreen = () => {
        if(quiz.score > (quiz.questions.length / 2)) setValue(questionEl, 'Good Job!');
        else setValue(questionEl, 'You can do it better!');
        setValue(taglineEl, 'Completed!');
        setValue(trackerEl, `You answered correctly ${quiz.score} out of ${quiz.questions.length} questions`);
        nextButton.style.opacity = 0;
        renderProgress();
    }
        
    const renderAll = () => {
        if(quiz.hasEnded()) {
            renderEndScreen();
        }
        else {
            //1. render the question
            renderQuestion();
            //2. render the tracker
            renderTracker();
            //3. render the progress
            renderProgress();
            //4. render the choices
            renderChoices();
        }
    }
    
    const listeners = () => {
        nextButton.addEventListener('click', () => {
            const selectedChoice = document.querySelector(`input[name="choice"]:checked`);
        
            if(selectedChoice) {
                const answerKey = +selectedChoice.id;
                quiz.guess(answerKey);
                renderAll();
            }
        })
        
        restartButton.addEventListener('click', () => {
            quiz.reset();
            nextButton.style.opacity = 1;
            setValue(taglineEl, 'Pick an option below!');
            renderAll();
        });
    }
    
    const init = () => {
        renderAll();
        listeners();
    }


    return {
        init
    }
})();

App.init();