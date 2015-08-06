'use strict';

if (typeof Object.create !== 'function') {
    Object.create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}

(function ($, window, document, undefined) {

// ========================

$.fn.tab = function (h,a,d) {
	var hiden = h,
		anim = a,
		destroy = d;

	this.each(function() {

		var btn = $(this).find('a');

		if (destroy) {
			btn.off();
			return this
		}

		btn.on('click', function( e ) {
			e.preventDefault();

			if($(this).hasClass('active')) return;

			btn.removeClass('active')
					.each(function() {
						$('.' + $(this).data('tab')).hide();
					});

			$(this).addClass('active');
			$('.' + $(this).data('tab')).show();

			if (hiden) {$('.' + $(this).data('tab')).close}
		});
	});

	return this
};

$.fn.close = function() {
	var self = this;

	$(document).on('click', function (event) {
		if ($(event.target).closest(self).length == 0)
			self.hide();
		return
	});
};

$.fn.selectAll = function (dest) {
	var destroy = dest;

	this.each(function() {

		var btn = $(this).find('.select--all'),
			$this = $(this);

		if (destroy) {
			btn.off();
			return 
		}

		btn.on('click', function( e ) {
			e.preventDefault();

			var check = btn.toggleClass('checked').hasClass('checked');

			$this.find('input[type="checkbox"]').each(function(index, el) {
				 this.checked = check;
			});
		});
	});

	return this
}

})( jQuery, window, document );
