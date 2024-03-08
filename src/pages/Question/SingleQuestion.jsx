import useQuestionStore from "../../store/questions";
import settings from "../../store/settings";
import { usePlayers } from '../../PlayersContext';
import getRandomQuestions from "../../store/randomQuestions";
import { useNavigate, useParams } from "react-router-dom";
import TimeStamp from "../../components/TimeStamp/TimeStamp";
import { useEffect, useState } from "react";
import AnimateProvider from "../../components/AnimateProvider/AnimateProvider";
import Question from "../../components/Questions/Questions";

function SingleQuestion() {
  const { players, addAnswer, addQuestions, trueAction, falseAction } = usePlayers();
  const questions = useQuestionStore.questionData.question
  const navigate = useNavigate();
  let page = useQuestionStore.questionData.page
  const { id } = useParams();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);

  useEffect(() => {
    setCurrentPlayer(players[currentPlayerIndex]);
  }, [currentPlayerIndex, players]);

  const handleNextQuestion = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  useEffect(() => {
    if (Number(id) < page) {
      navigate(`/question/${page}`);
    }
  }, [id]);

  const singleQuestion = questions?.[page - 1]

  const { correct_answer } = singleQuestion;

  const handleAnswer = (value) => {
    //Add answer
    useQuestionStore.addAnswer({ question: singleQuestion.question, answer: value });
    addAnswer(currentPlayerIndex, { question: singleQuestion.question, answer: value })
    //Verify Answer
    if (value === correct_answer) {
      useQuestionStore.correctAction();
      trueAction(currentPlayerIndex)
    } else {
      useQuestionStore.incorrectAction();
      falseAction(currentPlayerIndex)
    }

    handleNextQuestion()

    useQuestionStore.nextPage();

    navigate(
      page === questions?.length ? "/finish" : `/question/${Number(id) + 1}`
    );
  };

  return (
    <AnimateProvider className="max-w-xl mx-auto">
      <h1 className="text-lg font-bold text-slate-800 mb-10">
        {currentPlayer.name}
      </h1>

      <div className="flex max-w-fit flex-col ml-auto space-x-3 mb-10">
        <TimeStamp
          time={settings.settings.time} />
      </div>
      <Question
        id={page}
        handleClick={handleAnswer}
        singleQuestion={singleQuestion}
      />
    </AnimateProvider>
  );
}

export default SingleQuestion;
