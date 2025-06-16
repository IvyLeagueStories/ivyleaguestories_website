document.addEventListener('DOMContentLoaded', function() {

    // Navbar scroll behavior & Mobile menu
    const navbar = document.querySelector('.navbar');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#000000'; // Keep it black or change if needed
        } else {
            navbar.style.backgroundColor = '#000000'; // Initial black
        }
    });

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
        });
    }

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonialIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach((card, i) => {
            card.classList.remove('current-testimonial');
            if (i === index) {
                card.classList.add('current-testimonial');
            }
        });
    }

    if (prevBtn && nextBtn && testimonials.length > 0) {
        prevBtn.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonialIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
            showTestimonial(currentTestimonialIndex);
        });
        
        showTestimonial(currentTestimonialIndex); // Show the first testimonial initially
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        if (questionButton) {
            questionButton.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                // Close all other active items
                // faqItems.forEach(otherItem => {
                //     if (otherItem !== item) {
                //         otherItem.classList.remove('active');
                //         otherItem.querySelector('.faq-answer').style.maxHeight = null;
                //         otherItem.querySelector('.faq-icon').innerHTML = '&#9662;'; // Down arrow
                //     }
                // });

                item.classList.toggle('active');
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    icon.innerHTML = '&#9652;'; // Up arrow
                } else {
                    answer.style.maxHeight = null;
                    icon.innerHTML = '&#9662;'; // Down arrow
                }
            });
        }
    });

    // Footer: Current Year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Scroll Animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: stop observing once animated
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    animatedElements.forEach(el => {
        observer.observe(el);
    });

});
