// Menunggu sampai semua konten HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {

    // --- Bagian 1: Logika Modal Video (Sudah Ada) ---
    
    // 1. Ambil elemen yang dibutuhkan
    const playButton = document.getElementById('play-hero-btn');
    const videoModal = document.getElementById('video-modal');
    const closeModalBtn = document.querySelector('.close-btn');

    // 2. Fungsi untuk menampilkan modal
    function openModal() {
        if(videoModal) {
            videoModal.style.display = 'block';
        }
    }

    // 3. Fungsi untuk menyembunyikan modal
    function closeModal() {
        if(videoModal) {
            videoModal.style.display = 'none';
            
            // Bonus: Hentikan video (iframe) saat modal ditutup
            const iframe = videoModal.querySelector('iframe');
            if (iframe) {
                const tempSrc = iframe.src;
                iframe.src = tempSrc; // Setting src ke dirinya sendiri akan me-reload iframe
            }
        }
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


    // --- Bagian 2: Logika Rating (Sudah Ada) ---

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

    
    // --- Bagian 3: LOGIKA BARU Halaman Detail ---

    // 1. Ambil elemen navigasi
    // (Ini adalah semua section di halaman utama)
    const homePageSections = document.querySelectorAll('.hero, .film-row, .rating-section'); 
    const detailPage = document.getElementById('detail-page');
    const backButton = document.getElementById('back-to-home');
    const filmCards = document.querySelectorAll('.film-card');
    
    // 2. Ambil elemen detail yang akan diisi
    const detailHeroBg = document.getElementById('detail-hero-bg');
    const detailPosterImg = document.getElementById('detail-poster-img');
    const detailTitle = document.getElementById('detail-title');
    const detailDesc = document.getElementById('detail-desc');
    
    // 3. Ambil tombol play di halaman detail
    const playDetailButton = document.getElementById('play-detail-btn');

    // 4. Fungsi Navigasi
    function showHomePage() {
        if (detailPage) detailPage.classList.add('hidden');
        
        // Tampilkan kembali semua section home page
        homePageSections.forEach(section => {
            // Kembalikan display style aslinya (hero = flex, lainnya = block)
            if (section.classList.contains('hero')) {
                section.style.display = 'flex';
            } else {
                section.style.display = 'block';
            }
        });
        
        window.scrollTo(0, 0); // Scroll ke atas
    }
    
    function showDetailPage(data) {
        // 4.1. Isi data ke elemen detail
        if (detailTitle) detailTitle.textContent = data.title;
        if (detailDesc) detailDesc.textContent = data.description;
        if (detailPosterImg) detailPosterImg.src = data.imageSrc;
        
        // 4.2. Set background blur dinamis
        if (detailHeroBg) detailHeroBg.style.backgroundImage = `url(${data.imageSrc})`;
        
        // 4.3. Sembunyikan semua section home page
        homePageSections.forEach(section => {
            section.style.display = 'none';
        });
        // 4.4 Tampilkan halaman detail
        if (detailPage) detailPage.classList.remove('hidden');
        window.scrollTo(0, 0); // Scroll ke atas
    }
    
    // 5. Event listener untuk tombol kembali
    if (backButton) {
        backButton.addEventListener('click', showHomePage);
    }
    
    // 6. Event listener untuk setiap kartu film
    filmCards.forEach(card => {
        card.addEventListener('click', () => {
            // 6.1. Ambil data dari kartu yang diklik
            const title = card.querySelector('.card-content h3')?.textContent;
            const description = card.querySelector('.card-content p')?.textContent;
            const imageSrc = card.querySelector('img')?.src;
            
            // 6.2. Pastikan semua data ada sebelum pindah
            if (title && description && imageSrc) {
                // 6.3. Panggil fungsi showDetailPage
                showDetailPage({ title, description, imageSrc });
            } else {
                console.error('Data kartu tidak lengkap:', card);
            }
        });
    });

    // 7. Hubungkan Tombol Play Halaman Detail ke Modal
    if (playDetailButton) {
        playDetailButton.addEventListener('click', openModal); 
    }
    
});

