// Profile Card Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactions
    initializeCard();
    initializeSkillTags();
    initializeSocialLinks();
    initializeFloatingShapes();
    addParallaxEffect();
});

/**
 * Initialize card entrance animation and hover effects
 */
function initializeCard() {
    const card = document.querySelector('.card');
    
    // Add entrance animation trigger
    setTimeout(() => {
        card.classList.add('loaded');
    }, 100);
    
    // Advanced hover effect with mouse tracking
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
}

/**
 * Add interactive effects to skill tags
 */
function initializeSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        // Staggered entrance animation
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('animate-in');
        
        // Add click effect
        tag.addEventListener('click', () => {
            tag.classList.add('clicked');
            setTimeout(() => {
                tag.classList.remove('clicked');
            }, 300);
        });
        
        // Add hover sound effect (optional)
        tag.addEventListener('mouseenter', () => {
            // You can add subtle sound effects here if desired
        });
    });
}

/**
 * Enhanced social link interactions
 */
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach((link, index) => {
        // Staggered entrance animation
        setTimeout(() => {
            link.classList.add('visible');
        }, (index + 1) * 150);
        
        // Add ripple effect on click
        link.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            const rect = link.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            link.style.position = 'relative';
            link.style.overflow = 'hidden';
            link.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Animate floating background shapes
 */
function initializeFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // Random animation duration and delay
        const duration = 15 + Math.random() * 10; // 15-25 seconds
        const delay = Math.random() * 5; // 0-5 seconds
        
        shape.style.animationDuration = `${duration}s`;
        shape.style.animationDelay = `${delay}s`;
        
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            
            shape.style.transform += ` translate(${randomX}px, ${randomY}px)`;
        }, 3000 + Math.random() * 2000);
    });
}

/**
 * Add subtle parallax effect to background elements
 */
function addParallaxEffect() {
    const background = document.querySelector('.background');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;
        
        background.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

/**
 * Utility function to create typewriter effect
 */
function typewriterEffect(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

/**
 * Add scroll-triggered animations (if card is in a longer page)
 */
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.card, .skill-tag, .social-link').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Add theme toggle functionality (optional enhancement)
 */
function initializeThemeToggle() {
    // This could be used to switch between light/dark themes
    // Implementation depends on design requirements
}

/**
 * Add profile picture hover zoom effect
 */
function initializeProfilePicture() {
    const profileImg = document.querySelector('.profile-image img');
    
    if (profileImg) {
        profileImg.addEventListener('error', () => {
            // Fallback if image fails to load
            profileImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDMTMuMSAyIDE0IDIuOSAxNCA0QzE0IDUuMSAxMy4xIDYgMTIgNkMxMC45IDYgMTAgNS4xIDEwIDRDMTAgMi45IDEwLjkgMiAxMiAyWk0yMSA5VjIySDNWOUMzIDguNDUgMy40NSA4IDQgOEgyMEM20LjU1IDggMjEgOC40NSAyMSA5WiIgZmlsbD0iIzZBNzI4MCIvPgo8L3N2Zz4K';
            profileImg.alt = 'Default Profile Picture';
        });
    }
}

// CSS for additional animations (injected via JavaScript)
const additionalStyles = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes animate-in {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .skill-tag {
        animation: animate-in 0.6s ease-out forwards;
        opacity: 0;
    }
    
    .skill-tag.clicked {
        animation: pulse 0.3s ease-in-out;
    }
    
    .social-link {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }
    
    .social-link.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .card.loaded {
        animation: none;
    }
    
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize profile picture handling
initializeProfilePicture();

// Add scroll animations if needed
addScrollAnimations();

// Console welcome message
console.log(`
🚀 Uttam Bansal's Profile Card Loaded Successfully!
✨ Interactive features enabled
🎨 Modern animations active
📱 Responsive design ready

Built with ❤️ for Hacktoberfest 2025
`);

// Export functions for potential external use
window.ProfileCard = {
    typewriterEffect,
    initializeThemeToggle
};