

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


// window.onload = () => {
//     form.reset();
// };

// function checkInputs() {
//     const items = document.querySelectorAll(".item");
    
//     for (const item of items) {
//         if (item.value === "") {
//             item.classList.add("error");
//             item.parentElement.classList.add("error");
//         }
//         else {
//             item.classList.remove("error");
//             item.parentElement.classList.remove("error");
//         }

//         item.addEventListener("keyup", () => {
//             if (item.value === "") {
//                 item.classList.add("error");
//                 item.parentElement.classList.add("error");
//             }
//             else {
//                 item.classList.remove("error");
//                 item.parentElement.classList.remove("error");
//             }
//         });
//     }
// }

// function sendEmail() {
    // const formData = {
    //     access_key: "f1493a87-edde-49dd-bd80-f8cb9048c732",
    //     Vorname: nameCust.value,
    //     Nachname: surnameCust.value,
    //     Email: emailCust.value,
    //     Telefon: phoneCust.value,
    //     Anliegen: subjectCust.value,
    //     Nachricht: messageCust.value,
    // };
    
    // result.style.display = "block";
    // result.innerHTML = "Bitte warten...";

//     fetch("https://api.web3forms.com/submit", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(formData)
//     })
//     .then(async (response) => {
//         const json = await response.json();
//         if (response.status === 200) {
//             result.innerHTML = "Ihre Nachricht wurde erfolgreich gesendet!";
//             form.reset();
//         } else {
//             console.log(json);
//             result.innerHTML = `Ein Fehler ist aufgetreten: ${json.message || "Bitte versuchen Sie es erneut."}`;
//         }
//     })
//     .catch(error => {
//         console.log(error);
//         result.innerHTML = "Etwas ist schief gelaufen! Bitte versuchen Sie es später erneut.";
//     })
//     .finally(() => {
//         setTimeout(() => {
//             result.style.display = "none";
//         }, 3000);
//     });
// }


//===============
// const nameCust = document.getElementById("name");
// const surnameCust = document.getElementById("surname");
// const emailCust = document.getElementById("email");
// const phoneCust = document.getElementById("phone");
// const subjectCust = document.getElementById("subject");
// const messageCust = document.getElementById("message");

// const consentCust = document.getElementById("consent");
// const submitBtn = document.getElementById("submit");
// const form = document.getElementById("form");
// const result = document.getElementById("result");

// function sendEmail() {
//     const formData = {
//         access_key: "f1493a87-edde-49dd-bd80-f8cb9048c732",
//         Vorname: nameCust.value,
//         Nachname: surnameCust.value,
//         Email: emailCust.value,
//         Telefon: phoneCust.value,
//         Anliegen: subjectCust.value,
//         Nachricht: messageCust.value,
//     };
    
//     // const object = Object.fromEntries(formData);
//     // const json = JSON.stringify(object);

//     result.innerHTML = "Bitte warten..."
//     result.style.display = "block";

//     fetch("https://api.web3forms.com/submit", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify(formData)
//         })
//         .then(async (response) => {
//             let json = await response.json();
//             if (response.status == 200) {
//                 result.innerHTML = "Ihre Nachricht wurde erfolgreich gesendet!";

//             } else {
//                 console.log(response);
//                 result.innerHTML = `Ein Fehler ist aufgetreten: ${json.message || "Bitte versuchen Sie es erneut."}`;
// }
//         })
//         .catch(error => {
//             console.log(error);
//             result.innerHTML = "Etwas ist schief gelaufen! Bitte versuchen Sie es später erneut.";
//         })
//         .then(function() {
//             form.reset();
//             setTimeout(() => {
//                 result.style.display = "none";
//             }, 3000);
//         });
// };



// function enableErrorMessage(element) {
//     element.classList.add("error");
//     element.parentElement.classList.add("error");
// }

// function disableErrorMessage(element) {
//     element.classList.remove("error");
//     element.parentElement.classList.remove("error");
// }

// const formItemsWithRegex = [
//     [nameCust, /^[a-zA-ZäöüßÄÖÜ\s-]{2,}$/],
//     [surnameCust, /^[a-zA-ZäöüßÄÖÜ\s-]{2,}$/],
//     [emailCust, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
//     [phoneCust, /^[\d\s+()-]{5,}$/],
//     [subjectCust, /^[\wäöüßÄÖÜ\s-]{2,}$/],
//     [messageCust, /^[\wäöüßÄÖÜ\s.,!?-]{2,}$/],
//     [consentCust, / /] 
// ];

// // Input-Validierung während der Eingabe
// formItemsWithRegex.forEach(([element, regex]) => {
//     if (!element) return;
    
//     element.addEventListener("input", () => {
//         let isValid = false;
        
//         if (element.getAttribute("type") === "text") {
//             isValid = regex.test(element.value);
//         } else if (element.getAttribute("type") === "checkbox") {
//             isValid = element.checked;
//         }
        
//         if (isValid) {
//             disableErrorMessage(element);
//         } else {
//             enableErrorMessage(element);
//         }
//     });
// });


// // Form-Submit-Handler
// form.addEventListener("submit", function(e) {
//     e.preventDefault();
    
//     const formValidation = formItemsWithRegex.map(([element, regex]) => {
//         if (!element) return [null, false];
        
//         let isValid = false;
        
//         if (element.getAttribute("type") === "text") {
//             isValid = regex.test(element.value);
//         } else if (element.getAttribute("type") === "checkbox") {
//             isValid = element.checked;
//         } else {
//             console.log("Error in trying to validate form");
//         }
        
//         return [element, isValid];
//     });

//     const allValid = formValidation.every(([element, isValid]) => isValid);
    
//     if (allValid) {
//         sendEmail();
//     } else {
//         formValidation.forEach(([element, isValid]) => {
//             if (element) {
//                 if (isValid) {
//                     disableErrorMessage(element);
//                 } else {
//                     enableErrorMessage(element);
//                 }
//             }
//         });
//     }
// });

form.addEventListener("submit", function(e) {
    // const formData = new FormData(form);
    e.preventDefault();

submitBtn.addEventListener("click", (_) => {
    const form_items = formItemsWithRegex.map((form_item) => {
        const element = form_item[0];
        
        var valid_content = false;
        console.log(element.value);
        
        if (element.getAttribute("type") == "text") {
            const regex = form_item[1];
            valid_content = element.value.match(regex);
        } else if (element.getAttribute("type") == "checkbox") {
            valid_content = element.checked;
        } else {
            console.log("Error in trying to validate form");
        }
        
        return [form_item[0], valid_content];
    });

    const all_items_valid = form_items.every((x) => x[1]);
    if (all_items_valid) {
        sendEmail();
    } else {
        form_items.forEach((x) => {
            const element = x[0];
            const valid_content = x[1];

            if (valid_content) {
                disableErrorMessage(element);
            } else {
                enableErrorMessage(element);
            }
        });
        // checkInputs();
    }
});

