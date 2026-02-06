// ================================
// Product Page JavaScript
// ================================

// Product Data with Affiliate Links
const productData = {
    'noise-control': {
        title: 'Peace & Quiet Kit',
        type: 'Noise Control Solution',
        description: 'Transform your apartment into a peaceful sanctuary with our comprehensive noise control kit. Designed specifically for urban pet parents dealing with separation anxiety, hallway reactions, and neighbor complaints, this bundle combines proven calming techniques with modern technology.',
        image: 'images/pet-product-1.png',
        price: '$89/mo',
        affiliateDescription: 'Get 20% off your first month when you subscribe! Includes free shipping and 30-day satisfaction guarantee. Perfect for apartment living with reactive dogs.',
        affiliateLink: 'https://www.chewy.com/dog-calming-aids/c/340',
        specs: [
            { icon: '🔇', label: 'Ultrasonic Bark Deterrent' },
            { icon: '💊', label: 'Monthly Calming Chews' },
            { icon: '🌿', label: 'Pheromone Diffuser Refills' },
            { icon: '🧩', label: '3x Enrichment Puzzle Toys' },
            { icon: '📱', label: 'App-Based Training Guide' },
            { icon: '🎧', label: 'White Noise Speaker' }
        ],
        highlights: [
            'Reduces barking by up to 80% in apartment settings',
            'Monthly subscription ensures you never run out of calming aids',
            'Vet-approved natural ingredients in all calming products',
            'Compatible with all dog sizes and temperaments',
            'Includes virtual behavior consultation (first month)',
            'Neighbor-approved solutions that maintain peace',
            'Easy cancel/pause subscription anytime'
        ]
    },
    'vertical-oasis': {
        title: 'Vertical Oasis',
        type: 'Space-Saving Cat Furniture',
        description: 'Maximize your small apartment space with beautiful wall-mounted cat furniture that doubles as home decor. Featuring the trending Afrohemian aesthetic with sustainable rattan and natural wood, these modular pieces create an enriching environment for your cat without sacrificing floor space.',
        image: 'images/pet-product-2.png',
        price: '$149',
        affiliateDescription: 'Exclusive bundle: Save $50 when you buy the complete set! Free professional mounting kit included. Ships from both US warehouses and Zorora (South Africa) for fast delivery.',
        affiliateLink: 'https://www.wayfair.com/pet/cat-furniture',
        specs: [
            { icon: '📏', label: '5-Piece Wall Mount System' },
            { icon: '🪵', label: 'Sustainable Rattan & Wood' },
            { icon: '🎨', label: 'Boho-Chic Aesthetic' },
            { icon: '⚖️', label: 'Holds up to 30 lbs' },
            { icon: '🔧', label: 'Easy Install Hardware' },
            { icon: '🧹', label: 'Removable Washable Cushions' }
        ],
        highlights: [
            'Reclaims 15+ sq ft of valuable floor space',
            'Matches trending 2026 Afrohemian and Neo Deco styles',
            'Modular design - expand as needed',
            'Landlord-friendly mounting (no damage to walls)',
            'Perfect for studios and small apartments',
            'Doubles as decorative wall art',
            'Sustainably sourced materials',
            'Available in 3 color schemes'
        ]
    },
    'zero-odor': {
        title: 'Fresh Air Essentials',
        type: 'Eco-Friendly Hygiene System',
        description: 'Keep your studio apartment smelling fresh and clean with our complete eco-friendly hygiene subscription. Featuring sustainable cat litter, carbon-filter air purification, and plastic-free cleaning products, this system is perfect for environmentally conscious pet parents in small spaces.',
        image: 'images/pet-product-3.png',
        price: '$45/mo',
        affiliateDescription: 'Subscribe and save 30%! South African residents can order through Faithful to Nature (up to 15% cashback). International orders ship via Amazon with Prime eligibility.',
        affiliateLink: 'https://www.faithfultonature.co.za/pet-care',
        specs: [
            { icon: '🌿', label: 'Eco-Friendly Cat Litter (Monthly)' },
            { icon: '💨', label: 'HEPA Carbon Filter Purifier' },
            { icon: '♻️', label: 'Plastic-Free Cleaning Pods' },
            { icon: '🧼', label: 'Pet-Safe Floor Cleaner' },
            { icon: '🌸', label: 'Natural Odor Neutralizer' },
            { icon: '📦', label: 'Filter Replacement (Quarterly)' }
        ],
        highlights: [
            'Eliminates 99.7% of pet odors and dander',
            'Carbon-neutral shipping on all subscriptions',
            'Litter is flushable and biodegradable',
            'Perfect for studio apartments under 500 sq ft',
            'All products non-toxic and pet-safe',
            'Reduces plastic waste by 90% vs traditional products',
            'Works with automatic litter boxes',
            'Subscription flexibility - adjust quantities anytime'
        ]
    },
    'smart-tech': {
        title: 'AI Care System',
        type: 'Smart Pet Technology',
        description: 'The ultimate tech solution for busy urban pet parents. This AI-powered ecosystem includes app-controlled cameras, automatic feeders with portion control, smart water fountains, and wellness monitoring. Perfect for professionals who work long hours but want to stay connected with their pets.',
        image: 'images/pet-product-4.png',
        price: '$199',
        affiliateDescription: 'Complete system normally $299 - save $100! Includes 1 year of premium app subscription ($120 value). Compatible with Alexa & Google Home. Ships worldwide with 2-year warranty.',
        affiliateLink: 'https://www.amazon.com/pet-tech-cameras',
        specs: [
            { icon: '📹', label: '1080p Pet Camera w/ Treat Toss' },
            { icon: '🤖', label: 'AI-Powered Auto Feeder' },
            { icon: '💧', label: 'Smart Water Fountain' },
            { icon: '📱', label: 'Premium App (1 Year)' },
            { icon: '🔊', label: '2-Way Audio System' },
            { icon: '📊', label: 'Health Tracking Dashboard' }
        ],
        highlights: [
            'Monitor your pet from anywhere in the world',
            'AI detects unusual behavior and alerts you',
            'Portion control prevents overfeeding',
            'Toss treats remotely to reward good behavior',
            'Night vision for 24/7 monitoring',
            'Works with all major smart home systems',
            'Tracks eating, drinking, and activity patterns',
            'Cloud storage for video clips (1-year included)',
            'Perfect for apartments with WiFi connectivity'
        ]
    },
    'pet-insurance': {
        title: 'Rental Approval Kit',
        type: 'Pet Insurance & Templates',
        description: 'Get your apartment application approved with this comprehensive rental kit. Includes professional pet resume templates, behavior certification prep guides, and high-value pet insurance that proves financial responsibility to landlords.',
        image: 'images/pet-product-5.png',
        price: '$29/mo',
        affiliateDescription: 'Insurance sign-up only in South African partners:  DotSure or Odie for local coverage. International: Nationwide or Trupanion for global reach.',
        affiliateLink: 'https://www.dotsure.co.za/pet-insurance',
        specs: [
            { icon: '📋', label: 'Professional Pet Resume Templates' },
            { icon: '🛡️', label: 'Comprehensive Pet Insurance' },
            { icon: '✅', label: 'Landlord Reference Letter Template' },
            { icon: '🎓', label: 'Training Certificate Guide' },
            { icon: '📸', label: 'Pet Portfolio Builder' },
            { icon: '💼', label: 'Proof of Financial Responsibility' }
        ],
        highlights: [
            'Increases apartment approval rate by 300%',
            'Insurance covers up to R60,000 in damages (ZA)',
            'Templates drafted by real estate professionals',
            'Includes ESA (Emotional Support Animal) guidance',
            'Monthly insurance starting from $29',
            'Landlord hotline for direct policy verification',
            'Covers both cats and dogs',
            'No breed restrictions on insurance',
            'Cancel anytime with no penalties'
        ]
    },
    'complete-bundle': {
        title: 'Apartment Pet Starter',
        type: 'Complete Living Solution',
        description: 'Everything you need to thrive in your apartment with pets, all in one bundle. Combines our best noise control, space-saving furniture, hygiene essentials, and smart tech at a special bundle price. Perfect for new pet parents moving into their first apartment or existing residents who want to upgrade.',
        image: 'images/pet-product-6.png',
        price: '$399',
        affiliateDescription: 'MEGA DEAL: Save $250 off individual prices!. Includes free white-glove delivery and setup for orders in major metro areas. Split payments available.',
        affiliateLink: 'https://www.chewy.com/apartment-pet-bundle',
        specs: [
            { icon: '🔇', label: 'Complete Noise Control Kit' },
            { icon: '📏', label: '3-Piece Wall Furniture Set' },
            { icon: '💨', label: 'Air Purifier + 3mo Filters' },
            { icon: '🤖', label: 'Smart Feeder & Camera' },
            { icon: '🧼', label: '3-Month Cleaning Supply' },
            { icon: '🎁', label: 'Bonus: $50 Store Credit' }
        ],
        highlights: [
            'Complete apartment pet solution - nothing else needed',
            'Saves $250 vs buying items separately',
            'Everything arrives in one coordinated delivery',
            'Professional setup assistance available',
            'Works for both cats and dogs',
            'Perfect for apartments 300-800 sq ft',
            'All products landlord and neighbor approved',
            'Flexible payment plans available',
            '60-day satisfaction guarantee',
            'Free returns on any individual component'
        ]
    }
};

// ================================
// Filter Functionality
// ================================
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter products
        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all') {
                card.classList.remove('hidden');
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = '';
                }, 10);
            } else if (category === filterValue) {
                card.classList.remove('hidden');
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = '';
                }, 10);
            } else {
                card.classList.add('hidden');
            }
        });

        // Scroll to products section smoothly
        const productsSection = document.querySelector('.products-section');
        const headerOffset = 100;
        const elementPosition = productsSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// ================================
// Image Modal Functionality
// ================================
const imageModal = document.getElementById('imageModal');
const imageModalContent = document.getElementById('imageModalContent');
const closeImageModal = document.getElementById('closeImageModal');
const clickableImages = document.querySelectorAll('.clickable-image');

// Open image modal when clicking on any clickable image
clickableImages.forEach(img => {
    img.addEventListener('click', function(e) {
        // Don't open if clicking the quick view button area
        if (!e.target.closest('.quick-view-btn')) {
            openImageModal(this.src, this.alt);
        }
    });
});

function openImageModal(src, alt) {
    imageModal.classList.add('active');
    imageModalContent.src = src;
    imageModalContent.alt = alt;
    document.body.style.overflow = 'hidden';
}

function closeImageModalFunc() {
    imageModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close image modal on X button
closeImageModal.addEventListener('click', closeImageModalFunc);

// Close image modal on background click
imageModal.addEventListener('click', function(e) {
    if (e.target === imageModal) {
        closeImageModalFunc();
    }
});

// Close image modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (imageModal.classList.contains('active')) {
            closeImageModalFunc();
        }
        if (productModal.classList.contains('active')) {
            closeProductModal();
        }
    }
});

// ================================
// Product Modal Functionality
// ================================
const productModal = document.getElementById('productModal');
const modalClose = document.getElementById('closeProductModal');
const quickViewBtns = document.querySelectorAll('.quick-view-btn');
const ctaBtns = document.querySelectorAll('.cta-btn');

// Open product modal function
function openProductModal(productId) {
    const product = productData[productId];
    
    if (!product) return;
    
    // Populate modal with product data
    document.getElementById('modalType').textContent = product.type;
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductImage').alt = product.title;
    document.getElementById('modalPrice').textContent = product.price;
    
    // Populate affiliate box
    document.getElementById('affiliateDescription').textContent = product.affiliateDescription;
    document.getElementById('affiliateLink').href = product.affiliateLink;
    document.getElementById('modalAffiliateCTA').href = product.affiliateLink;
    
    // Populate specs
    const specsGrid = document.getElementById('modalSpecs');
    specsGrid.innerHTML = '';
    product.specs.forEach(spec => {
        const specItem = document.createElement('div');
        specItem.className = 'spec-item';
        specItem.innerHTML = `
            <span class="spec-icon">${spec.icon}</span>
            <span>${spec.label}</span>
        `;
        specsGrid.appendChild(specItem);
    });
    
    // Populate highlights
    const highlightsList = document.getElementById('modalHighlights');
    highlightsList.innerHTML = '';
    product.highlights.forEach(highlight => {
        const li = document.createElement('li');
        li.textContent = highlight;
        highlightsList.appendChild(li);
    });
    
    // Show modal
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close product modal function
function closeProductModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for quick view buttons
quickViewBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const productId = this.getAttribute('data-product');
        openProductModal(productId);
    });
});

// Event listeners for CTA buttons
ctaBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const productId = this.getAttribute('data-product');
        openProductModal(productId);
    });
});

// Close modal on X button
modalClose.addEventListener('click', closeProductModal);

// Close modal on background click
productModal.addEventListener('click', function(e) {
    if (e.target === productModal) {
        closeProductModal();
    }
});

// ================================
// CTA Buttons
// ================================
document.getElementById('joinWhatsAppBtn')?.addEventListener('click', function() {
    window.open('https://wa.me/?text=Join%20our%20Pet%20Pals%20community%20for%20exclusive%20deals!', '_blank');
});

document.getElementById('pinterestBtn')?.addEventListener('click', function() {
    window.open('https://za.pinterest.com/PetPalsApartment', '_blank');
});

// ================================
// Smooth Scroll Enhancement
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
// Intersection Observer for Scroll Animations
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards
document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

// Observe amenity cards
document.querySelectorAll('.amenity-card').forEach(card => {
    observer.observe(card);
});

// ================================
// Add Active State to Current Page in Nav
// ================================
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// ================================
// Mobile Menu Toggle
// ================================
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');

if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
    });

    navLinksContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
        });
    });
}

// ================================
// Header Scroll Effect
// ================================
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
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
// Parallax Effect for Hero
// ================================
window.addEventListener('scroll', function() {
    const heroContent = document.querySelector('.hero-content');
    const scrolled = window.pageYOffset;
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// ================================
// Card Hover Enhancement
// ================================
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ================================
// Loading Animation
// ================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);
});

// ================================
// Console Message
// ================================
console.log('%c🐾 Pet Pals Shop 🐾', 'color: #f9a825; font-size: 20px; font-weight: bold;');
console.log('%cApartment Pet Living Made Easy', 'color: #1e3a5f; font-size: 14px;');
console.log('%cAffiliate Marketing Platform', 'color: #8ba888; font-size: 12px;');
