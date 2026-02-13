/* ================================================
   SCIENTIST TECHNOLOGIES — INTERACTIVE ENGINE
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Page Loader ----
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-ring"></div>';
    document.body.prepend(loader);

    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('loaded'), 400);
        setTimeout(() => loader.remove(), 1200);
    });

    // ---- Particle System ----
    initParticles();

    // ---- Scroll Animations ----
    initScrollAnimations();

    // ---- Navbar ----
    initNavbar();

    // ---- Cursor Glow ----
    initCursorGlow();

    // ---- Counter Animation ----
    initCounters();

    // ---- Card Tilt Effect ----
    initTiltEffect();

    // ---- Mobile Menu ----
    initMobileMenu();

    // ---- Contact Form ----
    initContactForm();

    // ---- Smooth Scroll ----
    initSmoothScroll();

    // ---- Magnetic Buttons ----
    initMagneticButtons();

    // ---- Text Reveal Animation ----
    initTextReveal();

    // ---- Theme Toggle ----
    initThemeToggle();

    // ---- Product Carousel ----
    initCarousel();
});

/* ================================================
   THEME TOGGLE
   ================================================ */
function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    const root = document.documentElement;
    const storedTheme = localStorage.getItem('theme');

    // Default to dark theme if no stored preference
    const currentTheme = storedTheme || 'dark';

    // Apply initial theme
    if (currentTheme === 'light') {
        root.setAttribute('data-theme', 'light');
        toggleBtn.classList.add('light');
    }

    toggleBtn.addEventListener('click', () => {
        const isLight = root.getAttribute('data-theme') === 'light';
        const newTheme = isLight ? 'dark' : 'light';

        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        toggleBtn.classList.toggle('light');
    });
}

/* ================================================
   PARTICLE SYSTEM
   ================================================ */
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: 0, y: 0 };
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.hue = Math.random() > 0.5 ? 165 : 258; // teal or purple
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Subtle mouse attraction
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
                this.x += dx * 0.002;
                this.y += dy * 0.002;
            }

            // Wrap around
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Initialize particles
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 15));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Draw connections
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    const opacity = (1 - dist / 150) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 245, 212, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        drawConnections();
        animationId = requestAnimationFrame(animate);
    }

    animate();

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
}

/* ================================================
   SCROLL ANIMATIONS (Intersection Observer)
   ================================================ */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/* ================================================
   NAVBAR
   ================================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Active nav link tracking
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => sectionObserver.observe(section));
}

/* ================================================
   CURSOR GLOW
   ================================================ */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.innerWidth < 768) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function animate() {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        glow.style.left = currentX + 'px';
        glow.style.top = currentY + 'px';
        requestAnimationFrame(animate);
    }

    animate();
}

/* ================================================
   COUNTER ANIMATION
   ================================================ */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out quart
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(eased * target);

        el.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

/* ================================================
   CARD TILT EFFECT
   ================================================ */
function initTiltEffect() {
    if (window.innerWidth < 768) return;

    const cards = document.querySelectorAll('.service-card-inner, .approach-card, .story-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/* ================================================
   MOBILE MENU
   ================================================ */
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    menu.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            btn.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ================================================
   CONTACT FORM
   ================================================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = '<span>Sending...</span>';
        btn.disabled = true;

        // Simulate sending
        setTimeout(() => {
            btn.innerHTML = '<span>✓ Message Sent!</span>';
            btn.style.background = 'linear-gradient(135deg, #00F5D4, #00B4D8)';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                btn.style.background = '';
                form.reset();
            }, 2500);
        }, 1500);
    });
}

/* ================================================
   SMOOTH SCROLL
   ================================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

/* ================================================
   MAGNETIC BUTTON EFFECT
   ================================================ */
function initMagneticButtons() {
    if (window.innerWidth < 768) return;

    const buttons = document.querySelectorAll('.btn-primary, .nav-cta');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

/* ================================================
   TEXT REVEAL ANIMATION
   ================================================ */
function initTextReveal() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const lines = heroTitle.querySelectorAll('.title-line');
    lines.forEach((line, i) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(30px)';
        line.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.15}s`;
    });

    // Trigger after loader
    setTimeout(() => {
        lines.forEach(line => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        });
    }, 600);

    // Hero elements stagger
    const heroElements = document.querySelectorAll('.hero-content .animate-on-scroll');
    heroElements.forEach((el, i) => {
        el.style.transitionDelay = `${0.6 + i * 0.15}s`;
        setTimeout(() => el.classList.add('visible'), 100);
    });
}

/* ================================================
   PARALLAX ON HERO ORBS
   ================================================ */
document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const orbs = document.querySelectorAll('.orb');

    orbs.forEach((orb, i) => {
        const speed = (i + 1) * 0.1;
        orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

/* ================================================
   NAV CTA / GET STARTED BUTTON
   ================================================ */
document.getElementById('navCta')?.addEventListener('click', () => {
    const contact = document.getElementById('contact');
    if (contact) {
        const offset = 80;
        const top = contact.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
});
function initCarousel() {
    const carousel = document.querySelector('.product-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector('.carousel-button--right');
    const prevButton = carousel.querySelector('.carousel-button--left');
    const dotsNav = carousel.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);

    if (slides.length === 0) return;

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    };

    const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
        if (targetIndex === 0) {
            prevButton.classList.add('is-hidden');
            nextButton.classList.remove('is-hidden');
        } else if (targetIndex === slides.length - 1) {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.add('is-hidden');
        } else {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.remove('is-hidden');
        }
    };

    // When I click left, move slides to the left
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide => slide === prevSlide);

        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
        hideShowArrows(slides, prevButton, nextButton, prevIndex);
    });

    // When I click right, move slides to the right
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide);

        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
        hideShowArrows(slides, prevButton, nextButton, nextIndex);
    });

    // When I click the nav indicators, move to that slide
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');

        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        hideShowArrows(slides, prevButton, nextButton, targetIndex);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, index) => {
            slide.style.left = newSlideWidth * index + 'px';
        });

        // Reset position to current slide
        const currentSlide = track.querySelector('.current-slide');
        // Re-apply transform
        if (currentSlide) {
            track.style.transform = 'translateX(-' + currentSlide.style.left + ')';
        }
    });
}
/* ================================================
   AI CHATBOT LOGIC
   ================================================ */
// Add to the main DOMContentLoaded listener or call it directly
function initChatbot() {
    const chatbot = document.getElementById('chatbot');
    const toggle = document.getElementById('chatbotToggle');
    const form = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');
    const body = document.getElementById('chatBody');
    const suggestions = document.querySelectorAll('.suggestion-chip');

    if (!chatbot || !toggle) return;

    // Toggle Chat
    toggle.addEventListener('click', () => {
        chatbot.classList.toggle('active');
        if (chatbot.classList.contains('active')) {
            setTimeout(() => input.focus(), 400);
        }
    });

    // Close on outside click (optional but premium feel)
    document.addEventListener('click', (e) => {
        if (!chatbot.contains(e.target) && chatbot.classList.contains('active')) {
            chatbot.classList.remove('active');
        }
    });

    // Handle Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = input.value.trim();
        if (msg) {
            handleUserMessage(msg);
            input.value = '';
        }
    });

    // Handle Suggestions
    suggestions.forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = chip.textContent;
            handleUserMessage(text);
        });
    });

    function handleUserMessage(text) {
        addMessage(text, 'user');

        // Show "thinking" state
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'chat-msg bot thinking';
        thinkingDiv.innerHTML = '<div class="msg-content">...</div>';
        body.appendChild(thinkingDiv);
        body.scrollTop = body.scrollHeight;

        // AI Response delay
        setTimeout(() => {
            thinkingDiv.remove();
            respondTo(text);
        }, 1200);
    }

    function addMessage(text, side) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg ' + side;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        msgDiv.innerHTML = `<div class="msg-content">${text}</div><span class="msg-time">${time}</span>`;
        body.appendChild(msgDiv);
        body.scrollTop = body.scrollHeight;
    }

    function respondTo(msg) {
        let response = "That's an interesting question! Let me check how Scientist Technologies can help with that.";

        const text = msg.toLowerCase();
        if (text.includes('ml') || text.includes('learning') || text.includes('services')) {
            response = "Our Machine Learning models range from predictive analytics to deep learning patterns for design automation. Would you like to see our case studies?";
        } else if (text.includes('urban')) {
            response = "Urban AI is our flagship traffic management product. It uses real-time computer vision to optimize city flow. You can find it in the products section above!";
        } else if (text.includes('contact') || text.includes('hi') || text.includes('hello')) {
            response = "Hello! I'm the Scientist AI assistant. You can contact our team at hello@scientisttechnologies.uk or via the contact form on this page.";
        } else if (text.includes('price') || text.includes('cost')) {
            response = "Every project is unique. Let's schedule a call to discuss your specific requirements and provide a tailored quote.";
        } else if (text.includes('who') || text.includes('team')) {
            response = "We are a team of world-class researchers and engineers led by our founder Anurag Pyriyadarshi. Check out the 'Brilliant Minds' section!";
        }

        addMessage(response, 'bot');
    }
}

initChatbot();
