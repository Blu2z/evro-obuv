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

    var Zoom = {
        init: function (options, elem) {

            var self = this;
            var main, tooltip, list;

            self.elem = elem;
            self.options = $.extend({}, $.fn.sliderShop.options, options);
            self.main = $(self.elem).find('.zoomer__main');
            self.tooltip = $(self.elem).find('.zoomer__tooltip');
            self.list = $(self.elem).find('.zoomer__list');

            self.prepareImg();

            self.main.hover(function() {
                self.addTooltip();
                self.zoomOn();
            }, function () {
                return false
            })

        },

        prepareImg: function () {
            var self = this;

            this.list.find('a').each(function(index, el) {
                var link = $(this).attr("data-tab", 'zoom--' + index).attr('href');
                var img = $(this).children('img').attr('src');
                self.main.append("<img src='" + img + "' alt='foto' class='zoom--" + index + "' data-url='" + link + "'>");
            });

            this.list.tab().find('a').first().trigger('click');
        },

        zoomOn: function () {
            var self = this;

            this.tooltip.children().hide().on('load', function() {
                var scale,
                    imgTooltip = self.tooltip.children(),
                    imgTooltipWidth =  imgTooltip.outerWidth(),
                    imgTooltipHeight = imgTooltip.outerHeight();

                //провереям размеры и ориентацию картинки,
                // если нужно - "окводрачиваем" маржинами.
                if (imgTooltipWidth <= 500 || imgTooltipHeight <= 500) {

                    imgTooltip.css({
                        'margin-left': (500 - imgTooltipWidth)/2,
                        'margin-right': (500 - imgTooltipWidth)/2,
                        'margin-top' : (500 - imgTooltipHeight)/2,
                        'margin-bottom' : (500 - imgTooltipHeight)/2
                    });

                    scale = 0;

                } else {

                    var max =  imgTooltip.outerHeight(true) >= imgTooltip.outerWidth(true)
                        ? imgTooltip.outerHeight(true)
                        : imgTooltip.outerWidth(true);

                    imgTooltip.css({
                        'margin-left': (max - imgTooltipWidth)/2,
                        'margin-right': (max - imgTooltipWidth)/2,
                        'margin-top' : (max - imgTooltipHeight)/2,
                        'margin-bottom' : (max - imgTooltipHeight)/2
                    });
                         
                    scale = max / 320;
                }

                self.main.on('mousemove', function(e) {
                    var offset = $(this).offset(),
                        x = e.pageX - offset.left,
                        y = e.pageY - offset.top,
                        ratio = scale==0 ? 0 :250;

                    imgTooltip.css({
                        top: -y * scale + ratio,
                        left: -x * scale + ratio
                    });  
                });
            });

            this.tooltip.children().fadeIn('slow');
        },

        addTooltip: function () {
            var self = this,
                imgBig;

            imgBig = self.main.find('img').map(function(index, el) {
               if( $(this).is(':visible')) return this;          
            }).data('url');

            this.tooltip.html("<img src='" + imgBig + "' alt='foto' >");
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

