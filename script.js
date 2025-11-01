// Menunggu sampai semua konten HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {

    // --- Pertemuan 3: Interaktivitas Tombol Play Video  ---
    
    // 1. Ambil elemen yang dibutuhkan
    const playButton = document.getElementById('play-hero-btn');
    const videoModal = document.getElementById('video-modal');
    const closeModalBtn = document.querySelector('.close-btn');

    // 2. Fungsi untuk menampilkan modal
    function openModal() {
        videoModal.style.display = 'block';
    }

    // 3. Fungsi untuk menyembunyikan modal
    function closeModal() {
        videoModal.style.display = 'none';
        
        // Bonus: Hentikan video (iframe) saat modal ditutup
        // Ini mencegah video terus berjalan di background
        const iframe = videoModal.querySelector('iframe');
        const tempSrc = iframe.src;
        iframe.src = tempSrc; // Setting src ke dirinya sendiri akan me-reload iframe
    }

    // 4. Tambahkan Event Listener (saat elemen diklik)
    if (playButton) {
        playButton.addEventListener('click', openModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // 5. Tutup modal jika user klik di luar area video
    window.addEventListener('click', (event) => {
        if (event.target === videoModal) {
            closeModal();
        }
    });


    // --- Pertemuan 3: Interaktivitas Tombol Rating/Reaction  ---

    // 1. Ambil semua elemen bintang
    const stars = document.querySelectorAll('.rating .star');

    // 2. Loop setiap bintang dan tambahkan event listener
    stars.forEach((star, index1) => {
        star.addEventListener('click', () => {
            
            // 3. Saat satu bintang diklik, loop semua bintang lagi
            stars.forEach((star, index2) => {
                
                // Jika index bintang (index2) <= index bintang yang diklik (index1),
                // beri warna (tambahkan kelas 'selected')
                if (index2 <= index1) {
                    star.classList.add('selected');
                } else {
                    // Jika tidak, hilangkan warnanya
                    star.classList.remove('selected');
                }
            });
            
            console.log(`Rating diberikan: ${index1 + 1} bintang`);
        });
    });

    // --- Pertemuan 3: Interaksi Kecil Lain (Opsional) [cite: 36] ---
    // Contoh: Alert saat klik tombol Akun
    const accountIcon = document.querySelector('.account');
    if (accountIcon) {
        accountIcon.addEventListener('click', () => {
            alert('Anda mengklik tombol Akun!');
        });
    }

});