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
        question: 'Which of the following CTA buttons is NOT offered by Facebook?',
        options: ['Watch More', 'View More', 'Order Now', 'Shop Now'],
        correct: 'View More',
    },
    {
        id: '1',
        question: 'In Facebook Ads, on what level will you choose the CTA for your ads?',
        options: ['Campaign leve', 'Ad level', 'Ad set level', 'All level'],
        correct: 'Ad level',
    },
    {
        id: '2',
        question: 'Which one of the following is something that you can do at the ad level?',
        options: ['Ads placement', 'Uploading the creatives', 'Setting up campaign objective', 'Audience targeting'],
        correct: 'Uploading the creatives',
    },
    {
        id: '3',
        question: 'Below are products included within the Facebook Family of Apps and Services, except..',
        options: ['Audience Network', 'Snapchat', 'Instagram', 'Facebook'],
        correct: 'Snapchat',
    },
    {
        id: '4',
        question: 'If you setup a campaign with Sales as an objective, it means that you want your customer to..',
        options: ['View one of your video', 'Make a transaction', 'Follow your account', 'Like your page'],
        correct: 'Make a transaction',
    },
    {
        id: '5',
        question: 'On conversion campaign, where can you choose the pixel you want to use?',
        options: ['On Campaign Level', 'On Ad Set Level', 'On Event Manager', 'On Ad Level'],
        correct: 'On Ad Set Level',
    },
    {
        id: '6',
        question: 'In Google Analytics 4, "Country" is defined as:',
        options: ['Size', 'Dimension', 'Event', 'Measurement'],
        correct: 'Dimension',
    },
    {
        id: '7',
        question: 'Which of the following metrics are tracked by default by Google Analytics 4?',
        options: ['Engaged Sessions', 'All of the options', 'Users', 'Sessions'],
        correct: 'All of the options',
    },
    {
        id: '8',
        question: 'The funnel stage when the audience first learns / understands about your business is',
        options: ['Consideration', 'Awareness', 'Conversion', 'Retention'],
        correct: 'Awareness',
    },
    {
        id: '9',
        question: 'Google Analytics can track the traffic coming from the following platforms',
        options: ['Facebook Ads', 'All of the answers', 'Google Ads', 'Instagram Organic'],
        correct: 'All of the answers',
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