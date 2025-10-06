const card = document.querySelector('.profile-card');
const techTags = document.querySelectorAll('.tech-tag');
const projectsButton = document.querySelector('.projects-button');

const MAX_TILT = 10; 

function handleMouseMove(e) {
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);

    const rotateX = -mouseY * MAX_TILT;
    const rotateY = mouseX * MAX_TILT;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    const shadowX = -rotateY / 2;
    const shadowY = rotateX / 2;
    card.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.5), 
                            ${shadowX / 2}px ${shadowY / 2}px 10px rgba(0, 0, 0, 0.2)`;
}

function handleMouseLeave() {
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    
    card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4), 0 4px 10px rgba(0, 0, 0, 0.2)';
}

if (card) {
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease';
}


if (techTags.length > 0) {
    techTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            const skill = e.target.textContent;
            console.log(`User showed interest in skill: ${skill}`);

            e.target.style.transform = 'scale(0.9)';
            setTimeout(() => {
                e.target.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

if (projectsButton) {
    projectsButton.addEventListener('click', () => {
        console.log('User clicked "View Projects". Navigating...');
    });
}