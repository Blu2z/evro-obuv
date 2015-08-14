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

