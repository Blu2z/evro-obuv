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




