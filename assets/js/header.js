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

    // Open Login Modal
    $('.sign-in-link, .switch-to-login').on('click', function(e) {
        e.preventDefault();
        $('#signupModal').removeClass('active');
        $('#loginModal').addClass('active');
        $('body').css('overflow', 'hidden');
        
        $('.mobile-drawer').removeClass('open');
        $('.drawer-overlay').removeClass('open');
    });

    // Open Signup Modal
    $('.sign-up-link, .switch-to-signup').on('click', function(e) {
        e.preventDefault();
        $('#loginModal').removeClass('active');
        $('#signupModal').addClass('active');
        $('body').css('overflow', 'hidden');
        
        $('.mobile-drawer').removeClass('open');
        $('.drawer-overlay').removeClass('open');
    });

    // Close Modals
    $('.modal-close, .modal-overlay').on('click', function(e) {
        if (e.target !== this && !$(e.target).hasClass('modal-close') && !$(e.target).closest('.modal-close').length) return;
        $('.modal-overlay').removeClass('active');
        if (!$('.mobile-drawer').hasClass('open')) {
            $('body').css('overflow', '');
        }
    });
});
