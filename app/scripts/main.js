var zoom = document.documentElement.clientWidth;
    $(window).resize(function() {
        var zoomNew = zoom / window.innerWidth;
        if( zoomNew < 0.91) {
           $('body').css({
                '-ms-zoom': 1,
                'zoom': 2.1 - zoomNew
                
            });
       } else {
           $('body').css('zoom', 1);
       }
    });