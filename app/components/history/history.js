(function () {

	$('.history__row').on('click', function() {

		$(this).hasClass('active') 
			? $(this).removeClass('active').next('.history__details').slideUp(300)
			: $(this).addClass('active').next('.history__details').slideDown(300)

	})

})();