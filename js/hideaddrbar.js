let lastScrollTop = 0;
const body = document.body;

// Haupt-Scroll-Event-Handler
body.addEventListener('scroll', function() {
	// Aktuelle Scroll-Position
	let scrollTop = body.scrollTop;
	
	// Scroll-Richtung ermitteln
	if (scrollTop > lastScrollTop) {
		// Nach unten scrollen - Navigation ausblenden
		document.documentElement.style.setProperty('overflow', 'hidden');
		document.body.style.setProperty('height', '100%');
		
		// Vollbild-Modus aktivieren
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		}
	} else {
		// Nach oben scrollen - Navigation wieder einblenden
		document.documentElement.style.removeProperty('overflow');
		document.body.style.removeProperty('height');
		
		// Vollbild-Modus beenden
		if (document.fullscreenElement) {
			document.exitFullscreen();
		}
	}
	
	lastScrollTop = scrollTop;
}, { passive: true });