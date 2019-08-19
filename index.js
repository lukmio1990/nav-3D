// pobieranie wszystkich elementów menu
const items = [...document.querySelectorAll('.tab__item')];
//pobieranie ul menu
const itemsParent = document.querySelector('.tab__items');
//pobieranie kreski nad aktywnym menu
const indicator = document.querySelector('.tab__indicator');
//pobieranie całego bloku menu
const tab = document.querySelector('.tab');

TweenMax.set(tab, {
  transformPerspective: 400,
  transformOrigin: 'center center'
});

//sprawdzenie aktywnego elementu
const getActiveTabIndex = () => {
  return items.findIndex(item => item.classList.contains('tab__item--active'));
};

//obliczenie ustawienia kreski położenia kreski
const getIndicatorPosition = () => {
  const { x: tabX } = tab.getBoundingClientRect();
  const { width: itemWidth, x: itemX } = items[
    getActiveTabIndex()
  ].getBoundingClientRect();
  const { width: indicatorWidth } = indicator.getBoundingClientRect();
  return itemX + itemWidth / 2 - indicatorWidth / 2 - tabX;
};

const setIndicatorPosition = () => {
  TweenMax.set(indicator, { x: getIndicatorPosition() });
};

//odchylenie menu po klik
const tilt = e => {
  if (e.target.classList.contains('tab__item')) {
    //sprawdzanie czy ekran dotykowy
    const pageX = e.pageX ? e.pageX : e.touches[0].pageX;
    const rotate = pageX - window.innerWidth / 2;

    TweenMax.to(e.target, 0.2, { scale: 0.8, ease: Power4.easeOut });

    TweenMax.to(tab, 0.3, {
      rotationY: 0.03 * rotate,
      rotationX: -Math.abs(0.015 * rotate),
      rotationZ: -0.1
    });
  }
};

//dodawanie i usuwanie klasy active
const activeTab = e => {
  if (e.target.classList.contains('tab__item')) {
    items.forEach(item => item.classList.remove('tab__item--active'));
    e.target.classList.add('tab__item--active');

    TweenMax.to(indicator, 0.5, { x: getIndicatorPosition() });
    TweenMax.to(tab, 0.2, { rotationY: 0, rotationX: 0, rotationZ: 0 });
    TweenMax.to(e.target, 0.2, { scale: 1, ease: Back.easeOut.config(4) });
  }
};

//wywołanie funkcji położenia kreski
setIndicatorPosition();

//zdarzenie na zmianę wielkości okna
window.addEventListener('resize', setIndicatorPosition);

//zdarzenie na klik
itemsParent.addEventListener('mouseup', activeTab);
itemsParent.addEventListener('touchend', activeTab);

itemsParent.addEventListener('mousedown', tilt);
itemsParent.addEventListener('touchstart', tilt);
