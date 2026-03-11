<?php
    // On intègre la configuration
    require_once __DIR__ . '/../config/settings.php';
?>
    <!-- Header -->
    <header id="header">
        <!-- Include header content here -->
        <h1><?php echo $siteTitle; ?></h1>
        <?php include_once __DIR__ . '/../modules/menu.php'; ?>
    </header>