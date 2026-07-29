/**
 * Utility Functions for Wedding Invitation
 */

window.isInvitationOpened = false;

function openInvitation() {
    if (window.isInvitationOpened) return;
    window.isInvitationOpened = true;

    const cover = document.getElementById('opening-cover');
    if (cover) {
        cover.style.pointerEvents = 'none';
        cover.style.transition = 'opacity 0.7s ease-out, transform 0.9s cubic-bezier(0.77, 0, 0.175, 1)';
        cover.style.opacity = '0';
        cover.style.transform = 'translateY(-100%)';

        setTimeout(() => {
            cover.style.display = 'none';
            cover.classList.add('hidden');
        }, 900);
    }

    document.body.classList.remove('overflow-hidden');
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';

    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.style.overflow = 'auto';
    }

    if (window.audioController && typeof window.audioController.play === 'function') {
        try { window.audioController.play(); } catch(e) { console.log(e); }
    }

    // Play intro video
    const introVideo = document.getElementById('intro-video');
    if (introVideo) {
        introVideo.play().catch(() => {
            // Autoplay blocked by browser — silently ignore, video stays paused
        });
    }

    if (window.animationController) {
        try {
            if (typeof window.animationController.initLenis === 'function') {
                window.animationController.initLenis();
            }
            if (typeof window.animationController.initScrollAnimations === 'function') {
                window.animationController.initScrollAnimations();
            }
        } catch(e) { console.log(e); }
    }
}
window.openInvitation = openInvitation;

// Scroll wheel & touch listeners
document.addEventListener('DOMContentLoaded', () => {
    const cover = document.getElementById('opening-cover');
    if (!cover) return;

    window.addEventListener('wheel', (e) => {
        if (!window.isInvitationOpened && e.deltaY > 0) {
            openInvitation();
        }
    }, { passive: true });

    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length > 0) {
            touchStartY = e.touches[0].clientY;
        }
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        if (!window.isInvitationOpened && e.changedTouches && e.changedTouches.length > 0) {
            const touchEndY = e.changedTouches[0].clientY;
            if (touchStartY - touchEndY > 25) {
                openInvitation();
            }
        }
    }, { passive: true });

    window.addEventListener('keydown', (e) => {
        if (!window.isInvitationOpened && (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ')) {
            e.preventDefault();
            openInvitation();
        }
    });
});

const Utils = {
    getGuestName() {
        const urlParams = new URLSearchParams(window.location.search);
        const guest = urlParams.get('to') || urlParams.get('n') || urlParams.get('guest');
        if (guest && guest.trim()) {
            return decodeURIComponent(guest.trim());
        }
        return "Tamu Undangan";
    },

    showToast(message, type = 'success', duration = 3500) {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        const isSuccess = type === 'success';
        toast.className = `pointer-events-auto transform transition-all duration-300 translate-y-8 opacity-0 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border ${
            isSuccess 
                ? 'bg-[#758072] text-ivory border-gold/40' 
                : 'bg-red-900/90 text-red-100 border-red-500/40'
        } backdrop-blur-md`;

        toast.innerHTML = `
            <div class="flex-shrink-0 text-xl text-gold">
                <i class="fa-solid ${isSuccess ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
            </div>
            <div class="flex-1 text-sm font-sans font-medium">
                ${message}
            </div>
            <button class="text-xs opacity-60 hover:opacity-100 p-1" onclick="this.parentElement.remove()">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;

        container.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-8', 'opacity-0');
        });

        setTimeout(() => {
            toast.classList.add('translate-y-4', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    copyToClipboard(text, label = "Teks") {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                Utils.showToast(`${label} berhasil disalin ke clipboard!`);
            }).catch(() => {
                Utils.fallbackCopy(text, label);
            });
        } else {
            Utils.fallbackCopy(text, label);
        }
    },

    fallbackCopy(text, label) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
            document.execCommand('copy');
            Utils.showToast(`${label} berhasil disalin!`);
        } catch (err) {
            Utils.showToast(`Gagal menyalin ${label}`, 'error');
        }
        document.body.removeChild(textarea);
    },

    downloadIcsCalendar() {
        const event = window.CONFIG.event;
        const startDate = new Date(event.dateISO);
        const endDate = new Date(startDate.getTime() + (5 * 60 * 60 * 1000));

        const formatDate = (date) => {
            return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
        };

        const icsData = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//The Wedding of Isabella & Alexander//ID",
            "CALSCALE:GREGORIAN",
            "METHOD:REQUEST",
            "BEGIN:VEVENT",
            `UID:wedding-${Date.now()}@isabella-alexander.com`,
            `DTSTAMP:${formatDate(new Date())}`,
            `DTSTART:${formatDate(startDate)}`,
            `DTEND:${formatDate(endDate)}`,
            `SUMMARY:The Wedding of ${window.CONFIG.couple.bride.nickname} & ${window.CONFIG.couple.groom.nickname}`,
            `DESCRIPTION:Pernikahan ${window.CONFIG.couple.bride.fullName} dan ${window.CONFIG.couple.groom.fullName}.`,
            `LOCATION:${event.akad.venue}, ${event.akad.address}`,
            "STATUS:CONFIRMED",
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\r\n");

        const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", `Wedding_${window.CONFIG.couple.bride.nickname}_${window.CONFIG.couple.groom.nickname}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        Utils.showToast("File Kalender (.ics) berhasil diunduh!");
    },

    openGoogleCalendar() {
        const event = window.CONFIG.event;
        const startDate = new Date(event.dateISO);
        const endDate = new Date(startDate.getTime() + (5 * 60 * 60 * 1000));

        const formatGCalDate = (date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");

        const url = new URL("https://calendar.google.com/calendar/render");
        url.searchParams.append("action", "TEMPLATE");
        url.searchParams.append("text", `The Wedding of ${window.CONFIG.couple.bride.nickname} & ${window.CONFIG.couple.groom.nickname}`);
        url.searchParams.append("dates", `${formatGCalDate(startDate)}/${formatGCalDate(endDate)}`);
        url.searchParams.append("details", `Pernikahan ${window.CONFIG.couple.bride.fullName} & ${window.CONFIG.couple.groom.fullName}.`);
        url.searchParams.append("location", `${event.akad.venue}, ${event.akad.address}`);

        window.open(url.toString(), "_blank");
    },

    startCountdown(targetDateISO) {
        const targetDate = new Date(targetDateISO).getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const daysEl = document.getElementById("cd-days");
            const hoursEl = document.getElementById("cd-hours");
            const minutesEl = document.getElementById("cd-minutes");
            const secondsEl = document.getElementById("cd-seconds");

            if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

            if (distance < 0) {
                daysEl.innerText = "00";
                hoursEl.innerText = "00";
                minutesEl.innerText = "00";
                secondsEl.innerText = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.innerText = String(days).padStart(2, '0');
            hoursEl.innerText = String(hours).padStart(2, '0');
            minutesEl.innerText = String(minutes).padStart(2, '0');
            secondsEl.innerText = String(seconds).padStart(2, '0');
        };

        updateTimer();
        setInterval(updateTimer, 1000);
    }
};

if (typeof window !== "undefined") {
    window.Utils = Utils;
}