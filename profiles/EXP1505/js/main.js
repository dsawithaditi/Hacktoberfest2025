const card = document.getElementById('pilotCard');
const engage = document.querySelector('.btn.primary');

if (card) {
  let rafId = null;
  let tiltX = 0, tiltY = 0;
  let targetX = 0, targetY = 0;

  const updateTilt = () => {
    tiltX += (targetX - tiltX) * 0.12;
    tiltY += (targetY - tiltY) * 0.12;
    card.style.transform = `perspective(900px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
    rafId = requestAnimationFrame(updateTilt);
  };

  const onMove = (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const x = (('touches' in e ? e.touches[0].clientX : e.clientX) - cx) / (rect.width/2);
    const y = (('touches' in e ? e.touches[0].clientY : e.clientY) - cy) / (rect.height/2);
    targetX = Math.max(-1, Math.min(1, x)) * 8;
    targetY = Math.max(-1, Math.min(1, -y)) * 6;
    if (!rafId) rafId = requestAnimationFrame(updateTilt);
  };

  const resetTilt = () => {
    targetX = 0; targetY = 0;
    if (!rafId) rafId = requestAnimationFrame(updateTilt);
  };

  card.addEventListener('mousemove', onMove, { passive: true });
  card.addEventListener('mouseleave', resetTilt);
  card.addEventListener('touchstart', onMove, { passive: true });
  card.addEventListener('touchmove', onMove, { passive: true });
  card.addEventListener('touchend', resetTilt);
}

if (engage) {
  const ripple = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const circle = document.createElement('span');
    const size = Math.max(rect.width, rect.height) * 1.4;
    const x = (('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left) - size/2;
    const y = (('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top) - size/2;
    circle.style.position = 'absolute';
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
    circle.style.width = size + 'px';
    circle.style.height = size + 'px';
    circle.style.borderRadius = '999px';
    circle.style.background = 'radial-gradient(circle, rgba(27,231,255,.35) 0%, rgba(27,231,255,0) 60%)';
    circle.style.pointerEvents = 'none';
    circle.style.transform = 'scale(0.2)';
    circle.style.opacity = '1';
    circle.style.transition = 'transform .5s ease, opacity .6s ease';
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(circle);
    requestAnimationFrame(() => { circle.style.transform = 'scale(1.1)'; circle.style.opacity = '0'; });
    setTimeout(() => circle.remove(), 650);
  };
  engage.addEventListener('click', ripple);
  engage.addEventListener('touchstart', ripple, { passive: true });
}


