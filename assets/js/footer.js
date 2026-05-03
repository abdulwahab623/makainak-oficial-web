$(document).ready(function() {
    $('.footer-heading').on('click', function() {
        if (window.innerWidth <= 767) {
            var $list = $(this).next('ul.footer-list');
            var $icon = $(this).find('.toggle-icon');
            
            // Slide toggle the list
            $list.slideToggle(300, function() {
                // Update icon after toggle finishes
                if ($list.is(':visible')) {
                    $icon.text('-');
                } else {
                    $icon.text('+');
                }
            });
        }
    });

    // Handle window resize to reset state if moving from mobile to desktop
    $(window).on('resize', function() {
        if (window.innerWidth > 767) {
            $('.footer-list').css('display', ''); // Remove inline display style
            $('.toggle-icon').text('+'); // Reset icons
        }
    });
});
