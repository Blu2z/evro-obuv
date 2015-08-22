$.fn.inputCount = function () {
	return this.each(function() {
		var input = $(this).find('input[type="text"]');

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
	

		$(this).find('.basket__count').on('click', function (e) {
			e.preventDefault();

			if ($(this).hasClass('basket__count--next')) {

				if (+input.val() < 99) input.val(+input.val() + 1)

			} else if (+input.val() > 1) {
				input.val(+input.val() - 1);
			}
		})
	});
};


$.fn.closeGoods = function () {
	return this.each(function() {
		var self = this;

		$(this).find('.basket__prod--close').on('click', function (e) {
			e.preventDefault();	

			$(self)
				.fadeTo(400, 0)
				.delay(200)
				.slideUp(400)
				.after('<p class="basket__delete">Товар удален <a href="#">восстановить</a></p>')
				.next()
				.delay(700)
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


// var Validator = {
//     init: function (options, elem) {

//         var self = this;

//         self.elem = elem;
//         self.options = $.extend({}, $.fn.validator.options, options);
//     }
// }

// $.fn.validator = function (options) {
//     return this.each(function() {

//         var valid = Object.create( Validator );
//         valid.init( options, this );
//     });

// };

// $.fn.validator.options = {
//     //здесь будут опции
// };

var SelectToList = {
        init: function (options, elem) {

            var optGroup, dropList, main, scroll,
                self = this;

            self.elem = elem;
            self.options = $.extend({}, $.fn.selectToList.options, options);
            self.optGroup = $(self.elem).find('select option');
            self.dropList = $(self.elem).find('.filter__drop');

            if (self.options.title) {
                self.main = $(self.elem).find('.filter-label');
            } else {
                self.main = $(self.elem)
            }

            self.prepareList();

            self.main.on('click', function (e) {
                self.dropped();
            })
        },

        prepareList: function () {
            var self = this,
                ul;

            if(this.options.selection === "multi") {
                ul = $('<ul/>').prependTo(this.dropList);
                this.optGroup.each(function(index, el) {
                    ul.append('<li><input type="checkbox" name="' 
                        + $(this).attr('title') + index + '" id="' 
                        + $(this).attr('title') + index + '"><label for="' 
                        + $(this).attr('title') + index + '">' 
                        + $(this).html() + '</label></li>');
                });

                 $(this.elem).find('input[type="checkbox"] + label').on('click', function () {
                    var inText = ' ';
                    console.log($(self.elem).find('input[type="checkbox"]:checked + label'));

                    setTimeout(function () {
                        var check = $(self.elem).find('input[type="checkbox"]:checked + label').each(function(index, el) {

                        inText += $(this).text() + ' ';

                        });

                        if(inText.length > 15) {
                            inText = ' выбрано:' + check.length
                        }

                        $(self.main).find('span').html(inText);
                    },200)
                })

            } else if(this.options.selection === "single") {
                ul = $('<ul/>').prependTo(this.dropList);
                this.optGroup.each(function(index, el) {
                    ul.append('<li><input type="radio" name="' 
                        + $(this).attr('title') + '" id="' 
                        + $(this).attr('title') + index + '" value="' 
                        + index + '"><label for="' 
                        + $(this).attr('title') + index + '">' 
                        + $(this).html() + '</label></li>');
                });

                $(this.elem).find('input[type="radio"] + label').on('click', function () {

                   $(self.main).html($(this).text());
                })

            }
            
            this.dropList.innerWidth( $(this.main).innerWidth() );

            if(this.options.scroll && this.dropList.show().children('ul').height() > 150) {
                ul.wrap('<div class="scroll__wrapper"></div>');

                this.dropList
                    .children('div')
                        .css('min-height', 150)
                            .customScrollbar({
                                skin : 'modern-skin',
                                updateOnWindowResize : true,
                                vScroll: true
                            });
            };

            this.dropList.hide();
        },

        dropped: function () {
            if (!$(this.elem).hasClass('open')) {
                $(this.elem).addClass('open');

               if (this.options.closed === true) {
                    this.dropList.slideDown(300).close({
                       allow: true,
                       link: this.elem,
                       class: 'open',
                       elements: 'filter__drop'
                   });
                }

                if (this.options.closed === 'forse') {
                    this.dropList.slideDown(300).close({
                       allow: true,
                       link: this.elem,
                       class: 'open',
                       elements: 'filter__drop',
                       forced: true
                   });
                }
            }
        }
    }

$.fn.selectToList = function (options) {
    return this.each(function() {

        var selectList = Object.create( SelectToList );
        selectList.init( options, this );
    });

};

$.fn.selectToList.options = {
    // title: false,
    selection : "multi",
    closed: true,
    scroll : true
};

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

(function () {

	$('.history__row').on('click', function() {

		$(this).hasClass('active') 
			? $(this).removeClass('active').next('.history__details').slideUp(300)
			: $(this).addClass('active').next('.history__details').slideDown(300)

	})

})();

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

		var btn = $(this).find('a'),
			self = this;

		if (destroy) {
			btn.off();
			return this
		}

		btn.on('click', function( e ) {
			e.preventDefault();

			if($(this).hasClass('active')) return;

			btn.removeClass('active')
					.each(function() {
						$(self).parent().find('.' + $(this).data('tab')).hide(anim);
					});

			$(this).addClass('active');

			if (hidden) {
				$(self).parent().find('.' + $(this).data('tab')).show(anim).close({
					allow: true,
				    link: this,
				});
			} else {
				$(self).parent().find('.' + $(this).data('tab')).show(anim);
			}

			// $(document).trigger('tab');
			// console.log('tab');
		});
	});

	return this
};

$.fn.close = function (options) {
    return this.each(function() {
    	var self = this,
    		name = 'close' + Math.random() * (100 - 1) + 1;
        var closed = Object.create( Close );

        closed.init( options, this );
    });
};

$.fn.close.options = {
    allow : false, //снять все обработчики перед стартом.
    link: this, // элемент, с которого нужно удалить класс
    class: 'active', // имя класса, который нужно удалить 
    elements: false, // закрыть все блоки с данным классом
    forced: false //закрыть при любом клике
};

var Close = {
	// следим за переданными элементами, в зависимости от опций закрываем при клике на пустом месте
	init: function (options, elem) {
		var self = this,
			firstClick = true,
			name = Math.random() * (100 - 1) + 1;

            self.elem = elem;
            self.options = $.extend({}, $.fn.close.options, options);

		if (this.options.allow) $(document).off('click');

		if (self.options.elements) {
			var el1 = $('.' + self.options.elements).not($(self.elem)),
				el2 = $('.' + self.options.elements).not($(self.elem)).parent();

				self.close(el1, el2)
		}

		$(document).on('click.name', function (event) {
			event.stopPropagation()

			// console.log(!firstClick + ',' + self.options.forced);

			if(!firstClick){

				if (self.options.forced  || $(event.target).closest(self.elem).length == 0 ) {

					self.close(self.elem, self.options.link);
					
					$(document).off('click.name');
				}

			}

			firstClick = false;
		});
	},

	close: function (el1, el2) {
		$(el1).hide();

		$(el2).removeClass(this.options.class);
	}
}

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
})();

;
ymaps.ready(init);

//координаты магазина находятся в дата-атрибуте ссылки

function init () {
    var myMap;

    $('.map').bind({
        click: function (e) {

            e.preventDefault();
            var coord = $(this).data('coord').split(',');

            $('.popup__map').show();

            // if (!myMap) { myMap.destroy(); }
                myMap = new ymaps.Map('map', {
                    center: coord, 
                    zoom: 15
                }, {
                    searchControlProvider: 'yandex#search'
                });  
            
            $('.map--close').one('click', function(e) {
                e.preventDefault();

                $('.popup__map').hide();

                myMap.destroy();// Деструктор карты
                myMap = null;

            });

            var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                balloonContentBody: [
            '<address>',
            '<strong>Магазин ЕвроОбувь в Одессе</strong>',
            '<br/>',
            'Адрес: 119021, Одесса, ул. Льва Толстого, 16',
            '<br/>',
            'Подробнее: <a href="http://eobuv.ru/">http://eobuv.ru/</a>',
            '</address>'
                ].join('')
            }, {
                preset: 'islands#redDotIcon'
            });

            myMap.geoObjects.add(myPlacemark);
        }
    });
};

/* jshint devel:true */

/* 
Структура слайдера:
<div> --контейнер с классом/ид
    <div> --обертка окна показа слайдов. Если ее нет ширирна считается от контейнера
        <ul class="slider__wrapper"> --простенький список
            <li> --любое содержимое
        </ul>
    </div>
    .nav nav--prev --навигация
    .nav nav--next
    .slider__input --счетчик слайдов
</div>
 */


'use strict';

if (typeof Object.create !== 'function') {
    Object.create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}

(function ($, window, document, undefined) {

    var Slider = {
        init: function (options, elem) {

            var self = this;
            var swither, wrapper;

            self.maxScrollPosition = 0;
            self.elem = elem;

            self.options = $.extend({}, $.fn.sliderShop.options, options);

            self.calcConst();

            $(this.elem).find('.nav').on('click', function (e) {
                e.preventDefault();

                var $targetItem = $(elem).find('.swither__item--edge');

                $(this).hasClass('nav--prev') 
                    ? self.toGalleryItem($targetItem.prev())
                    : self.toGalleryItem($targetItem.next());
            });
        },

        calcConst: function () {
            var self = this,
                totalWidth = 0,
                section = $(this.elem).outerWidth() - 40;
            
            this.wrapper = $(this.elem).find('.slider__wrapper');
            this.swither = this.wrapper.children().addClass('swither__item'); 

            var space = this.wrapper.parent().width() - this.swither.outerWidth(true)*this.options.caseLimit,
                elspace =(this.options.spaceSection === 'auto') 
                                                ? space / (this.options.caseLimit * 2) 
                                                : this.options.spaceSection;

                elspace = ( space < 0 ) ? 0 : elspace;

                this.swither
                    .css({
                        'margin-left': elspace,
                        'margin-right': elspace
                    })
                    .each(function() {
                        totalWidth = totalWidth + $(this).outerWidth(true);
                    });

            if (this.options.count == 1) {
                $(this.elem).find('.slider__input').text('1 / ' + this.swither.length)
            }

            self.maxScrollPosition = totalWidth - this.swither.outerWidth(true) * this.options.caseLimit;

            this.wrapper.width(totalWidth + 20);

            this.swither.first().addClass('swither__item--edge');
        },

        toGalleryItem:  function ($targetItem) {
            var self = this;

            if($targetItem.length) {

                var newPosition = $targetItem.position().left;

                if(newPosition <= self.maxScrollPosition+2) {

                    $targetItem.addClass('swither__item--edge');
                    $targetItem.siblings().removeClass('swither__item--edge');

                    if (this.options.count == 1) {
                        $(this.elem).find('.slider__input')
                            .text($targetItem.prevAll().length + this.options.caseLimit + ' / ' + this.swither.length)
                    }

                    switch (this.options.animation) {

                        case 'slide':
                            this.wrapper.animate({left : - newPosition});
                            break;

                        case 'hide-show':
                            this.wrapper.css({
                                'opacity' : '0',
                                'left' : - newPosition
                            }) 
                            .animate({opacity : 1});
                            break; 
                    } 
                }
            }
        } 
    };   

    $.fn.sliderShop = function (options) {
        return this.each(function() {
            
            var slider = Object.create( Slider );
            slider.init( options, this );
        });

    }; 

   $.fn.sliderShop.options = {
        caseLimit: 4, //кол-во товаров в витрине
        spaceSection: 'auto', //расстояние между секциями
        animation: 'slide', //тип анимации
        count: false // счетчик слайдов
    };

})( jQuery, window, document );

/* jshint devel:true */

/*
Структура зумера:
<div class="zoomer"> --контейнер обертка
    <div class="zoomer__main"></div> -- первью (должен быть пустым)
    <div class="zoomer__tooltip"></div> -- окно большого изображения (должно быть пустым)
    <ul class="zoomer__list"> - список миниатюр
        <li class="active">
            <a href="images/zoomer-img-big1.jpg"> -- ссылка на большое изображение
                <img src="./images/zoomer-img-def1.jpg" alt="foto"> -- изображение превью
            </a>
        </li>
    </ul>
</div>
*/


'use strict';

if (typeof Object.create !== 'function') {
    Object.create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}

(function ($, window, document, undefined) {

    var Zoom = {
        init: function (options, elem) {

            var main, tooltip, list, scale, imgTooltip, imgTooltipWidth, imgTooltipHeight,
                self = this;

            self.elem = elem;
            self.options = $.extend({}, $.fn.zoomer.options, options);
            self.main = $(self.elem).find('.zoomer__main');
            self.tooltip = $(self.elem).find('.zoomer__tooltip');
            self.list = $(self.elem).find('.zoomer__list');

            self.prepareImg();

            self.main.hover(function() {
                self.tooltip.fadeIn(400);
                self.addTooltip();
            }, function () {
                self.tooltip.fadeOut(400);
            });

            self.zoomMove();

        },

        prepareImg: function () {
            var self = this;

            this.list.find("a").each(function(index, el) {
                var link = $(this).attr("data-tab", 'zoom--' + index).attr('href'),
                    img = $(this).children("img").attr("src");

                self.main.append("<img src='" + img + "' alt='foto' class='zoom--" + index + "' data-url='" + link + "'>");
            });

            self.list.tab().find('a').first().trigger('click');
        },

        zoomMove: function () {
            var self = this;

            self.main.on('mousemove', function(e) {
                    var offset = $(this).offset(),
                    x = e.pageX - offset.left,
                    y = e.pageY - offset.top,
                    ratio = self.scale === 0 ? 0 : 250;

                    $(self.imgTooltip).css({
                        top: -y * self.scale + ratio,
                        left: -x * self.scale + ratio
                    });
                });
        },

        zoomOn: function (img, width, height) {
            var self = this;

            self.imgTooltip = $(img);
            
            //провереям размеры и ориентацию картинки,
            // если нужно - "окводрачиваем" маржинами.
            // 500px - сторона окна большого изображения.

            if (width <= 500 || height <= 500) {
                var max = 500;
                self.scale = 0;
            } else {
                var max = height >= width ? height : width;
                self.scale = max / 320;
            }

            self.imgTooltip.css({
                'margin-left': (max - width)/2,
                'margin-right': (max - width)/2,
                'margin-top' : (max - height)/2,
                'margin-bottom' : (max - height)/2
            });
        },

        addTooltip: function () {
            var self = this,
                imgBig = this.main.find('img').map(function(index, el) {
                    if ( $(this).is(':visible')) return this;          
                }).data('url');

            var img = new Image();

            img.onload = function() {
                self.tooltip.empty().append(img);

                self.zoomOn(this, this.width, this.height);
            };

            img.src = imgBig;
        }
    };

$.fn.zoomer = function (options) {
    return this.each(function() {

        var zoom = Object.create( Zoom );
        zoom.init( options, this );
    });

};

$.fn.zoomer.options = {
    //здесь будут опции
};

})( jQuery, window, document );