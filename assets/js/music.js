 document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('shuniji');
    const musicToggle = document.getElementById('musicToggle');
    const img = musicToggle.querySelector('img');
    let isPlaying = true;

    // Initialiser l'image au démarrage avec l'état playing
    img.src = 'assets/src/cinamoroll-music.png';

    // essai de démarrer la lecture ; l'appel peut être rejeté
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