<?php

/**
 * getContent
 *
 * @param  mixed $section
 * @return string
 */
function getContent(string $section): string 
{
    return getFileContent('data/sections/' . $section . '.html');
}

/**
 * getFileContent
 *
 * @param  mixed $key
 * @return string
 */
function getFileContent(string $key): string
{
    $path = ROOT_PATH . $key;
    if (!file_exists($path)) {
        return '';
    }
    $content = file_get_contents($path);
    return $content === false ? '' : $content;
}

/**
 * getFooter
 *
 * @return string
 */
function getFooter(): string
{
    global $siteTitle;

    $aRemplacer = [
        '{{ date }}',
        '{{ siteTitle }}',
    ];

    $donneesDeRemplacement = [
        'date' => date('Y'),
        'siteTitle' => $siteTitle,
    ];

    return str_replace($aRemplacer, $donneesDeRemplacement, getTemplateContent('views/sections/footer'));
}

/**
 * getHeader
 *
 * @return string
 */
function getHeader(): string
{
    global $siteTitle;

    $aRemplacer = [
        '{{ siteTitle }}',
        '{{ menu }}',
    ];

    $donneesDeRemplacement = [
        'siteTitle' => $siteTitle,
        'menu' => getSection(),
    ];

    return str_replace($aRemplacer, $donneesDeRemplacement, getTemplateContent('views/sections/header'));
}

/**
 * getTemplateContent
 *
 * @param  string $tpl
 * @return string
 */
function getTemplateContent(string $tpl): string
{
    return getFileContent($tpl . '.tpl.html');
}

/**
 * getSection
 * Génère les éléments du menu OnePage avec #id
 *
 * @return string
 */
function getSection(): string
{
    global $siteData;

    $menu = '';

    foreach ($siteData as $id => $section) {
        $aRemplacer = [
            '{{ active }}',
            '{{ url }}',
            '{{ label }}',
        ];

        $donneesDeRemplacement = [
            'active' => '',
            'url' => '#' . $id,
            'label' => $section['itemMenu'],
        ];

        $menu .= str_replace($aRemplacer, $donneesDeRemplacement, getTemplateContent('views/menu/menu-item'));
    }

    return $menu;
}


/**
 * getAllSections
 * Concatène le contenu de toutes les pages dans des <section id="..."> pour une version OnePage
 *
 * @return string
 */
function getAllSections(): string
{
    global $siteData;

    $output = '';

    foreach ($siteData as $id => $section) {
        $sectionContent = getContent($id);
        //recupere le path

        
        $output .= '<section id="' . $id . '" class="site-section">';
        $output .= '<div class="container">';
        $output .= '<h2>' . $section['titre'] . '</h2>';
        $output .= $sectionContent;
        $output .= '</div>';
        $output .= '</section>';
    }

    return $output;
}


/**
 * getHeaderOnePage
 * Génère l'en-tête en injectant un menu OnePage (ancres)
 *
 * @return string
 */
function getHeaderOnePage(): string
{
    global $siteTitle;

    $aRemplacer = [
        '{{ siteTitle }}',
        '{{ menu }}',
    ];

    $donneesDeRemplacement = [
        'siteTitle' => $siteTitle,
        'menu' => getSection(),
    ];

    return str_replace($aRemplacer, $donneesDeRemplacement, getTemplateContent('views/sections/header'));
}