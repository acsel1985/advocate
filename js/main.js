// иницилизация yandex карты
let center = [56.143012068597976,47.191241500000004];

function init() {
    let map = new ymaps.Map('contacts__map', {
        center: center,
        zoom: 17,
        suppressMapOpenBlock: true,
        // controls: ['routePanelControl'],
    });

    let placemark = new ymaps.Placemark(center, {}, {
        // iconLayout: '',
        // iconImageHref: '',
        // iconImageSize: [],
        // iconImageOffset: [],
    });

    // let control = map.controls.get('routePanelControl');
    // let city = 'Чебоксары';
    // let addressOffice = 'ул. Мичмана Павлова, дом 8';

    // control.routePanel.state.set({
    //     type: 'masstransit',
    //     fromEnabled: true,
    //     toEnabled: true,
    //     to: `${city}, ${addressOffice}`,
    // });

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

// иницилизация modal-windows
const btns = document.querySelectorAll('.btn-open');// массив кнопок
const modalOverlay = document.querySelector('.modal__overlay');
const modals = document.querySelectorAll('.modal');// массив окон
let body = document.body;

btns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        let path =e.currentTarget.getAttribute('data-path');// в переменную записываю значение атрибута кнопки по которой кликнули

        modals.forEach(function(el) {
            el.classList.remove('modal--visible');
        });

        document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
        modalOverlay.classList.add('modal__overlay--visible');
        body.classList.add('stop-scroll')

    });
});

// закрытие по click закрытие окна
modalOverlay.addEventListener('click', function(e) {
    console.log(e.target);

    if(e.target == modalOverlay) {
        modalOverlay.classList.remove('modal__overlay--visible');
        body.classList.remove('stop-scroll')
        modals.forEach(function(el) {
           el.classList.remove('modal--visible');
        });
    }
});

// закрытие по esc
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        modalOverlay.classList.remove('modal__overlay--visible');
        body.classList.remove('stop-scroll')
        modals.forEach(function(el) {
           el.classList.remove('modal--visible');
        });
    }
});



