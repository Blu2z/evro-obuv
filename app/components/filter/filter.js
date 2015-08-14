var SelectToList = {
        init: function (options, elem) {

            var optGroup, dropList, main,
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
                // e.stopPropagation();
                self.dropped();
                console.log('click');
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
                   var text = $(this).text();
                   console.log(text);
                   console.log($(self.main));
                   $(self.main).html(text);
                })

            }
            this.dropList.innerWidth( $(this.main).innerWidth() );
        },

        dropped: function () {
            // if ($(this.elem).hasClass('open') && this.dropList.is(":visible")) {
            //     this.dropList.slideUp(400);
            //     $(this.elem).removeClass('open');
            //     return
            // }

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
    title: false,
    selection : "multi",
    closed: true
};




