// Particles Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    // Create 20 particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 8 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Random color
        const colors = [
            'rgba(255, 255, 255, 0.2)',
            'rgba(255, 107, 157, 0.2)',
            'rgba(138, 43, 226, 0.2)',
            'rgba(147, 112, 219, 0.2)'
        ];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Newsletter Form Submission
document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('.newsletter-input');
    const submitBtn = this.querySelector('.newsletter-btn');
    
    if (emailInput.value) {
        // Original content
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            submitBtn.style.background = 'linear-gradient(135deg, #00D09C, #00B09B)';
            
            // Reset after 2 seconds
            setTimeout(() => {
                emailInput.value = '';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = 'linear-gradient(135deg, #00D09C, #00B09B)';
            }, 2000);
        }, 1500);
    }
});

// Social Icon Hover Effect Enhancement
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        const gradient = this.style.getPropertyValue('--gradient');
        if (gradient) {
            this.style.background = gradient;
        }
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.1)';
    });
});

// Initialize particles on load
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    
    // Update particles on resize
    window.addEventListener('resize', createParticles);
    
    // Smooth scroll for footer links
    document.querySelectorAll('.footer-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Current Year in Copyright
document.addEventListener('DOMContentLoaded', function() {
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2024', currentYear);
    }
});

// Mouse Move Parallax Effect
document.querySelector('.footer')?.addEventListener('mousemove', function(e) {
    const particles = this.querySelector('.particles');
    if (!particles) return;
    
    const x = (e.clientX / window.innerWidth) * 20;
    const y = (e.clientY / window.innerHeight) * 20;
    
    particles.style.transform = `translate(${x}px, ${y}px)`;
});