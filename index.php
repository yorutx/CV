<?php
ini_set('display_errors', 'On');

// https://gitlab.com/unistra-caweb-public/pages-web-dynamiques

// On récupère les données de configuration du site
require_once __DIR__ . '/inc/config/settings.php';

// On récupère les fonctions
require_once __DIR__ . '/inc/lib/functions.php';

// On récupère les données du site
require_once __DIR__ . '/data/data.php';

// un pt : aller chercher la page ds laquelle tu es
// les deux points veulent dire que si il n'y a rien, il faut chercher index

// On récupère le template général
$mainTemplate = getTemplateContent('views/main');

// On remplace les tags {{ tag }} avec des parties du site
$aRemplacer = [
    '{{ siteTitle }}',
    '{{ header }}',
    '{{ content }}',
    '{{ footer }}',
    '{{ assetsPath }}'
];

$donneesDeRemplacement = [
    'siteTitle' => $siteTitle,
    'header' => getHeaderOnePage(),
    'content' => getAllSections(),
    'footer' => getFooter(),
    'assetsPath' => './assets'
];

// On affiche le rendu final
echo str_replace($aRemplacer, $donneesDeRemplacement, $mainTemplate);


// str_replace c'est quoi : on cherche quelque chose que l'on veut remplacer par quelque chose dans quelquechose : 
// dans la doc ya écrit mixed mixed mixed : cela signifie que cela marche avec tout type de variable
// dans l'exemple du dessus on voit que si il trouve dans mainTemplate, des éléments ds le tableau aRemplacer, il va remplacer par donnesDeRemplacement
// 
// 
// 
// 
// a quoi correspond les getContent etc
// 

//Push test





// astuce : regarder le site "php operators".com