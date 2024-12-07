



//=========
// DOM-Elemente auswählen
const sliderTabs = document.querySelectorAll(".slider-tab");
const sliderIndicator = document.querySelector(".slider-indicator");
const sliderControls = document.querySelector(".slider-controls");
const navDots = document.querySelectorAll(".nav-dots span");
const totalSlides = sliderTabs.length;

let previousIndex = 0; // Speichert den vorherigen Index
let currentIndex = 0;  // Speichert den aktuellen Index

// Verbesserte Indikator-Update-Funktion
const updateIndicator = (index, direction) => {
    // Normalisierung des Index
    const normalizedIndex = ((index % totalSlides) + totalSlides) % totalSlides;
    
    // Animation basierend auf Swipe-Richtung
    const currentTab = sliderTabs[normalizedIndex];
    const targetX = currentTab.offsetLeft - 20;
    
    // Weiche Animation des Indikators
    sliderIndicator.style.transition = 'transform 0.3s ease-out, width 0.3s ease-out';
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
    
    // Aktualisiere die Indizes
    previousIndex = currentIndex;
    currentIndex = normalizedIndex;
};

// Swiper Initialisierung mit verbesserter Navigation
const swiper = new Swiper(".slider-container", {
    effect: "slide",
    speed: 800,
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
            const direction = realIndex > previousIndex ? 'next' : 'prev';
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
        const direction = index > currentIndex ? 'next' : 'prev';
        swiper.slideToLoop(index, undefined, true);
        updateIndicator(index, direction);
    });
});

// Verbesserte Dot-Click-Handler
navDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        const direction = index > currentIndex ? 'next' : 'prev';
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


//========= variante mit pfeile, die verschwinden

// DOM-Elemente auswählen
const sliderTabs = document.querySelectorAll(".slider-tab");
const sliderIndicator = document.querySelector(".slider-indicator");
const sliderControls = document.querySelector(".slider-controls");
const navDots = document.querySelectorAll(".nav-dots span");
const prevButton = document.querySelector("#slide-prev");
const nextButton = document.querySelector("#slide-next");
const totalSlides = sliderTabs.length;

let isMovingForward = true;
let currentIndex = 0;
let previousIndex = 0;

// Funktion zum Aktualisieren der Navigationspfeile
const updateNavigationButtons = (index) => {
    // Erste Slide - Prev Button verstecken
    if (index === 0) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'block';
    }
    // Letzte Slide - Next Button verstecken
    else if (index === totalSlides - 1) {
        prevButton.style.display = 'block';
        nextButton.style.display = 'none';
    }
    // Alle anderen Slides - beide Buttons zeigen
    else {
        prevButton.style.display = 'block';
        nextButton.style.display = 'block';
    }
};

// Verbesserte Indikator-Update-Funktion
const updateIndicator = (index) => {
    // Normalisierung des Index
    const normalizedIndex = ((index % totalSlides) + totalSlides) % totalSlides;
    
    // Animation basierend auf Swipe-Richtung
    const currentTab = sliderTabs[normalizedIndex];
    const targetX = currentTab.offsetLeft - 20;
    
    // Weiche Animation des Indikators
    sliderIndicator.style.transition = 'transform 0.3s ease-out, width 0.3s ease-out';
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

// Funktion für automatisches Alternieren
const autoSlide = () => {
    if (isMovingForward) {
        if (currentIndex >= totalSlides - 1) {
            isMovingForward = false;
            currentIndex--;
        } else {
            currentIndex++;
        }
    } else {
        if (currentIndex <= 0) {
            isMovingForward = true;
            currentIndex++;
        } else {
            currentIndex--;
        }
    }
    
    swiper.slideTo(currentIndex);
    updateIndicator(currentIndex);
};

// Swiper Initialisierung
const swiper = new Swiper(".slider-container", {
    effect: "slide",
    speed: 800,
    loop: false, // Loop muss false sein für die alternierende Bewegung
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        stopOnLastSlide: false
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
            // Starte das automatische Alternieren
            setInterval(autoSlide, 3000);
        },
        slideChange: function() {
            const realIndex = this.activeIndex;
            updateIndicator(realIndex);
        }
    }
});

// Event-Listener für Tabs
sliderTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        currentIndex = index;
        swiper.slideTo(index);
        updateIndicator(index);
    });
});

// Event-Listener für Dots
navDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentIndex = index;
        swiper.slideTo(index);
        updateIndicator(index);
    });
});

// Optimierter Resize-Handler
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateIndicator(currentIndex);
    }, 150);
});

// Optimierter Scroll-Handler
let isScrolling = false;
sliderControls.addEventListener("scroll", () => {
    if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(() => {
            updateIndicator(currentIndex);
            isScrolling = false;
        });
    }
});