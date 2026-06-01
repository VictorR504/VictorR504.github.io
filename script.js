// Google Sheet ID
const SHEET_ID = '1Fv0lfNaPWF6Smey9JOafzsuML1uvjT7jEyAbHtoAryY';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
let currentUser = "";

let validPasswords = [];

// Fetch passwords from Google Sheet
async function fetchPasswordsFromSheet() {
    try {
        logMessage('Fetching passwords from Google Sheet...');
        const response = await fetch(CSV_URL);
        const csv = await response.text();
        
        // Parse CSV and extract passwords from Column A
        const lines = csv.split('\n');
        validPasswords = lines
            .map(line => line.trim())
            .filter(line => line !== '' && line !== 'Password'); // Remove empty and header rows
        
        
        logMessage(`Loaded ${validPasswords.length} passwords`);
    } catch (error) {
        console.error('Error fetching passwords:', error);
        alert('Error loading passwords. Please check the console.');
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Workout With Me - App Initialized');
    
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    
    // Fetch passwords on page load
    fetchPasswordsFromSheet();
    
    // Event listener for the login form
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = passwordInput.value.trim();
        
        if (password === '') {
            alert('Please enter a password');
        } else if (validPasswords.includes(password)) {
            alert(`Welcome ` + password);
            logMessage('Login successful');
            passwordInput.value = '';
            // Redirect to workouts page
            setTimeout(() => {
                window.location.href = 'workouts.html';
            }, 500);
        } else {
            alert('Invalid password. Please try again.');
            logMessage('Login failed - invalid password');
            passwordInput.value = '';
        }
    });
});

// Utility function
function logMessage(message) {
    console.log(`[WorkoutWithMe] ${message}`);
}
