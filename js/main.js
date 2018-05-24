(function() {
  'use strict';

  // Let's load the page first and then apply JavaScript enhancements
  document.addEventListener('DOMContentLoaded', () => {
    
    /**
     * ---------------------------------------------------------------------------
     * 1. Image Gallery Filtering (Isotope)
     * https://isotope.metafizzy.co/
     * 
     * Makes use of a plugin in order to make the gallery page
     * filterable. Users can click a category and the gallery will
     * only display images within this category.
     * 
     * Only works if an element `data-gallery` is present in the DOM.
     */

    const gallery = document.querySelector('[data-gallery]');

    if (gallery) {
      const buttons = document.querySelectorAll('button[data-filter]');
      const plugin = new Isotope(gallery, {
        itemSelector: '[data-gallery-item]',
        layoutMode: 'fitRows'
      });

      buttons.forEach(button => button.addEventListener('click', (event) => {
        buttons.forEach(button => button.classList.replace('bg-green-dark', 'bg-green'));
        event.target.classList.replace('bg-green', 'bg-green-dark');

        const filter = event.target.dataset.filter;

        plugin.arrange({ filter: (filter === '*' ? '*' : `[data-category="${filter}"]`) });
      }));
    }



    /**
     * ---------------------------------------------------------------------------
     * 2. Image Lightbox (fancybox3)
     * http://fancyapps.com/fancybox/3/
     * 
     * Uses the fancybox3 plugin to open the images in a bigger window.
     * 
     * Only works if image elements are present in the DOM.
     */

    const images = document.querySelectorAll('[data-lightbox]');

    if (images.length > 0) {
      images.forEach(image => image.addEventListener('click', (event) => {
        event.preventDefault();

        const $visibleImages = $('[data-lightbox]:visible');

        $.fancybox.open($visibleImages, {}, $visibleImages.index(this));
      }));
    }



    /**
     * ---------------------------------------------------------------------------
     * 3. FAQs
     */

    const faq = document.querySelector('[data-faq]');

    if (faq) {
      const dds = faq.querySelectorAll('dd'),
            dts = faq.querySelectorAll('dt');
      
      dts.forEach(dt => dt.addEventListener('click', (event) => {
        dt.nextElementSibling.classList.toggle('hidden');
        dt.classList.toggle('text-green');
      }));

      dds.forEach(dd => dd.classList.add('hidden'));
    }
  });

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

          if (button.firstElementChild) {
            button.firstElementChild.classList.remove('text-green');
          }
        } else {
          button.classList.remove('bg-green', 'text-white');
          
          if (button.firstElementChild) {
            button.firstElementChild.classList.add('text-green');
          }
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

})();
