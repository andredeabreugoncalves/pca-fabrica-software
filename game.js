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
        question: 'De quem é a famosa frase “Penso, logo existo”?',
        choice1: 'Descartes',
        choice2: 'Platão',
        choice3: 'Francis Bacon',
        choice4: 'Sócrates',
        answer: 1,
    },
    {
        question: 'Quais o menor e o maior país do mundo?',
        choice1: 'São Marino e Índia',
        choice2: 'Nauru e China',
        choice3: 'Vaticano e Rússia',
        choice4: 'Malta e Estados Unidos',
        answer: 3,
    },
    {
        question: "Qual o livro mais vendido no mundo a seguir à Bíblia?",
        choice1: "O Senhor dos Anéis",
        choice2: "O Pequeno Príncipe",
        choice3: " Ela, a Feiticeira",
        choice4: "Dom Quixote",
        answer: 4,
    },
    {
        question: "Qual o número mínimo de jogadores numa partida de futebol?",
        choice1: "7",
        choice2: "10",
        choice3: "8",
        choice4: "9",
        answer: 1,
    },
    {
        question: "Quais os principais autores do Barroco no Brasil?",
        choice1: "Gregório de Matos, Bento Teixeira e Manuel Botelho de Oliveira",
        choice2: "Miguel de Cervantes, Gregório de Matos e Danthe Alighieri",
        choice3: "Padre Antônio Vieira, Padre Manuel de Melo e Gregório de Matos",
        choice4: "Castro Alves, Bento Teixeira e Manuel Botelho de Oliveira",
        answer: 1,
    },
    {
        question: "Quais as duas datas que são comemoradas em novembro?",
        choice1: "Independência do Brasil e Dia da Bandeira de Matos",
        choice2: "Miguel de Proclamação da República e Dia Nacional da Consciência Negra",
        choice3: "Dia de Finados e Dia Nacional do Livro",
        choice4: "Black Friday e Dia da Árvore",
        answer: 2,
    },
    {
        question: "Quanto tempo a luz do Sol demora para chegar à Terra?",
        choice1: "12 minutos",
        choice2: "1 dia",
        choice3: "12 horas",
        choice4: "8 minutos",
        answer: 4,
    },
    {
        question: "Qual a nacionalidade de Che Guevara?",
        choice1: "Cubana",
        choice2: "Argentina",
        choice3: "Panamenha",
        choice4: "Peruana",
        answer: 2,
    },
    {
        question: "Em que período da pré-história o fogo foi descoberto?",
        choice1: "Neolítico",
        choice2: "Paleolítico",
        choice3: "Idade dos Metais",
        choice4: "Período da Pedra Polida",
        answer: 2,
    },
    {
        question: "Qual a montanha mais alta do Brasil?",
        choice1: "Pico da Neblina",
        choice2: "Pico Paraná",
        choice3: "Pico Maior de Friburgo",
        choice4: "Pico da Bandeira",
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
        return window.location.assign('file:///home/oem/Desktop/REDES%20DE%20COMPUTADORES/AP1-EIN422-60_20202_01_%20PRATICA%20DE%20PROGRAMACAO%20EM%20SISTEMAS%20WEB/AP3/end.html');
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
