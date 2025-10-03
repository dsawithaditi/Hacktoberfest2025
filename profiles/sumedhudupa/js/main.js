// Add smooth animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Animate skill tags on scroll
    const tags = document.querySelectorAll('.tag');

    tags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';

            setTimeout(() => {
                tag.style.transition = 'all 0.5s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });

    // Add ripple effect to social buttons
    const buttons = document.querySelectorAll('.social-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
});
