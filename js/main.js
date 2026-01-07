// ============================================
// Website Ucapan Maaf - Main JavaScript
// ============================================

// Gallery Data with Messages
const galleryData = [
    {
        emoji: '🌸',
        category: 'Tulus',
        message: 'Maaf karena kadang aku lupa bilang betapa berartinya kamu di hidupku. Kamu bukan cuma pacar, kamu adalah rumahku.'
    },
    {
        emoji: '🎀',
        category: 'Lucu',
        message: 'Aku salah, tapi kan kamu suka aku yang bego ini? 🥺 Lagipula, siapa lagi yang mau sabar sama aku kalau bukan kamu?'
    },
    {
        emoji: '🌷',
        category: 'Manis',
        message: 'Kamu adalah alasan aku mau jadi lebih baik setiap hari. Bukan karena aku harus, tapi karena kamu layak dapat yang terbaik.'
    },
    {
        emoji: '💫',
        category: 'Tulus',
        message: 'Aku nggak sempurna, tapi perasaanku ke kamu itu sempurna. Maaf ya kalau kadang caraku salah.'
    },
    {
        emoji: '🎠',
        category: 'Lucu',
        message: 'Marah boleh, tapi jangan lama-lama ya. Nanti aku kangen terus gabisa tidur, besoknya kesiangan, terus banyak salah lagi 😭'
    },
    {
        emoji: '🍃',
        category: 'Manis',
        message: 'Kalau cinta punya warna, kamu adalah setiap warnanya. Yang paling cerah dan yang paling indah.'
    },
    {
        emoji: '🦋',
        category: 'Tulus',
        message: 'Terima kasih sudah sabar sama aku yang masih belajar ini. Aku janji akan terus berusaha jadi lebih baik untukmu.'
    },
    {
        emoji: '🌙',
        category: 'Manis',
        message: 'Dari semua kesalahanku, yang paling bener adalah pilih kamu. Dan aku akan terus pilih kamu, selamanya. 💕'
    }
];

// Current modal index
let currentIndex = 0;

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initFloatingHearts();
    initScrollAnimations();
    initGalleryCards();
    initModals();
    initCTAButton();
    initLoveButton();
    initKeyboardNavigation();
});

// ============================================
// Floating Hearts Background
// ============================================

function initFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    const hearts = ['💕', '💗', '💖', '🩷', '🤍', '💝'];

    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';

        container.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 20000);
    }

    // Create initial hearts
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createHeart(), i * 500);
    }

    // Keep creating hearts
    setInterval(createHeart, 3000);
}

// ============================================
// Scroll Animations
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe gallery cards with stagger
    const cards = document.querySelectorAll('.gallery-card');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe section headers
    const sections = document.querySelectorAll('#gallery, #final-message');
    sections.forEach(section => {
        section.classList.add('section-animate');
        observer.observe(section);
    });
}

// ============================================
// Gallery Cards
// ============================================

function initGalleryCards() {
    const cards = document.querySelectorAll('.gallery-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const index = parseInt(card.dataset.index);
            openModal(index);
        });
    });
}

// ============================================
// Modal System
// ============================================

function initModals() {
    // Gallery Modal
    const modal = document.getElementById('modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalClose = document.getElementById('modal-close');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');

    modalBackdrop.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', () => navigateModal(-1));
    modalNext.addEventListener('click', () => navigateModal(1));

    // CTA Modal
    const ctaModalBackdrop = document.getElementById('cta-modal-backdrop');
    const ctaModalClose = document.getElementById('cta-modal-close');

    ctaModalBackdrop.addEventListener('click', closeCTAModal);
    ctaModalClose.addEventListener('click', closeCTAModal);

    // Thank Modal
    const thankModalBackdrop = document.getElementById('thank-modal-backdrop');
    const thankModalClose = document.getElementById('thank-modal-close');

    thankModalBackdrop.addEventListener('click', closeThankModal);
    thankModalClose.addEventListener('click', closeThankModal);

    // Create dots indicator
    createDots();
}

function createDots() {
    const dotsContainer = document.getElementById('modal-dots');
    dotsContainer.innerHTML = '';

    galleryData.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (index === currentIndex ? ' active' : '');
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateModalContent();
        });
        dotsContainer.appendChild(dot);
    });
}

function openModal(index) {
    currentIndex = index;
    const modal = document.getElementById('modal');

    updateModalContent();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

function navigateModal(direction) {
    currentIndex = (currentIndex + direction + galleryData.length) % galleryData.length;
    updateModalContent();
}

function updateModalContent() {
    const data = galleryData[currentIndex];
    const emoji = document.getElementById('modal-emoji');
    const message = document.getElementById('modal-message');
    const modalImage = document.getElementById('modal-image');

    // Update gradient colors based on index
    const gradients = [
        'from-soft-rose to-lavender-mist',
        'from-primary-pink to-soft-rose',
        'from-lavender-mist to-primary-pink',
        'from-warm-blush to-soft-rose',
        'from-soft-rose to-warm-blush',
        'from-lavender-mist to-warm-blush',
        'from-primary-pink to-lavender-mist',
        'from-soft-rose to-primary-pink'
    ];

    // Animate transition
    emoji.style.opacity = '0';
    message.style.opacity = '0';

    setTimeout(() => {
        emoji.textContent = data.emoji;
        message.textContent = data.message;

        // Update gradient
        modalImage.className = `aspect-square bg-gradient-to-br ${gradients[currentIndex]} flex items-center justify-center transition-all duration-500`;

        emoji.style.opacity = '1';
        message.style.opacity = '1';
    }, 150);

    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// ============================================
// CTA Button & Modal
// ============================================

function initCTAButton() {
    const ctaButton = document.getElementById('cta-button');

    ctaButton.addEventListener('click', (e) => {
        // Create ripple effect
        createRipple(e, ctaButton);

        // Show confetti
        createConfetti();

        // Open CTA modal
        setTimeout(() => {
            openCTAModal();
        }, 300);
    });
}

function openCTAModal() {
    const modal = document.getElementById('cta-modal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCTAModal() {
    const modal = document.getElementById('cta-modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';

    // Scroll to gallery
    setTimeout(() => {
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// ============================================
// Love Button & Thank Modal
// ============================================

function initLoveButton() {
    const loveButton = document.getElementById('love-button');

    loveButton.addEventListener('click', (e) => {
        // Create ripple
        createRipple(e, loveButton);

        // Create heart explosion
        createHeartExplosion(e);

        // Open thank modal
        setTimeout(() => {
            openThankModal();
        }, 500);
    });
}

function openThankModal() {
    const modal = document.getElementById('thank-modal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Extra confetti for celebration
    createConfetti();
}

function closeThankModal() {
    const modal = document.getElementById('thank-modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

// ============================================
// Keyboard Navigation
// ============================================

function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('modal');
        const ctaModal = document.getElementById('cta-modal');
        const thankModal = document.getElementById('thank-modal');

        if (modal.classList.contains('open')) {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') navigateModal(-1);
            if (e.key === 'ArrowRight') navigateModal(1);
        }

        if (ctaModal.classList.contains('open') && e.key === 'Escape') {
            closeCTAModal();
        }

        if (thankModal.classList.contains('open') && e.key === 'Escape') {
            closeThankModal();
        }
    });
}

// ============================================
// Effects & Animations
// ============================================

function createRipple(e, button) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

function createConfetti() {
    const colors = ['#F8BBD9', '#FFDEE9', '#E8D5E7', '#FFE4EC', '#C97B8B'];
    const shapes = ['💕', '💗', '💖', '🩷', '✨', '💝'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('span');
            confetti.className = 'confetti-piece';
            confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';

            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

function createHeartExplosion(e) {
    const hearts = ['❤️', '💕', '💗', '💖', '💝'];
    const centerX = e.clientX;
    const centerY = e.clientY;

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '100';
        heart.style.transition = 'all 1s ease-out';

        document.body.appendChild(heart);

        // Random direction
        const angle = (i / 20) * Math.PI * 2;
        const distance = 100 + Math.random() * 100;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;

        requestAnimationFrame(() => {
            heart.style.left = endX + 'px';
            heart.style.top = endY + 'px';
            heart.style.opacity = '0';
            heart.style.transform = 'scale(1.5)';
        });

        setTimeout(() => heart.remove(), 1000);
    }
}

// ============================================
// Utility Functions
// ============================================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
