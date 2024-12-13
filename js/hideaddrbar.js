let lastScrollPosition = window.scrollY;
const navbar = document.querySelector('.navbar');
const threshold = 100; // Mindestscrollabstand bevor die Navbar sich versteckt

window.addEventListener('scroll', () => {
	const currentScrollPosition = window.scrollY;
	
	// Prüfen ob genug gescrollt wurde
	if (Math.abs(lastScrollPosition - currentScrollPosition) <= threshold) {
		return;
	}

	// Nach unten scrollen versteckt die Navbar
	if (currentScrollPosition > lastScrollPosition) {
		navbar.classList.add('hidden');
	} 
	// Nach oben scrollen zeigt die Navbar
	else {
		navbar.classList.remove('hidden');
	}

	lastScrollPosition = currentScrollPosition;
});