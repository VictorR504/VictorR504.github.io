// Countdown Timer
// Set the date we're counting down to (end of the week: Sunday at 23:59:59)
const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + (7 - countdownDate.getDay())); // Next Sunday
countdownDate.setHours(23, 59, 59, 999);

const countdown = document.getElementById("countdown");

// JavaScript Password Handling

// Correct password (for demo purposes, it's hardcoded)
const correctPassword = "";

// Elements
const passwordInput = document.getElementById("password");
const submitPasswordButton = document.getElementById("submit-password");
const weeklyChallengeSection = document.getElementById("weekly-challenge");
const heroScreen = document.getElementById("hero-content");
const heroLable = document.getElementById("hero-lable");

// Event Listener for Password Submission
submitPasswordButton.addEventListener("click", () => {
    const enteredPassword = passwordInput.value;

    if (enteredPassword === correctPassword) {
        // Show the weekly challenge section
        weeklyChallengeSection.style.display = "block";
        heroLable.style.display = "block";
        heroScreen.style.display = "none";
        alert("Password correct! Weekly Challenge unlocked!");
    } else {
        alert("Incorrect password. Please try again.");
    }
});

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
        clearInterval(timer);
        countdown.innerHTML = "Challenge Ended!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
}, 1000);

// Handle Progress Form Submission
const progressForm = document.getElementById('progress-form');

progressForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Here you would typically send the data to the server
    // For this example, we'll just display an alert
    const rounds = document.getElementById('rounds').value;
    const time = document.getElementById('time').value;
    const upload = document.getElementById('upload').value;

    alert(`Progress Submitted!\nRounds: ${rounds}\nTime: ${time} minutes\nUpload: ${upload ? 'Yes' : 'No'}`);
    progressForm.reset();
});

const apiUrl = "https://script.google.com/macros/s/AKfycbwn3blgDwqhizYwpeApcWfq0ISWuu-y2gzZ7C-p9v-m9QM23D7ieLCzNmWutQB6hRWaJg/exec";

async function loadLeaderboard() {
    const response = await fetch(`${apiUrl}?action=read`);
    const data = await response.json();
    const leaderboardDiv = document.getElementById("leaderboard");

    leaderboardDiv.innerHTML = data.map((row, index) => `<p>${index + 1}. ${row[0]}: ${row[1]}</p>`).join('');
}

document.addEventListener("DOMContentLoaded", loadLeaderboard);
