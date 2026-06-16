// ============================================
// COOKIE-BANNER - DSGVO-konform
// ============================================

// Prüfen, ob bereits eine Einwilligung vorliegt
function checkCookieConsent() {
    var consent = localStorage.getItem('cookieConsent');
    var banner = document.getElementById('cookieBanner');

    if (consent === null) {
        banner.classList.add('show');
        return false;
    }

    if (consent === 'accepted' || consent === 'analytics_only') {
        startGoogleAnalytics();
        banner.classList.remove('show');
        return true;
    }

    if (consent === 'declined') {
        banner.classList.remove('show');
        return true;
    }

    return false;
}

// Alle Cookies akzeptieren
function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookieBanner').classList.remove('show');
    startGoogleAnalytics();
}

// Einstellungen speichern
function saveSettings() {
    var analyticsChecked = document.getElementById('cookieAnalytics').checked;

    if (analyticsChecked) {
        localStorage.setItem('cookieConsent', 'analytics_only');
        startGoogleAnalytics();
    } else {
        localStorage.setItem('cookieConsent', 'declined');
    }

    document.getElementById('cookieBanner').classList.remove('show');
    document.getElementById('cookieSettings').classList.remove('open');
}

// Alle Cookies ablehnen
function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.getElementById('cookieBanner').classList.remove('show');
}

// Einstellungen-Panel ein-/ausblenden
function toggleSettings() {
    var panel = document.getElementById('cookieSettings');
    panel.classList.toggle('open');
}

// Google Analytics starten (nur bei Zustimmung)
function startGoogleAnalytics() {
    if (window.gaLoaded) return;
    window.gaLoaded = true;

    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    }
}

// Beim Laden der Seite prüfen
document.addEventListener('DOMContentLoaded', function() {
    checkCookieConsent();
});