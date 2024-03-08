import React, { createContext, useContext, useState } from 'react';

const PlayersContext = createContext([]);

export const usePlayers = () => useContext(PlayersContext);

export const PlayersProvider = ({ children }) => {

  class UsePlayersStore {
    constructor() {
      this.players = [];
    }

    addPlayer = (name) => {
      this.players.push({ name, correctAnswers: 0, incorrectAnswers: 0, answers: [], questions: [] });
    };

    addQuestions = (playerIndex, question) => {
      this.players[playerIndex].questions.push(question);
    };

    addAnswer = (playerIndex, { question, answer }) => {
      this.players[playerIndex].answers.push({ question, answer });
    };

    resetPlayers = () => {
      this.players = [];
    };

    trueAction = (playerIndex) => {
      this.players[playerIndex].correctAnswers++;
    };

    falseAction = (playerIndex) => {
      this.players[playerIndex].incorrectAnswers++;
    };
  }

  const playersStore = new UsePlayersStore();

  return (
    <PlayersContext.Provider value={playersStore}>
      {children}
    </PlayersContext.Provider>
  );
};
