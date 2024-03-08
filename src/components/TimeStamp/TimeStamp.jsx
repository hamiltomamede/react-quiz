import { useEffect, useState } from "react";
import { getTimeByMs } from "../../utils";
import { useNavigate } from "react-router-dom";
import settings from "../../store/settings";
import useQuestionStore from "../../store/questions";

const defaultCountdown = {
  minutes: "00",
  seconds: "00",
};

function TimeStamp({ time }) {
  const [countDown, setCountDown] = useState(defaultCountdown);
  const [startTime, setStartTime] = useState(true);
  const { setTimeStamp } = useQuestionStore;
  //const { setTimeStamp } = settings;
  const navigate = useNavigate();
  useEffect(() => {
    if (!useQuestionStore.questionData.totalTime) {
      setTimeStamp(new Date(new Date().getTime() + time * 60000).getTime());
    }
  }, []);

  useEffect(() => {
    let intervalId;
    if (startTime && useQuestionStore.questionData.totalTime) {
      intervalId = setInterval(() => {
        const timeNext = getTimeByMs(useQuestionStore.questionData.totalTime);

        if (timeNext) {
          setCountDown(timeNext);
        } else {
          clearInterval(intervalId);
          setStartTime(false);
          navigate("/finish");
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime, useQuestionStore.questionData.totalTime]);

  return (
    <>
      <div className="mx-auto flex max-w-fit items-center space-x-3 text-neutral-700 ring-[1px] ring-neutral-400 rounded-lg p-3 text-xs font-semibold">
        <span>{countDown.minutes}</span>
        <span>Minutes</span>
        <span>{countDown.seconds}</span>
        <span>Seconds</span>
      </div>
    </>
  );
}

export default TimeStamp;
