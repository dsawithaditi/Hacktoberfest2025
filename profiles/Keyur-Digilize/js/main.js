document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".profile-card");

  if (card) {
    card.addEventListener("mousemove", (e) => {
      const { width, height, left, top } = card.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const centerX = width / 2;
      const centerY = height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

      card.style.setProperty("--shine-x", `${x}px`);
      card.style.setProperty("--shine-y", `${y}px`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
  }
});
