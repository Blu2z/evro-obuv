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
            this.tooltip = $(this.elem).find('.zoomer__tooltip');
            this.list = $(self.elem).find('.zoomer__list');

            console.log(this.list);

            this.list.find('a').each(function(index, el) {
                var link = $(this).attr("data-zoom", 'zoom--' + index).attr('href');
                self.main.append("<img src='" + link + "' alt='foto' class='zoom--" + index + "' >");
            });

            this.list.tab();
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

