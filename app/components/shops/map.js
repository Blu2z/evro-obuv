// ymaps.ready(init);

// // Инициализация и уничтожение карты при нажатии на кнопку.
// function init () {
//     var myMap;

//     $('.map').bind({
//         click: function () {
//             var coord = $(this).data('coord');
//             console.log(coord);
//             $('.popup').show();
//             if (!myMap) {
//                 myMap = new ymaps.Map('map', {
//                     center: [55.010251, 82.958437], // Новосибирск
//                     zoom: 9
//                 }, {
//                     searchControlProvider: 'yandex#search'
//                 });
//                 $("#toggle").attr('value', 'Скрыть карту');
//             }
//             else {
//                 myMap.destroy();// Деструктор карты
//                 myMap = null;
//                 // $("#toggle").attr('value', 'Показать карту снова');
//             }
//         }
//     });
// }