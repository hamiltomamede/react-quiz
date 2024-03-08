import { numQuestions, Level } from "./constant";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useQuestionStore from "./store/questions";
import { usePlayers } from './PlayersContext';
import settings from "./store/settings";
import AnimateProvider from "./components/AnimateProvider/AnimateProvider";

function App() {
  const [numPlayers, setNumPlayers] = useState('1');
  const [qtdQuestion, setQtdQuestion] = useState('10');
  const [playerNames, setPlayerNames] = useState([""]);
  const { players, addPlayer, addQuestions } = usePlayers();
  const [level, setLevel] = useState('medio');
  const [time, setTime] = useState('1');
  const navigate = useNavigate();

  const handleBegin = () => {
    handleAddPlayers();
    settings.setDifficulty(level)
    settings.setTimeStamp(time)
    settings.setNewGame(true)
    settings.setQtdQuestion(qtdQuestion)
    useQuestionStore.fetchQuestion(settings.settings.qtdQuestion, settings.settings.difficulty);
    navigate(`/question`)
  };


  /* const handleNextQuestion = () => {
     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
   };*/

  const handleNumPlayersChange = (event) => {
    const num = parseInt(event.target.value);
    setNumPlayers(num);
    const names = Array(num).fill("").map((_, index) => `Jogador ${index + 1}`);
    setPlayerNames(names);
  };

  const handlePlayerNameChange = (index, newName) => {
    setPlayerNames(prevNames => {
      const newNames = [...prevNames];
      newNames[index] = newName;
      return newNames;
    });
  };

  const handleAddPlayers = () => {
    playerNames.forEach(name => {
      if (name.trim() !== '') {
        addPlayer(name);
      }
    });
  };

  if (!settings.settings.new_game) return <Navigate to={"/question"} />;

  return (
    <AnimateProvider className="flex flex-col text-sm md:mx-auto md:max-w-xl ">
      <h1 className="text-lg font-bold text-slate-800 mb-10">
        Bem vindo ao <span>JW Quiz</span>
      </h1>

      <h3 className="text-xs md:text-sm text-neutral-600 font-semibold mb-3">
        Selecione a quantidade de jogadores{" "}
      </h3>

      <select
        className="bg-neutral-50 ring-[1px] ring-gray-200  rounded-lg px-1 py-2 md:py-3  text-xs md:text-sm focus:border-none focus:outline-none focus:ring-[1px] focus:ring-orange-500 text-gray-700 font-medium mb-5"

        id="numPlayers" value={numPlayers} onChange={handleNumPlayersChange}>

        <option key={1} value={1}>Jogar sozinho</option>
        <option key={2} value={2}>Jogar em dupla ou equipe</option>

      </select>

      <h3 className="text-xs md:text-sm text-neutral-600 font-semibold mb-3">
        Nome:{" "}
      </h3>
      {playerNames.map((name, index) => (

        <input className="bg-neutral-50 ring-[1px] ring-gray-200  rounded-lg px-1 py-2 md:py-3  text-xs md:text-sm focus:border-none focus:outline-none focus:ring-[1px] focus:ring-orange-500 text-gray-700 font-medium mb-5"
          key={index}
          type="text"
          value={name}
          onChange={(event) => handlePlayerNameChange(index, event.target.value)}
          placeholder={name}
          required
        />
      ))}

      <h3 className="text-xs md:text-sm text-neutral-600 font-semibold mb-3">
        Selecione o nivel
      </h3>
      <select
        className="bg-neutral-50 ring-[1px] ring-gray-200  rounded-lg px-1 py-2 md:py-3  text-xs md:text-sm focus:border-none focus:outline-none focus:ring-[1px] focus:ring-orange-500 text-gray-700 font-medium mb-10 capitalize"
        name="level"
        disabled
        defaultValue={'medio'}
        onChange={(e) => setLevel(e.target.value)}
      >
        {Level.map((level) => (
          <option value={level} key={level}>
            {level}
          </option>
        ))}
      </select>

      <h3 className="text-xs md:text-sm text-neutral-600 font-semibold mb-3">
        Selecione a quantidade de perguntas
      </h3>
      <select
        className="bg-neutral-50 ring-[1px] ring-gray-200  rounded-lg px-1 py-2 md:py-3  text-xs md:text-sm focus:border-none focus:outline-none focus:ring-[1px] focus:ring-orange-500 text-gray-700 font-medium mb-10 capitalize"
        name="qtd"
        defaultValue={'10'}
        onChange={(e) => setQtdQuestion(e.target.value)}
      >
        {numQuestions.map((question) => (
          <option value={question} key={question}>
            {question}
          </option>
        ))}
      </select>

      <h3 className="text-xs md:text-sm text-neutral-600 font-semibold mb-3">
        Selecione o tempo
      </h3>
      <select
        className="bg-neutral-50 ring-[1px] ring-gray-200  rounded-lg px-1 py-2 md:py-3  text-xs md:text-sm focus:border-none focus:outline-none focus:ring-[1px] focus:ring-orange-500 text-gray-700 font-medium mb-10 capitalize"
        name="time"
        onChange={(e) => setTime(e.target.value)}
      >

        <option value='1'>1 minuto</option>
        <option value='2'>2 minutos</option>
        <option value='3'>3 minutos</option>
        <option value='4'>4 minutos</option>
      </select>

      <button
        className="flex rounded-full bg-orange-500 p-1 py-2 md:py-2 justify-center font-semibold md:font-bold text-sm md:text-base text-center hover:bg-neutral-50 hover:text-orange-500 transition text-white"
        onClick={() => { handleBegin() }}
      >
        Iniciar
      </button>
    </AnimateProvider>
  );
}

export default App;
