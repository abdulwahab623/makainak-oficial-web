$(document).ready(function() {
    // Open mobile drawer
    $('#hamburgerBtn').on('click', function() {
        $('.mobile-drawer').addClass('open');
        $('.drawer-overlay').addClass('open');
        $('body').css('overflow', 'hidden'); // Prevent background scrolling
    });

    // Close mobile drawer
    $('#closeDrawer, .drawer-overlay').on('click', function() {
        $('.mobile-drawer').removeClass('open');
        $('.drawer-overlay').removeClass('open');
        $('body').css('overflow', '');
    });

    // Mobile Dropdown Toggle
    $('.mobile-dropdown-toggle').on('click', function(e) {
        e.preventDefault();
        $(this).next('.mobile-dropdown-menu').slideToggle(300);
        $(this).find('i').toggleClass('bi-caret-down-fill bi-caret-up-fill');
    });

    // Mobile Submenu Toggle
    $('.mobile-submenu-toggle').on('click', function(e) {
        e.preventDefault();
        $(this).next('.mobile-sub-menu').slideToggle(300);
        $(this).find('i').toggleClass('bi-caret-down-fill bi-caret-up-fill');
    });
});
