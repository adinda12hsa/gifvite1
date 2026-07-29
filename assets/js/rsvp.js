/**
 * RSVP & Guestbook Handler with Google Apps Script Sync
 */

class RSVPManager {
    constructor() {
        this.form = null;
        this.wishesContainer = null;
        this.loadMoreBtn = null;
        this.wishesList = [];
        this.displayedCount = 6;
        this.isSubmitting = false;
    }

    init() {
        this.form = document.getElementById('rsvp-form');
        this.wishesContainer = document.getElementById('wishes-container');
        this.loadMoreBtn = document.getElementById('load-more-wishes-btn');

        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => this.loadMoreWishes());
        }

        const guestNameInput = document.getElementById('rsvp-name');
        if (guestNameInput && window.Utils) {
            const urlName = window.Utils.getGuestName();
            if (urlName && urlName !== "Tamu Undangan") {
                guestNameInput.value = urlName;
            }
        }

        this.checkPreviousSubmission();
        this.fetchWishes();
    }

    checkPreviousSubmission() {
        const isSubmitted = localStorage.getItem('wedding_rsvp_submitted');
        const alertBox = document.getElementById('rsvp-already-submitted');
        if (isSubmitted && alertBox) {
            alertBox.classList.remove('hidden');
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.isSubmitting) return;
        this.isSubmitting = true;

        const nameInput = document.getElementById('rsvp-name');
        const attendanceInput = document.querySelector('input[name="attendance"]:checked');
        const countInput = document.getElementById('rsvp-count');
        const wishesInput = document.getElementById('rsvp-wishes');
        const submitBtn = document.getElementById('rsvp-submit-btn');

        document.querySelectorAll('.form-error').forEach(el => el.classList.add('hidden'));

        let isValid = true;

        if (!nameInput || !nameInput.value.trim()) {
            this.showFieldError('name-error', 'Nama lengkap wajib diisi.');
            isValid = false;
        }

        if (!attendanceInput) {
            this.showFieldError('attendance-error', 'Silakan pilih konfirmasi kehadiran.');
            isValid = false;
        }

        if (!wishesInput || !wishesInput.value.trim()) {
            this.showFieldError('wishes-error', 'Pesan & ucapan wajib diisi.');
            isValid = false;
        }

        if (!isValid) {
            this.isSubmitting = false;
            return;
        }

        const payload = {
            name: nameInput.value.trim(),
            attendance: attendanceInput.value,
            count: countInput ? countInput.value : 1,
            wishes: wishesInput.value.trim(),
            timestamp: new Date().toISOString()
        };

        submitBtn.disabled = true;
        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin text-lg"></i>
            <span>Mengirim...</span>
        `;

        try {
            const gasUrl = window.CONFIG.GAS_URL;

            if (gasUrl && gasUrl.trim().length > 10) {
                await fetch(gasUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            } else {
                await new Promise(r => setTimeout(r, 800));
            }

            localStorage.setItem('wedding_rsvp_submitted', 'true');
            this.checkPreviousSubmission();

            this.wishesList.unshift({
                name: payload.name,
                attendance: payload.attendance,
                count: payload.count,
                wishes: payload.wishes,
                timestamp: "Baru saja"
            });

            this.renderWishes();
            this.form.reset();
            this.showSuccessModal(payload.name);

        } catch (error) {
            console.error("RSVP Submission Error:", error);
            this.showErrorModal();
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
            this.isSubmitting = false;
        }
    }

    showFieldError(id, message) {
        const errEl = document.getElementById(id);
        if (errEl) {
            errEl.innerText = message;
            errEl.classList.remove('hidden');
        }
    }

    showSuccessModal(name) {
        const modal = document.getElementById('rsvp-success-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');

            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 100,
                    spread: 80,
                    origin: { y: 0.6 }
                });
                setTimeout(() => {
                    confetti({
                        particleCount: 50,
                        spread: 60,
                        origin: { y: 0.5 }
                    });
                }, 300);
            }
        }
    }

    showErrorModal() {
        const modal = document.getElementById('rsvp-error-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    }

    async fetchWishes() {
        const gasUrl = window.CONFIG.GAS_URL;

        if (gasUrl && gasUrl.trim().length > 10) {
            try {
                const response = await fetch(`${gasUrl}?action=getWishes`);
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    this.wishesList = data;
                    this.renderWishes();
                    return;
                }
            } catch (err) {
                console.log("Could not fetch live wishes, using fallback.", err);
            }
        }

        this.wishesList = window.CONFIG.fallbackWishes || [];
        this.renderWishes();
    }

    renderWishes() {
        if (!this.wishesContainer) return;

        const visibleItems = this.wishesList.slice(0, this.displayedCount);

        if (visibleItems.length === 0) {
            this.wishesContainer.innerHTML = `
                <div class="text-center py-12 text-stone-500 font-sans col-span-full">
                    <i class="fa-regular fa-comment-dots text-3xl block mb-3 text-gold/50"></i>
                    Belum ada ucapan. Jadilah yang pertama memberikan ucapan & doa!
                </div>
            `;
            return;
        }

        this.wishesContainer.innerHTML = visibleItems.map((item, index) => {
            const isAttending = item.attendance === 'Hadir';
            const initials = item.name ? item.name.substring(0, 2).toUpperCase() : "TU";
            const delay = index * 50;

            return `
                <div class="wish-card bg-white p-6 rounded-2xl border border-gold/20 shadow-md 
                            hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                            animate-slide-up" style="animation-delay: ${delay}ms">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-10 h-10 rounded-full bg-[#758072] text-gold font-serif font-bold flex items-center justify-center text-sm border border-gold/30 flex-shrink-0">
                                ${initials}
                            </div>
                            <div class="min-w-0">
                                <h4 class="font-serif font-bold text-[#758072] text-base leading-tight truncate">${item.name}</h4>
                                <span class="text-xs text-brown font-sans">${item.timestamp || 'Tamu Undangan'}</span>
                            </div>
                        </div>
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold flex-shrink-0 ml-2 ${
                            isAttending 
                                ? 'bg-[#758072]/10 text-[#758072] border border-[#758072]/30' 
                                : 'bg-stone-100 text-stone-500 border border-stone-200'
                        }">
                            <i class="fa-solid ${isAttending ? 'fa-circle-check text-gold' : 'fa-circle-xmark text-stone-400'}"></i>
                            ${item.attendance} ${isAttending && item.count ? `(${item.count})` : ''}
                        </span>
                    </div>
                    <p class="text-stone-700 font-sans text-sm leading-relaxed italic border-l-2 border-gold/40 pl-3 py-1 bg-ivory/50 rounded-r-lg">
                        "${item.wishes}"
                    </p>
                </div>
            `;
        }).join('');

        if (this.loadMoreBtn) {
            if (this.displayedCount >= this.wishesList.length) {
                this.loadMoreBtn.classList.add('hidden');
            } else {
                this.loadMoreBtn.classList.remove('hidden');
            }
        }
    }

    loadMoreWishes() {
        this.displayedCount += 6;
        this.renderWishes();
    }
}

window.rsvpManager = new RSVPManager();