import questions from '../questions.json';

function getRandomQuestions(numQuestions, level) {
    const randomQuestions = [];
    const questionsData = questions.results
    // .find((ans) => ans.difficulty === level)
    const numTotalQuestions = questionsData.length;

    // Gerar índices aleatórios únicos para cada pergunta
    const randomIndices = [];
    while (randomIndices.length < numQuestions) {
        const randomIndex = Math.floor(Math.random() * numTotalQuestions);
        if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
        }
    }

    // Selecionar as perguntas com base nos índices aleatórios gerados
    randomIndices.forEach(index => {
        randomQuestions.push(questionsData[index]);
    });

    return randomQuestions;
}
export default getRandomQuestions;