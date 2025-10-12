// Lightweight interactions for the profile card
document.addEventListener('DOMContentLoaded', function(){
  const contactBtn = document.getElementById('contactBtn');
  const profileImg = document.getElementById('profileImg');

  contactBtn.addEventListener('click', function(){
    // open mail client with a template (user can update email)
    const email = 'your.email@example.com';
    const subject = encodeURIComponent('Hello MGurucharan — Interested in your work');
    const body = encodeURIComponent('Hi MGurucharan,%0D%0A%0D%0AI saw your profile and would like to connect about...');
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });

  // Subtle 3D tilt on mouse move over avatar
  const avatar = profileImg && profileImg.parentElement;
  if(avatar){
    avatar.addEventListener('mousemove', (e)=>{
      const rect = avatar.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      const rx = (-y/rect.height) * 8;
      const ry = (x/rect.width) * 8;
      avatar.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    avatar.addEventListener('mouseleave', ()=>{
      avatar.style.transform = '';
    });
  }
});
