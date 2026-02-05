// ================================
// Mobile Menu Toggle
// ================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', toggleMenu);

function toggleMenu() {
    navLinks.classList.toggle('active');
}

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ================================
// Image Modal Functionality
// ================================
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeModalBtn = document.getElementById('closeModal');
const galleryItems = document.querySelectorAll('.gallery-item');

// Open modal when clicking on gallery items
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        openModal(img.src, img.alt);
    });
});

function openModal(src, alt) {
    modal.classList.add('active');
    modalImg.src = src;
    modalImg.alt = alt;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close modal when clicking the X button
closeModalBtn.addEventListener('click', closeModal);

// Close modal when clicking outside the image
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// ================================
// Smooth Scrolling for Navigation
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// Header Scroll Effect
// ================================
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Change header background on scroll
    if (currentScroll > 50) {
        header.style.background = 'linear-gradient(135deg, #152d47 0%, #1e3a5f 100%)';
        header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    } else {
        header.style.background = 'linear-gradient(135deg, #1e3a5f 0%, #2c5f8d 100%)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// ================================
// Intersection Observer for Animations
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe gallery items and feature cards
document.querySelectorAll('.gallery-item, .feature-card').forEach(el => {
    observer.observe(el);
});

// ================================
// Add Active State to Navigation
// ================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ================================
// Prevent Page Jump on Load
// ================================
window.addEventListener('load', function() {
    // If there's a hash in the URL, scroll to it smoothly
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
});

// ================================
// Add Stagger Animation to Gallery Items
// ================================
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ================================
// Social Icons Hover Effect Enhancement
// ================================
const socialIcons = document.querySelectorAll('.social-icon');

socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ================================
// Loading Animation (Optional)
// ================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ================================
// Console Welcome Message
// ================================
console.log('%c🐾 Welcome to Pet Pals! 🐾', 'color: #f9a825; font-size: 20px; font-weight: bold;');
console.log('%cCozy Lives, Loving Homes', 'color: #1e3a5f; font-size: 14px;');
