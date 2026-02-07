// ===================================
// IMAGE GALLERY FUNCTIONALITY
// ===================================

/**
 * Change the main product image when a thumbnail is clicked
 * @param {HTMLElement} element - The clicked thumbnail element
 */
function changeImage(element) {
    // Remove active class from all thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Add active class to clicked thumbnail
    element.classList.add('active');
    
    // Change main image
    const mainImage = document.getElementById('mainImage');
    const thumbnailSrc = element.src;
    
    // Replace thumbnail size parameters with larger size for main image
    const mainImageSrc = thumbnailSrc.replace('w=150&h=150', 'w=600&h=600');
    mainImage.src = mainImageSrc;
}

// ===================================
// TAB NAVIGATION FUNCTIONALITY
// ===================================

/**
 * Open a specific tab and hide others
 * @param {Event} evt - The click event
 * @param {string} tabName - The ID of the tab to open
 */
function openTab(evt, tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    // Show current tab and mark button as active
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// ===================================
// SIZE SELECTOR FUNCTIONALITY
// ===================================

/**
 * Select a product size and update the price
 * @param {HTMLElement} element - The clicked size option element
 * @param {number} price - The price for this size
 */
function selectSize(element, price) {
    // Remove active class from all size options
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.classList.remove('active');
    });
    
    // Add active class to selected option
    element.classList.add('active');
    
    // Update price display
    const priceElement = document.querySelector('.price');
    priceElement.textContent = '$' + price.toFixed(2);
}

// ===================================
// SHOPPING CART FUNCTIONALITY
// ===================================

/**
 * Add product to cart
 */
function addToCart() {
    const quantity = document.querySelector('.qty-input').value;
    const selectedSize = document.querySelector('.size-option.active');
    const sizeText = selectedSize ? selectedSize.textContent.trim().split('\n')[0] : '30lb';
    
    // Create cart notification
    showNotification(`Added ${quantity} x ${sizeText} bag(s) to your cart!`, 'success');
    
    // Here you would typically send data to your backend or update cart state
    console.log('Added to cart:', {
        quantity: quantity,
        size: sizeText,
        price: document.querySelector('.price').textContent
    });
}

/**
 * Proceed to checkout
 */
function buyNow() {
    const quantity = document.querySelector('.qty-input').value;
    const selectedSize = document.querySelector('.size-option.active');
    const sizeText = selectedSize ? selectedSize.textContent.trim().split('\n')[0] : '30lb';
    
    showNotification('Proceeding to checkout...', 'info');
    
    // Here you would typically redirect to checkout page
    console.log('Buy now:', {
        quantity: quantity,
        size: sizeText,
        price: document.querySelector('.price').textContent
    });
    
    // Simulate redirect (in real app, use: window.location.href = '/checkout')
    setTimeout(() => {
        console.log('Redirecting to checkout...');
    }, 1000);
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================

/**
 * Display a notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===================================
// QUANTITY INPUT VALIDATION
// ===================================

/**
 * Validate and constrain quantity input
 */
function validateQuantity() {
    const qtyInput = document.querySelector('.qty-input');
    
    qtyInput.addEventListener('change', function() {
        let value = parseInt(this.value);
        
        if (isNaN(value) || value < 1) {
            this.value = 1;
        } else if (value > 10) {
            this.value = 10;
            showNotification('Maximum quantity is 10', 'error');
        }
    });
}

// ===================================
// REVIEW FUNCTIONALITY
// ===================================

/**
 * Scroll to reviews section (if exists) or show reviews modal
 */
function viewReviews() {
    showNotification('Reviews section coming soon!', 'info');
    // In a real application, this would scroll to reviews or open a modal
}

// ===================================
// INITIALIZATION
// ===================================

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }
    
    // Review count click handler
    const reviewCount = document.querySelector('.review-count');
    if (reviewCount) {
        reviewCount.addEventListener('click', viewReviews);
    }
    
    // Initialize quantity validation
    validateQuantity();
    
    console.log('Product page initialized successfully!');
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Format price with currency
 * @param {number} price - The price to format
 * @returns {string} Formatted price string
 */
function formatPrice(price) {
    return '$' + price.toFixed(2);
}

/**
 * Get selected product details
 * @returns {Object} Object containing selected product details
 */
function getSelectedProduct() {
    const selectedSize = document.querySelector('.size-option.active');
    const sizeText = selectedSize ? selectedSize.querySelector('div').textContent : '30lb';
    const price = document.querySelector('.price').textContent;
    const quantity = document.querySelector('.qty-input').value;
    
    return {
        name: 'Wellness Complete Health Adult Deboned Chicken & Brown Rice',
        size: sizeText,
        price: price,
        quantity: parseInt(quantity),
        totalPrice: parseFloat(price.replace('$', '')) * parseInt(quantity)
    };
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        changeImage,
        openTab,
        selectSize,
        addToCart,
        buyNow,
        showNotification,
        getSelectedProduct,
        formatPrice
    };
}
