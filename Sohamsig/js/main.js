document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".profile-card");
  const toggleBtn = document.querySelector(".dark-mode-toggle");

  // Fade-in animation
  setTimeout(() => { card.classList.add("show"); }, 300);

  // Dark mode toggle
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
  });
});
