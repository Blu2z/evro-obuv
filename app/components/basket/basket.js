$.fn.inputCount = function () {
	this.each(function() {

		var input = $(this).find('input[type="text"]');
			btn = $(this).find('.basket__count');

		input.on('keypress', function (e) {
			if( e.which > 57 || e.which < 48 || input.val().length >=2 ) e.preventDefault();
		});

		input.on('change', function (e) {
			var reg = /^\d+$/;
			if( !reg.test(input.val()) || input.val().length >2 || input.val().length == 0 || input.val() == 0) {
				e.preventDefault();
				input.val(1);
			}
		});
	

		btn.on('click', function (e) {
			e.preventDefault();

			if ($(this).hasClass('basket__count--next')) {

				if (+input.val() < 99) input.val(+input.val() + 1)

			} else if (+input.val() > 1) {
				input.val(+input.val() - 1);
			}
		})
	});
	return this;
};


$.fn.closeGoods = function () {
	this.each(function() {

		var self = this,
			btn = $(this).find('.basket__prod--close');

		console.log(btn);

		btn.on('click', function (e) {
			e.preventDefault();	

			$(self)
				.fadeTo(400, 0)
				.delay(200)
				.slideUp(400)
				.after('<p class="basket__delete">Товар удален <a href="#">восстановить</a></p>')
				.next()
				.delay(800)
				.show(300)
				.delay(40000)
				.fadeOut(6000)
				.find('a')
				.on('click', function (e) {
					e.preventDefault();

					$(self)
						.next()
						.clearQueue()
						.hide(300)
						.prev()
						.slideDown(400)
						.delay(200)
						.fadeTo(400, 1);
				});
		});
	})
};


var Validator = {
    init: function (options, elem) {

        var self = this;

        self.elem = elem;
        self.options = $.extend({}, $.fn.validator.options, options);
    }
}




$.fn.validator = function (options) {
    return this.each(function() {

        var valid = Object.create( Validator );
        valid.init( options, this );
    });

};

$.fn.validator.options = {
    //здесь будут опции
};