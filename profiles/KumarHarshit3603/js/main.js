document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.querySelector(".card-container");
  const card = document.querySelector(".card");
  const glow = document.querySelector(".card-glow");

  const TILT_AMOUNT = 15; // Max tilt in degrees

  // Function to calculate tilt values
  const calculateTilt = (e, element) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X position relative to element
    const y = e.clientY - rect.top; // Mouse Y position relative to element

    const width = element.offsetWidth;
    const height = element.offsetHeight;

    // Calculate rotation values from -TILT_AMOUNT to +TILT_AMOUNT
    const rotateY = (TILT_AMOUNT / (width / 2)) * (x - width / 2);
    const rotateX = -(TILT_AMOUNT / (height / 2)) * (y - height / 2);

    return { rotateX, rotateY };
  };

  // Mouse Move Event on the container
  cardContainer.addEventListener("mousemove", (e) => {
    const { rotateX, rotateY } = calculateTilt(e, cardContainer);

    // Apply 3D transform to the card
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Move the glow effect
    const glowX =
      ((e.clientX - card.getBoundingClientRect().left) / card.offsetWidth) *
      100;
    const glowY =
      ((e.clientY - card.getBoundingClientRect().top) / card.offsetHeight) *
      100;
    glow.style.setProperty("--glow-x", `${glowX}%`);
    glow.style.setProperty("--glow-y", `${glowY}%`);

    // Update glow position in its ::before pseudo-element
    const glowElement =
      glow.querySelector("::before") || getComputedStyle(glow, "::before");
    glow.style.top = `${glowY}%`;
    glow.style.left = `${glowX}%`;

    // A slightly more direct way to set the glow position using custom properties
    glow.style.setProperty(
      "left",
      `${e.clientX - card.getBoundingClientRect().left}px`
    );
    glow.style.setProperty(
      "top",
      `${e.clientY - card.getBoundingClientRect().top}px`
    );
  });

  // Mouse Leave Event to reset
  cardContainer.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)"; // Reset transform
  });
});
