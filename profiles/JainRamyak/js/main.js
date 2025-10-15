// small interactive tilt + animated glow for the avatar
(() => {
  const cardWrap = document.getElementById('card');
  const avatar = document.getElementById('avatar');
  const glow = document.getElementById('glow');
  const rect = () => cardWrap.getBoundingClientRect();

  // tilt effect
  cardWrap.addEventListener('mousemove', (e) => {
    const r = rect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = - (py - 0.5) * 10; // tilt X
    const ry = (px - 0.5) * 14; // tilt Y
    cardWrap.style.setProperty('--rx', rx + 'deg');
    cardWrap.style.setProperty('--ry', ry + 'deg');
    cardWrap.classList.add('tilt');

    // avatar glow follow
    const gctx = glow.getContext('2d');
    const size = Math.min(rect().width*0.28, 96);
    glow.width = size; glow.height = size;
    const gx = px * size; const gy = py * size;
    gctx.clearRect(0,0,size,size);
    const grad = gctx.createRadialGradient(size*0.5, size*0.35, 6, size*0.5, size*0.5, size*0.9);
    grad.addColorStop(0, 'rgba(139,92,246,0.25)');
    grad.addColorStop(0.45, 'rgba(139,92,246,0.12)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    gctx.fillStyle = grad;
    gctx.beginPath(); gctx.arc(size/2, size/2, size/2, 0, Math.PI*2); gctx.fill();
  });

  cardWrap.addEventListener('mouseleave', () => {
    cardWrap.classList.remove('tilt');
    cardWrap.style.setProperty('--rx','0deg');
    cardWrap.style.setProperty('--ry','0deg');
    const ctx = glow.getContext('2d');
    if (ctx) ctx.clearRect(0,0,glow.width,glow.height);
  });

  // simple floating animation using requestAnimationFrame (subtle)
  let t = 0;
  function floatLoop(){
    t += 0.01;
    const y = Math.sin(t)*4;
    const z = Math.cos(t*0.7)*6;
    cardWrap.style.transform = `translateY(${y}px)`;
    requestAnimationFrame(floatLoop);
  }
  floatLoop();
})();
