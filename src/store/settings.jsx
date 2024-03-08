class UseSettings {
  constructor() {
    this.settings = {
      time: '2',
      players: '1',
      difficulty: 'medio',
      new_game: true,
      qtdQuestion: '10',
      multiplayer: false,
      questions: []
    };
  }
  setQuestions = (questions) => {
    this.settings.questions.push(questions)
  };

  setTimeStamp = (q_time) => {
    this.settings.time = q_time
  };

  setPlayers = (num) => {
    this.settings.players = num
  };

  setMultiPlayers = (num) => {
    if (num === 1) {
      this.settings.multiplayer = false
    } else {
      this.settings.multiplayer = true
    }
  };

  setQtdQuestion = (num) => {
    this.settings.qtdQuestion = num
  };

  setDifficulty = (level) => {
    this.settings.difficulty = level
  };

  setNewGame = () => {
    this.settings.new_game = true
  };

  playAgain = () => {
    this.settings = {
      time: '2',
      difficulty: 'medio',
      new_game: false,
      qtdQuestion: '10'
    };
  }
}

const settings = new UseSettings();

export default settings;
