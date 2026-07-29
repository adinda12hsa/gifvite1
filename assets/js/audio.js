/**
 * Background Audio Controller for Wedding Invitation
 */

class AudioController {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.isMuted = false;
        this.toggleBtn = null;
        this.audioIcon = null;
        this.discEl = null;
    }

    init() {
        const audioData = window.CONFIG.audio;
        if (!audioData || !audioData.url) return;

        this.audio = new Audio(audioData.url);
        this.audio.loop = true;
        this.audio.volume = 0.6; // Soft romantic volume

        this.toggleBtn = document.getElementById('music-toggle-btn');
        this.audioIcon = document.getElementById('music-icon');
        this.discEl = document.getElementById('music-disc');

        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.togglePlay());
        }
    }

    play() {
        if (!this.audio) return;
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.updateUI(true);
        }).catch(err => {
            console.log("Audio autoplay prevented by browser policy, waiting for user click.", err);
            this.isPlaying = false;
            this.updateUI(false);
        });
    }

    pause() {
        if (!this.audio) return;
        this.audio.pause();
        this.isPlaying = false;
        this.updateUI(false);
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    updateUI(playing) {
        if (!this.toggleBtn) return;
        
        if (playing) {
            this.toggleBtn.classList.add('is-playing');
            if (this.audioIcon) {
                this.audioIcon.className = 'fa-solid fa-compact-disc spin-slow text-[#D4AF37]';
            }
            if (this.discEl) {
                this.discEl.classList.add('animate-spin-slow');
            }
        } else {
            this.toggleBtn.classList.remove('is-playing');
            if (this.audioIcon) {
                this.audioIcon.className = 'fa-solid fa-music-slash text-gray-400';
            }
            if (this.discEl) {
                this.discEl.classList.remove('animate-spin-slow');
            }
        }
    }
}

window.audioController = new AudioController();
