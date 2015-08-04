/* jshint devel:true */
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

            self.maxScrollPosition = 0;
            self.switcher = 0;   
            self.elem = elem;
            self.$elem = $ (elem);

            self.options = $.extend({}, $.fn.sliderShop.options, options);

            console.log(self);

            $.extend(self, $.fn.sliderShop.prot);

            console.log('sliderShop');

            self.calcConst();

            $(this.elem).find('.nav--prev').on('click', function (e) {
                e.preventDefault();
                var $targetItem = self.$elem.find('.swither__item--edge').prev();

                self.toGalleryItem($targetItem);
            });

            $(this.elem).find('.nav--next').on('click', function (e) {
                e.preventDefault();
                var $targetItem = self.$elem.find('.swither__item--edge').next();

                self.toGalleryItem($targetItem);

                // console.log(self);

                // self.animHide($targetItem);
                // self.animClose($targetItem);
            });

        },

        calcConst: function () {
            var self = this,
                totalWidth = 0,
                totalHeigt = 0,
                totalTitle = 0,
                section = $(this.elem).outerWidth() - 40,
                contentWidth = section / this.options.caseLimit - this.options.spaceSection * 2;
             
            $(this.elem).find('li').addClass('swither__item');
            $(this.elem).find('ul').addClass('slider__wrapper');


            $(this.elem).width(section);

            $(this.elem).find('.swither__item')
                            .css({
                                    width:contentWidth + this.options.spaceSection * 2,
                                    'padding-left': this.options.spaceSection,
                                    'padding-right': this.options.spaceSection
                                })
                                .each(function() {
                                    totalWidth = totalWidth + $(this).outerWidth(true);
                                });

            this.options.title
                ? totalTitle += $(this.elem).find('.slider__title').outerHeight()
                : $(this.elem).find('.slider__title').hide();

            // !this.options.category
            //     ? category.hide()
            //     : totalHeigt += category.outerHeight();

            // totalHeigt += $(this.elem).find('.slider__wrapper p').outerHeight();

            self.maxScrollPosition = totalWidth - $(this.elem).outerWidth();
            self.switcher = $(this.elem).find('.slider__wrapper');

            self.switcher.width(totalWidth + 20);

            $(this.elem).find('.swither__item:first').addClass('swither__item--edge');

            if (this.options.autoHeight === 'true') {
                $(this.elem).find('.swither__item').height(contentWidth);
                $(this.elem).height(totalHeigt + contentWidth);
                $(this.elem).height(totalHeigt + contentWidth + 40 + totalTitle);
            } else {
                $(this.elem).find('.swither__item').height(this.options.autoHeight);
            }

        },

        toGalleryItem:  function ($targetItem) {
            var self = this;

            if($targetItem.length) {

                var newPosition = $targetItem.position().left;

                console.log(newPosition + ',' + self.maxScrollPosition);

                if(newPosition <= self.maxScrollPosition+3) {

                    $targetItem.addClass('swither__item--edge');
                    $targetItem.siblings().removeClass('swither__item--edge');
                    self.switcher.css({
                        'opacity' : '0',
                        'left' : - newPosition
                    });

                    self.switcher.animate({
                        opacity : 1
                        // left : - newPosition
                    });
                }// } else {
                    
                //     self.switcher.css({
                //         'opacity' : '0',
                //         'left' : - self.maxScrollPosition,
                //     });
                //     self.switcher.animate({
                //         // left : - self.maxScrollPosition,
                //         opacity : 1,
                //     });
                // }
            }
        } 
    };

// var animHide = function () {
//     console.log('animHide');
//     return this;
// }

// Slider.__proto__ = animHide;



   console.log(Slider);

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
        autoHeight: 'false', // высота всего слайдера
        caseLimit: 4, //кол-во товаров в витрине
        spaceSection: 15, //расстояние между секциями
        animation: "slide", //тип анимации
        count: false // счетчик слайдов
    };


    


})( jQuery, window, document );

