document.addEventListener('DOMContentLoaded', function () {
    // Menu actif au scroll
    const links     = Array.from(document.querySelectorAll('header nav a[href^="#"]'));
    const menuItems = Array.from(document.querySelectorAll('header nav ul li'));
    const sections  = Array.from(document.querySelectorAll('section[id]'));

    if (links.length && sections.length) {
        function updateActiveLink() {
            menuItems.forEach(li => li.classList.remove('active'));
            for (let i = sections.length - 1; i >= 0; i--) {
                const rect = sections[i].getBoundingClientRect();
                if (rect.top <= 210) {
                    const link = document.querySelector(`header nav a[href="#${sections[i].id}"]`);
                    if (link && link.parentElement) {
                        link.parentElement.classList.add('active');
                    } 
                    break;
                }
            }
        }
        window.addEventListener('scroll', updateActiveLink, { passive: true });
        updateActiveLink();
    }

    // Menu burger
    const burger = document.getElementById('burger');
    const nav    = document.querySelector('header nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            nav.classList.toggle('open');
        });

        // Fermer le menu quand on clique sur un lien
        nav.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('open');
                nav.classList.remove('open');
            });
        });
    }

    // Musique
    const audio       = document.getElementById('shuniji');
    const musicToggle = document.getElementById('musicToggle');
    const musicImg    = musicToggle?.querySelector('img'); 
    let   isPlaying   = false;

    // Image initiale (pause)
    if (musicImg) musicImg.src = 'assets/src/cinamoroll-music-asleep.png';

    if (audio) {
        audio.volume = 0.5;
        audio.play().then(() => {
            isPlaying = true;
            musicToggle?.classList.add('pulsing');
            if (musicImg) 
                musicImg.src = 'assets/src/cinamoroll-music.png';
        }).catch(() => {
            isPlaying = false;
            musicToggle?.classList.remove('pulsing');
            if (musicImg) 
                musicImg.src = 'assets/src/cinamoroll-music-asleep.png';
        });
    }

    musicToggle?.addEventListener('click', () => {
        if (!audio) 
            return;

        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            musicToggle.classList.remove('pulsing');
            if (musicImg) 
                musicImg.src = 'assets/src/cinamoroll-music-asleep.png';
        } else {
            audio.play();
            isPlaying = true;
            musicToggle.classList.add('pulsing');
            if (musicImg) 
                musicImg.src = 'assets/src/cinamoroll-music.png';
        }
    });

    //Curseur d'écriture dans le about
    const lines = [
        'Développeuse web fullstack 💻',
        'Cheffe de projet ✨',
        'Trilingue 🇫🇷 🇬🇧 🇯🇵',
        'Master de Communication Web Multilingue Strasbourg 🎓',
        "En recherche d'alternance pour 2026–2027"
    ];
    const tw    = document.getElementById('typewriterLine');
    let   li    = 0, ci = 0, del = false;
    function typeStep() {
        const cur = lines[li];
        if (!del) {
            tw.textContent = cur.slice(0,++ci);
            if (ci === cur.length){del=true; setTimeout(typeStep,1800); 
                return;
            }
            setTimeout(typeStep,60);
        } else {
            tw.textContent = cur.slice(0,--ci);
            if (ci === 0){
                del = false; 
                li = (li + 1)%lines.length; 
                setTimeout(typeStep,400); 
                return;
            }
            setTimeout(typeStep,35);
        }
    }
    setTimeout(typeStep,800);

});