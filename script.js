// script.js

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Carousel functionality
const carouselInner = document.querySelector('.carousel-inner');
const cards = document.querySelectorAll('.game-card');
const dotsContainer = document.getElementById('dots');
let current = 0;
let autoSlideInterval; // Renamed to avoid conflict with `autoSlide` in original

// Create dots with ARIA
cards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => {
        current = i;
        updateSlide();
        resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
});

function updateSlide() {
    if (carouselInner) { // Ensure carouselInner exists
        const offset = -current * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;

        // Update active dot
        const allDots = dotsContainer ? [...dotsContainer.children] : [];
        allDots.forEach(dot => dot.classList.remove('active'));
        if (allDots[current]) {
            allDots[current].classList.add('active');
        }
    }
}

function prevCard() {
    current = (current - 1 + cards.length) % cards.length;
    updateSlide();
    resetAutoSlide();
}

function nextCard() {
    current = (current + 1) % cards.length;
    updateSlide();
    resetAutoSlide();
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextCard, 5000);
}

// Swipe support for carousel
let startX = 0;
const carouselElement = document.getElementById('projects'); // Targeting the projects section for swipe

if (carouselElement) {
    carouselElement.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });

    carouselElement.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
        const delta = startX - endX;
        if (delta > 50) nextCard(); // Swipe left
        if (delta < -50) prevCard(); // Swipe right
    });
}


// Simple availability toggle logic
let isAvailable = true;
function toggleAvailability() {
    const statusElement = document.getElementById('availability-status');
    const statusIndicator = document.querySelector('#availability .relative');

    if (statusElement && statusIndicator) { // Ensure elements exist
        if (isAvailable) {
            statusElement.textContent = 'unavailable';
            statusElement.classList.remove('text-green-400');
            statusElement.classList.add('text-red-400');
            statusIndicator.innerHTML = `
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-full w-full bg-red-500"></span>
            `;
        } else {
            statusElement.textContent = 'available';
            statusElement.classList.remove('text-red-400');
            statusElement.classList.add('text-green-400');
            statusIndicator.innerHTML = `
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-full w-full bg-green-500"></span>
            `;
        }
        isAvailable = !isAvailable;
    }
}

// Initialize carousel and auto-slide on page load
window.onload = function() {
    updateSlide();
    resetAutoSlide(); // Start auto-slide after initial setup
};
