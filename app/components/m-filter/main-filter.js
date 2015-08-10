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
	var hidden = h,
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
						$('.' + $(this).data('tab')).hide(anim);
						// console.log('.' + $(this).data('tab'));
					});

			$(this).addClass('active');

			if (hidden) {
				$('.' + $(this).data('tab')).show(anim).close(this);
			}else{
				$('.' + $(this).data('tab')).show(anim);
			}
		});
	});

	return this
};

$.fn.close = function(link) {
	var self = this,
		active = link,
		firstClick = true;

	$(document).off('click');

	$(document).on('click', function (event) {
		if (!firstClick && $(event.target).closest(self).length == 0 ) {
			self.hide();

			$(active).removeClass('active');
			$(document).off('click');
		}
		firstClick = false;
	});

	return this
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
