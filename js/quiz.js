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
        this.currentIndex++;
    }
    scoreUp() {
        return this.score++; 
    }
    hasEnded() {
        return this.currentIndex === this.questions.length;
    }
}