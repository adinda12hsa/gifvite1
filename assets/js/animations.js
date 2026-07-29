/**
 * GSAP, ScrollTrigger, Lenis & Motion Designer Animations
 */

class AnimationController {
    constructor() {
        this.lenis = null;
        this.isOpened = false;
    }

    init() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        this.setupFloatingPetals();
        this.setupCoverAnimations();
        this.setupParticleEffects();
    }

    setupParticleEffects() {
        // Subtle sparkle particles in hero section
        const hero = document.getElementById('hero');
        if (!hero) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'absolute inset-0 pointer-events-none z-5 overflow-hidden';
        particleContainer.id = 'particle-container';
        hero.appendChild(particleContainer);

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            const size = 2 + Math.random() * 4;
            particle.className = 'absolute rounded-full bg-gold/20';
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatPetal ${15 + Math.random() * 20}s linear infinite;
                animation-delay: ${Math.random() * 10}s;
                opacity: ${0.1 + Math.random() * 0.3};
            `;
            particleContainer.appendChild(particle);
        }
    }

    openInvitation() {
        if (typeof window.openInvitation === 'function') {
            window.openInvitation();
        }
    }

    initLenis() {
        if (typeof Lenis !== 'undefined') {
            try {
                const isDesktop = window.innerWidth >= 1025;
                const contentEl = document.getElementById('main-content');

                const lenisOptions = {
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    direction: 'vertical',
                    gestureDirection: 'vertical',
                    smooth: true,
                    smoothTouch: true,
                    touchMultiplier: 1.5,
                };

                if (isDesktop && contentEl) {
                    lenisOptions.wrapper = contentEl;
                    lenisOptions.content = contentEl;
                }

                this.lenis = new Lenis(lenisOptions);

                const raf = (time) => {
                    if (this.lenis) {
                        this.lenis.raf(time);
                    }
                    if (typeof ScrollTrigger !== 'undefined') {
                        ScrollTrigger.update();
                    }
                    requestAnimationFrame(raf);
                };

                requestAnimationFrame(raf);
            } catch (e) {
                console.warn("Lenis scroll fallback:", e);
            }
        }
    }

    setupCoverAnimations() {
        if (typeof gsap === 'undefined') return;

        gsap.from('#cover-content > *', {
            opacity: 0,
            y: 30,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.3
        });
    }

    initScrollAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        // Fade up sections
        gsap.utils.toArray('.gsap-fade-up').forEach((el) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out'
            });
        });

        // Scale reveal
        gsap.utils.toArray('.gsap-scale-reveal').forEach((el) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                scale: 0.88,
                opacity: 0,
                duration: 1.2,
                ease: 'power2.out'
            });
        });

        // Timeline items
        gsap.utils.toArray('.timeline-item').forEach((item, index) => {
            const isEven = index % 2 === 0;
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                x: isEven ? -60 : 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });

        // Parallax
        gsap.utils.toArray('.gsap-parallax').forEach((bg) => {
            gsap.to(bg, {
                scrollTrigger: {
                    trigger: bg,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: -80,
                ease: 'none'
            });
        });

        // Hero title reveal
        const heroTitle = document.getElementById('hero-couple-title');
        if (heroTitle) {
            gsap.from(heroTitle, {
                scrollTrigger: {
                    trigger: heroTitle,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 30,
                duration: 1.2,
                ease: 'power2.out'
            });
        }

        ScrollTrigger.refresh();
    }

    setupFloatingPetals() {
        const containers = [
            document.getElementById('floating-petals-container'),
            document.getElementById('preview-petals-container')
        ];

        const petalSVG = `
            <svg class="w-6 h-6 text-gold/30 fill-current" viewBox="0 0 24 24">
                <path d="M12,2C12,2 8,7 8,12C8,15.86 10.14,19 12,22C13.86,19 16,15.86 16,12C16,7 12,2 12,2Z"/>
            </svg>
        `;

        containers.forEach(container => {
            if (!container) return;
            for (let i = 0; i < 20; i++) {
                const petal = document.createElement('div');
                petal.className = 'absolute pointer-events-none z-10 opacity-60';
                petal.innerHTML = petalSVG;

                const startX = Math.random() * 100;
                const size = 0.5 + Math.random() * 0.9;
                const duration = 12 + Math.random() * 16;
                const delay = Math.random() * 12;

                petal.style.left = `${startX}%`;
                petal.style.top = `-50px`;
                petal.style.transform = `scale(${size})`;
                petal.style.animation = `floatPetal ${duration}s linear infinite`;
                petal.style.animationDelay = `${delay}s`;

                container.appendChild(petal);
            }
        });
    }
}

window.animationController = new AnimationController(); 