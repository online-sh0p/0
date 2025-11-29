// ============================================
// JavaScript Enhanced Interactive Features
// ============================================

// ============================================
// UTILITY FUNCTIONS
// ============================================
const Utils = {
    // Debounce function for performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.lastScrollTop = 0;
        
        this.init();
    }

    init() {
        this.setupScrollBehavior();
        this.setupMobileMenu();
        this.setupSmoothScroll();
    }

    setupScrollBehavior() {
        const handleScroll = Utils.throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class for styling
            if (scrollTop > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll (optional)
            if (scrollTop > this.lastScrollTop && scrollTop > 300) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, 100);

        window.addEventListener('scroll', handleScroll);
    }

    setupMobileMenu() {
        if (!this.menuToggle || !this.navMenu) return;

        this.menuToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.menuToggle.classList.toggle('active');
            document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.menuToggle.contains(e.target)) {
                this.navMenu.classList.remove('active');
                this.menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll(
            '.content-section, .step-card, .stat-card, .pillar-card, .story-card'
        );
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.addInitialStates();
    }

    addInitialStates() {
        this.animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        this.animatedElements.forEach(el => observer.observe(el));
    }
}

// ============================================
// COUNTER ANIMATION
// ============================================
class CounterAnimation {
    constructor() {
        this.statNumbers = document.querySelectorAll('.stat-number');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.statNumbers.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const text = element.textContent;
        
        // Handle percentage or number
        if (text.includes('%')) {
            const target = parseInt(text);
            this.countUp(element, 0, target, 2000, '%');
        } else if (text.includes('hrs')) {
            const target = parseInt(text);
            this.countUp(element, 0, target, 2000, 'hrs+');
        } else if (text === '∞') {
            // Already at infinity, just add pulse effect
            element.style.animation = 'pulse 2s ease-in-out infinite';
        } else {
            const target = parseInt(text.replace(/\D/g, ''));
            if (!isNaN(target)) {
                this.countUp(element, 0, target, 2000);
            }
        }
    }

    countUp(element, start, end, duration, suffix = '') {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = end + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }
}

// ============================================
// CARD HOVER EFFECTS
// ============================================
class CardEffects {
    constructor() {
        this.cards = document.querySelectorAll(
            '.pillar-card, .step-card, .stat-card, .story-card'
        );
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => this.handleMouseEnter(e, card));
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, card));
        });
    }

    handleMouseEnter(e, card) {
        card.style.transition = 'transform 0.1s ease';
    }

    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    }

    handleMouseLeave(e, card) {
        card.style.transition = 'transform 0.3s ease';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
}

// ============================================
// CTA BUTTON RIPPLE EFFECT
// ============================================
class RippleEffect {
    constructor() {
        this.buttons = document.querySelectorAll('.cta-button');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e, button));
        });
    }

    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Add ripple styles if not already in CSS
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                .cta-button { position: relative; overflow: hidden; }
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                }
                @keyframes ripple-animation {
                    to { transform: scale(4); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
}

// ============================================
// LAZY LOADING FOR IMAGES (if added later)
// ============================================
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            this.images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
}

// ============================================
// READING PROGRESS BAR
// ============================================
class ReadingProgress {
    constructor() {
        this.progressBar = this.createProgressBar();
        this.init();
    }

    createProgressBar() {
        const bar = document.createElement('div');
        bar.id = 'reading-progress';
        bar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #6366f1, #10b981);
            width: 0%;
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(bar);
        return bar;
    }

    init() {
        const updateProgress = Utils.throttle(() => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            this.progressBar.style.width = scrolled + '%';
        }, 50);

        window.addEventListener('scroll', updateProgress);
    }
}

// ============================================
// FORM HANDLING (if forms are added)
// ============================================
class FormHandler {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e, form));
        });
    }

    handleSubmit(e, form) {
        e.preventDefault();
        // Add your form handling logic here
        console.log('Form submitted:', new FormData(form));
    }
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
class BackToTop {
    constructor() {
        this.button = this.createButton();
        this.init();
    }

    createButton() {
        const btn = document.createElement('button');
        btn.innerHTML = '↑';
        btn.id = 'back-to-top';
        btn.setAttribute('aria-label', 'Back to top');
        btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #6366f1, #4f46e5);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        `;
        document.body.appendChild(btn);
        return btn;
    }

    init() {
        const handleScroll = Utils.throttle(() => {
            if (window.pageYOffset > 300) {
                this.button.style.opacity = '1';
                this.button.style.visibility = 'visible';
            } else {
                this.button.style.opacity = '0';
                this.button.style.visibility = 'hidden';
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);

        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        this.button.addEventListener('mouseenter', () => {
            this.button.style.transform = 'scale(1.1)';
        });

        this.button.addEventListener('mouseleave', () => {
            this.button.style.transform = 'scale(1)';
        });
    }
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Preload critical resources
        this.preloadResources();
        
        // Add loading animation
        this.addLoadingAnimation();
    }

    preloadResources() {
        const links = ['styles.css'];
        links.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
    }

    addLoadingAnimation() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Add CSS for loading animation
            if (!document.getElementById('loading-styles')) {
                const style = document.createElement('style');
                style.id = 'loading-styles';
                style.textContent = `
                    body { opacity: 0; transition: opacity 0.3s ease; }
                    body.loaded { opacity: 1; }
                `;
                document.head.appendChild(style);
            }
        });
    }
}

// ============================================
// INITIALIZE ALL FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new Navigation();
    new ScrollAnimations();
    new CounterAnimation();
    
    // Enhanced interactions
    new CardEffects();
    new RippleEffect();
    new LazyLoader();
    
    // UI enhancements
    new ReadingProgress();
    new BackToTop();
    new PerformanceOptimizer();
    
    // Optional: Form handling if forms exist
    if (document.querySelectorAll('form').length > 0) {
        new FormHandler();
    }

    console.log('🚀 Solontrich initialized successfully!');
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
}