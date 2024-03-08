import useQuestionStore from "../../store/questions";
import settings from "../../store/settings";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePlayers } from '../../PlayersContext';
import AnimateProvider from "../../components/AnimateProvider/AnimateProvider";
import Question from "../../components/Questions/Questions";

function Success() {
  const { setTimeStamp } = settings
  const actual_settings = settings.settings
  const { players, resetPlayers } = usePlayers()
  const navigate = useNavigate();
  console.log(players[0])
  //const score = (useQuestionStore.questionData.trueAnswer * 100) / 5;
  const [indxColor, setIndexColor] = useState('')

  useEffect(() => {
    setTimeStamp(0);
  }, []);

  const setIdxColor = (score) => {
    score >= 80 ? setIndexColor("#10b981") : score >= 60 ? setIndexColor("#F59E0B") : setIndexColor("#dc2626");

  }

  const handleClick = () => {
    useQuestionStore.resetQuestion(actual_settings.qtdQuestion, actual_settings.difficulty);
    settings.playAgain();
    navigate("/question");
  };

  const resetGame = () => {
    useQuestionStore.resetQuestion(actual_settings.qtdQuestion, actual_settings.difficulty);
    settings.setNewGame();
    resetPlayers()
    navigate("/");
  };

  const calculatePlayerScore = (player) => {
    const playerTotalQuestions = player.questions.length;
    const playerTrueAnswers = player.correctAnswers
    const score = (playerTrueAnswers / playerTotalQuestions) * 100
    //setIdxColor(score)
    return score
  };

  const playerScores = players.map((player) => ({
    name: player.name,
    score: calculatePlayerScore(player),
  }));

  return (
    <AnimateProvider className="flex flex-col space-y-10 md:max-w-xl md:mx-auto">
      <h3 className="text-lg text-center text-neutral-900 font-bold md:text-xl">
        Sua pontuação foi
      </h3>

      <h1
        style={{
          background: indxColor,
        }}
        className={`text-5xl font-bold mx-auto p-5 rounded-full bg-red-500 md:text-6xl text-neutral-100`}
      >
        {playerScores.map((player, index) => (
          <p key={index}>
            {player.name}: {player.score}
          </p>
        ))}
      </h1>
      {players.map((player, index) => (
        <div className="text-xs md:text-sm text-neutral-600 font-medium flex flex-col space-y-1" key={index}>

          <p className="flex justify-between" key={index}>

            Respostas certas <span className="text-green-600">{player.correctAnswers}</span>

          </p>

          <p className="flex justify-between" key={index}>
            Respostas erradas <span className="text-red-600">{player.incorrectAnswers}</span>
          </p>
          <p className="flex justify-between" key={index}>
            Respostas enviadas{" "}
            <span className="text-purple-600">{player.correctAnswers + player.incorrectAnswers}</span>
          </p>

        </div>
      ))}
      <button
        onClick={handleClick}
        className="grid place-items-center text-neutral-50 bg-orange-500 rounded-full py-2 hover:text-neutral-50 text-sm font-semibold"
      >
        Jogar novamente
      </button>

      <button
        onClick={resetGame}
        className="grid place-items-center text-neutral-50 bg-orange-500 rounded-full py-2 hover:text-neutral-50 text-sm font-semibold"
      >
        Mudar configurações
      </button>
      {/* Summary */}
      <h3 className="text-center text-neutral-600 font-semibold md:text-lg pt-[100px]">
        Respostas
      </h3>
      {useQuestionStore.questionData.question.map((question, i) => (
        <Question
          key={i}
          singleQuestion={question}
          id={i + 1}
          summary={true}
          trueAnswer={question.correct_answer}
        />
      ))}
    </AnimateProvider>
  );
}

export default Success;
