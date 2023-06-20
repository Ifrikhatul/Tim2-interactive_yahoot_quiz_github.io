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
//musik otomatis menyala saat pindah ke halaman kuis
window.addEventListener('DOMContentLoaded', function() {
    playAudio();
});

const quizArray = [{
        id: '0',
        question: 'If we want to show the fluctuation of sales trend during 2020-2022, we use? ',
        options: ['Scatter Plot', 'Line Chart', 'Pie Chart', 'Horizontal Bar Chart'],
        correct: 'Line Chart',
    },
    {
        id: '1',
        question: 'In Looker Studio, which of the following chart is used to represent the changes of data over a period of time? ',
        options: ['Sunburst Chart', 'Time Series Chart', 'table chart', 'scatter chart'],
        correct: 'Time Series Chart',
    },
    {
        id: '2',
        question: 'Which components must get their data from a data source? ',
        options: ['text', 'bar charts', 'embedded content', 'images'],
        correct: 'bar charts',
    },
    {
        id: '3',
        question: 'Which of the following is NOT the type of visuals in data visualization?',
        options: ['heat map', 'fever map', 'bullet graph', 'bubble chart'],
        correct: 'fever map',
    },
    {
        id: '4',
        question: 'Which one is not the type of geographic chart type in Looker?',
        options: ['heat map', 'point map', 'bullet graph', 'bubble map'],
        correct: 'point map',
    },
    {
        id: '5',
        question: 'Which of the following type of data is NOT available in Looker Studio?',
        options: ['boolean values', 'none of the above', 'geographic', 'persentage values'],
        correct: 'none of the above',
    },
    {
        id: '6',
        question: 'We can combine multiple spreadsheets into single sheet using which function?',
        options: ['MIDRANGE', 'IMPORTRANGE', 'SUM', 'IMPORTDATA'],
        correct: 'IMPORTRANGE',
    },
    {
        id: '7',
        question: 'If we want to plot sales revenue and compare it with an annual or quarterly sales target we can use?',
        options: ['waterfall', 'bullet charts', 'line charts', 'heatmap'],
        correct: 'bullet charts',
    },
    {
        id: '8',
        question: 'In Looker Studio, what is the name of the visualization when we want to highlight one number as the main point?',
        options: ['bar chart', 'score card', 'waterfall chart', 'bullet chart'],
        correct: 'score card',
    },
    {
        id: '9',
        question: 'We can use descriptive statistics below as part of Exploratory Data Analytics, except',
        options: ['mean', 'linear', 'variamce', 'median'],
        correct: 'linear',
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