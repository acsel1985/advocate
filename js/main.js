let center = [56.143012068597976,47.191241500000004];

function init() {
    let map = new ymaps.Map('contacts__map', {
        center: center,
        zoom: 17,
        suppressMapOpenBlock: true,
    });

    let placemark = new ymaps.Placemark(center, {}, {
        // iconLayout: '',
        // iconImageHref: '',
        // iconImageSize: [],
        // iconImageOffset: [],
    });

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    // map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
    
    map.geoObjects.add(placemark);// добавляем элемент на карту
}

ymaps.ready(init);