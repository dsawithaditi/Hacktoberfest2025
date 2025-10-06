// Optional JavaScript for a subtle interaction or console logs
document.addEventListener('DOMContentLoaded', () => {
    // A friendly message in the console for anyone inspecting your code
    console.log("Profile Card Loaded! Happy Hacktoberfest 2025! 🚀");

    const card = document.getElementById('profile-card');
    const nameElement = card.querySelector('h1');

    // Simple interaction: Change name color slightly when the mouse is over the card
    card.addEventListener('mouseenter', () => {
        nameElement.style.color = '#fff';
        nameElement.style.transition = 'color 0.3s';
    });

    card.addEventListener('mouseleave', () => {
        // Revert to original color
        nameElement.style.color = '#c7d2fe'; 
    });
});
