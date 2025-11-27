// --- NAVIGATION LOGIC ---
function showPage(pageId) {
    // 1. Hide all pages
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // 2. Show the selected page
    document.getElementById(pageId).classList.add('active');

    // 3. Update Navigation Active State
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Try to find the specific link for this page
    const activeLink = document.getElementById('link-' + pageId);
    if(activeLink) activeLink.classList.add('active');

    // 4. Close mobile menu if open
    const navMenu = document.getElementById('navLinks');
    navMenu.classList.remove('active');
    
    // 5. Scroll to top instantly
    window.scrollTo(0, 0);
}

function toggleMenu() {
    const navMenu = document.getElementById('navLinks');
    navMenu.classList.toggle('active');
}

// --- AUDIO AUTOPLAY LOGIC ---
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('garden-ambience');
    const toggleBtn = document.querySelector('.sound-toggle');
    const iconMuted = document.getElementById('icon-muted');
    const iconPlaying = document.getElementById('icon-playing');

    // Function to update UI to playing state
    const setPlayingState = () => {
        toggleBtn.classList.add('playing');
        iconMuted.style.display = 'none';
        iconPlaying.style.display = 'block';
    };

    // Try to play immediately
    audio.play().then(setPlayingState).catch(error => {
        console.log("Autoplay prevented. Waiting for user interaction.");
        
        // If blocked, play on the first interaction (click/tap)
        const playOnInteraction = () => {
            audio.play().then(setPlayingState);
            // Remove listeners once played
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('keydown', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
        };

        document.addEventListener('click', playOnInteraction);
        document.addEventListener('keydown', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
    });
});

// --- SOUND TOGGLE LOGIC ---
function toggleSound() {
    const audio = document.getElementById('garden-ambience');
    const toggleBtn = document.querySelector('.sound-toggle');
    const iconMuted = document.getElementById('icon-muted');
    const iconPlaying = document.getElementById('icon-playing');

    if (audio.paused) {
        audio.play();
        toggleBtn.classList.add('playing');
        iconMuted.style.display = 'none';
        iconPlaying.style.display = 'block';
    } else {
        audio.pause();
        toggleBtn.classList.remove('playing');
        iconMuted.style.display = 'block';
        iconPlaying.style.display = 'none';
    }
}

// --- GLOBAL PETAL ANIMATION ---
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('global-petals');
    const numPetals = 30; // Number of background petals

    for (let i = 0; i < numPetals; i++) {
        const petal = document.createElement('div');
        petal.classList.add('global-petal');
        
        // Random properties
        const size = Math.random() * 15 + 8; // 8px to 23px
        const left = Math.random() * 100; // 0% to 100%
        const duration = Math.random() * 10 + 15; // 15s to 25s
        const delay = Math.random() * 20; // 0s to 20s
        const colors = ['#86147B', '#a32d96', '#ffffff', '#F3E9DC'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${left}%`;
        petal.style.backgroundColor = color;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `-${delay}s`; // Start midway

        container.appendChild(petal);
    }
});

// --- CLICK PETAL POP ANIMATION ---
function createPetals(e) {
    // Check if the clicked element is a button or inside a button
    const button = e.target.closest('.btn') || e.target.closest('.btn-nav');
    if (!button) return; // Only trigger for buttons

    // Get click coordinates relative to the viewport
    const centerX = e.clientX;
    const centerY = e.clientY;
    
    // We need to account for scroll position since we append to body
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    for (let i = 0; i < 12; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal-pop');
        
        // Random brand colors
        const colors = ['#86147B', '#a32d96', '#ffffff', '#F3E9DC', '#e5d5c5'];
        petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random spread logic
        const angle = Math.random() * Math.PI * 2; // Random direction
        const velocity = 30 + Math.random() * 60; // Random distance/speed
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        const rot = Math.random() * 360; // Random rotation

        // Set CSS Variables for the specific animation of this petal
        petal.style.setProperty('--tx', `${tx}px`);
        petal.style.setProperty('--ty', `${ty}px`);
        petal.style.setProperty('--rot', `${rot}deg`);
        
        // Position at cursor + scroll offset
        petal.style.left = `${centerX + scrollX}px`;
        petal.style.top = `${centerY + scrollY}px`;

        document.body.appendChild(petal);

        // Clean up DOM after animation ends
        setTimeout(() => petal.remove(), 1000);
    }
}

// Listen for clicks everywhere, but function filters for buttons
document.addEventListener('click', createPetals);