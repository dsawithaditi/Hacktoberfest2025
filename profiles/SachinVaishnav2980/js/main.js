document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card");
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  
  setTimeout(() => {
    card.style.transition = "all 0.9s ease";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  }, 200);
});

