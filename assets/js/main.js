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
    const audio        = document.getElementById('shuniji');
    const musicToggle  = document.getElementById('musicToggle');
    const img          = musicToggle.querySelector('img');
    let   isPlaying    = true;

    img.src = 'assets/src/cinamoroll-music.png';

    audio.play().then(() => {
        isPlaying = true;
        img.src = 'assets/src/cinamoroll-music.png';
    }).catch(err => {
        console.log('Autoplay failed:', err);
        isPlaying = false;
        img.src = 'assets/src/cinamoroll-music-asleep.png';
    });

    musicToggle.addEventListener('click', () => {
        const img = musicToggle.querySelector('img');
        if (isPlaying) {
            audio.pause();
            img.src = 'assets/src/cinamoroll-music-asleep.png';
        } else {
            audio.play();
            img.src = 'assets/src/cinamoroll-music.png';
        }
        isPlaying = !isPlaying;
    });
});