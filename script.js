document.addEventListener('DOMContentLoaded', function() {

    // Navbar scroll behavior & Mobile menu
    const navbar = document.querySelector('.navbar');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const bookNowContainer = document.querySelector('.book-now-container');
    const navbarRight = document.querySelector('.navbar-right');

    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
            // Scroll Down
            navbar.classList.add('navbar--hidden');
        } else {
            // Scroll Up
            navbar.classList.remove('navbar--hidden');
        }
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });

    // Handle mobile menu toggle
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
            
            // Move Book Now into dropdown when menu is active (mobile)
            if (bookNowContainer) {
                if (navLinks.classList.contains('active')) {
                    // Make sure to append after all navigation links
                    const navContainer = document.createElement('li');
                    navContainer.className = 'book-now-nav-item';
                    navContainer.appendChild(bookNowContainer);
                    navLinks.appendChild(navContainer); // move inside dropdown as a list item
                    bookNowContainer.classList.add('menu-active');
                } else {
                    // move back to navbar-right before hamburger
                    const bookNowNavItem = document.querySelector('.book-now-nav-item');
                    if (bookNowNavItem) {
                        bookNowNavItem.remove(); // Remove the container li element
                    }
                    navbarRight.insertBefore(bookNowContainer, hamburgerMenu);
                    bookNowContainer.classList.remove('menu-active');
                }
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks.classList.contains('active') && 
            !event.target.closest('.navbar-left') && 
            !event.target.closest('.navbar-right')) {
            navLinks.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            
            // Handle book now container when closing menu
            if (bookNowContainer) {
                const bookNowNavItem = document.querySelector('.book-now-nav-item');
                if (bookNowNavItem) {
                    bookNowNavItem.remove(); // Remove the container li element
                }
                navbarRight.insertBefore(bookNowContainer, hamburgerMenu);
                bookNowContainer.classList.remove('menu-active');
            }
        }
    });


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

        if (questionButton) {
            questionButton.addEventListener('click', () => {
                // Toggle the clicked item
                item.classList.toggle('active');
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    answer.style.maxHeight = null;
                }
            });
        }
    });

    // Open the first FAQ item by default
    if (faqItems.length > 0) {
        const firstFaqItem = faqItems[0];
        const firstFaqAnswer = firstFaqItem.querySelector('.faq-answer');
        firstFaqItem.classList.add('active');
        firstFaqAnswer.style.maxHeight = firstFaqAnswer.scrollHeight + "px";
    }

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
