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
//Scrolling Text Project Section
//========================================
// // Wähle alle projekt Items
// const projectItems = document.querySelectorAll(".project-item"); // Angenommen, das ist der Container
// const projectText = document.querySelector(".project-text-item");
// const totalItems = projectItems.length;
// let currentItem = 0;

// function scrollText(item, index) {    
//     // Prüfe ob die Elemente existieren
//     if (!item || !projectText) return;
    
//     const targetText = item.querySelector(".project-text");
//     // Prüfe ob das Text-Element existiert
//     if (!targetText) return;
    
//     projectText.innerHTML = targetText.innerHTML;
//     currentItem = index;

//     // Prüfe ob wir am Ende sind
//     if (currentItem >= totalItems - 1) {
//         // Starte wieder von vorne
//         currentItem = 0;
//     } else {
//         currentItem++;
//     }
// }