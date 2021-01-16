export default class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.score = 0;
        this.currentIndex = 0;
    }
    getCurrentQuestion() {
        return this.questions[this.currentIndex];
    }
    nextQuestion() {
        return this.currentIndex++;
    }
    guess(userGuess) {
        const currentQuestion = this.questions[this.currentIndex];
        if(currentQuestion.isCorrect(userGuess)) {
            this.score++; 
        }
        this.nextQuestion();
    }
    hasEnded() {
        return this.currentIndex === this.questions.length;
    }
    reset() {
        this.currentIndex = 0;
        this.score = 0;
    }
}