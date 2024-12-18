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
    element.classList.add("error");
    element.parentElement.classList.add("error");
}

function disableErrorMessage(element) {
    element.classList.remove("error");
    element.parentElement.classList.remove("error");
}

const formItemsWithRegex = [
    [nameCust, /^[a-zA-ZäöüßÄÖÜ\s-]{2,}$/],
    [surnameCust, /^[a-zA-ZäöüßÄÖÜ\s-]{2,}$/],
    [emailCust, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
    [phoneCust, /^[\d\s+()-]{5,}$/],
    [subjectCust, /^[\wäöüßÄÖÜ\s-]{2,}$/],
    [messageCust, /^[\wäöüßÄÖÜ\s.,!?-]{2,}$/],
    [consentCust, / /] 
];

formItemsWithRegex.forEach(([element, regex]) => {
    if (!element) return;
    
    element.addEventListener("input", () => {
        let valid_content = false;
        
        if (element.getAttribute("type") === "text") {
            valid_content = regex.test(element.value);
        } else if (element.getAttribute("type") === "checkbox") {
            valid_content = element.checked;
        }
        
        if (valid_content) {
            disableErrorMessage(element);
        } else {
            enableErrorMessage(element);
        }
    });
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    const form_items = formItemsWithRegex.map((form_item) => {
        const element = form_item[0];
        
        // if (!element) return [null, false];
        
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
    }
});