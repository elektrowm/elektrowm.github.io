//========================================
//Submit Form
//========================================
const nameCust = document.getElementById("name");
const surnameCust = document.getElementById("surname");
const emailCust = document.getElementById("email");
const phoneCust = document.getElementById("phone");
const subjectCust = document.getElementById("subject");
const messageCust = document.getElementById("message");

const consentCust = document.getElementById("consent");
const submitBtn = document.getElementById("submit");
const form = document.getElementById('form');
const result = document.getElementById('result');

function sendEmail() {
    const formData = {
        access_key: "f1493a87-edde-49dd-bd80-f8cb9048c732",
        Vorname: nameCust.value,
        Nachname: surnameCust.value,
        Email: emailCust.value,
        Telefon: phoneCust.value,
        Anliegen: subjectCust.value,
        Nachricht: messageCust.value,
    };

    result.innerHTML = "Bitte warten...";
    result.style.display = "block";

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Ihre Nachricht wurde erfolgreich gesendet!";
            } else {
                console.log(response);
                result.innerHTML = `Ein Fehler ist aufgetreten: ${json.message || 'Bitte versuchen Sie es erneut.'}`;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Etwas ist schief gelaufen! Bitte versuchen Sie es später erneut.";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
}

function enableErrorMessage(element) {
    // Für Checkboxen
    if (element.getAttribute("type") === "checkbox") {
        element.closest('.consent-field').classList.add("error");
    } else {
        // Für Textfelder
        element.classList.add("error");
        element.parentElement.classList.add("error");
    }
}

function disableErrorMessage(element) {
    // Für Checkboxen
    if (element.getAttribute("type") === "checkbox") {
        element.closest('.consent-field').classList.remove("error");
    } else {
        // Für Textfelder
        element.classList.remove("error");
        element.parentElement.classList.remove("error");
    }
}

// Für Textfelder: Regex-Validierung
const textFieldsWithRegex = [
    [nameCust, /^[a-zA-ZäöüßÄÖÜ\s-]{2,}$/],
    [surnameCust, /^[a-zA-ZäöüßÄÖÜ\s-]{2,}$/],
    [emailCust, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
    [phoneCust, /^[\d\s+()-]{5,}$/],
    [subjectCust, /^[\s\S]{2,}$/],
    [messageCust, /^[\s\S]{2,}$/]
];

// Event-Listener für Textfelder (input-Event)
textFieldsWithRegex.forEach(([element, regex]) => {
    if (!element) return;
    
    element.addEventListener("input", () => {
        if (regex.test(element.value)) {
            disableErrorMessage(element);
        } else {
            enableErrorMessage(element);
        }
    });
});

// Event-Listener für Checkbox (change-Event)
if (consentCust) {
    consentCust.addEventListener("change", () => {
        if (consentCust.checked) {
            disableErrorMessage(consentCust);
        } else {
            enableErrorMessage(consentCust);
        }
    });
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    let allValid = true;
    
    // Textfelder validieren
    textFieldsWithRegex.forEach(([element, regex]) => {
        if (!regex.test(element.value)) {
            enableErrorMessage(element);
            allValid = false;
        } else {
            disableErrorMessage(element);
        }
    });
    
    // Checkbox validieren
    if (!consentCust.checked) {
        enableErrorMessage(consentCust);
        allValid = false;
    } else {
        disableErrorMessage(consentCust);
    }
    
    if (allValid) {
        sendEmail();
    }
});