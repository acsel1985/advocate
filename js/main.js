// открыть\закрыть бургер-меню
let burger = document.querySelector('.btn-burger');
let menu = document.querySelector('.menu__list');
let menuLink = document.querySelectorAll('.menu__link');
let body = document.body;

burger.addEventListener('click', function() {
  burger.classList.toggle('btn-burger-active');
  menu.classList.toggle('menu__list-active');
  body.classList.toggle('stop-scroll');
  if (burger.getAttribute('aria-label') === 'Открыть меню') {
    burger.setAttribute("aria-label", 'Закрыть меню');
  } else {
    burger.setAttribute("aria-label", 'Открыть меню');
  }
});
menuLink.forEach(function(e) {
  e.addEventListener('click', function() {
    burger.classList.remove('btn-burger-active');
    burger.setAttribute("aria-label", 'Открыть меню');
    menu.classList.remove('menu__list-active');
    body.classList.remove('stop-scroll');
  });
});
document.addEventListener('click',
function(el) {
  let target = el.target;
  if(!target.closest('.header__burger')) {
    burger.classList.remove('btn-burger-active');
    burger.setAttribute("aria-label", 'Открыть меню');
    menu.classList.remove('menu__list-active');
    body.classList.remove('stop-scroll');
  }

});


// иницилизация modal-windows
const btns = document.querySelectorAll('.btn-open');// массив кнопок
const modalOverlay = document.querySelector('.modal__overlay');
const modals = document.querySelectorAll('.modal');// массив окон
const btnClose = document.querySelector('.btn-close');

btns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        let path =e.currentTarget.getAttribute('data-path');// в переменную записываю значение атрибута кнопки по которой кликнули

        modals.forEach(function(el) {
            el.classList.remove('modal--visible');
        });

        document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
        modalOverlay.classList.add('modal__overlay--visible');
        body.classList.add('stop-scroll');

    });
});

// закрытие закрытие окна по close
btnClose.addEventListener('click', function(e) {
  modalOverlay.classList.remove('modal__overlay--visible');
  body.classList.remove('stop-scroll');
  modals.forEach(function(el) {
    el.classList.remove('modal--visible');
  });
});

// закрытие закрытие окна по click
modalOverlay.addEventListener('click', function(e) {
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


// tabs
let tabsBtn = document.querySelectorAll('.servis_btn');
let tabsItem = document.querySelectorAll('.servis__content');

tabsBtn.forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    let path =e.currentTarget.getAttribute('data-path');
    
    tabsBtn.forEach(function(btn) {
      btn.classList.remove('servis_btn--active');
      e.currentTarget.classList.add('servis_btn--active');
    });

    tabsItem.forEach(function(item) {
      item.classList.remove('servis__content--active');
      document.querySelector(`[data-target="${path}"]`).classList.add('servis__content--active');
    });
  });
});

// иницилизация slider-swiper
const swiper = new Swiper('.swiper-slide', {
    // slidesPerView: 2,
    // spaceBetween: 24,
    centeredSlides: true,
    direction: 'horizontal',
    loop: true,
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'fraction',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
  
    mousewheel: {
      invert: true,
    },
  
    a11y: {
      paginationBulletMessage: 'Перейти к слайду {{index}}'
    },
  
  });

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

    // map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    // map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
    
    map.geoObjects.add(placemark);// добавляем элемент на карту
}

ymaps.ready(init);



