var SelectToList = {
        init: function (options, elem) {

            var optGroup, dropList, main,
                self = this;

            self.elem = elem;
            self.options = $.extend({}, $.fn.selectToList.options, options);
            self.optGroup = $(self.elem).find('select option');
            self.dropList = $(self.elem).find('.filter__drop');
            self.main = $(self.elem).find('.filter__cont');

            self.prepareList();

            self.main = $(self.elem).on('click', function () {
                self.dropped();
            })
        },

        prepareList: function () {
            var ul = $('<ul/>').prependTo(this.dropList);

            if(this.options.selection === "multi") {
                this.optGroup.each(function(index, el) {
                    ul.append('<li><input type="checkbox" name="' 
                        + $(this).attr('title') + index + '" id="' 
                        + $(this).attr('title') + index + '"><label for="' 
                        + $(this).attr('title') + index + '">' 
                        + $(this).html() + '</label></li>');
                });
            } else if(this.options.selection === "single") {
                this.optGroup.each(function(index, el) {
                    ul.append('<li><input type="checkbox" name="' 
                        + $(this).attr('title') + '" id="' 
                        + $(this).attr('title') + index + '"><label for="' 
                        + $(this).attr('title') + index + '">' 
                        + $(this).html() + '</label></li>');
                });
            }
            this.dropList.innerWidth( $(this.elem).innerWidth() );
        },

        dropped: function () {
            if ($(this.elem).hasClass('open') && this.dropList.is(":visible")) {
                this.dropList.slideUp(400);
                $(this.elem).removeClass('open');
                return
            }

            if (!$(this.elem).hasClass('open')) {
                $(this.elem).addClass('open');

               if (this.options.closed) {
                    this.dropList.slideDown(400).close({
                       allow: true,
                       link: this.elem,
                       class: 'open',
                       elements: 'filter__drop'
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
    selection : "multi",
    closed: true
};