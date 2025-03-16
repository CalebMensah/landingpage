// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Sticky Navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Animations on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .about-content, .count-down, .testimonial-slider, .waitlist, .contact');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Testimonial Slider
// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
let currentSlide = 0;

// Show initial slide
testimonials[currentSlide].classList.add('active');

// Next slide function
const showNextSlide = () => {
    testimonials[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % testimonials.length;
    testimonials[currentSlide].classList.add('active');
};

// Previous slide function
const showPrevSlide = () => {
    testimonials[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    testimonials[currentSlide].classList.add('active');
};

// Event listeners for slider buttons
nextBtn.addEventListener('click', showNextSlide);
prevBtn.addEventListener('click', showPrevSlide);

// Auto slide every 5 seconds
let slideInterval = setInterval(showNextSlide, 5000);

// Pause auto slide on hover
const testimonialSlider = document.querySelector('.testimonial-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(showNextSlide, 5000);
});

// Launch Countdown Timer
const countdown = () => {
    // Set launch date (adjust as needed)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30); // 30 days from now
    
    const currentDate = new Date();
    const difference = launchDate - currentDate;
    
    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Update DOM
    document.getElementById('days').textContent = days < 10 ? `0${days}` : days;
    document.getElementById('hours').textContent = hours < 10 ? `0${hours}` : hours;
    document.getElementById('minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById('seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;
};

// Update countdown every second
setInterval(countdown, 1000);

// Run countdown immediately on page load
countdown();

// Form Submission Handlers
const waitlistForm = document.getElementById('waitlist-form');
const contactForm = document.getElementById('contact-form');

// Waitlist form submission
waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    // Here you would typically send this data to your server
    console.log('Waitlist Submission:', { name, email });
    
    // Show success message
    const formContainer = waitlistForm.parentElement;
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thank you ${name}! You've been added to our waitlist.</p>
    `;
    
    formContainer.innerHTML = '';
    formContainer.appendChild(successMessage);
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send this data to your server
    console.log('Contact Submission:', { name, email, message });
    
    // Show success message
    contactForm.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <p>Thank you for your message! We'll get back to you soon.</p>
        </div>
    `;
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for navbar height
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for revealing elements on scroll
const revealOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.feature-card, .about-content p, .testimonial-card').forEach(el => {
        observer.observe(el);
        el.classList.add('reveal-item');
    });
};

// Initialize reveal animations
window.addEventListener('load', revealOnScroll);

// Add additional CSS via JavaScript for reveal animations
const addRevealStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .reveal-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
};

addRevealStyles();