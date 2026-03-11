document.addEventListener('DOMContentLoaded', function () {
    // Marquer le menu sélectionné (ajoute la classe 'active' sur le <li>)
    const links = Array.from(document.querySelectorAll('header nav a[href^="#"]'));
    const menuItems = Array.from(document.querySelectorAll('header nav ul li'));
    const sections = Array.from(document.querySelectorAll('section[id]'));

    if (!links.length || !sections.length) return;

    function updateActiveLink() {
        // retirer la classe active de tous les <li>
        menuItems.forEach(li => li.classList.remove('active'));

        // trouver la section visible et activer son lien parent (<li>)
        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                const link = document.querySelector(`header nav a[href="#${section.id}"]`);
                if (link && link.parentElement) {
                    link.parentElement.classList.add('active');
                }
                break; // on active la première section correspondante
            }
        }
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    // initialisation au chargement
    updateActiveLink();
});

