$('.slider').slick({
	arrows: false,
	autoplay: true,
	infinite: true
});

var gallery = $('.images').isotope({
	itemSelector: '.images-column',
	masonry: {
		gutter: '.images-gutter',
		columnWidth: '.images-sizer'
	}
});
$('.tags a').on('click', function(e){
	e.preventDefault();
	$('.tags a').removeClass('active');
	$(this).addClass('active');
	var target = $(this).data('target');
	gallery.isotope({ filter: '.' + target });
	console.log(target);
});

$('.header-toggler input').on('change', function(){
	$('.header-nav').toggleClass('open');
});

$(".anchor").click(function(e) {
    e.preventDefault();
    $('.header-toggler input')
    	.prop('checked', false)
    	.trigger('change');

    $("html, body").animate({
       scrollTop: $($(this).attr("href")).offset().top + "px"
    }, 500, "swing");
});