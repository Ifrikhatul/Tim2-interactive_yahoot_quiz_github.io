
//Ambil data dari Local Storage
var userName = localStorage.getItem('dataPengguna');
var correctAnswers = localStorage.getItem('score');

// Get the try again button element
const tryAgainButton = document.getElementById('try_again');  
// Add event listener to the try again button
tryAgainButton.addEventListener('click', () => {
// Redirect to the index file
window.location.href = 'menu-category.html';
});

// Calculate the user score
var userScore = correctAnswers *10

// Set the user score and name in the HTML
const userScoreElement = document.getElementById('user-score');
userScoreElement.textContent = `${userScore} / 100`;

if(userName.length > 10){
  userName = userName.slice(0,5) + '..';
}

// Display different messages based on the user score
const congratulationsElement = document.getElementById('congratulations');
if (userScore === 100) {
  congratulationsElement.textContent = `Congratulations, ${userName}!`;
} else if (userScore >= 80 && userScore <= 90) {
  congratulationsElement.textContent = `Always Made it, ${userName}!`;
} else if (userScore >= 0 && userScore <= 70) {
  congratulationsElement.textContent = `Nice Try, ${userName}!`;
}


