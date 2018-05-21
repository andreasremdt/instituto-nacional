(function() {
  'use strict';


  /**
   * Color the last word of the given string in green.
   */
  const elements = document.querySelectorAll('[data-action="colorize"]');

  elements.forEach(element => {
    const arr = element.textContent.split(' ');

    if (arr.length <= 1) return;

    element.innerHTML = arr.map((item, index) => {
      if (arr.length === index + 1) {
        return `<span class="text-green">${item}</span>`;
      }

      return item;
    }).join(' ');
  });



  /**
   * Tabmenu (with buttons)
   */
  const tabButtons = document.querySelectorAll('button[data-action="tab"]'),
        tabContents = document.querySelectorAll('[data-tab]');
  
  if (tabButtons.length > 0) {

    // Register event listeners
    window.addEventListener('load', onPageLoad);
    window.addEventListener('hashchange', onPageLoad);
    tabButtons.forEach(button => button.addEventListener('click', (e) => enableTab(e.currentTarget.dataset.target)));

    // On page load check if the hash exists and enable to
    // associated tab
    function onPageLoad() {
      if (window.location.hash) {
        const id = window.location.hash.replace('#', '');

        enableTab(id);
      }
    }

    // Enable a specific tab based on the given id
    function enableTab(id) {
      window.location.hash = id;

      // Enable button styles
      tabButtons.forEach(button => {
        if (button.dataset.target === id) {
          button.classList.add('bg-green', 'text-white');
          button.firstElementChild.classList.remove('text-green');
        } else {
          button.classList.remove('bg-green', 'text-white');
          button.firstElementChild.classList.add('text-green');
        }
      });

      // Hide / show tab content
      tabContents.forEach(content => {
        if (content.dataset.tab === id) {
          content.classList.replace('hidden', 'flex');
        } else {
          content.classList.replace('flex', 'hidden');
        }
      });
    }
  }



  /**
   * Make the responsive navigation clickable and register
   * the button.
   */
  const menuToggle = document.querySelector('button[data-action="menu"]'),
        menu = document.querySelector('.top-navigation');
  
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('text-green');
    menu.classList.toggle('opened');
  });

  



  /**
   * Image slider
   */
  var imageSliders = document.querySelectorAll('[data-image-slider]');

  [].forEach.call(imageSliders, function(slider) {
    var left = slider.querySelector('[data-left]'), 
        right = slider.querySelector('[data-right]'),
        imgWidth = slider.querySelector('img').offsetWidth,
        offset = 0,
        wrapper = slider.firstElementChild;

    left.addEventListener('click', function(evt) {
      offset += imgWidth;
      wrapper.style.transform = `translate3d(${offset}px, 0, 0)`;
    });

    right.addEventListener('click', function (evt) {
      offset -= imgWidth;
      wrapper.style.transform = `translate3d(${offset}px, 0, 0)`;
    });
  });


})();
