document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector(".profile-card");

    if (card) {
        card.addEventListener("mousemove", (e) => {
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;

            const centerX = card.offsetWidth / 2;
            const centerY = card.offsetHeight / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "rotateX(0deg) rotateY(0deg)";
        });
    }
});
