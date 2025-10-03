const card = document.querySelector(".card");
const maxRotation = 10;

card.addEventListener("mousemove", (e) => {
  const cardRect = card.getBoundingClientRect();

  const x = e.clientX - cardRect.left - cardRect.width / 2;
  const y = e.clientY - cardRect.top - cardRect.height / 2;

  const rotateY = (x / (cardRect.width / 2)) * maxRotation;
  const rotateX = -1 * (y / (cardRect.height / 2)) * maxRotation;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener("mouseleave", () => {
  card.style.transform = "rotateX(0deg) rotateY(0deg)";
});
