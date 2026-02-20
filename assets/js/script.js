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

    // ---- Timeline Slider ----
    initTimelineSlider();

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
            // Check current theme
            const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            
            // Light theme: teal particles matching theme color
            // Dark theme: lighter, glowing teal/purple colors
            if (isLightTheme) {
                // Use teal color for light theme
                ctx.fillStyle = `rgba(21, 194, 177, ${this.opacity * 2.5})`;
            } else {
                ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${this.opacity})`;
            }
            
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
        // Check current theme
        const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    const baseOpacity = (1 - dist / 150);
                    // Light theme: teal color matching theme with high opacity
                    // Dark theme: lighter teal/cyan with lower opacity
                    const opacity = isLightTheme ? baseOpacity * 0.5 : baseOpacity * 0.15;
                    const color = isLightTheme ? `rgba(21, 194, 177, ${opacity})` : `rgba(0, 245, 212, ${opacity})`;
                    
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = color;
                    ctx.lineWidth = isLightTheme ? 1.5 : 0.5;
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
   MAGNETIC BUTTON EFFECT - DISABLED
   ================================================ */
function initMagneticButtons() {
    // Disabled to prevent button movement on hover
    return;
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

/* ================================================
   TEAM STICKY SCROLL EFFECT
   ================================================ */
function initTeamStickyScroll() {
    const teamSection = document.querySelector('.team-section');
    const stickyWrapper = document.querySelector('.team-sticky-wrapper');
    const teamCards = document.querySelectorAll('.team-card');
    
    if (!teamSection || !stickyWrapper || teamCards.length === 0) return;

    // Skip on mobile
    if (window.innerWidth < 768) return;

    let isAnimating = false;

    function handleScroll() {
        if (isAnimating) return;
        
        const rect = stickyWrapper.getBoundingClientRect();
        const wrapperTop = rect.top;
        const wrapperHeight = rect.height;
        const viewportHeight = window.innerHeight;
        
        // Calculate scroll progress through the section (0 to 1)
        const scrollProgress = Math.max(0, Math.min(1, -wrapperTop / (wrapperHeight - viewportHeight)));
        
        // Animate cards based on scroll progress
        teamCards.forEach((card, index) => {
            const cardStart = index / teamCards.length;
            const cardEnd = (index + 1) / teamCards.length;
            
            // Calculate individual card progress
            let cardProgress = (scrollProgress - cardStart) / (cardEnd - cardStart);
            cardProgress = Math.max(0, Math.min(1, cardProgress));
            
            // Apply transforms
            if (cardProgress > 0) {
                const translateY = (1 - cardProgress) * 60;
                const opacity = cardProgress;
                const scale = 0.9 + (cardProgress * 0.1);
                
                card.style.opacity = opacity;
                card.style.transform = `translateY(${translateY}px) scale(${scale})`;
            } else {
                card.style.opacity = 0;
                card.style.transform = 'translateY(60px) scale(0.9)';
            }
        });
    }

    // Throttle scroll events for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial check
    handleScroll();
}

/* ================================================
   LEAFLET MAP WITH DEPLOYMENT PINS
   ================================================ */
function initDeploymentMap() {
    const mapContainer = document.getElementById('indiaDeploymentMap');
    if (!mapContainer) return;

    // Initialize map centered on India
    const map = L.map('indiaDeploymentMap', {
        center: [22.5937, 78.9629],
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: true
    });

    // Add dark-themed tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Custom pin icon with gold color
    const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
            <div style="position: relative;">
                <div style="position: absolute; width: 30px; height: 30px; background: rgba(254, 209, 107, 0.3); border-radius: 50%; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
                <svg width="30" height="40" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C7.03 0 3 4.03 3 9C3 15.25 12 26 12 26S21 15.25 21 9C21 4.03 16.97 0 12 0Z" fill="#fed16b"/>
                    <circle cx="12" cy="9" r="4" fill="#222222"/>
                </svg>
            </div>
        `,
        iconSize: [30, 40],
        iconAnchor: [15, 40],
        popupAnchor: [0, -40]
    });

    // Deployment locations
    const locations = [
        {
            name: 'Bangalore',
            state: 'Karnataka',
            coords: [12.9716, 77.5946],
            sites: 15,
            description: 'Major deployment hub with 15+ active sites'
        },
        {
            name: 'Hyderabad',
            state: 'Telangana',
            coords: [17.3850, 78.4867],
            sites: 12,
            description: 'Strategic location with 12+ installations'
        },
        {
            name: 'Guwahati',
            state: 'Assam',
            coords: [26.1445, 91.7362],
            sites: 8,
            description: 'Northeast operations with 8+ sites'
        },
        {
            name: 'Patna',
            state: 'Bihar',
            coords: [25.5941, 85.1376],
            sites: 10,
            description: 'Growing presence with 10+ locations'
        }
    ];

    // Add markers for each location
    locations.forEach(location => {
        const marker = L.marker(location.coords, { icon: customIcon }).addTo(map);
        
        // Popup content with styled HTML
        const popupContent = `
            <div style="font-family: var(--font-primary); min-width: 200px;">
                <h3 style="color: #fed16b; font-size: 1.1rem; margin: 0 0 8px 0; font-weight: 600;">${location.name}</h3>
                <p style="color: #a0a0a0; font-size: 0.85rem; margin: 0 0 8px 0;">${location.state}</p>
                <p style="color: #e0e0e0; font-size: 0.9rem; margin: 0 0 8px 0;">${location.description}</p>
                <div style="display: flex; align-items: center; gap: 8px; padding-top: 8px; border-top: 1px solid rgba(254, 209, 107, 0.3);">
                    <span style="color: #fed16b; font-size: 1.2rem; font-weight: 700;">${location.sites}</span>
                    <span style="color: #a0a0a0; font-size: 0.8rem;">Active Sites</span>
                </div>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        
        // Hover effect
        marker.on('mouseover', function() {
            this.openPopup();
        });
    });

    // Add CSS animation for ping effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ping {
            75%, 100% {
                transform: scale(2);
                opacity: 0;
            }
        }
        .custom-map-pin {
            background: none !important;
            border: none !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for carousel to be ready
    setTimeout(initDeploymentMap, 1000);
});


/* ================================================
   TIMELINE SLIDER
   ================================================ */
const timelineSlider = {
    currentIndex: 0,
    slides: null,
    track: null,
    dots: null,
    pathContainer: null,
    currentSlideEl: null,
    totalSlidesEl: null,
    autoSlideInterval: null,
    autoSlideDelay: 5000,
    
    init() {
        this.track = document.querySelector('.timeline-track');
        this.slides = document.querySelectorAll('.timeline-slide');
        this.dots = document.querySelectorAll('.timeline-dot-nav');
        this.pathContainer = document.querySelector('.timeline-path-container');
        this.currentSlideEl = document.getElementById('currentSlide');
        this.totalSlidesEl = document.getElementById('totalSlides');
        
        if (!this.track || this.slides.length === 0) return;
        
        // Update total slides
        if (this.totalSlidesEl) {
            this.totalSlidesEl.textContent = this.slides.length;
        }
        
        // Setup hover pause
        const sliderWrapper = document.querySelector('.timeline-slider-wrapper');
        if (sliderWrapper) {
            sliderWrapper.addEventListener('mouseenter', () => this.stopAutoSlide());
            sliderWrapper.addEventListener('mouseleave', () => this.startAutoSlide());
        }
        
        // Start auto-slide
        this.startAutoSlide();
        this.updateSlider();
    },
    
    updateSlider() {
        // Move track
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        
        // Move continuous path to show relevant section
        if (this.pathContainer) {
            this.pathContainer.style.transform = `translateX(-${this.currentIndex * 25}%)`;
        }
        
        // Update current slide number
        if (this.currentSlideEl) {
            this.currentSlideEl.textContent = this.currentIndex + 1;
        }
        
        // Update dots
        this.dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Update active slide
        this.slides.forEach((slide, index) => {
            if (index === this.currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    },
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlider();
        this.stopAutoSlide();
        this.startAutoSlide();
    },
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
        this.stopAutoSlide();
        this.startAutoSlide();
    },
    
    goTo(index) {
        this.currentIndex = index;
        this.updateSlider();
        this.stopAutoSlide();
        this.startAutoSlide();
    },
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => this.next(), this.autoSlideDelay);
    },
    
    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
    }
};

function initTimelineSlider() {
    timelineSlider.init();
}


/* ================================================
   CONTACT PAGE CHATBOT (Available on all pages)
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = document.getElementById('chatbot');
    const toggle = document.getElementById('chatbotToggle');
    const minimizeBtn = document.getElementById('chatbotMinimize');
    const closeBtn = document.getElementById('chatbotClose');
    
    if (!chatbot || !toggle) return;
    
    // Toggle button - show chatbot
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        chatbot.classList.add('active');
        toggle.classList.add('hidden');
    });
    
    // Minimize button - hide chatbot, show toggle
    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            chatbot.classList.remove('active');
            toggle.classList.remove('hidden');
        });
    }
    
    // Close button - hide chatbot, show toggle
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            chatbot.classList.remove('active');
            toggle.classList.remove('hidden');
        });
    }
    
    // Prevent chatbot from closing when clicking inside it
    chatbot.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});


/* ================================================
   CASE STUDY DYNAMIC CONTENT
   ================================================ */

// Project Data
const projectData = {
    'ai-diagnostic': {
        title: 'AI-Powered Medical Diagnostics',
        hero: {
            subtitle: 'Revolutionizing Healthcare with Deep Learning',
            metrics: [
                { label: 'Accuracy', value: '95%', icon: '🎯' },
                { label: 'Time Saved', value: '60%', icon: '⏱️' },
                { label: 'Patients Served', value: '50K+', icon: '👥' }
            ]
        },
        summary: {
            client: 'Global Healthcare Network',
            industry: 'Healthcare',
            technologies: ['TensorFlow', 'PyTorch', 'Computer Vision', 'Deep Learning'],
            duration: '8 months',
            teamSize: '6 engineers'
        },
        problem: {
            description: 'Medical imaging analysis was time-consuming and prone to human error, with radiologists spending 2-3 hours per case. The healthcare network faced a critical shortage of specialized radiologists while dealing with increasing patient volumes.',
            painPoints: [
                'Manual analysis taking 2-3 hours per case',
                'High false negative rates in early detection',
                'Shortage of specialized radiologists',
                'Inconsistent diagnostic quality across facilities'
            ]
        },
        solution: {
            approach: 'We developed a deep learning system using convolutional neural networks trained on over 1 million medical images. The system provides real-time analysis with explainable AI features to assist radiologists in making faster, more accurate diagnoses.',
            steps: [
                { title: 'Data Collection', description: 'Gathered and annotated 1M+ medical images from multiple sources', duration: '2 months' },
                { title: 'Model Training', description: 'Trained ensemble of CNN models with transfer learning', duration: '3 months' },
                { title: 'Validation', description: 'Clinical validation with 100+ radiologists across 20 facilities', duration: '2 months' },
                { title: 'Deployment', description: 'Cloud-based deployment with HIPAA compliance', duration: '1 month' }
            ],
            techStack: ['TensorFlow 2.x', 'Python 3.9', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL']
        },
        results: {
            metrics: [
                { label: 'Diagnostic Accuracy', before: '78%', after: '95%', improvement: '+17%' },
                { label: 'Analysis Time', before: '2.5 hrs', after: '15 min', improvement: '-94%' },
                { label: 'Cost per Diagnosis', before: '$250', after: '$50', improvement: '-80%' }
            ],
            impact: 'Processed over 50,000 patient cases with 95% accuracy, reducing diagnostic time by 94% and enabling early detection of critical conditions. The system is now deployed across 20 healthcare facilities, serving millions of patients annually.'
        },
        technical: {
            architecture: 'Microservices architecture with containerized ML models, real-time inference pipeline, and distributed training infrastructure. HIPAA-compliant data handling with end-to-end encryption.',
            features: [
                'Real-time image processing pipeline',
                'Multi-model ensemble for improved accuracy',
                'HIPAA-compliant data handling',
                'Explainable AI with attention maps',
                'Automated quality assurance checks',
                'Integration with existing PACS systems'
            ]
        }
    },
    'fraud-detection': {
        title: 'Real-Time Fraud Detection System',
        hero: {
            subtitle: 'Protecting Financial Transactions with Machine Learning',
            metrics: [
                { label: 'Fraud Reduction', value: '78%', icon: '🛡️' },
                { label: 'Response Time', value: '<100ms', icon: '⚡' },
                { label: 'Transactions/Day', value: '10M+', icon: '💳' }
            ]
        },
        summary: {
            client: 'Major Financial Institution',
            industry: 'Finance',
            technologies: ['Scikit-learn', 'XGBoost', 'Apache Kafka', 'Real-time ML'],
            duration: '6 months',
            teamSize: '5 engineers'
        },
        problem: {
            description: 'The financial institution was losing millions annually to fraudulent transactions. Traditional rule-based systems had high false positive rates and couldn\'t adapt to evolving fraud patterns.',
            painPoints: [
                'Annual fraud losses exceeding $50M',
                'High false positive rate (15%) causing customer friction',
                'Rule-based system unable to detect new fraud patterns',
                'Manual review process taking 24-48 hours'
            ]
        },
        solution: {
            approach: 'Built a real-time machine learning system using ensemble methods and anomaly detection. The system processes transactions in under 100ms and continuously learns from new fraud patterns.',
            steps: [
                { title: 'Data Analysis', description: 'Analyzed 5 years of transaction data and fraud patterns', duration: '1 month' },
                { title: 'Model Development', description: 'Developed ensemble ML models with feature engineering', duration: '2 months' },
                { title: 'Real-time Pipeline', description: 'Built streaming data pipeline with Kafka', duration: '2 months' },
                { title: 'Production Deployment', description: 'Deployed with A/B testing and monitoring', duration: '1 month' }
            ],
            techStack: ['Python', 'XGBoost', 'Apache Kafka', 'Redis', 'PostgreSQL', 'Docker']
        },
        results: {
            metrics: [
                { label: 'Fraud Detection Rate', before: '65%', after: '92%', improvement: '+27%' },
                { label: 'False Positive Rate', before: '15%', after: '3%', improvement: '-80%' },
                { label: 'Annual Savings', before: '$0', after: '$39M', improvement: '+$39M' }
            ],
            impact: 'Reduced fraud losses by 78% while improving customer experience through 80% reduction in false positives. The system now processes over 10 million transactions daily with sub-100ms latency.'
        },
        technical: {
            architecture: 'Event-driven microservices with real-time streaming pipeline. Ensemble ML models deployed with feature store and model versioning.',
            features: [
                'Real-time transaction scoring',
                'Adaptive learning from new fraud patterns',
                'Multi-model ensemble approach',
                'Feature store for consistent features',
                'A/B testing framework',
                'Comprehensive monitoring and alerting'
            ]
        }
    },
    'recommendation-system': {
        title: 'Personalized Recommendation Engine',
        hero: {
            subtitle: 'Driving E-commerce Growth with AI',
            metrics: [
                { label: 'Conversion Rate', value: '+45%', icon: '📈' },
                { label: 'Revenue Increase', value: '+32%', icon: '💰' },
                { label: 'User Engagement', value: '+67%', icon: '👤' }
            ]
        },
        summary: {
            client: 'Leading E-commerce Platform',
            industry: 'Retail',
            technologies: ['Collaborative Filtering', 'NLP', 'Deep Learning', 'Apache Spark'],
            duration: '5 months',
            teamSize: '4 engineers'
        },
        problem: {
            description: 'The e-commerce platform had generic product recommendations that didn\'t resonate with users, leading to low conversion rates and poor user engagement.',
            painPoints: [
                'Generic recommendations with low click-through rates',
                'Poor personalization leading to cart abandonment',
                'Inability to handle cold-start problem for new users',
                'Slow recommendation generation affecting page load times'
            ]
        },
        solution: {
            approach: 'Implemented a hybrid recommendation system combining collaborative filtering, content-based filtering, and deep learning. The system provides real-time personalized recommendations based on user behavior, preferences, and contextual signals.',
            steps: [
                { title: 'Data Pipeline', description: 'Built data pipeline for user behavior and product catalog', duration: '1 month' },
                { title: 'Model Development', description: 'Developed hybrid recommendation models', duration: '2 months' },
                { title: 'A/B Testing', description: 'Extensive A/B testing with user segments', duration: '1 month' },
                { title: 'Scale & Optimize', description: 'Optimized for real-time performance at scale', duration: '1 month' }
            ],
            techStack: ['Python', 'TensorFlow', 'Apache Spark', 'Redis', 'Elasticsearch', 'AWS']
        },
        results: {
            metrics: [
                { label: 'Click-Through Rate', before: '2.1%', after: '5.8%', improvement: '+176%' },
                { label: 'Conversion Rate', before: '1.8%', after: '2.6%', improvement: '+45%' },
                { label: 'Average Order Value', before: '$45', after: '$62', improvement: '+38%' }
            ],
            impact: 'Increased revenue by 32% through personalized recommendations. User engagement improved by 67%, with customers spending more time on the platform and discovering products they love.'
        },
        technical: {
            architecture: 'Hybrid recommendation system with real-time and batch processing pipelines. Feature engineering with user embeddings and product embeddings.',
            features: [
                'Hybrid collaborative and content-based filtering',
                'Deep learning for user and item embeddings',
                'Real-time recommendation serving',
                'Cold-start handling for new users',
                'Context-aware recommendations',
                'Multi-armed bandit for exploration'
            ]
        }
    },
    'urban-traffic': {
        title: 'Urban Traffic Optimization',
        hero: {
            subtitle: 'Smart City Solutions with Computer Vision',
            metrics: [
                { label: 'Congestion Reduced', value: '35%', icon: '🚦' },
                { label: 'Travel Time Saved', value: '22%', icon: '⏰' },
                { label: 'Intersections', value: '150+', icon: '🛣️' }
            ]
        },
        summary: {
            client: 'Metropolitan City Council',
            industry: 'Transportation',
            technologies: ['Computer Vision', 'YOLO', 'Edge Computing', 'IoT'],
            duration: '10 months',
            teamSize: '8 engineers'
        },
        problem: {
            description: 'The city faced severe traffic congestion with outdated fixed-timing traffic signals. Manual traffic monitoring was inefficient and couldn\'t adapt to real-time conditions.',
            painPoints: [
                'Fixed traffic signal timing causing unnecessary delays',
                'No real-time visibility into traffic conditions',
                'High accident rates at busy intersections',
                'Inability to respond to incidents quickly'
            ]
        },
        solution: {
            approach: 'Deployed computer vision system at 150+ intersections using edge computing. Real-time vehicle detection and tracking enables adaptive traffic signal control based on actual traffic flow.',
            steps: [
                { title: 'Pilot Deployment', description: 'Deployed at 10 intersections for proof of concept', duration: '2 months' },
                { title: 'Model Training', description: 'Trained custom YOLO models for vehicle detection', duration: '3 months' },
                { title: 'Edge Infrastructure', description: 'Set up edge computing infrastructure', duration: '3 months' },
                { title: 'City-wide Rollout', description: 'Scaled to 150+ intersections', duration: '2 months' }
            ],
            techStack: ['Python', 'YOLO v5', 'OpenCV', 'NVIDIA Jetson', 'MQTT', 'TimescaleDB']
        },
        results: {
            metrics: [
                { label: 'Traffic Congestion', before: '100%', after: '65%', improvement: '-35%' },
                { label: 'Average Travel Time', before: '45 min', after: '35 min', improvement: '-22%' },
                { label: 'Accident Rate', before: '12/month', after: '7/month', improvement: '-42%' }
            ],
            impact: 'Reduced traffic congestion by 35% and saved commuters an average of 10 minutes per trip. The system now monitors 150+ intersections in real-time, improving traffic flow and reducing accidents.'
        },
        technical: {
            architecture: 'Edge computing architecture with distributed computer vision models. Real-time data processing with MQTT messaging and centralized analytics.',
            features: [
                'Real-time vehicle detection and tracking',
                'Adaptive traffic signal control',
                'Incident detection and alerting',
                'Traffic flow analytics dashboard',
                'Edge computing for low latency',
                'Integration with city traffic management system'
            ]
        }
    },
    'medical-nlp': {
        title: 'Medical Records NLP System',
        hero: {
            subtitle: 'Automating Clinical Documentation with NLP',
            metrics: [
                { label: 'Time Saved', value: '70%', icon: '⏱️' },
                { label: 'Accuracy', value: '93%', icon: '✓' },
                { label: 'Records Processed', value: '1M+', icon: '📄' }
            ]
        },
        summary: {
            client: 'Healthcare Provider Network',
            industry: 'Healthcare',
            technologies: ['NLP', 'BERT', 'Named Entity Recognition', 'Python'],
            duration: '7 months',
            teamSize: '5 engineers'
        },
        problem: {
            description: 'Healthcare providers spent hours manually extracting and coding information from unstructured medical records, leading to delays in patient care and billing.',
            painPoints: [
                'Manual data extraction taking 30+ minutes per record',
                'High error rates in medical coding',
                'Delayed insurance claims processing',
                'Inconsistent data quality across facilities'
            ]
        },
        solution: {
            approach: 'Built an NLP system using transformer models to automatically extract medical entities, diagnoses, procedures, and medications from unstructured clinical notes. The system integrates with existing EHR systems.',
            steps: [
                { title: 'Data Preparation', description: 'Annotated 50K+ medical records for training', duration: '2 months' },
                { title: 'Model Development', description: 'Fine-tuned BERT models for medical NER', duration: '2 months' },
                { title: 'Integration', description: 'Integrated with EHR systems and workflows', duration: '2 months' },
                { title: 'Validation', description: 'Clinical validation and compliance review', duration: '1 month' }
            ],
            techStack: ['Python', 'Transformers', 'spaCy', 'FastAPI', 'PostgreSQL', 'Docker']
        },
        results: {
            metrics: [
                { label: 'Processing Time', before: '30 min', after: '9 min', improvement: '-70%' },
                { label: 'Coding Accuracy', before: '85%', after: '93%', improvement: '+8%' },
                { label: 'Claims Processing', before: '14 days', after: '3 days', improvement: '-79%' }
            ],
            impact: 'Processed over 1 million medical records with 93% accuracy, saving clinicians 70% of documentation time. Accelerated insurance claims processing from 14 days to 3 days.'
        },
        technical: {
            architecture: 'Microservices architecture with transformer-based NLP models. RESTful API for EHR integration with HIPAA-compliant data handling.',
            features: [
                'Medical named entity recognition',
                'ICD-10 and CPT code suggestion',
                'Medication extraction and normalization',
                'Clinical note summarization',
                'HIPAA-compliant processing',
                'EHR system integration'
            ]
        }
    },
    'quality-control': {
        title: 'Automated Quality Control Vision',
        hero: {
            subtitle: 'Manufacturing Excellence with Computer Vision',
            metrics: [
                { label: 'Defect Detection', value: '99.2%', icon: '🔍' },
                { label: 'Inspection Speed', value: '10x', icon: '⚡' },
                { label: 'Cost Savings', value: '$2.5M', icon: '💰' }
            ]
        },
        summary: {
            client: 'Automotive Manufacturer',
            industry: 'Manufacturing',
            technologies: ['Computer Vision', 'Deep Learning', 'Edge AI', 'PyTorch'],
            duration: '9 months',
            teamSize: '6 engineers'
        },
        problem: {
            description: 'Manual quality inspection was slow, inconsistent, and couldn\'t keep up with production speeds. Human inspectors missed subtle defects, leading to costly recalls.',
            painPoints: [
                'Manual inspection bottleneck slowing production',
                'Inconsistent defect detection across shifts',
                'High false negative rate (missed defects)',
                'Costly product recalls due to quality issues'
            ]
        },
        solution: {
            approach: 'Deployed computer vision system with deep learning models for automated defect detection. The system inspects 100% of products at production speed with higher accuracy than human inspectors.',
            steps: [
                { title: 'Data Collection', description: 'Collected 100K+ images of products and defects', duration: '2 months' },
                { title: 'Model Training', description: 'Trained CNN models for defect classification', duration: '3 months' },
                { title: 'Production Integration', description: 'Integrated with production line systems', duration: '3 months' },
                { title: 'Optimization', description: 'Optimized for real-time performance', duration: '1 month' }
            ],
            techStack: ['PyTorch', 'OpenCV', 'NVIDIA Triton', 'Python', 'PLC Integration', 'InfluxDB']
        },
        results: {
            metrics: [
                { label: 'Defect Detection Rate', before: '92%', after: '99.2%', improvement: '+7.2%' },
                { label: 'Inspection Time', before: '30 sec', after: '3 sec', improvement: '-90%' },
                { label: 'Annual Savings', before: '$0', after: '$2.5M', improvement: '+$2.5M' }
            ],
            impact: 'Achieved 99.2% defect detection accuracy while inspecting products 10x faster. Reduced product recalls by 85% and saved $2.5M annually in quality-related costs.'
        },
        technical: {
            architecture: 'Edge AI deployment with real-time inference. Integration with PLC systems for automated sorting and rejection.',
            features: [
                'Real-time defect detection and classification',
                'Multi-camera inspection system',
                'Automated product sorting',
                'Defect analytics dashboard',
                'Integration with MES systems',
                'Continuous model improvement pipeline'
            ]
        }
    },
    'sentiment-analysis': {
        title: 'Social Media Sentiment Analysis',
        hero: {
            subtitle: 'Market Intelligence with NLP',
            metrics: [
                { label: 'Accuracy', value: '91%', icon: '🎯' },
                { label: 'Posts Analyzed', value: '5M/day', icon: '📊' },
                { label: 'Languages', value: '12', icon: '🌍' }
            ]
        },
        summary: {
            client: 'Investment Firm',
            industry: 'Finance',
            technologies: ['NLP', 'Transformers', 'Apache Spark', 'Real-time Analytics'],
            duration: '6 months',
            teamSize: '5 engineers'
        },
        problem: {
            description: 'The investment firm needed real-time market sentiment analysis from social media and news to inform trading decisions, but manual monitoring was impossible at scale.',
            painPoints: [
                'Overwhelming volume of social media data',
                'Inability to detect sentiment shifts in real-time',
                'Missing critical market-moving information',
                'No multilingual sentiment analysis capability'
            ]
        },
        solution: {
            approach: 'Built a real-time sentiment analysis platform using transformer models. The system processes millions of social media posts and news articles daily, providing sentiment scores and trend detection across 12 languages.',
            steps: [
                { title: 'Data Pipeline', description: 'Built streaming pipeline for social media and news', duration: '1.5 months' },
                { title: 'Model Development', description: 'Trained multilingual sentiment models', duration: '2 months' },
                { title: 'Analytics Platform', description: 'Built real-time analytics dashboard', duration: '2 months' },
                { title: 'Integration', description: 'Integrated with trading systems', duration: '0.5 months' }
            ],
            techStack: ['Python', 'Transformers', 'Apache Spark', 'Kafka', 'Elasticsearch', 'React']
        },
        results: {
            metrics: [
                { label: 'Sentiment Accuracy', before: '75%', after: '91%', improvement: '+16%' },
                { label: 'Detection Speed', before: '2 hours', after: '5 min', improvement: '-96%' },
                { label: 'Trading Alpha', before: '0%', after: '12%', improvement: '+12%' }
            ],
            impact: 'Analyzes 5 million social media posts daily across 12 languages with 91% accuracy. Provides real-time market sentiment insights that contribute to 12% trading alpha.'
        },
        technical: {
            architecture: 'Streaming data pipeline with distributed NLP processing. Real-time analytics with Elasticsearch and interactive dashboards.',
            features: [
                'Real-time sentiment analysis',
                'Multilingual support (12 languages)',
                'Trend detection and alerting',
                'Entity and topic extraction',
                'Historical sentiment tracking',
                'Integration with trading platforms'
            ]
        }
    },
    'smart-checkout': {
        title: 'Smart Checkout System',
        hero: {
            subtitle: 'Cashier-less Retail with Computer Vision',
            metrics: [
                { label: 'Wait Time Reduced', value: '60%', icon: '⏱️' },
                { label: 'Accuracy', value: '98%', icon: '✓' },
                { label: 'Customer Satisfaction', value: '+85%', icon: '😊' }
            ]
        },
        summary: {
            client: 'Retail Chain',
            industry: 'Retail',
            technologies: ['Computer Vision', 'Deep Learning', 'Edge Computing', 'IoT'],
            duration: '8 months',
            teamSize: '7 engineers'
        },
        problem: {
            description: 'Long checkout lines were causing customer frustration and lost sales. The retail chain needed a solution to reduce wait times while maintaining accuracy.',
            painPoints: [
                'Average checkout wait time of 8 minutes',
                'Lost sales due to abandoned carts',
                'High labor costs for checkout staff',
                'Poor customer experience during peak hours'
            ]
        },
        solution: {
            approach: 'Implemented a cashier-less checkout system using computer vision and weight sensors. Customers simply pick up items and walk out, with automatic billing through their mobile app.',
            steps: [
                { title: 'Pilot Store', description: 'Deployed in single store for testing', duration: '2 months' },
                { title: 'Computer Vision', description: 'Trained models for product recognition', duration: '3 months' },
                { title: 'Sensor Integration', description: 'Integrated weight sensors and cameras', duration: '2 months' },
                { title: 'Multi-store Rollout', description: 'Scaled to 15 stores', duration: '1 month' }
            ],
            techStack: ['Python', 'TensorFlow', 'OpenCV', 'IoT Sensors', 'Mobile App', 'AWS']
        },
        results: {
            metrics: [
                { label: 'Checkout Time', before: '8 min', after: '3 min', improvement: '-60%' },
                { label: 'Product Recognition', before: 'N/A', after: '98%', improvement: '98%' },
                { label: 'Customer Satisfaction', before: '65%', after: '92%', improvement: '+27%' }
            ],
            impact: 'Reduced checkout wait times by 60% and improved customer satisfaction by 85%. The system now operates in 15 stores, processing thousands of transactions daily with 98% accuracy.'
        },
        technical: {
            architecture: 'Edge computing with distributed computer vision models. Real-time product tracking with sensor fusion and mobile app integration.',
            features: [
                'Automatic product recognition',
                'Weight sensor validation',
                'Real-time inventory tracking',
                'Mobile app integration',
                'Fraud detection system',
                'Analytics dashboard for store managers'
            ]
        }
    }
};

// Initialize Case Study Page
function initCaseStudy() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    
    if (!projectId || !projectData[projectId]) {
        // Redirect to projects page if invalid
        window.location.href = 'projects.html';
        return;
    }
    
    const project = projectData[projectId];
    loadCaseStudyContent(project);
}

// Load Case Study Content
function loadCaseStudyContent(project) {
    // Update page title
    document.title = `${project.title} — Scientist Technologies`;
    
    // Hero Section
    document.getElementById('breadcrumbTitle').textContent = project.title;
    document.getElementById('caseStudyTitle').innerHTML = `<span class="title-line">${project.title}</span>`;
    document.getElementById('caseStudySubtitle').textContent = project.hero.subtitle;
    
    const metricsContainer = document.getElementById('heroMetrics');
    metricsContainer.innerHTML = project.hero.metrics.map(metric => `
        <div class="metric-card glass-card">
            <div class="metric-icon">${metric.icon}</div>
            <div class="metric-value">${metric.value}</div>
            <div class="metric-label">${metric.label}</div>
        </div>
    `).join('');
    
    // Summary Section
    const summaryGrid = document.getElementById('summaryGrid');
    summaryGrid.innerHTML = `
        <div class="summary-item">
            <span class="summary-label">Client</span>
            <span class="summary-value">${project.summary.client}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Industry</span>
            <span class="summary-value">${project.summary.industry}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Technologies</span>
            <span class="summary-value tech-list">
                ${project.summary.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Duration</span>
            <span class="summary-value">${project.summary.duration}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Team Size</span>
            <span class="summary-value">${project.summary.teamSize}</span>
        </div>
    `;
    
    // Problem Section
    document.getElementById('problemDescription').textContent = project.problem.description;
    const painPointsList = document.getElementById('painPointsList');
    painPointsList.innerHTML = project.problem.painPoints.map(point => `<li>${point}</li>`).join('');
    
    // Add problem visual icon
    document.getElementById('problemVisual').innerHTML = `
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" stroke="currentColor" stroke-width="2" opacity="0.3"/>
            <path d="M100 60 L100 100 L140 100" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <circle cx="100" cy="100" r="8" fill="currentColor"/>
        </svg>
    `;
    
    // Solution Section
    document.getElementById('solutionApproach').innerHTML = `<p>${project.solution.approach}</p>`;
    
    const solutionSteps = document.getElementById('solutionSteps');
    solutionSteps.innerHTML = project.solution.steps.map((step, index) => `
        <div class="solution-step animate-on-scroll">
            <div class="step-content">
                <h4>${step.title}</h4>
                <p>${step.description}</p>
                <span class="step-duration">${step.duration}</span>
            </div>
            <div class="step-number">${index + 1}</div>
            <div class="step-content"></div>
        </div>
    `).join('');
    
    const techStackTags = document.getElementById('techStackTags');
    techStackTags.innerHTML = project.solution.techStack.map(tech => `
        <span class="tech-tag">${tech}</span>
    `).join('');
    
    // Results Section
    const resultsMetrics = document.getElementById('resultsMetrics');
    resultsMetrics.innerHTML = project.results.metrics.map(metric => `
        <div class="results-metric animate-on-scroll">
            <div class="metric-before">
                <div class="metric-label-small">Before</div>
                <div class="metric-value-large">${metric.before}</div>
            </div>
            <div class="metric-arrow">→</div>
            <div class="metric-after">
                <div class="metric-label-small">After</div>
                <div class="metric-value-large">${metric.after}</div>
                <div class="metric-improvement">${metric.improvement}</div>
            </div>
        </div>
        <div style="text-align: center; margin-top: -1rem; margin-bottom: 1rem;">
            <strong>${metric.label}</strong>
        </div>
    `).join('');
    
    document.getElementById('resultsImpact').innerHTML = `<p>${project.results.impact}</p>`;
    
    // Technical Section
    document.getElementById('architectureDesc').innerHTML = `<p>${project.technical.architecture}</p>`;
    
    const featuresGrid = document.getElementById('featuresGrid');
    featuresGrid.innerHTML = project.technical.features.map(feature => `
        <div class="feature-card animate-on-scroll">
            <h4>✓ ${feature.split(':')[0]}</h4>
            <p>${feature.split(':')[1] || feature}</p>
        </div>
    `).join('');
}

// Initialize on page load if on case study page
// Note: This is now called explicitly from case-study.html


// ---- Dynamic Case Study Loading ----
function initCaseStudyDynamic() {
    // Only run on case study page
    if (!window.location.pathname.includes('case-study.html')) return;
    
    // Get project parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    
    if (!projectId) {
        // If no project specified, redirect to projects page
        window.location.href = 'projects.html';
        return;
    }
    
    // Project data
    const projects = {
        'ai-diagnostic': {
            title: 'AI-Powered Medical Diagnostics',
            subtitle: 'Revolutionizing Healthcare with Deep Learning',
            metrics: [
                { icon: '🎯', value: '95%', label: 'Accuracy' },
                { icon: '⏱️', value: '60%', label: 'Time Saved' },
                { icon: '👥', value: '50K+', label: 'Patients Served' }
            ],
            client: 'Global Healthcare Network',
            industry: 'Healthcare',
            duration: '8 months',
            team: '6 engineers',
            technologies: ['TensorFlow', 'PyTorch', 'Computer Vision', 'Deep Learning'],
            problem: 'Medical imaging analysis was time-consuming and prone to human error, with radiologists spending 2-3 hours per case. The healthcare network faced a critical shortage of specialized radiologists while dealing with increasing patient volumes.',
            painPoints: [
                'Manual analysis taking 2-3 hours per case',
                'High false negative rates in early detection',
                'Shortage of specialized radiologists',
                'Inconsistent diagnostic quality across facilities'
            ],
            solution: 'We developed a deep learning system using convolutional neural networks trained on over 1 million medical images. The system provides real-time analysis with explainable AI features to assist radiologists in making faster, more accurate diagnoses.',
            results: [
                { label: 'Diagnostic Accuracy', before: '78%', after: '95%', improvement: '+17%' },
                { label: 'Analysis Time', before: '2.5 hrs', after: '15 min', improvement: '-94%' },
                { label: 'Cost per Diagnosis', before: '$250', after: '$50', improvement: '-80%' }
            ],
            impact: 'Processed over 50,000 patient cases with 95% accuracy, reducing diagnostic time by 94% and enabling early detection of critical conditions. The system is now deployed across 20 healthcare facilities, serving millions of patients annually.'
        },
        'fraud-detection': {
            title: 'Real-Time Fraud Detection System',
            subtitle: 'Protecting Financial Transactions with Machine Learning',
            metrics: [
                { icon: '🛡️', value: '78%', label: 'Fraud Reduction' },
                { icon: '⚡', value: '<100ms', label: 'Response Time' },
                { icon: '💳', value: '10M+', label: 'Transactions/Day' }
            ],
            client: 'Major Financial Institution',
            industry: 'Finance',
            duration: '6 months',
            team: '5 engineers',
            technologies: ['Scikit-learn', 'XGBoost', 'Apache Kafka', 'Real-time ML'],
            problem: 'The financial institution was losing millions annually to fraudulent transactions with high false positive rates causing customer friction.',
            painPoints: [
                'Annual fraud losses exceeding $50M',
                'High false positive rate (15%) causing customer friction',
                'Rule-based system unable to detect new fraud patterns',
                'Manual review process taking 24-48 hours'
            ],
            solution: 'Built a real-time machine learning system using ensemble methods and anomaly detection processing transactions in under 100ms.',
            results: [
                { label: 'Fraud Detection Rate', before: '65%', after: '92%', improvement: '+27%' },
                { label: 'False Positive Rate', before: '15%', after: '3%', improvement: '-80%' },
                { label: 'Annual Savings', before: '$0', after: '$39M', improvement: '+$39M' }
            ],
            impact: 'Reduced fraud losses by 78% while improving customer experience through 80% reduction in false positives.'
        }
        // Add more projects as needed
    };
    
    const project = projects[projectId];
    
    if (!project) {
        // Project not found, redirect to projects page
        window.location.href = 'projects.html';
        return;
    }
    
    // Update page title
    document.title = `${project.title} — Scientist Technologies`;
    
    // Update hero breadcrumb
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        breadcrumb.innerHTML = `
            <a href="index.html">Home</a>
            <span class="breadcrumb-separator">→</span>
            <a href="projects.html">Projects</a>
            <span class="breadcrumb-separator">→</span>
            <span>${project.title}</span>
        `;
    }
    
    // Update hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.innerHTML = `
            <span class="title-line">${project.title.split(' ').slice(0, -1).join(' ')}</span>
            <span class="title-line gradient-text">${project.title.split(' ').slice(-1)[0]}</span>
        `;
    }
    
    // Update hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.textContent = project.subtitle;
    }
    
    // Update case study header
    const caseStudyTitle = document.querySelector('.case-study-title');
    if (caseStudyTitle) {
        caseStudyTitle.textContent = project.title;
    }
    
    const caseStudySubtitle = document.querySelector('.case-study-subtitle');
    if (caseStudySubtitle) {
        caseStudySubtitle.textContent = project.subtitle;
    }
    
    // Update metrics
    const metricCards = document.querySelectorAll('.metric-card');
    project.metrics.forEach((metric, index) => {
        if (metricCards[index]) {
            metricCards[index].querySelector('.metric-icon').textContent = metric.icon;
            metricCards[index].querySelector('.metric-value').textContent = metric.value;
            metricCards[index].querySelector('.metric-label').textContent = metric.label;
        }
    });
    
    // Update summary
    const summaryItems = document.querySelectorAll('.summary-item');
    if (summaryItems[0]) summaryItems[0].querySelector('.summary-value').textContent = project.client;
    if (summaryItems[1]) summaryItems[1].querySelector('.summary-value').textContent = project.industry;
    if (summaryItems[2]) {
        const techList = summaryItems[2].querySelector('.tech-list');
        if (techList) {
            techList.innerHTML = project.technologies.map(tech => 
                `<span class="tech-badge">${tech}</span>`
            ).join('');
        }
    }
    if (summaryItems[3]) summaryItems[3].querySelector('.summary-value').textContent = project.duration;
    if (summaryItems[4]) summaryItems[4].querySelector('.summary-value').textContent = project.team;
    
    // Update problem section
    const problemText = document.querySelector('.problem-text p');
    if (problemText) {
        problemText.textContent = project.problem;
    }
    
    const painPointsList = document.querySelector('.pain-points');
    if (painPointsList) {
        painPointsList.innerHTML = project.painPoints.map(point => 
            `<li>${point}</li>`
        ).join('');
    }
    
    // Update solution
    const solutionApproach = document.querySelector('.solution-approach');
    if (solutionApproach) {
        solutionApproach.textContent = project.solution;
    }
    
    // Update results
    const resultCards = document.querySelectorAll('.result-card');
    project.results.forEach((result, index) => {
        if (resultCards[index]) {
            const card = resultCards[index];
            card.querySelector('.result-label').textContent = result.label;
            card.querySelector('.result-before').textContent = result.before;
            card.querySelector('.result-after').textContent = result.after;
            card.querySelector('.result-improvement').textContent = result.improvement;
        }
    });
    
    // Update impact
    const resultsImpact = document.querySelector('.results-impact p');
    if (resultsImpact) {
        resultsImpact.textContent = project.impact;
    }
}

// Initialize case study dynamic loading
initCaseStudyDynamic();


/* ================================================
   TECHNOLOGY LOGO CAROUSEL ROTATION
   ================================================ */
function initTechLogoCarousel() {
    const sets = document.querySelectorAll('.tech-logos-set');
    if (sets.length === 0) return;
    
    let currentIndex = 0;
    
    function rotateSets() {
        // Remove active class from current set
        sets[currentIndex].classList.remove('active');
        
        // Move to next set
        currentIndex = (currentIndex + 1) % sets.length;
        
        // Add active class to new set
        sets[currentIndex].classList.add('active');
    }
    
    // Rotate every 4 seconds
    setInterval(rotateSets, 4000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTechLogoCarousel();
});

const links = document.querySelectorAll(".nav-link");

links.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
});

