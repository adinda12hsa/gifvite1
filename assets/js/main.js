/**
 * Main Application Script for Wedding Invitation
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Configuration Data into UI
    renderConfigData();

    // 1a. Start the continuously moving photo collage after its items exist.
    initGalleryMarquee();

    // 2. Initialize Swiper Slider for Gallery
    initSwiper();

    // 3. Initialize Fancybox Lightbox
    initFancybox();

    // 4. Initialize Audio Controller
    if (window.audioController) {
        window.audioController.init();
    }

    // 5. Initialize RSVP & Wishes Manager
    if (window.rsvpManager) {
        window.rsvpManager.init();
    }

    // 6. Initialize Animations Controller
    if (window.animationController) {
        window.animationController.init();
    }

    // 7. Initialize Countdown
    if (window.Utils && window.CONFIG.event.dateISO) {
        window.Utils.startCountdown(window.CONFIG.event.dateISO);
    }

    // 8. Event Listener for "Buka Undangan" Button
    const openBtn = document.getElementById('btn-open-invitation');
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            if (window.animationController) {
                window.animationController.openInvitation();
            }
        });
    }
});

/**
 * Render Centralized Config Data into DOM Elements
 */
function renderConfigData() {
    const cfg = window.CONFIG;
    if (!cfg) return;

    // Guest Name in Cover
    const guestNameEl = document.getElementById('cover-guest-name');
    if (guestNameEl && window.Utils) {
        guestNameEl.innerText = window.Utils.getGuestName();
    }

    // Couple Names
    const coupleTitleEl = document.getElementById('cover-couple-title');
    if (coupleTitleEl) {
        coupleTitleEl.innerText = `${cfg.couple.groom.nickname} & ${cfg.couple.bride.nickname}`;
    }

    const heroCoupleTitleEl = document.getElementById('hero-couple-title');
    if (heroCoupleTitleEl) {
        heroCoupleTitleEl.innerText = `${cfg.couple.groom.nickname} & ${cfg.couple.bride.nickname}`;
    }

    const coupleDateEl = document.getElementById('cover-wedding-date');
    if (coupleDateEl) {
        coupleDateEl.innerText = cfg.event.dateFormatted;
    }

    // Groom Data
    document.getElementById('groom-name')?.replaceWith(createEl('h3', 'font-serif text-3xl font-bold text-[#758072] mb-2', cfg.couple.groom.fullName));
    document.getElementById('groom-parents')?.replaceWith(createEl('p', 'text-stone-600 font-sans text-sm mb-4 leading-relaxed', cfg.couple.groom.parents));
    document.getElementById('groom-bio')?.replaceWith(createEl('p', 'text-stone-700 font-sans text-sm italic mb-6 leading-relaxed bg-[#F4EFE6]/60 p-4 rounded-xl border-l-2 border-[#D4AF37]', `"${cfg.couple.groom.bio}"`));
    const groomIgBtn = document.getElementById('groom-ig-btn');
    if (groomIgBtn) {
        groomIgBtn.href = cfg.couple.groom.instagramUrl;
        groomIgBtn.innerHTML = `<i class="fa-brands fa-instagram text-lg"></i> ${cfg.couple.groom.instagram}`;
    }

    // Bride Data
    document.getElementById('bride-name')?.replaceWith(createEl('h3', 'font-serif text-3xl font-bold text-[#758072] mb-2', cfg.couple.bride.fullName));
    document.getElementById('bride-parents')?.replaceWith(createEl('p', 'text-stone-600 font-sans text-sm mb-4 leading-relaxed', cfg.couple.bride.parents));
    document.getElementById('bride-bio')?.replaceWith(createEl('p', 'text-stone-700 font-sans text-sm italic mb-6 leading-relaxed bg-[#F4EFE6]/60 p-4 rounded-xl border-l-2 border-[#D4AF37]', `"${cfg.couple.bride.bio}"`));
    const brideIgBtn = document.getElementById('bride-ig-btn');
    if (brideIgBtn) {
        brideIgBtn.href = cfg.couple.bride.instagramUrl;
        brideIgBtn.innerHTML = `<i class="fa-brands fa-instagram text-lg"></i> ${cfg.couple.bride.instagram}`;
    }

    // Quote
    const quoteTextEl = document.getElementById('quote-text');
    if (quoteTextEl) quoteTextEl.innerText = `"${cfg.quote.text}"`;
    const quoteSourceEl = document.getElementById('quote-source');
    if (quoteSourceEl) quoteSourceEl.innerText = cfg.quote.source;

    // Timeline Rendering
    renderTimeline(cfg.timeline);

    // Gallery Rendering
    renderGallery(cfg.gallery);

    // Event Akad & Resepsi
    renderEvents(cfg.event);

    // Digital Gifts
    renderGifts(cfg.gifts);

    // Video Embed
    const videoIframe = document.getElementById('wedding-video-iframe');
    if (videoIframe && cfg.video && cfg.video.embedUrl) {
        videoIframe.src = cfg.video.embedUrl;
    }

    // Footer Families
    const groomFamEl = document.getElementById('footer-groom-family');
    if (groomFamEl) groomFamEl.innerText = cfg.families.groomFamily;
    const brideFamEl = document.getElementById('footer-bride-family');
    if (brideFamEl) brideFamEl.innerText = cfg.families.brideFamily;
}

function createEl(tag, className, text) {
    const el = document.createElement(tag);
    el.className = className;
    el.innerText = text;
    return el;
}

function renderEvents(eventData) {
    // Akad
    const akadTimeEl = document.getElementById('akad-time');
    if (akadTimeEl) akadTimeEl.innerText = eventData.akad.time;
    const akadVenueEl = document.getElementById('akad-venue');
    if (akadVenueEl) akadVenueEl.innerText = eventData.akad.venue;
    const akadAddressEl = document.getElementById('akad-address');
    if (akadAddressEl) akadAddressEl.innerText = eventData.akad.address;

    // Resepsi
    const resepsiTimeEl = document.getElementById('resepsi-time');
    if (resepsiTimeEl) resepsiTimeEl.innerText = eventData.resepsi.time;
    const resepsiVenueEl = document.getElementById('resepsi-venue');
    if (resepsiVenueEl) resepsiVenueEl.innerText = eventData.resepsi.venue;
    const resepsiAddressEl = document.getElementById('resepsi-address');
    if (resepsiAddressEl) resepsiAddressEl.innerText = eventData.resepsi.address;

    // Maps Embed & Link
    const mapsIframe = document.getElementById('maps-iframe');
    if (mapsIframe) mapsIframe.src = eventData.akad.mapsEmbed;

    const mapsBtn = document.getElementById('btn-google-maps');
    if (mapsBtn) mapsBtn.href = eventData.akad.mapsUrl;
}

function renderTimeline(timelineData) {
    const container = document.getElementById('timeline-container');
    if (!container || !Array.isArray(timelineData)) return;

    container.innerHTML = timelineData.map((item, index) => {
        const isEven = index % 2 === 0;

        return `
            <div class="timeline-item relative flex flex-col md:flex-row items-center mb-12 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}">
                <div class="w-full md:w-1/2 p-4 ${isEven ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}">
                    <div class="bg-[#FAF7F2] p-6 rounded-2xl border border-[#D4AF37]/30 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <span class="inline-block px-3 py-1 bg-[#758072] text-[#D4AF37] font-sans text-xs font-bold rounded-full mb-3 shadow">
                            ${item.year}
                        </span>
                        <h4 class="font-serif font-bold text-xl text-[#758072] mb-2">${item.title}</h4>
                        <p class="text-stone-600 font-sans text-sm leading-relaxed mb-4">${item.description}</p>
                        ${item.image ? `
                            <div class="overflow-hidden rounded-xl h-44 w-full shadow-inner border border-[#D4AF37]/20">
                                <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" loading="lazy">
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Center Node Dot -->
                <div class="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#758072] border-4 border-[#D4AF37] flex items-center justify-center shadow-lg z-10 hidden md:flex">
                    <div class="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                </div>

                <div class="hidden md:block w-1/2"></div>
            </div>
        `;
    }).join('');
}

function renderGallery(galleryData) {
    const container = document.getElementById('gallery-grid-container');

    if (!Array.isArray(galleryData)) return;

    // Repeat the sequence once to create a seamless horizontal photo collage.
    if (container) {
        const marqueeItems = [...galleryData, ...galleryData];
        container.innerHTML = marqueeItems.map((item, index) => `
            <div class="gallery-item gallery-item-${(index % galleryData.length) + 1} overflow-hidden rounded-2xl border border-[#D4AF37]/30 shadow-lg relative group">
                <a href="${item.url}" data-fancybox="gallery" data-caption="${item.caption}">
                    <img src="${item.thumb}" alt="${item.caption}" class="w-full h-full object-cover transition-transform duration-700" loading="lazy">
                    <div class="gallery-caption">
                        <span>${item.category || 'Gallery'}</span>
                        <h5>${item.caption}</h5>
                    </div>
                </a>
            </div>
        `).join('');
    }
}

function initGalleryMarquee() {
    const viewport = document.querySelector('.gallery-marquee');
    const track = document.getElementById('gallery-grid-container');
    if (!viewport || !track || !track.children.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let paused = false;
    let previousTime = null;
    const speed = 22; // pixels per second; intentionally calm for reading captions

    const pause = () => { paused = true; };
    const resume = () => { paused = false; previousTime = null; };

    // Pause only while the cursor is directly exploring a photo, not while it
    // merely crosses the gallery area. The movement itself stays automatic.
    track.querySelectorAll('.gallery-item').forEach((item) => {
        item.addEventListener('pointerenter', pause);
        item.addEventListener('pointerleave', resume);
        item.addEventListener('focusin', pause);
        item.addEventListener('focusout', resume);
    });

    const move = (time) => {
        if (!paused) {
            if (previousTime !== null) {
                const loopWidth = track.scrollWidth / 2;
                viewport.scrollLeft += ((time - previousTime) / 1000) * speed;
                if (loopWidth && viewport.scrollLeft >= loopWidth) {
                    viewport.scrollLeft -= loopWidth;
                }
            }
            previousTime = time;
        }
        requestAnimationFrame(move);
    };

    requestAnimationFrame(move);
}

function renderGifts(giftsData) {
    // Bank Accounts
    const bankContainer = document.getElementById('bank-accounts-container');
    if (bankContainer && Array.isArray(giftsData.banks)) {
        bankContainer.innerHTML = giftsData.banks.map(bank => `
            <div class="bg-[#FAF7F2] p-6 rounded-2xl border border-[#D4AF37]/40 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="text-center sm:text-left">
                    <span class="inline-block text-xs font-sans font-bold uppercase tracking-wider text-[#D4AF37] bg-[#758072] px-3 py-1 rounded-md mb-2">
                        ${bank.bankName}
                    </span>
                    <h5 class="font-mono text-2xl font-bold text-[#758072] tracking-wider my-1">${bank.accountNumber}</h5>
                    <p class="text-stone-600 font-sans text-xs">a.n <span class="font-semibold text-stone-800">${bank.accountName}</span></p>
                </div>
                <button onclick="window.Utils.copyToClipboard('${bank.accountNumber}', 'No. Rekening ${bank.bankName}')" class="px-5 py-2.5 rounded-xl bg-[#758072] hover:bg-[#5A6357] text-[#D4AF37] font-sans font-semibold text-xs transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2">
                    <i class="fa-regular fa-copy"></i> Salin Rekening
                </button>
            </div>
        `).join('');
    }

    // QRIS
    const qrisImg = document.getElementById('qris-image');
    if (qrisImg && giftsData.qris) {
        qrisImg.src = giftsData.qris.imageUrl;
    }

    // Gift Address
    const addressText = document.getElementById('gift-address-text');
    if (addressText && giftsData.address) {
        addressText.innerText = giftsData.address.fullAddress;
    }
    const copyAddressBtn = document.getElementById('btn-copy-address');
    if (copyAddressBtn && giftsData.address) {
        copyAddressBtn.onclick = () => window.Utils.copyToClipboard(giftsData.address.fullAddress, 'Alamat Kirim Kado');
    }
}

function initSwiper() {
    if (typeof Swiper !== 'undefined' && document.querySelector('.swiper-container')) {
        new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }
}

function initFancybox() {
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind("[data-fancybox]", {
            animated: true,
            dragToClose: true,
        });
    }
}
