// ===== AOS INIT =====
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-cubic',
    offset: 40
});

// ===== TYPING EFFECT =====
const phrases = ['AI/ML Engineer', 'Data Scientist', 'Python Developer', 'Problem Solver'];
let idx = 0,
    charIdx = 0,
    isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
    const current = phrases[idx];
    if (!isDeleting) {
        typingEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2200);
            return;
        }
        setTimeout(typeEffect, 80);
    } else {
        typingEl.textContent = current.slice(0, charIdx);
        charIdx--;
        if (charIdx < 0) {
            isDeleting = false;
            charIdx = 0;
            idx = (idx + 1) % phrases.length;
            setTimeout(typeEffect, 400);
            return;
        }
        setTimeout(typeEffect, 50);
    }
}
typeEffect();

// ===== SKILL BARS (Intersection Observer) =====
const skillFills = document.querySelectorAll('.skill__bar-fill');

function animateBars(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const width = fill.getAttribute('data-width');
            fill.style.width = width + '%';
        }
    });
}

const barObserver = new IntersectionObserver(animateBars, {
    threshold: 0.3,
    rootMargin: '0px 0px -40px 0px'
});
skillFills.forEach(bar => barObserver.observe(bar));

// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('navOverlay');

function toggleNav() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleNav);
overlay.addEventListener('click', toggleNav);

// Close nav on link click
document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) toggleNav();
    });
});

// ===== RESUME DOWNLOAD =====
const downloadBtns = document.querySelectorAll('#downloadResumeBtn, #heroResumeBtn, #resumeNavBtn');

downloadBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Use full URL for GitHub Pages
        const resumeUrl = 'https://MdBilalNad.github.io/bilal-portfolio/assets/resume.pdf';
        
        // Check if it's a mobile device
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
            // On mobile, open in new tab
            window.open(resumeUrl, '_blank');
        } else {
            // On desktop, download
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.download = 'Mohammed_Bilal_Nadeem_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });
});

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const nav = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
        nav.style.background = 'rgba(11,13,21,0.92)';
        nav.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
    } else {
        nav.style.background = 'rgba(11,13,21,0.7)';
        nav.style.borderBottom = '1px solid rgba(255,255,255,0.04)';
    }
    lastScroll = currentScroll;
});

// ===== PARALLAX ORBS =====
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, i) => {
        const speed = 12 + i * 6;
        const moveX = (x - 0.5) * speed;
        const moveY = (y - 0.5) * speed;
        orb.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    });
});

console.log('Portfolio ready — Mohammed Bilal Nadeem');