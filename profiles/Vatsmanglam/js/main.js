// main.js
// Adds tilt/parallax, particle background canvas, and small burst particles on click
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".profile-card");
  const shine = document.querySelector(".card-shine");
  const ephemeral = document.querySelector(".ephemeral");
  const bgWrap = document.getElementById("bg-canvas-wrap");

  // ---- TILT / PARALLAX ----
  if (card) {
    const damp = 18; // dampening for rotation
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const rx = (dy / r.height) * 15; // rotateX
      const ry = -(dx / r.width) * 18; // rotateY

      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      // shine position
      shine.style.setProperty("--shine-x", `${e.clientX - r.left}px`);
      shine.style.setProperty("--shine-y", `${e.clientY - r.top}px`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
      shine.style.setProperty("--shine-x", `-50px`);
      shine.style.setProperty("--shine-y", `-50px`);
    });

    // subtle parallax for avatar on pointer hover
    const avatarInner = card.querySelector(".avatar-inner");
    card.addEventListener("pointermove", (e) => {
      if (!avatarInner) return;
      const r = card.getBoundingClientRect();
      const pctX = (e.clientX - r.left) / r.width;
      const pctY = (e.clientY - r.top) / r.height;
      const ax = (pctX - 0.5) * 14;
      const ay = (pctY - 0.5) * 10;
      avatarInner.style.transform = `translate3d(${ax}px, ${-6 + ay}px, 0) scale(1.03)`;
    });

    // restore on leave
    card.addEventListener("pointerleave", () => {
      if (avatarInner) avatarInner.style.transform = "";
    });
  }

  // ---- EPHEMERAL PARTICLE BURST ON CLICK ----
  function burst(x, y, count = 18) {
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("span");
      dot.className = 'p-dot';
      const size = 6 + Math.random() * 12;
      dot.style.width = dot.style.height = `${size}px`;
      dot.style.left = `${x - size / 2}px`;
      dot.style.top = `${y - size / 2}px`;
      const hue = 240 + Math.random() * 100;
      const sat = 70 + Math.random() * 20;
      const light = 55 + Math.random() * 10;
      dot.style.background = `hsl(${hue} ${sat}% ${light}%)`;
      dot.style.opacity = 1;
      dot.style.zIndex = 60;
      ephemeral.appendChild(dot);

      // random vector
      const angle = Math.random() * Math.PI * 2;
      const dist = 20 + Math.random() * 120;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - Math.random() * 40; // bias up

      // force layout and animate
      requestAnimationFrame(() => {
        dot.style.transition = `transform 700ms cubic-bezier(.12,.9,.22,1), opacity 700ms linear`;
        dot.style.transform = `translate(${dx}px, ${dy}px) scale(${0.3 + Math.random() * 0.9}) rotate(${Math.random()*720}deg)`;
        dot.style.opacity = 0;
      });

      // remove after
      setTimeout(() => {
        try { dot.remove(); } catch(e){}
      }, 900 + Math.random() * 300);
    }
  }

  // click handler on card for burst & little shake
  if (card) {
    card.addEventListener("click", (ev) => {
      const r = card.getBoundingClientRect();
      const x = ev.clientX - r.left;
      const y = ev.clientY - r.top;
      burst(x, y, 22);

      // small "notice" animation
      card.animate([
        { transform: card.style.transform },
        { transform: 'perspective(1000px) translateY(-6px) scale(1.03)' },
        { transform: card.style.transform }
      ], { duration: 420, easing: 'cubic-bezier(.2,.9,.3,1)' });

      // brief avatar pop
      const ai = card.querySelector('.avatar-inner');
      if (ai) {
        ai.animate([
          { transform: getComputedStyle(ai).transform },
          { transform: 'translateY(-14px) scale(1.06)' },
          { transform: getComputedStyle(ai).transform }
        ], { duration: 520, easing: 'cubic-bezier(.2,.9,.3,1)'});
      }
    });
  }

  // ---- BACKGROUND PARTICLE CANVAS ----
  // create a small canvas that draws subtle drifting orbs behind the card
  (function createBGCanvas(){
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.left = 0; canvas.style.top = 0;
    canvas.style.width = '100%'; canvas.style.height = '100%';
    canvas.style.zIndex = 0; canvas.style.pointerEvents = 'none';
    bgWrap.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let w = canvas.width = innerWidth;
    let h = canvas.height = innerHeight;
    const particles = [];
    const count = Math.round((w*h)/90000); // scale with viewport

    function resize(){
      w = canvas.width = innerWidth;
      h = canvas.height = innerHeight;
      particles.length = 0;
      for (let i=0;i<count;i++){
        particles.push({
          x: Math.random()*w,
          y: Math.random()*h,
          r: 30 + Math.random()*80,
          vx: (Math.random()-0.5)*0.1,
          vy: (Math.random()-0.5)*0.1,
          hue: 230 + Math.random()*80,
          alpha: 0.02 + Math.random()*0.06
        });
      }
    }
    resize();
    window.addEventListener('resize', resize);

    function draw(){
      ctx.clearRect(0,0,w,h);
      for (const p of particles){
        ctx.beginPath();
        const g = ctx.createRadialGradient(p.x, p.y, p.r*0.1, p.x, p.y, p.r);
        g.addColorStop(0, `hsla(${p.hue}, 70%, 78%, ${p.alpha})`);
        g.addColorStop(0.4, `hsla(${p.hue}, 70%, 75%, ${p.alpha*0.7})`);
        g.addColorStop(1, `hsla(${p.hue}, 70%, 60%, 0)`);
        ctx.fillStyle = g;
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        // wrap
        if (p.x < -p.r) p.x = w + p.r;
        if (p.x > w + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = h + p.r;
        if (p.y > h + p.r) p.y = -p.r;
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  })();

});
