(function() {
  'use strict';

  // Variables
  const tabButtons = document.querySelectorAll('button[data-action="tab"]'),
        tabContents = document.querySelectorAll('[data-tab]'),
        menuToggle = document.querySelector('button[data-action="menu"]'),
        menu = document.querySelector('nav.page-navigation'),
        imageCategoryToggles = document.querySelectorAll('.campus__menu a[data-category]'),
        images = document.querySelectorAll('.gallery__item');

  // Change the page title to have the last word
  // in green letters.
  const pageTitle = document.querySelector('.page-header .title'),
        pageTitleArray = pageTitle.textContent.split(' ');
  
  pageTitle.innerHTML = pageTitleArray.map((item, index) => {
    if (pageTitleArray.length === index + 1) {
      return `<span class="_green">${item}</span>`;
    }

    return item;
  }).join(' ');
  



  // Tab Menu
  tabButtons.forEach((button) => {
    button.addEventListener('click', (event) => {

      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove('-active'));

      // Add active class to current button
      button.classList.add('-active');

      tabContents.forEach((tabContent) => {
        if (tabContent.dataset.tab === button.dataset.target) {
          tabContent.removeAttribute('hidden');
        } else {
          tabContent.setAttribute('hidden', true);
        }
      });
    });
  });

  

  // Responsive Navigation
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('-active');
    menu.classList.toggle('-opened');
  });



  // Image Gallery
  const overlay = document.querySelector('div.overlay');

  if (overlay) {
    const overlayImage = overlay.querySelector('img.overlay__image'),
          overlayCaption = overlay.querySelector('figcaption.overlay__caption');
  }

  imageCategoryToggles.forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      event.preventDefault();

      // Remove active class from all buttons
      imageCategoryToggles.forEach((btn) => btn.classList.remove('campus__button--is-active'));

      // Add active class to current button
      toggle.classList.add('campus__button--is-active');

      // Filter images
      images.forEach((image) => {
        if (image.dataset.categories.includes(toggle.dataset.category)) {
          image.style.display = 'block';
        } else {
          image.style.display = 'none';
        }
      });
    });
  });

  images.forEach((image) => {
    image.addEventListener('click', (event) => {
      overlay.classList.remove('overlay--is-hidden');
      overlayImage.src = image.firstElementChild.src;
      overlayCaption.textContent = image.lastElementChild.textContent;
    });
  });
})();
