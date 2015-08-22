;(function popup () {
	$('.popup__link').on('click', function (e) {
		e.preventDefault();
		var winHeight = $(document).height(),
		elem = $('.' + $(this).data('popup'))

		elem.css('height', winHeight).fadeIn(400);

		var top = ($(window).height() - elem.children('div').outerHeight(true)) / 2;

		elem.children('div').animate({'top' : top >= 0 ? top : 0}, 400);

		if(elem.children('div').outerHeight(true) > $(window).height()) {
			elem.children('div').css({
				'height': $(window).height(),
				'overflow-y': 'scroll'
			});
		}
	});

	$('.popup__close, .p__close').on('click', function (e) {
		e.preventDefault();

		$(this).closest('.popup').fadeOut(400).children('div').css({
			'height': 'auto',
			'overflow-y': 'hidden'
		});
	})
})()