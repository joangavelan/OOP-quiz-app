export default class Question {
    constructor(question, choices, answerKey) {
        this.question = question;
        this.choices = choices;
        this.answerKey = answerKey;
    }
    isCorrect(userGuess) {
        return this.answerKey === userGuess;
    }
}