// открыть\закрыть бургер-меню
let burger = document.querySelector('.btn-burger');
let menu = document.querySelector('.menu__list');
let menuLink = document.querySelectorAll('.menu__link');
const body = document.body;

let disableScroll = function() {
  let paddingOffset = window.innerWidth - body.offsetWidth + 'px';
  body.style.paddingRight = paddingOffset;
  body.classList.add('disable-scroll');
}

let enableScroll = function() {
  body.style.paddingRight = '0px';
  body.classList.remove('disable-scroll');
}


let focusCatch = function(e) {
  
}

let focusTrap = function() {

}

burger.addEventListener('click', function() {
  burger.classList.toggle('btn-burger-active');
  menu.classList.toggle('menu__list-active');
  if (burger.getAttribute('aria-label') === 'Открыть меню') {
    burger.setAttribute("aria-label", 'Закрыть меню');
    disableScroll();
  } else {
    burger.setAttribute("aria-label", 'Открыть меню');
    enableScroll();
  }
});
menuLink.forEach(function(e) {
  e.addEventListener('click', function() {
    burger.classList.remove('btn-burger-active');
    burger.setAttribute("aria-label", 'Открыть меню');
    menu.classList.remove('menu__list-active');
    enableScroll();
  });
});
document.addEventListener('click',
function(el) {
  let target = el.target;
  if(!target.closest('.header__burger') && burger.classList.contains('btn-burger-active')) {
    burger.classList.remove('btn-burger-active');
    burger.setAttribute("aria-label", 'Открыть меню');
    menu.classList.remove('menu__list-active');
    enableScroll();
  }

});

// иницилизация modal-windows
const btns = document.querySelectorAll('.btn__open');
const modalOverlay = document.querySelector('.modal__overlay');
const modals = document.querySelectorAll('.modal');
const btnClose = document.querySelector('.btn-close');

btns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        let path =e.currentTarget.getAttribute('data-path');

        modals.forEach(function(el) {
            el.classList.remove('modal--visible');
        });
        
        document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
        modalOverlay.classList.add('modal__overlay--visible');
        disableScroll();
    });
});

// закрытие закрытие окна по close
btnClose.addEventListener('click', function(e) {
  modalOverlay.classList.remove('modal__overlay--visible');
  enableScroll();
  modals.forEach(function(el) {
    el.classList.remove('modal--visible');
  });
});

// закрытие закрытие окна по click
modalOverlay.addEventListener('click', function(e) {
    if(e.target == modalOverlay) {
        modalOverlay.classList.remove('modal__overlay--visible');
        enableScroll();
        modals.forEach(function(el) {
           el.classList.remove('modal--visible');
        });
    }
});

// закрытие по esc
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        modalOverlay.classList.remove('modal__overlay--visible');
        enableScroll();
        modals.forEach(function(el) {
           el.classList.remove('modal--visible');
        });
    }
});

// inputmask
 const form = document.querySelector('.form');
 const telSelector = form.querySelector('input[type="tel"]');
 const inputMask = new Inputmask('+7 (999) 999-99-99');
 inputMask.mask(telSelector);

// validate form
const validation = new JustValidate('.form');

validation
  .addField('#name', [
    {
      rule: 'minLength',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 30,
    },
    {
      rule: 'required',
      value: true,
      errorMessage: 'Введите имя',
    },
  ])
  .addField('#tel', [
    {
      rule: 'required',
      errorMessage: 'Телефон обязателен',
    },
    {
      rule: 'function',
      validator: function() {
        const phone = telSelector.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
      errorMessage: 'Введите корректный телефон',
    },
  ])
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Email обязателен',
    },
    {
      rule: 'email',
      errorMessage: 'Введите корректный Email',
    },
  ]).onSuccess((event) => {
    console.log('Validation passes and form submitted', event);
    let formData = new FormData(event.target);

    console.log(...formData);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Отправлено');
        }
      }
    }

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);

    event.target.reset();
  }); 

// tabs
if (window.innerWidth > 768) {
  let tabsBtn = document.querySelectorAll('.servis__btn');
  let tabsItem = document.querySelectorAll('.servis__tab-content');

  tabsBtn.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      let path =e.currentTarget.getAttribute('data-path');
      
      tabsBtn.forEach(function(btn) {
        btn.classList.remove('servis__btn--active');
        e.currentTarget.classList.add('servis__btn--active');
      });
  
      tabsItem.forEach(function(item) {
        item.classList.remove('tab--visible');
        document.querySelector(`[data-target="${path}"]`).classList.add('tab--visible');
      });
    });
  });
}
if (window.innerWidth <= 768) {

  $(function () {
    $(".accordion__list").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content",
        animate: 300,
        icons: false,
    });
  
  });
}


// иницилизация slider-swiper
const swiper = new Swiper('.swiper', {
    slidesPerView: 'auto',
    spaceBetween: 40,
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
    });

    let placemark = new ymaps.Placemark(center, {}, {

    });


    map.controls.remove('geolocationControl'); 
    map.controls.remove('searchControl'); 
    map.controls.remove('trafficControl'); 
    map.controls.remove('fullscreenControl'); 
    map.controls.remove('rulerControl'); 
    map.behaviors.disable(['scrollZoom']); 
    
    map.geoObjects.add(placemark);
}

ymaps.ready(init);



