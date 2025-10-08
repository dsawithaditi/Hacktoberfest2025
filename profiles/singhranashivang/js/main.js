
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card");
  card.style.opacity = 0;
  card.style.transform = "translateY(30px)";
  
  setTimeout(() => {
    card.style.transition = "all 0.8s ease";
    card.style.opacity = 1;
    card.style.transform = "translateY(0)";
  }, 200);

 
  const skills = document.querySelectorAll(".skills span");
  skills.forEach(skill => {
    skill.addEventListener("click", () => {
      skill.style.transform = "scale(1.2)";
      skill.style.backgroundColor = "#ffd700";
      setTimeout(() => {
        skill.style.transform = "scale(1)";
        skill.style.backgroundColor = "#fff";
      }, 500);
    });
  });
});
