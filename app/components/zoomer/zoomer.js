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
              
            console.log('zoom');  

            self.elem = elem;
            self.options = $.extend({}, $.fn.sliderShop.options, options);

            self.prepareImg();

        },

        prepareImg: function () {
            var self = this;

            this.main = $(self.elem).find('.zoomer__main');
            this.tooltip = $(self.elem).find('.zoomer__tooltip');
            this.list = $(self.elem).find('.zoomer__list');

            this.list.find('a').each(function(index, el) {
                var link = $(this).attr("data-tab", 'zoom--' + index).attr('href');
                var img = $(this).children('img').attr('src');
                self.main.append("<img src='" + img + "' alt='foto' class='zoom--" + index + "' data-url='" + link + "'>");
            });

            this.list.tab();

            // $("img[style*='display: block;']")

        },
    };

    

    $.fn.zoomer = function (options) {
        return this.each(function() {
            
            var zoom = Object.create( Zoom );
            zoom.init( options, this );
        });

    }; 

   $.fn.zoomer.options = {};


    


})( jQuery, window, document );

