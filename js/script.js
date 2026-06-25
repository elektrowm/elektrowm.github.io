//========================================
//Navigation Mobile
//========================================

const btnBurger = document.querySelector(".burger");   
const topNavMenu = document.querySelector(".topnav");
const menuItems = document.querySelectorAll(".topnav-link");


function closeMobileMenu() {
    btnBurger.classList.remove("active");
    topNavMenu.classList.remove("open");
}


btnBurger.addEventListener("click", function() {
    this.classList.toggle("active");
    topNavMenu.classList.toggle("open");
});


menuItems.forEach(item => {
    item.addEventListener("click", function() {
        closeMobileMenu();
    });
});

//========================================
//Slider, Dots
//========================================

// DOM-Elemente auswählen
const sliderTabs = document.querySelectorAll(".slider-tab");
const sliderIndicator = document.querySelector(".slider-indicator");
const sliderControls = document.querySelector(".slider-controls");
const navDots = document.querySelectorAll(".nav-dots span");
const prevButton = document.querySelector("#slide-prev");
const nextButton = document.querySelector("#slide-next");
const totalSlides = sliderTabs.length;

let previousIndex = 0; // Speichert den vorherigen Index
let currentIndex = 0;  // Speichert den aktuellen Index

// Funktion zum Aktualisieren der Navigationspfeile
const updateNavigationButtons = (index) => {
    // Erste Slide - Prev Button verstecken
    if (index === 0) {
        prevButton.style.display = "none";
        nextButton.style.display = "block";
    }
    // Letzte Slide - Next Button verstecken
    else if (index === totalSlides - 1) {
        prevButton.style.display = "block";
        nextButton.style.display = "none";
    }
    // Alle anderen Slides - beide Buttons zeigen
    else {
        prevButton.style.display = "block";
        nextButton.style.display = "block";
    }
};

// Verbesserte Indikator-Update-Funktion
const updateIndicator = (index, direction) => {
    // Normalisierung des Index
    const normalizedIndex = ((index % totalSlides) + totalSlides) % totalSlides;
    
    // Animation basierend auf Swipe-Richtung
    const currentTab = sliderTabs[normalizedIndex];
    const targetX = currentTab.offsetLeft;
    
    // Weiche Animation des Indikators
    sliderIndicator.style.transition = "transform 0.3s ease-out, width 0.3s ease-out";
    sliderIndicator.style.transform = `translateX(${targetX}px)`;
    sliderIndicator.style.width = `${currentTab.getBoundingClientRect().width}px`;
    
    // Sanfte Zentrierung des aktiven Tabs
    const scrollTarget = currentTab.offsetLeft - (sliderControls.offsetWidth / 2) + (currentTab.offsetWidth / 2);
    sliderControls.scrollTo({
        left: scrollTarget,
        behavior: "smooth"
    });
    
    // Navigation Dots aktualisieren
    navDots.forEach((dot, i) => {
        dot.classList.toggle("nav-dot-current", i === normalizedIndex);
    });

    updateNavigationButtons(normalizedIndex);
    
    // Aktualisiere die Indizes
    previousIndex = currentIndex;
    currentIndex = normalizedIndex;
};

// Swiper Initialisierung mit verbesserter Navigation
const swiper = new Swiper(".slider-container", {
    effect: "slide",
    speed: 800, // Etwas schnellere Animation für bessere Responsivität
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    navigation: {
        prevEl: "#slide-prev",
        nextEl: "#slide-next"
    },
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    on: {
        init: function() {
            updateIndicator(0);
        },
        slideChange: function() {
            const realIndex = this.realIndex;
            const direction = realIndex > previousIndex ? "next" : "prev";
            updateIndicator(realIndex, direction);
        },
        touchEnd: function() {
            // Zusätzliches Feedback bei Touch-Interaktionen
            const realIndex = this.realIndex;
            updateIndicator(realIndex);
        }
    }
});

// Verbesserte Tab-Click-Handler
sliderTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        const direction = index > currentIndex ? "next" : "prev";
        swiper.slideToLoop(index, undefined, true);
        updateIndicator(index, direction);
    });
});

// Verbesserte Dot-Click-Handler
navDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        const direction = index > currentIndex ? "next" : "prev";
        swiper.slideToLoop(index, undefined, true);
        updateIndicator(index, direction);
    });
});

// Optimierter Resize-Handler mit Debouncing
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const realIndex = swiper.realIndex;
        updateIndicator(realIndex);
    }, 150);
});

// Optimierter Scroll-Handler mit Throttling
let isScrolling = false;
sliderControls.addEventListener("scroll", () => {
    if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(() => {
            const realIndex = swiper.realIndex;
            updateIndicator(realIndex);
            isScrolling = false;
        });
    }
});

//========================================
//Card Flip Animation
//========================================

document.addEventListener("DOMContentLoaded", function() {
    // Alle Karten auswählen
    const cards = document.querySelectorAll(".card");
    
    // Überprüfen, ob es ein Touch-Gerät ist
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // Für jede Karte Event Listener hinzufügen
        cards.forEach(card => {
            // Click/Touch Event Handler für diese Karte
            function handleClick(e) {
                card.classList.toggle("is-flipped");
            }
            
            // Event Listener für Touch und Click
            card.addEventListener("click", handleClick);
            card.addEventListener("touchend", function(e) {
                if (e.cancelable) {
                    e.preventDefault();
                }
                handleClick(e);
            });
        });
    }
});

// ==========================================
// 4. TESTIMONIAL SECTION - JAHRESZAHL
// ==========================================

const startYear = 2009;
const currentYear = new Date().getFullYear();
const years = currentYear - startYear;
const yearsElement = document.getElementById("years");

if (yearsElement) {
    yearsElement.textContent = years + "+";
}

// ==========================================
// 5. PROJECT SECTION - AUTO-CLOSE CHECKBOX
// ==========================================

document.querySelectorAll('.project-box input[type="checkbox"]').forEach(checkbox => {
    let timeout;

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.checked = false;
            }, 30000);
        } else {
            if (timeout) clearTimeout(timeout);
        }
    });
});

// ==========================================
// 8. SMOOTH SCROLL FÜR INTERNE LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        const href = this.getAttribute("href");
        
        // Nur wenn es ein interner Link ist und nicht leer
        if (href !== "#" && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });
});


// ==========================================
// 9. LAZY LOADING FÜR BILDER
// ==========================================

document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll("img[data-src]");
    
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute("data-src");
                    img.removeAttribute("data-src");
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback für ältere Browser
        images.forEach(img => {
            img.src = img.getAttribute("data-src");
            img.removeAttribute("data-src");
        });
    }
});


// ==========================================
// 10. CONSOLE WARNING
// ==========================================

console.log("%c🔌 ElektroWM - Professionelle Elektroinstallation", "font-size:20px; font-weight:bold; color:#f0b429;");
console.log("%cBesuchen Sie uns: https://www.elektrowm.com", "font-size:14px; color:#666;");