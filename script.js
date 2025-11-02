
document.addEventListener('DOMContentLoaded', () => {

    const playButton = document.getElementById('play-hero-btn');
    const videoModal = document.getElementById('video-modal');
    const closeModalBtn = document.querySelector('.close-btn');

    function openModal() {
        if(videoModal) {
            videoModal.style.display = 'block';
        }
    }

    function closeModal() {
        if(videoModal) {
            videoModal.style.display = 'none';
            
            const iframe = videoModal.querySelector('iframe');
            if (iframe) {
                const tempSrc = iframe.src;
                iframe.src = tempSrc;
            }
        }
    }

    if (playButton) {
        playButton.addEventListener('click', openModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === videoModal) {
            closeModal();
        }
    });


    const stars = document.querySelectorAll('.rating .star');

    stars.forEach((star, index1) => {
        star.addEventListener('click', () => {
            
            stars.forEach((star, index2) => {
                
                if (index2 <= index1) {
                    star.classList.add('selected');
                } else {
                    star.classList.remove('selected');
                }
            });
            
            console.log(`Rating diberikan: ${index1 + 1} bintang`);
        });
    });

    const homePageSections = document.querySelectorAll('.hero, .film-row, .rating-section'); 
    const detailPage = document.getElementById('detail-page');
    const backButton = document.getElementById('back-to-home');
    const filmCards = document.querySelectorAll('.film-card');
    
    const detailHeroBg = document.getElementById('detail-hero-bg');
    const detailPosterImg = document.getElementById('detail-poster-img');
    const detailTitle = document.getElementById('detail-title');
    const detailDesc = document.getElementById('detail-desc');
    
    const playDetailButton = document.getElementById('play-detail-btn');

    function showHomePage() {
        if (detailPage) detailPage.classList.add('hidden');
        
        homePageSections.forEach(section => {
            if (section.classList.contains('hero')) {
                section.style.display = 'flex';
            } else {
                section.style.display = 'block';
            }
        });
        
        window.scrollTo(0, 0);
    }
    
    function showDetailPage(data) {
        if (detailTitle) detailTitle.textContent = data.title;
        if (detailDesc) detailDesc.textContent = data.description;
        if (detailPosterImg) detailPosterImg.src = data.imageSrc;
        
        if (detailHeroBg) detailHeroBg.style.backgroundImage = `url(${data.imageSrc})`;
        
        homePageSections.forEach(section => {
            section.style.display = 'none';
        });
        if (detailPage) detailPage.classList.remove('hidden');
        window.scrollTo(0, 0);
    }
    
    if (backButton) {
        backButton.addEventListener('click', showHomePage);
    }
    
    filmCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.card-content h3')?.textContent;
            const description = card.querySelector('.card-content p')?.textContent;
            const imageSrc = card.querySelector('img')?.src;
            
            if (title && description && imageSrc) {
                showDetailPage({ title, description, imageSrc });
            } else {
                console.error('Data kartu tidak lengkap:', card);
            }
        });
    });

    if (playDetailButton) {
        playDetailButton.addEventListener('click', openModal); 
    }
    
});
