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

// // Wähle alle Elemente mit der Klasse 'project-text-item'
// const projectItems = document.querySelectorAll('.project-text-item');
// const totalItems = projectItems.length;

// // Erstelle ein Array mit dem Inhalt aller <p>-Tags
// const projectItemsArray = Array.from(projectItems).map(item => item.querySelector('p').textContent);

// function scrollText(index) {
//     const currentItem = projectItems[index % totalItems];
//     currentItem.style.display = 'block';  // Macht das aktuelle Item sichtbar

//     return currentItem;
// }

// if (totalItems > 0) {
//     // Schleife die genau 5 mal durchläuft
//     for (let index = 0; index < 5 * totalItems; index++) {
//         const item = scrollText(index);
//         console.log('Index:', index);
//         console.log('Inhalt:', projectItemsArray[index % totalItems]);
//     }
// }

document.addEventListener('DOMContentLoaded', function() {
    const scroller = document.getElementById('scroller');
    const originalContent = scroller.innerHTML;
    
    // Clone the content 4 times
    scroller.innerHTML = originalContent.repeat(4);

    // Function to check scroll position and reset if needed
    function checkScroll() {
        if (scroller.scrollTop >= scroller.scrollHeight / 2) {
            scroller.scrollTop = 0;
        }
    }

    // Calculate animation duration based on content length
    function updateScrollSpeed() {
        const scrollerHeight = scroller.scrollHeight;
        const containerHeight = scroller.parentElement.offsetHeight;
        const duration = Math.max(20, scrollerHeight / 50); // Angepasste Scrollgeschwindigkeit
        
        scroller.style.animationDuration = `${duration}s`;
    }

    // Initial setup
    updateScrollSpeed();
    
    // Add scroll event listener for infinite loop
    scroller.addEventListener('scroll', checkScroll);
    
    // Update on window resize
    window.addEventListener('resize', updateScrollSpeed);
});