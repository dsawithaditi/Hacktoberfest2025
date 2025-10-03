document.addEventListener("DOMContentLoaded", () => {
    const pokedexBody = document.getElementById('pokedex-body');
    const screenOffOverlay = document.getElementById('screen-off-overlay');
    const infoScreen = document.getElementById('info-screen');
    const infoTextElement = document.getElementById('info-text');
    const pageIndicator = document.getElementById('page-indicator');
    const infoPrompt = document.getElementById('info-prompt');
    

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const viewToggleBtn = document.getElementById('view-toggle-btn');
    const confirmBtn = document.getElementById('confirm-btn');
    const dPadUp = document.getElementById('d-pad-up');
    const dPadDown = document.getElementById('d-pad-down');
    const dPadLeft = document.getElementById('d-pad-left');
    const dPadRight = document.getElementById('d-pad-right');
    const dPadCenter = document.getElementById('d-pad-center');
    

    const profileView = document.getElementById('profile-view');
    const statsView = document.getElementById('stats-view');
    const langStatsView = document.getElementById('lang-stats-view');
    const langStatsContainer = document.querySelector('.lang-stats-container');
    const socialLinks = document.querySelectorAll('.social-link.icon');
    

    const themes = ['', 'shiny', 'ghost'];
    const pokedexEntries = [
        "This developer is often found nesting in dark rooms, fueled by coffee. Its code is known for being surprisingly robust. It communicates through a series of complex pull requests.",
        "It evolves from 'Junior Developer' after exposure to numerous 'Code Reviews'. Its primary attacks are 'Refactor' and 'Deploy', which are highly effective against 'Technical Debt'.",
        "In its natural habitat, it competes for resources like high-priority tickets and ergonomic chairs. It is a generally collaborative creature, often forming symbiotic relationships with UI/UX designers.",
        "Though a formidable creature, it has a critical weakness to 'Scope Creep' and is vulnerable to 'Vague Requirements', which can leave it Confused. Its habitat is often cluttered with the relics of abandoned 'Side-Projects'."
    ];
    let chartDrawn = false;
    let currentThemeIndex = 0;
    let currentSocialIndex = 0;
    let currentPageIndex = 0;
    let typewriterInterval = null;

    
    function playSound(id) {
        const sound = document.getElementById(id);
        if (sound) { sound.currentTime = 0; sound.play(); }
    }

    function typewriter(element, text, speed = 30) {
        if (typewriterInterval) { clearInterval(typewriterInterval); }
        let i = 0;
        element.innerHTML = "";
        typewriterInterval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typewriterInterval);
                typewriterInterval = null;
            }
        }, speed);
    }

    function updateInfoScreen() {
        typewriter(infoTextElement, pokedexEntries[currentPageIndex]);
        pageIndicator.textContent = `Page ${currentPageIndex + 1}/${pokedexEntries.length}`;
    }

    function powerOn() {
        playSound('sound-poweron');
        screenOffOverlay.classList.remove('active');
    }
    powerOn();


    themeToggleBtn.addEventListener('click', () => {
        playSound('sound-theme');
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        pokedexBody.className = 'pokedex ' + themes[currentThemeIndex];
    });

    viewToggleBtn.addEventListener('click', () => {
        playSound('sound-confirm');
        infoScreen.classList.remove('active');
        infoPrompt.style.display = 'block';
        if (profileView.classList.contains('active')) {
            profileView.classList.remove('active');
            statsView.classList.add('active');
            if (!chartDrawn) {
                drawStatsChart();
                chartDrawn = true;
            }
        } else if (statsView.classList.contains('active')) {
            statsView.classList.remove('active');
            langStatsView.classList.add('active');
        } else {
            langStatsView.classList.remove('active');
            profileView.classList.add('active');
        }
    });

    confirmBtn.addEventListener('click', () => {
        playSound('sound-confirm');
        const selectedLink = document.querySelector('.social-link.icon.highlight');
        if (selectedLink) window.open(selectedLink.href, '_blank');
    });

    dPadLeft.addEventListener('click', () => {
        playSound('sound-select');
        socialLinks[currentSocialIndex].classList.remove('highlight');
        currentSocialIndex = (currentSocialIndex - 1 + socialLinks.length) % socialLinks.length;
        socialLinks[currentSocialIndex].classList.add('highlight');
    });

    dPadRight.addEventListener('click', () => {
        playSound('sound-select');
        socialLinks[currentSocialIndex].classList.remove('highlight');
        currentSocialIndex = (currentSocialIndex + 1) % socialLinks.length;
        socialLinks[currentSocialIndex].classList.add('highlight');
    });

    dPadDown.addEventListener('click', () => {
        playSound('sound-select');
        if (langStatsView.classList.contains('active')) {
            langStatsContainer.scrollTop += 50;
        } else if (profileView.classList.contains('active')) {
            if (!infoScreen.classList.contains('active')) {
                infoScreen.classList.add('active');
                infoPrompt.style.display = 'none';
                updateInfoScreen();
            } else if (currentPageIndex < pokedexEntries.length - 1) {
                currentPageIndex++;
                updateInfoScreen();
            }
        }
    });

    dPadUp.addEventListener('click', () => {
        playSound('sound-select');
        if (langStatsView.classList.contains('active')) {
            langStatsContainer.scrollTop -= 50;
        } else if (profileView.classList.contains('active')) {
            if (infoScreen.classList.contains('active')) {
                if (currentPageIndex > 0) {
                    currentPageIndex--;
                    updateInfoScreen();
                } else {
                    infoScreen.classList.remove('active');
                    infoPrompt.style.display = 'block';
                }
            }
        }
    });
    
    dPadCenter.addEventListener('click', () => {
        playSound('sound-back');
        if (statsView.classList.contains('active') || langStatsView.classList.contains('active')) {
             statsView.classList.remove('active');
             langStatsView.classList.remove('active');
             profileView.classList.add('active');
        }
        if (infoScreen.classList.contains('active')) {
            infoScreen.classList.remove('active');
            infoPrompt.style.display = 'block';
        }
    });

    function drawStatsChart() {
        const canvas = document.getElementById('stats-chart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const stats = { "React": 0.9, "Solana": 0.75, "Node.js": 0.8, "Postgres": 0.85, "DevOps": 0.65 };
        const labels = Object.keys(stats);
        const values = Object.values(stats);
        const numStats = labels.length;
        const width = canvas.width, height = canvas.height;
        const centerX = width / 2, centerY = height / 2;
        const radius = width / 2 * 0.7;

        ctx.font = "10px 'Press Start 2P'"; ctx.fillStyle = '#3a4f41';
        ctx.strokeStyle = "rgba(58, 79, 65, 0.3)"; ctx.lineWidth = 1;
        for (let i = 1; i <= 4; i++) {
            ctx.beginPath(); const currentRadius = radius * (i / 4);
            for (let j = 0; j < numStats; j++) {
                const angle = (j / numStats) * 2 * Math.PI - Math.PI / 2;
                const x = centerX + currentRadius * Math.cos(angle);
                const y = centerY + currentRadius * Math.sin(angle);
                j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath(); ctx.stroke();
        }
        
        ctx.beginPath();
        values.forEach((value, i) => {
            const angle = (i / numStats) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + radius * value * Math.cos(angle);
            const y = centerY + radius * value * Math.sin(angle);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fillStyle = "rgba(229, 81, 64, 0.5)"; ctx.strokeStyle = "rgba(229, 81, 64, 1)";
        ctx.lineWidth = 2; ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#3a4f41'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        labels.forEach((label, i) => {
            const angle = (i / numStats) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + (radius + 20) * Math.cos(angle); 
            const y = centerY + (radius + 20) * Math.sin(angle);
            ctx.fillText(label, x, y);
        });
    }
});