/**
 * Centralized Wedding Invitation Configuration
 * Edit any value below to update the entire invitation website instantly.
 */
const CONFIG = {
    // Google Apps Script Web App URL for RSVP & Guestbook sync
    // Replace with your deployed Web App URL (e.g., https://script.google.com/macros/s/AKfycb.../exec)
    GAS_URL: "https://script.google.com/macros/s/AKfycbzP-9JbpP26jom4BiQa6gQTY_3qS4BJpOkT3peNvSF2nGvsvJGe11aXqWdKNjrbvWkC/exec",

    // Audio & Music Settings
    audio: {
        title: "Wedding Music",
        artist: "Wedding Instrumental",
        // Local music file
        url: "assets/music/music.wav",
        autoplay: true
    },

    // Couple Information
    couple: {
        title: "The Wedding of",
        hashtag: "#IsabellaAlexanderWedding",
        groom: {
            nickname: "Alexander",
            fullName: "Alexander Rayhan Pratama, S.T.",
            parents: "Putra Pertama dari Bapak Ir. H. Herman Pratama & Ibu Hj. Ratna Sari",
            bio: "Seorang arsitek berpikiran futuristik yang menyukai keindahan seni, alam, dan kisah-kisah hangat.",
            instagram: "@alexander.rayhan",
            instagramUrl: "https://instagram.com",
            photo: "assets/images/couple_hero.jpg" // Groom portrait / Hero
        },
        bride: {
            nickname: "Isabella",
            fullName: "Isabella Aurelia Wijaya, M.Ds.",
            parents: "Putri Kedua dari Bapak Dr. Gunawan Wijaya, M.Si. & Ibu Dra. Diana Novita",
            bio: "Desainer interior berbakat yang menemukan kebahagiaan dalam harmoni warna, musik, dan senyuman orang tercinta.",
            instagram: "@isabella.aurelia",
            instagramUrl: "https://instagram.com",
            photo: "assets/images/cover_bg.jpg" // Bride portrait / Cover
        },
        heroImage: "assets/images/couple_hero.jpg",
        coverImage: "assets/images/cover_bg.jpg"
    },

    // Holy Quote
    quote: {
        text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
        source: "QS. Ar-Rum: 21"
    },

    // Date & Time (ISO format for countdown calculation)
    event: {
        dateISO: "2026-10-24T09:00:00+07:00",
        dateFormatted: "Sabtu, 24 Oktober 2026",
        dateEnglish: "Saturday, October 24, 2026",

        // Akad Nikah / Ceremony
        akad: {
            title: "Akad Nikah",
            date: "Sabtu, 24 Oktober 2026",
            time: "08.00 - 10.00 WIB",
            venue: "Grand Ballroom The Royal Glasshouse",
            address: "Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan",
            mapsUrl: "https://maps.google.com/?q=The+Royal+Glasshouse+Jakarta",
            mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.273618451859!2d106.8062828758838!3d-6.22768136098939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1505c2a1c0d%3A0xb35a0f5a7e6b010!2sKebayoran%20Baru%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
        },

        // Resepsi / Reception
        resepsi: {
            title: "Resepsi Pernikahan",
            date: "Sabtu, 24 Oktober 2026",
            time: "11.00 - 14.00 WIB",
            venue: "Grand Ballroom & Royal Garden The Royal Glasshouse",
            address: "Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan",
            mapsUrl: "https://maps.google.com/?q=The+Royal+Glasshouse+Jakarta",
            mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.273618451859!2d106.8062828758838!3d-6.22768136098939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1505c2a1c0d%3A0xb35a0f5a7e6b010!2sKebayoran%20Baru%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
        }
    },

    // Love Story Timeline
    timeline: [
        {
            year: "Mei 2021",
            title: "Awal Pertemuan (First Meet)",
            description: "Takdir mempertemukan kami di sebuah pameran seni arsitektur di Jakarta. Berawal dari diskusi kecil mengenai desain klasik, perbincangan hangat kami berlanjut hingga malam.",
            image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
        },
        {
            year: "Desember 2022",
            title: "Komitmen Bersama (Relationship)",
            description: "Setahun berlalu dengan jutaan momen indah. Di tepi pantai Bali saat matahari terbenam, kami meyakinkan hati untuk saling melengkapi dan berjalan beriringan.",
            image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"
        },
        {
            year: "Januari 2025",
            title: "Lamaran Romantis (The Proposal)",
            description: "Di bawah gemerlap bintang dan dikelilingi bunga-bunga kesukaannya di Kyoto, Alexander berlutut menyunting Isabella untuk menjadi pendamping hidup selamanya.",
            image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80"
        },
        {
            year: "Agustus 2025",
            title: "Pertunangan Resmi (Engagement)",
            description: "Didampingi oleh kedua keluarga besar yang penuh kehangatan, kami melangsungkan acara pertunangan resmi sebagai langkah awal menuju gerbang pernikahan.",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
        },
        {
            year: "24 Oktober 2026",
            title: "Hari Bahagia (Wedding Day)",
            description: "Dengan memohon rahmat dan ridho Allah SWT, kami mengikat janji suci pernikahan untuk melangkah bersama mengarungi bahtera rumah tangga.",
            image: "assets/images/couple_hero.jpg"
        }
    ],

    // Photo Gallery
    gallery: [
        {
            url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
            thumb: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80",
            caption: "The Promise of Eternal Love",
            category: "Prewedding"
        },
        {
            url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
            thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=500&q=80",
            caption: "Warm Golden Sunset Moments",
            category: "Prewedding"
        },
        {
            url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
            thumb: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=500&q=80",
            caption: "Blossom & Grace",
            category: "Engagement"
        },
        {
            url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
            thumb: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=500&q=80",
            caption: "Details of Pure Elegance",
            category: "Details"
        },
        {
            url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
            thumb: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=500&q=80",
            caption: "Hand in Hand Together",
            category: "Prewedding"
        },
        {
            url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
            thumb: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=500&q=80",
            caption: "Vintage Garden Elegance",
            category: "Engagement"
        }
    ],

    // YouTube Video Highlight
    video: {
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=wedding_teaser", // Replace with actual YouTube video embed URL
        youtubeId: "dQw4w9WgXcQ",
        title: "Isabella & Alexander Wedding Cinematic Teaser",
        thumbnail: "assets/images/couple_hero.jpg"
    },

    // Digital Gift Accounts
    gifts: {
        banks: [
            {
                bankName: "Bank Central Asia (BCA)",
                accountNumber: "8830192841",
                accountName: "Alexander Rayhan Pratama",
                logo: "BCA"
            },
            {
                bankName: "Bank Mandiri",
                accountNumber: "1370019284712",
                accountName: "Isabella Aurelia Wijaya",
                logo: "MANDIRI"
            }
        ],
        ewallets: [
            {
                provider: "GoPay / OVO / Dana",
                accountNumber: "081298765432",
                accountName: "Isabella Aurelia",
                logo: "E-WALLET"
            }
        ],
        qris: {
            title: "QRIS All Payment",
            subtitle: "Scan QR code berikut menggunakan aplikasi mobile banking atau e-wallet pilihan Anda.",
            imageUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=00020101021126580014ID.GO.QRIS.WWW0118936000140000000000020812987654320303UME5204581253033605802ID5918ISABELLA%20ALEXANDER6007JAKARTA61051211062070703A01"
        },
        address: {
            recipient: "Isabella & Alexander",
            phone: "+62 812-9876-5432",
            fullAddress: "The Royal Residence Block B No. 12, Kebayoran Baru, Jakarta Selatan 12110",
            note: "Kado fisik dapat dikirimkan ke alamat tempat tinggal kami di atas."
        }
    },

    // Initial / Fallback Wishes (shown when GAS URL is not active or offline)
    fallbackWishes: [
        {
            name: "Bapak & Ibu Kusuma",
            attendance: "Hadir",
            count: 2,
            wishes: "Selamat atas pernikahan Ananda Alexander dan Isabella! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selalu hingga kakek nenek.",
            timestamp: "2 jam yang lalu"
        },
        {
            name: "Dinda & Fajar",
            attendance: "Hadir",
            count: 2,
            wishes: "Happy Wedding Bella & Alex! So happy for both of you! Lancar-lancar sampai hari H dan semoga selalu dipenuhi cinta dan keberkahan.",
            timestamp: "4 jam yang lalu"
        },
        {
            name: "Ahmad Subagja",
            attendance: "Tidak Hadir",
            count: 1,
            wishes: "Selamat ya Alex! Maaf belum bisa hadir langsung karena tugas dinas di luar kota. Doa terbaik mengiringi langkah kalian berdua.",
            timestamp: "1 hari yang lalu"
        },
        {
            name: "Siti Rahmawati",
            attendance: "Hadir",
            count: 1,
            wishes: "Masya Allah tabarakallah, terharu banget liat perjalanan kalian. Semoga senantiasa dinaungi rahmat dan kebahagiaan sejati.",
            timestamp: "1 hari yang lalu"
        }
    ],

    // Family Names in Footer
    families: {
        groomFamily: "Keluarga Besar Bapak Ir. H. Herman Pratama & Ibu Hj. Ratna Sari",
        brideFamily: "Keluarga Besar Bapak Dr. Gunawan Wijaya & Ibu Dra. Diana Novita"
    }
};

if (typeof window !== "undefined") {
    window.CONFIG = CONFIG;
}
