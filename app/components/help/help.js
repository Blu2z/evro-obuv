(function() {
	$('dd').filter(':nth-child(n+4)').addClass('hide');
	$('dl').on('click', 'dt', function() {
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