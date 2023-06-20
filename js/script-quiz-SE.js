//References
let timeLeft = document.querySelector('.time-left');
let quizContainer = document.getElementById('container');
let nextBtn = document.getElementById('next-button');
let countOfQuestion = document.querySelector('.number-of-question');
let displayContainer = document.getElementById('display-container');
let userScore = document.getElementById('user-score');
let startScreen = document.querySelector('.start-screen');
let startButton = document.getElementById('start-button');
let questionCount;
let scoreCount = 0;
let count = 16;
let countdown;

//music
var notifikasi = new Audio('music/bg-music.mp3');
var isAudioPlaying = true;

document.getElementById('audioSwitch').checked = true; // Menetapkan properti checked menjadi true

document.getElementById('audioSwitch').addEventListener('change', function() {

    if (this.checked) {
        playAudio();
    } else {
        stopAudio();
    }
});

notifikasi.addEventListener('ended', function() {
    playAudio();
});

function playAudio() {
    notifikasi.currentTime = 0; // Mengatur waktu pemutaran ke awal
    notifikasi.play();
    isAudioPlaying = true;
}

function stopAudio() {
    notifikasi.pause();
    notifikasi.currentTime = 0;
    isAudioPlaying = false;
}
// musik otomatis menyala saat pindah ke halaman kuis
window.addEventListener('DOMContentLoaded', function() {
    playAudio();
});

const quizArray = [{
        id: '0',
        question: 'Which CSS property is used for setting the space between the edge of the element and the element around it?',
        options: ['padding', 'margin', 'border', 'color'],
        correct: 'margin',
    },
    {
        id: '1',
        question: 'Which CSS property is used for setting the edge of the element?',
        options: ['font-size', 'border', 'color', 'margin'],
        correct: 'border',
    },
    {
        id: '2',
        question: 'Which CSS property is used for setting the text color?',
        options: ['color', 'font-size', 'font-color', 'border'],
        correct: 'color',
    },
    {
        id: '3',
        question: 'Which of the following is a popular Frontend Framework?',
        options: ['django', 'react', 'Ruby on Rails', 'angular'],
        correct: 'react',
    },
    {
        id: '4',
        question: 'Which of the following is not a valid value for the display property in CSS?',
        options: ['inline-block', 'block', 'inline', 'hidden'],
        correct: 'hidden',
    },
    {
        id: '5',
        question: 'Which of the following is not a data type in JavaScript?',
        options: ['Number', 'Boolean', 'jQuery', 'StringArray'],
        correct: 'StringArray',
    },
    {
        id: '6',
        question: 'Which HTTP method is used to retrieve data from an API?',
        options: ['POST', 'GET', 'DELETE', 'ENTER'],
        correct: 'GET',
    },
    {
        id: '7',
        question: 'Which of the following is a commonly used data format for APIs?',
        options: ['JSON', 'Array', 'CSV', 'REACT'],
        correct: 'JSON',
    },
    {
        id: '8',
        question: 'What is the output of the following code: console.log(2 + 2 * 2); ?',
        options: ['8', '6', '15', '10'],
        correct: '6',
    },
    {
        id: '9',
        question: 'Which of the following is used to make HTTP requests in vanilla JavaScript?',
        options: ['Axios', 'jQuery', 'React', 'fetch'],
        correct: 'fetch',
    },
];

//Next Button
nextBtn.addEventListener(
    'click',
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {

             // Mengarahkan ke halaman berikutnya dengan parameter
             var score = scoreCount;
             var url = 'result.html';
             
             localStorage.setItem("score", score);
             window.location.href = url;

        } else {
            //display questionCount
            countOfQuestion.innerHTML = questionCount + 1 + ' of ' + quizArray.length + ' Question';
            //display quiz
            quizDisplay(questionCount);
            count = 16;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll('.container-mid');
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add('hide');
    });
    //display current question card
    quizCards[questionCount].classList.remove('hide');
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement('div');
        div.classList.add('container-mid', 'hide');
        //question number
        countOfQuestion.innerHTML = 1 + ' of ' + quizArray.length + ' Question';
        //question
        let question_DIV = document.createElement('p');
        question_DIV.classList.add('question');
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName('container-mid')[questionCount];
    let options = question.querySelectorAll('.option-div');

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add('correct');
        scoreCount++;
    } else {
        userOption.classList.add('incorrect');
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add('correct');
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = '';
    questionCount = 0;
    scoreCount = 0;
    count = 16;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//hide quiz and display start screen
window.onload = () => {
    initial();
};