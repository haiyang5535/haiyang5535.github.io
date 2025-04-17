// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    // Initialize EmailJS with your public key
    emailjs.init("wtGLDFvNKDXM5NtVH"); // Replace with your actual public key

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        // Get form data
        const formData = {
            from_name: this.querySelector('input[name="from_name"]').value,
            from_email: this.querySelector('input[name="from_email"]').value,
            message: this.querySelector('textarea[name="message"]').value
        };
        
        // Send email using EmailJS
        emailjs.send('service_blx5v2e', 'template_a506eht', formData)
            .then(function() {
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            })
            .catch(function(error) {
                // Show error message
                alert('Sorry, there was an error sending your message. Please try again later.');
                console.error('EmailJS Error:', error);
            })
            .finally(function() {
                // Reset button state
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
            });
    });
}

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-tag, .about-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.querySelectorAll('.project-card, .skill-tag, .about-content').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Initial check for elements in view
animateOnScroll();
