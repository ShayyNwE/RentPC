$(document).ready(function() {
    $(window).scroll(function() {
        var filterSection = $('#filterSection');
        var footer = $('#footer');

        var filterRect = filterSection[0].getBoundingClientRect();
        var footerRect = footer[0].getBoundingClientRect();

        if (filterRect.bottom >= footerRect.top) {
            filterSection.removeClass('position-fixed');
            filterSection.addClass('absolute-position');
        } else {
            filterSection.addClass('position-fixed');
            filterSection.removeClass('absolute-position');
        }
    });
});