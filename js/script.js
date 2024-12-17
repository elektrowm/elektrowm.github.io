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
    const targetX = currentTab.offsetLeft - 20;
    
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

//========================================
//Submit Form
//========================================
// const form = document.getElementById("form");
// const nameCust = document.getElementById("name");
// const surnameCust = document.getElementById("surname");
// const emailCust = document.getElementById("email");
// const phoneCust = document.getElementById("phone");
// const subjectCust = document.getElementById("subject");
// const messageCust = document.getElementById("message");
// const consentCust = document.getElementById("consent");
// const result = document.getElementById("result");


// // Regex für E-Mail-Validierung

// // Formular beim Laden zurücksetzen
// window.onload = () => {
//     form.reset();
// };

// function validateEmail(email) {
//     return emailRegex.test(email.toLowerCase());
// }
// console.log("Code funktioniert!");

// function checkInputs() {
//     const items = document.querySelectorAll(".item");
//     let emptyFields = false;

//     // Prüfe alle Felder auf Leereinträge
//     for (const item of items) {
//         if (item.value.trim() === "") { // Trimme Leerzeichen
//             item.classList.add("error");
//             item.parentElement.classList.add("error");
//             emptyFields = true;
//         } else {
//             item.classList.remove("error");
//             item.parentElement.classList.remove("error");
//         }
//     }

//     // Zeige Nachricht, wenn leere Felder vorhanden sind
//     if (emptyFields) {
//         result.style.display = "block";
//         result.innerHTML = "Bitte füllen Sie alle Pflichtfelder aus.";
//         setTimeout(() => {
//             result.style.display = "none";
//         }, 3000);
//         return false;
//     }

//     // Prüfe Datenschutzeinwilligung
//     if (!consentCust.checked) {
//         result.style.display = "block";
//         result.innerHTML = "Bitte akzeptieren Sie die Datenschutzerklärung.";
//         setTimeout(() => {
//             result.style.display = "none";
//         }, 3000);
//         return false;
//     }
    
//     // Wenn keine Fehler, gebe true zurück
//     return true;
// }


// // Name-Validierung während der Eingabe
// nameCust.addEventListener("keyup", () => {
//     if (nameCust.value === "") {
//         nameCust.classList.add("error");
//         nameCust.parentElement.classList.add("error");
//     } else {
//         nameCust.classList.remove("error");
//         nameCust.parentElement.classList.remove("error");
//     }
// });

// // Nachname-Validierung während der Eingabe
// surnameCust.addEventListener("keyup", () => {
//     if (surnameCust.value === "") {
//         surnameCust.classList.add("error");
//         surnameCust.parentElement.classList.add("error");
//     } else {
//         surnameCust.classList.remove("error");
//         surnameCust.parentElement.classList.remove("error");
//     }
// });

// // Telefon-Validierung während der Eingabe
// phoneCust.addEventListener("keyup", () => {
//     // Prüft, ob der Wert leer ist oder nicht-numerische Zeichen enthält
//     if (phoneCust.value === "" || !/^\d+$/.test(phoneCust.value)) {
//         phoneCust.classList.add("error");
//         phoneCust.parentElement.classList.add("error");
//     } else {
//         phoneCust.classList.remove("error");
//         phoneCust.parentElement.classList.remove("error");
//     }
// });

// // E-Mail-Validierung während der Eingabe
// emailCust.addEventListener("keyup", () => {
//     if (emailCust.value !== "") {
//         if (validateEmail(emailCust.value)) {
//             emailCust.classList.remove("error");
//             emailCust.parentElement.classList.remove("error");
//         } else {
//             emailCust.classList.add("error");
//             emailCust.parentElement.classList.add("error");
//         }
//     }
// });

// // Betreff-Validierung während der Eingabe
// subjectCust.addEventListener("keyup", () => {
//     if (subjectCust.value === "") {
//         subjectCust.classList.add("error");
//         subjectCust.parentElement.classList.add("error");
//     } else {
//         subjectCust.classList.remove("error");
//         subjectCust.parentElement.classList.remove("error");
//     }
// });

// // Nachricht-Validierung während der Eingabe
// messageCust.addEventListener("keyup", () => {
//     if (messageCust.value === "") {
//         messageCust.classList.add("error");
//         messageCust.parentElement.classList.add("error");
//     } else {
//         messageCust.classList.remove("error");
//         messageCust.parentElement.classList.remove("error");
//     }
// });

// // Event Listener für Datenschutz-Checkbox
// consentCust.addEventListener("change", () => {
//     if (consentCust.checked) {
//         consentCust.classList.remove("error");
//         consentCust.parentElement.classList.remove("error");
//     }
// });

// form.addEventListener("submit", (press) => {
//     // Verhindere das Standardverhalten des Formulars
//     press.preventDefault();

//     // Prüfe, ob die Datenschutzerklärung akzeptiert wurde
//     if (!consentCust.checked) {
//         result.style.display = "block";
//         result.innerHTML = "Bitte akzeptieren Sie die Datenschutzerklärung.";

//         // Verstecke die Nachricht nach 3 Sekunden
//         setTimeout(() => {
//             result.style.display = "none";
//         }, 3000);

//         return; // Beende die Funktion, wenn die Bedingung nicht erfüllt ist
//     }

//     // Hole alle Felder mit der Klasse "item"
//     const items = document.querySelectorAll(".item");

//     // Setze die Fehlerklasse auf alle Pflichtfelder
//     items.forEach(item => {
//         if (item.value.trim() === "") {
//             item.classList.add("error");
//             item.parentElement.classList.add("error");
//         } else {
//             item.classList.remove("error");
//             item.parentElement.classList.remove("error");
//         }
//     });

//     // Zeige die Ergebnisnachricht an
//     result.style.display = "block";
//     result.innerHTML = "Bitte füllen Sie alle Pflichtfelder aus.";

//     // Verstecke die Nachricht nach 3 Sekunden
//     setTimeout(() => {
//         result.style.display = "none";
//     }, 3000);
// });


// function checkEmail(emailContent) {
    // const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    
    // return emailContent.match(emailRegex);

    // const errorTxtEmail = document.querySelector(".error-txt.email");
    
    // if (!emailContent.match(emailRegex)) {
    //     emailCust.classList.add("error");
    //     emailCust.parentElement.classList.add("error");
        
    //     if (emailContent != "") {
    //         errorTxtEmail.innerText = "Eine gültige E-Mail-Adresse eintragen";
    //     }
    //     else {
    //         errorTxtEmail.innerText = "Email eintragen";
    //     }
    // }
    // else {
    //     emailCust.classList.remove("error");
    //     emailCust.parentElement.classList.remove("error");
    // }
// }

// function checkPhone() {
//     const phoneRegex = /^\d+$/;
//     const errorTxtPhone = document.querySelector(".error-txt.phone");
    
//     if (!phoneCust.value.match(phoneRegex)) {
//         phoneCust.classList.add("error");
//         phoneCust.parentElement.classList.add("error");
        
//         if (phoneCust.value != "") {
//             errorTxtPhone.innerText = "Nur Zahlen eingeben";
//         }
//         else {
//             errorTxtPhone.innerText = "Telefonnummer eingeben";
//         }
//     }
//     else {
//         phoneCust.classList.remove("error");
//         phoneCust.parentElement.classList.remove("error");
//     }
// }


// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     checkInputs();
//     const items = document.querySelectorAll(".item");
    
//     const hasNoErrors = !nameCust.classList.contains("error") && 
//         !surnameCust.classList.contains("error") && 
//         !emailCust.classList.contains("error") && 
//         !phoneCust.classList.contains("error") && 
//         !subjectCust.classList.contains("error") && 
//         !messageCust.classList.contains("error");
    
//     if (hasNoErrors) {
//         if (consentCust.checked) {
//             sendEmail();
//         } else {
//             result.style.display = "block";
//             result.innerHTML = "Bitte akzeptieren Sie die Datenschutzerklärung.";
            
//             setTimeout(() => {
//                 result.style.display = "none";
//             }, 3000);
//         }
//     } else {
//         result.style.display = "block";
//         result.innerHTML = "Bitte füllen Sie alle Pflichtfelder aus.";
        
//         setTimeout(() => {
//             result.style.display = "none";
//         }, 3000);
//     }
// });
// const form_items = [
//     nameCust.value,
//     surnameCust.value,
//     emailCust.value,
//     phoneCust.value,
//     subjectCust.value,
//     messageCust.value
//     // consentCust.value
// ];

