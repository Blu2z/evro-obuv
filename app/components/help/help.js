(function() {
	$('dd').filter(':nth-child(n+4)').addClass('hide');

	$('dl').on('click', 'dt', function() {
		if($(this).hasClass('active')) {
			$(this).removeClass('active')
				.next()
					.slideUp(300);
			return
		}

		$(this)
			.siblings('dt')
				.removeClass('active');

		$(this)
			.addClass('active')
				.next()
					.slideDown(300)
						.siblings('dd')
							.slideUp(300);
	
	})
})();