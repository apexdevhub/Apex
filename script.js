// Theme (dark / light)
const themeToggles = document.querySelectorAll('[data-theme-toggle]');

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('apex-theme', theme); } catch (e) {}
    themeToggles.forEach(btn => {
        btn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    });
}

function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem('apex-theme'); } catch (e) {}
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(saved || (prefersLight ? 'light' : 'dark'));
}

themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
});

initTheme();

// Intro screen: split curtain + logo click to proceed
(function() {
    const introScreen = document.getElementById('introScreen');
    const introLogo = document.getElementById('introLogo');

    if (!introScreen || !introLogo) return;

    // Prevent body scroll while intro is visible
    document.body.style.overflow = 'hidden';

    introLogo.addEventListener('click', () => {
        introScreen.classList.add('is-open');
        // After curtain animation completes, hide intro and reveal main content
        setTimeout(() => {
            introScreen.classList.add('is-gone');
            // Re-enable body scroll
            document.body.style.overflow = '';
        }, 1150);
    });

    // Allow pressing Enter/Space on the logo button to proceed
    introLogo.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            introLogo.click();
        }
    });
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Reveal on scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { root: null, threshold: 0.15, rootMargin: '0px' });

revealElements.forEach(el => revealObserver.observe(el));
