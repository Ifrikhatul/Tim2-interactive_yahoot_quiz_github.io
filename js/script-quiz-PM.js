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
        question: 'Important initiative that are not vital, but add significant value in MoSCoW method is? ',
        options: ['could have', 'should have', 'must have', 'will not have'],
        correct: 'should have', 
    },
    {
        id: '1',
        question: 'In RICE scoring, opportunity cost can be calculated and categorized into? ',
        options: ['effort', 'impact', 'confidence', 'reach'],
        correct: 'impact',
    },
    {
        id: '2',
        question: 'The map of a user is experience as they encounter your problem space or interact with your product is? ',
        options: ['user personas', 'customer journey map', 'buyer representation', 'collective archetypes'],
        correct: 'customer journey map',
    },
    {
        id: '3',
        question: 'When you are calculating the effort of features, to whom you should collaborate?',
        options: ['other PMs', 'Developers and engineers', 'Self-research', 'Make your own assumption'],
        correct: 'Developers and engineers',
    },
    {
        id: '4',
        question: 'What kind of prioritization methods focus on quantitative calculations to weigh prioritization?',
        options: ['impact effort prioritization', 'rice scoring model', '5 WHYs', 'eisenhower framework'],
        correct: 'rice scoring model',
    },
    {
        id: '5',
        question: 'The backlog, a list of tasks and requirements the final project needs, must be prioritized by? ',
        options: ['development team', 'product owner', 'agile coach', 'scrum master'],
        correct: 'product owner',
    },
    {
        id: '6',
        question: 'What is the common tools used in Scrum?',
        options: ['trello', 'all correct', 'monday.com', 'jira'],
        correct: 'all correct',
    },
    {
        id: '7',
        question: 'If the team encountered any bugs, who should be responsible in dealing with the issue?',
        options: ['business', 'developer team', 'product owner', 'designer team'],
        correct: 'developer team',
    },
    {
        id: '8',
        question: 'Scrum has roles below, EXCEPT',
        options: ['developer team', 'key stakeholder', 'product owner', 'designer team'],
        correct: 'key stakeholder',
    },
    {
        id: '9',
        question: 'What is the time-box for Sprint Retrospective?',
        options: ['15 minutes', '60 minutes', '4 hours', '2 hours'],
        correct: '60 minutes',
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