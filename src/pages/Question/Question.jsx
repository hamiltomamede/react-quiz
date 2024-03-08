import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useQuestionStore from "../../store/questions";
import settings from "../../store/settings";
import { usePlayers } from '../../PlayersContext';
import AnimateProvider from "../../components/AnimateProvider/AnimateProvider";

function Question() {
  const actual_settings = settings.settings
  const questions = useQuestionStore.questionData.question
  const { players, addQuestions } = usePlayers();

  const questionData = useQuestionStore.questionData
  const navigate = useNavigate();

  function initializeQuestions() {
    const numQuestions = questions.length;
    const numPlayers = players.length;

    if (numPlayers === 1) {
      for (let i = 0; i < numQuestions; i++) {
        addQuestions(0, questions[i]);
      }
    } else {
      for (let i = 0; i < numQuestions; i++) {
        if (i % 2 === 0) {
          addQuestions(1, questions[i]);
        } else {
          addQuestions(0, questions[i]);
        }
      }
    }
  };

  useEffect(() => {
    if (!questionData.question.length) {
      useQuestionStore.fetchQuestion(actual_settings.qtdQuestion, actual_settings.difficulty);
    }
  }, [useQuestionStore, questionData, actual_settings]);

  if (!questionData.question.length) return <p>Loading...</p>;

  return (
    <AnimateProvider className="max-w-xl mx-auto ">
      <h1 className="text-base md:text-lg font-semibold mb-5 text-orange-900">
        Informações do Jogo
      </h1>

      <div className="flex flex-col text-gray-900 space-y-3 text-xs md:text-sm">
        <div className="flex space-x-5">
          <p className="min-w-[170px]">Quantidade de Perguntas </p>
          <p className="font-bold">{settings.settings.qtdQuestion / 2}</p>
        </div>
        <div className="flex space-x-5">
          <p className="min-w-[170px]">Jogadores </p>
          {players?.map((player, index) => (

            <p key={index} className="font-bold">{player.name}</p>
          ))}

        </div>

        <div className="flex space-x-5">
          <p className="min-w-[170px] ">Dificuldade</p>
          <p className="font-bold capitalize text-lime-600">
            {settings.settings.difficulty}
          </p>
        </div>

        <div className="flex space-x-5">
          <p className="min-w-[170px]">Tempo total </p>
          <p className="font-bold">{settings.settings.time > 1 ? `${settings.settings.time} minutos` : `${settings.settings.time} minuto`}</p>
        </div>
      </div>

      <button
        disabled={!questionData.question}
        onClick={() => {
          initializeQuestions(),
            navigate(`/question/1`);
        }}
        className="flex w-full rounded-full bg-orange-500 cursor-pointer disabled:bg-orange-500/50 disabled:cursor-not-allowed p-1 justify-center font-semibold md:font-bold text-base md:text-lg text-center mt-10 text-white hover:bg-orange-500"
      >
        Iniciar
      </button>
    </AnimateProvider>
  );
}

export default Question;
