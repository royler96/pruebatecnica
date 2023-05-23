

$('.close-sidebar').on('click', function () {
    /*$('.cnt-principal').removeClass("col-lg-10").addClass("col-lg-12");*/
    $('.cnt-sidebar').css({ 'display': 'none' });
    $('#widget-menu').css({ 'display': 'block' });

    return false;
});






$('#widget-menu').on('click', function () {
    /*$('.cnt-principal').removeClass("col-lg-12").addClass("col-lg-10");*/
    $('.cnt-sidebar').css({ 'display': 'block' });
    $(this).css({ 'display': 'none' });
    return false;
});


