;
ymaps.ready(init);

//координаты магазина находятся в дата-атрибуте ссылки

function init () {
    var myMap;

    $('.map').bind({
        click: function (e) {

            e.preventDefault();
            var coord = $(this).data('coord').split(',');

            $('.popup__map').show();

            // if (!myMap) { myMap.destroy(); }
                myMap = new ymaps.Map('map', {
                    center: coord, 
                    zoom: 15
                }, {
                    searchControlProvider: 'yandex#search'
                });  
            
            $('.map--close').one('click', function(e) {
                e.preventDefault();

                $('.popup__map').hide();

                myMap.destroy();// Деструктор карты
                myMap = null;

            });

            var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                balloonContentBody: [
            '<address>',
            '<strong>Магазин ЕвроОбувь в Одессе</strong>',
            '<br/>',
            'Адрес: 119021, Одесса, ул. Льва Толстого, 16',
            '<br/>',
            'Подробнее: <a href="http://eobuv.ru/">http://eobuv.ru/</a>',
            '</address>'
                ].join('')
            }, {
                preset: 'islands#redDotIcon'
            });

            myMap.geoObjects.add(myPlacemark);
        }
    });
};