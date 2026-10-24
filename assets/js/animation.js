// Cache elements once (so we don't query them on every scroll)
const revealOnScrollElements = document.querySelectorAll('.reveal-on-scroll');
const revealTextElements = document.querySelectorAll('.reveal');
const logoItems = document.querySelectorAll('.logo-item');
const counters = document.querySelectorAll('.stat-number');
const zigZagElements = document.querySelectorAll('.zigzag-item'); 
// ---------------------------
// 1. NEW CONST FOR POP-UP ELEMENTS
// ---------------------------
const popElements = document.querySelectorAll('.pop-on-scroll'); // Assuming the elements have this class
// ---------------------------

let statsSection = null;
if (counters.length > 0) {
    // ... statsSection logic (unchanged) ...
    const firstStat = counters[0];
    if (firstStat.parentElement && firstStat.parentElement.parentElement) {
        statsSection = firstStat.parentElement.parentElement;
    }
}

// ---------------------------
// Function to check if element is in viewport (unchanged)
// ---------------------------
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
}

// ---------------------------
// Reveal-on-scroll (unchanged)
// ---------------------------
function handleScroll() {
    revealOnScrollElements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('reveal-active');
        }
    });
}

// ---------------------------
// Our Trusted Client animation (unchanged)
// ---------------------------
function revealElements() {
    const windowHeight = window.innerHeight;

    // 1. Reveal Heading and Paragraph
    revealTextElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });

    // 2. Reveal Logos with Staggered Delay
    logoItems.forEach((logo, index) => {
        const elementTop = logo.getBoundingClientRect().top;
        if (elementTop < windowHeight - 80) {
            setTimeout(() => {
                logo.classList.add("active");
            }, index * 120);
        }
    });
}

// ---------------------------
// Reveal ZigZag Elements (unchanged)
// ---------------------------
function revealZigZagElements() {
    zigZagElements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('zigzag-active');
        }
    });
}

// ---------------------------
// 2. NEW FUNCTION: Reveal Pop-Up Elements
// ---------------------------
function revealPopElements() {
    popElements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('pop-active'); // Add your new CSS class
        }
    });
}

// ---------------------------
// Counter Animation Script (unchanged)
// ---------------------------
let started = false;

function startCounter() {
    // ... counter logic (unchanged) ...
    if (started) return;
    if (!counters.length) return;

    counters.forEach(counter => {
        counter.innerText = '0';
        let target = +counter.getAttribute('data-target');
        let speed = 30;

        function updateCounter() {
            let current = +counter.innerText;
            let increment = Math.ceil(target / 100);

            if (current < target) {
                counter.innerText = current + increment;
                setTimeout(updateCounter, speed);
            } else {
                counter.innerText = target + "+";
            }
        }

        updateCounter();
    });

    started = true;
}

function checkCounterOnScroll() {
    if (started || !statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
        startCounter();
    }
}

// ---------------------------
// THROTTLED SCROLL HANDLER (UPDATED)
// ---------------------------
let isScrolling = false;

function onScrollThrottled() {
    if (isScrolling) return;
    isScrolling = true;

    requestAnimationFrame(() => {
        handleScroll();
        revealElements();
        revealZigZagElements(); 
        revealPopElements(); // 3. CALL NEW POP-UP FUNCTION HERE
        checkCounterOnScroll();
        isScrolling = false;
    });
}

// Single scroll listener
window.addEventListener('scroll', onScrollThrottled);

// Initial checks on page load
window.addEventListener('load', () => {
    handleScroll();
    revealElements();
    revealZigZagElements(); 
    revealPopElements(); // Also check on load
    checkCounterOnScroll();
});

// Also call once immediately (in case elements already in view)
handleScroll();
revealElements();
revealZigZagElements();
revealPopElements(); // Also call immediately
checkCounterOnScroll();