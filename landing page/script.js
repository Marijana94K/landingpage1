// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const navbar = document.querySelector('.navbar');

// Scroll Effect for Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will contact you soon.');
        this.reset();
    });
}

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Start counting animation if this is the hero section
            if (entry.target.classList.contains('hero')) {
                startCountingAnimation();
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Counting Animation for Stats
function startCountingAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const targetValue = parseInt(stat.getAttribute('data-count'));
        const suffix = targetValue >= 1000 ? 'k+' : (targetValue === 99 ? '%' : '+');
        const duration = 2000; // Animation duration in milliseconds
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        
        let frame = 0;
        let value = 0;
        
        // If it's a large number (2000), we'll display as 2k+
        const increment = targetValue > 1000 ? targetValue / 1000 / totalFrames : targetValue / totalFrames;
        
        const counter = setInterval(() => {
            frame++;
            
            // For 2000 (2k+), we count up to 2
            const displayValue = targetValue > 1000 ? 
                (Math.min(targetValue / 1000, value.toFixed(1))) : 
                Math.floor(value);
                
            // Update the text content
            stat.textContent = displayValue + suffix;
            
            value += increment;
            
            if (frame === totalFrames) {
                clearInterval(counter);
                // Ensure final value is displayed correctly
                if (targetValue >= 1000) {
                    stat.textContent = (targetValue/1000) + suffix;
                } else {
                    stat.textContent = targetValue + suffix;
                }
            }
        }, frameDuration);
    });
}

// Start counting animation immediately if hero section is visible
if (document.querySelector('.hero')) {
    // Slight delay to ensure the page has loaded
    setTimeout(startCountingAnimation, 500);
} 