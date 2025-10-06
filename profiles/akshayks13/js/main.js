const card = document.getElementById('card');
let bounds;
function updateBounds(){ bounds = card.getBoundingClientRect(); }
window.addEventListener('resize', updateBounds);
updateBounds();

const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

card.addEventListener('mousemove', (e)=>{
  if (prefersReducedMotion && prefersReducedMotion.matches) return;
  const x = e.clientX - bounds.left - bounds.width/2;
  const y = e.clientY - bounds.top - bounds.height/2;
  const rotateY = (x / (bounds.width/2)) * 6; 
  const rotateX = -(y / (bounds.height/2)) * 6;
  card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
});
card.addEventListener('mouseleave', ()=>{ card.style.transform = ''; });

if (prefersReducedMotion) {
  prefersReducedMotion.addEventListener('change', (e)=>{
    if (e.matches) card.style.transform = '';
  });
}

card.addEventListener('focusin', ()=> card.classList.add('focused'));
card.addEventListener('focusout', ()=> card.classList.remove('focused'));
