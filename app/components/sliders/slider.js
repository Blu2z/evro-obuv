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

                    console.log($targetItem.prevAll().length + this.options.caseLimit);

                    switch (this.options.animation) {

                        case 'slide':
                            this.wrapper.animate({left : - newPosition});
                            console.log($targetItem.position());
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
            console.log(slider);
        });

    }; 

   //  $.fn.sliderShop.constructor.prototype.prot = { 
   //      animHide: function() {
   //          console.log('animHide');
   //          return this
   //     },
   //     animClose: function() {
   //          console.log('animClose');
   //          return this
   //     }
   // }

   $.fn.sliderShop.options = {
        caseLimit: 4, //кол-во товаров в витрине
        spaceSection: 'auto', //расстояние между секциями
        animation: 'slide', //тип анимации
        count: false // счетчик слайдов
    };


    


})( jQuery, window, document );

