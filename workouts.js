// Google Sheet ID
const WORKOUT_SHEET_ID = '1NE1lLuDUStf1NWXJDYOQM1NJ6iY9_XUlG5lPC5bgIWA';
const WORKOUT_CSV_URL = `https://docs.google.com/spreadsheets/d/${WORKOUT_SHEET_ID}/export?format=csv`;

let workoutHeaders = [];
let workoutDescriptionsMonday = [];
let workoutDescriptionsThusday = [];
let workoutDescriptionsWensday = [];
let workoutDescriptionsFriday = [];
let workoutDescriptionsSaturday = [];

let currentDay = "";

// Fetch workout data from Google Sheet
async function fetchWorkoutData() {
    try {
        console.log('Fetching workout data from Google Sheet...');
        const response = await fetch(WORKOUT_CSV_URL);
        const csv = await response.text();
        
        // Parse CSV
        const lines = csv.split('\n').filter(line => line.trim() !== '');
        
        // First row is headers (columns A-D)
        if (lines.length > 0) {
            workoutHeaders = lines[0].split(',').map(h => h.trim()).slice(0, 4);
        }

        // Second row is descriptions (columns A-D)
        if (lines.length > 1) {
            workoutDescriptionsMonday = lines[1].split(',').map(d => d.trim()).slice(0, 4);
        }
        // Third row is descriptions (columns A-D)
        if (lines.length > 2) {
            workoutDescriptionsThusday = lines[2].split(',').map(d => d.trim()).slice(0, 4);
        }
        // Foruth row is descriptions (columns A-D)
        if (lines.length > 3) {
            workoutDescriptionsWensday = lines[3].split(',').map(d => d.trim()).slice(0, 4);
        }
        // Fifth row is descriptions (columns A-D)
        if (lines.length > 4) {
            workoutDescriptionsFriday = lines[4].split(',').map(d => d.trim()).slice(0, 4);
        }
        // Sixth row is descriptions (columns A-D)
        if (lines.length > 5) {
            workoutDescriptionsSaturday = lines[5].split(',').map(d => d.trim()).slice(0, 4);
        }
        
        console.log('Workout headers:', workoutHeaders);
        //console.log('Workout descriptions:', workoutDescriptions);
    } catch (error) {
        console.error('Error fetching workout data:', error);
        alert('Error loading workout data. Please check the console.');
    }
}

// Display workout details in modal
function displayWorkoutDetails() {
    const detailsDiv = document.getElementById('workoutDetails');
    
    if (workoutHeaders.length === 0) {
        detailsDiv.innerHTML = '<p>No workout data available</p>';
        return;
    }
    
    let html = '<h3>Today\'s Workout</h3><div class="workout-grid">';
    let workout = [];

    if(currentDay === "Måndag"){
        workout = workoutDescriptionsMonday;
    }
    if(currentDay === "Tisdag"){
        workout = workoutDescriptionsThusday;
    }
    if(currentDay === "Onsdag"){
        workout = workoutDescriptionsWensday;
    }
    if(currentDay === "Fredag"){
        workout = workoutDescriptionsFriday;
    }
    if(currentDay === "Lördag"){
        workout = workoutDescriptionsSaturday;
    }
    
    // Create a card for each header/description pair
    for (let i = 0; i < workoutHeaders.length; i++) {
        html += `
            <div class="workout-item">
                <h4>${workoutHeaders[i]}</h4>
                <p>${workout[i] || 'N/A'}</p>
            </div>
        `;
    }
    
    html += '</div>';
    detailsDiv.innerHTML = html;
}

// Initialize the workouts page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Workouts Page Loaded');
    
    const logoutBtn = document.getElementById('logoutBtn');
    const workoutBtns = document.querySelectorAll('.workout-btn');
    const modal = document.getElementById('workoutModal');
    const closeBtn = document.querySelector('.close');
    
    // Fetch workout data on page load
    fetchWorkoutData();
    
    // Logout button event listener
    logoutBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    // Workout button event listeners
    workoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const dayName = e.target.getAttribute('data-day');
            console.log(`User started: ${dayName}`);
            
            currentDay = dayName;
            // Display workout details
            displayWorkoutDetails();
            
            // Show modal and make it the active scrollable widget
            modal.style.display = 'block';
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            modal.querySelector('.modal-content').focus();
        });
    });
    
    function closeModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Close modal when X is clicked
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});

