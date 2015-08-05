'use strict';

if (typeof Object.create !== 'function') {
    Object.create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}

(function ($, window, document, undefined) {

var Tabs = {
	init: function (options, elem) {

		console.log(elem);

		var self = this,
			btn = $(elem).children();

		self.elem = elem;
		self.options = $.extend({}, $.fn.tabs.options, options);

		btn.on('click', function( e ) {
		e.preventDefault();

		var $this = $(this);

		if($this.hasClass('active')) return;

		

		btn.removeClass('active')
				.each(function() {
					$('.' + $(this).data('tab')).hide();
				});

		$this.addClass('active');
		$('.' + $this.data('tab')).show();
	});
	}
}

$.fn.tabs = function (options) {
        return this.each(function() {
            var tab = Object.create( Tabs );
            tab.init( options, this );
        });

    };

$.fn.tabs.options = {};

})( jQuery, window, document );