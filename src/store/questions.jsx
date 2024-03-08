import questions from '../questions.json';
import getRandomQuestions from "./randomQuestions";
class UseQuestionStore {
  constructor() {
    this.questionData = {
      question: [],
      userAnswer: [],
      trueAnswer: 0,
      falseAnswer: 0,
      totalTime: 0,
      page: 1,
    };
  }

  fetchQuestion = (num, level) => {
    this.questionData.question = getRandomQuestions(num, level)
  };

  setTimeStamp = (q_time) => {
    this.questionData.totalTime = q_time
  };


  addAnswer = ({ question, answer }) => {
    this.questionData.userAnswer.push({ question, answer })
  };

  correctAction = () => {
    this.questionData.trueAnswer += 1;
  };

  incorrectAction = () => {
    this.questionData.falseAnswer += 1;
  };
  resetQuestion = (num, level) => {
    this.questionData = {
      question: getRandomQuestions(num, level),
      userAnswer: [],
      trueAnswer: 0,
      totalTime: 0,
      falseAnswer: 0,
      page: 1,
    }
  };

  nextPage = () => {
    this.questionData.page += 1
  };

}

const useQuestionStore = new UseQuestionStore();

export default useQuestionStore;
