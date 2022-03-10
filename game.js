const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: 'O que é sustentabilidade Social?',
        choice1: 'Distribuição de renda com redução das diferenças sociais e melhoria da qualidade de vida.',
        choice2: 'Manutenção do meio ambiente do planeta Terra.',
        choice3: 'Conjunto de ações que uma empresa toma, visando o respeito ao meio ambiente.',
        choice4: 'Conjunto de ações que beneficiam a sociedade e as corporações que são tomadas pelas empresas',
        answer: 1,
    },
    {
        question: 'Qual a diferença entre sustentabilidade e desenvolvimento sustentável?',
        choice1: 'Sustentabilidade indica uma busca pelo equilíbrio entre a melhora da qualidade de vida dos homens e o limite ambiental do planeta e D. Sustentável está amplamente vinculado aos discursos de vários setores das empresas ambientais.',
        choice2: 'Sustentabilidade está amplamente vinculada aos discursos de vários setores da sociedade e D. Sustentável indica uma ação na qual irá manter uma sociedade funcionando.',
        choice3: 'Sustentabilidade indica uma busca pelo equilíbrio entre a melhora da qualidade de vida dos homens e o limite ambiental do planeta e D. Sustentável está amplamente vinculado aos discursos de vários setores da sociedade, educacional, político etc..',
        choice4: 'Nenhuma das alternativas acima apresenta diferenças entre Sustentabilidade e Desenvolvimento Sustentável.',
        answer: 3,
    },
    {
        question: "Qual das alternativas abaixo é um exemplo de Sustentabilidade Social?",
        choice1: "Reflorestamento: áreas que sofreram a retirada de vegetação podem ser reflorestadas para preservar o meio ambiente.",
        choice2: "Descarte de equipamentos eletrônicos, baterias e pilhas em locais apropriados para que empresas especializadas possam dar um destino correto a este material.",
        choice3: "Tratamento adequado a todos os poluentes gerados na produção de mercadorias e serviços",
        choice4: "Orientação aos jovens, através de programas eficientes, sobre o grave problema das drogas.",
        answer: 4,
    },
    {
        question: "De acordo com a Sustentabilidade, o que são os 3 R's?",
        choice1: "Reajustar, reciclar e refazer",
        choice2: "Reduzir, reutilizar e reciclar",
        choice3: "Reparar, reciclar e reutilizar",
        choice4: "Repensar, refazer e realizar",
        answer: 2,
    },
    {
        question: "Qual a função da reciclagem?",
        choice1: "É o processo de reaproveitamento do lixo, dando origem a um novo produto ou a uma nova matéria-prima.",
        choice2: "É o processo de reutilização de materiais recicláveis, fazendo com que o produto seja restaurado.",
        choice3: "É o processo de reciclagem do lixo, dando origem a um novo produto ou a uma nova matéria-prima.",
        choice4: "É o processo de reaproveitamento de materiais recicláveis, fazendo com que não se tornem uma nova matéria-prima.",
        answer: 1,
    },
    {
        question: "No ambiente caseiro, um aspecto de grande importância para a sustentabilidade ambiental é a:",
        choice1: "Reciclagem do Lixo.",
        choice2: "Reutilização do fósforo.",
        choice3: "Reciclagem de metal.",
        choice4: "Reciclagem de madeira.",
        answer: 1,
    },
    {
        question: "Qual das alternativas abaixo é um exemplo de reciclagem?",
        choice1: "Acúmulo de matéria-prima.",
        choice2: "Coleta Seletiva.",
        choice3: "Reutilização de garrafa pet.",
        choice4: "Incineração.",
        answer: 2,
    },
    {
        question: "Qual a cor da lixeira específica para o Metal?",
        choice1: "Laranja",
        choice2: "Azul",
        choice3: "Amarela",
        choice4: "Marrom",
        answer: 3,
    },
    {
        question: "Como visto nas últimas questões, aprendemos muito sobre Sustentabilidade e também Sustentabilidade Social. De acordo com o que temos visto, responda, qual das alternativas abaixo não se encaixa com Sustentabilidade Ambiental?",
        choice1: "Preservação do meio ambiente.",
        choice2: "Reduzir, reutilizar e reciclar.",
        choice3: "Fechar as torneiras quando elas não estiverem sendo usadas.",
        choice4: "Investimentos em educação pública, visando à qualidade do ensino.",
        answer: 4,
    },
    {
        question: "O que é ser uma pessoa sustentável?",
        choice1: "Aproveitar o que o mundo nos oferece sem comprometer as vidas das futuras gerações.",
        choice2: "Não aproveitar o que o mundo nos oferece e comprometer as vidas das futuras gerações.",
        choice3: "Se exercitar todos os dias antes de sair de casa.",
        choice4: "Não prejudicar o seu ambiente, mantendo suas coisas em ordem e visando um bom futuro para você mesmo.",
        answer: 1,
    },
    
];
//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("hhttps://github.com/andredeabreugoncalves/pca-int-app-web/blob/main/end.html");
    }
    questionCounter++;
    progressText.innerText = `Questionário ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;



    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];


        const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
          }
  
      selectedChoice.parentElement.classList.add(classToApply);
  
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
});


incrementScore = num => {
    score += num;
    scoreText.innerText = score;
  };

startGame();
