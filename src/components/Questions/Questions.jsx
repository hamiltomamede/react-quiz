import he from "he";
import Option from "../Option/Option";
import settings from "../../store/settings";
import useQuestionStore from "../../store/questions";

function Question({ id, handleClick, singleQuestion, summary }) {
  const default_settings = settings
  const { incorrect_answers, correct_answer, question } = singleQuestion;
  const singleUserAnswer = useQuestionStore.questionData.question?.find((ans) => ans.question === question);
  const options = incorrect_answers
    .concat(correct_answer)
    .sort(() => Math.random() - 0.5);

  return (
    <section>
      <div className="flex items-start space-x-3 text-base md:text-lg mb-10">
        <h3 className="text-gray-800 font-semibold text-center">{id}.</h3>

        <h3 className="text-gray-800 font-semibold">{he.decode(question)}</h3>
      </div>

      {options.map((opt, i) => (
        <Option
          key={i}
          value={opt}
          idx={i}
          handleClick={handleClick}
          trueAnswer={correct_answer}
          userAnswer={singleUserAnswer}
          summary={summary}
        />
      ))}
    </section>
  );
}

export default Question;
