(function factory(document) {
  'use strict';

  /**
   * ---------------------------------------------------------------------------
   * Image Gallery Filtering with Isotope
   * https://isotope.metafizzy.co/
   * 
   * Only works on elements with `data-gallery`.
   */
  function initGalleryFilter() {
    var gallery = document.querySelector('[data-gallery]'),
        buttons = document.querySelectorAll('[data-filter]');
    
    if (!gallery) {
      return;
    }

    var plugin = new Isotope(gallery, {
      itemSelector: '[data-gallery-item]',
      layoutMode: 'fitRows',
      transitionDuration: '0s'
    });

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', (e) => filterItems(e, plugin));
    }
  }



  function filterItems(e, plugin) {
    var filter = e.target.dataset.filter;

    e.preventDefault();

    plugin.arrange({ filter: (filter === '*' ? '*' : `[data-category="${filter}"]`) });
  }



  /**
   * ---------------------------------------------------------------------------
   * Image Lightbox (fancybox3)
   * http://fancyapps.com/fancybox/3/
   * 
   * Uses the fancybox3 plugin to open the images in a bigger window.
   */
  function initLightbox() {
    var images = document.querySelectorAll('[data-lightbox]');

    if (images.length <= 0) {
      return;
    }

    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener('click', function handleImageOpen(e) {
        e.preventDefault();

        var $visibleImages = $('[data-lightbox]:visible');

        $.fancybox.open($visibleImages, {}, $visibleImages.index(this));
      });
    }
  }



  /**
   * ---------------------------------------------------------------------------
   * Makes a toggleable FAQ section with the definition list element. 
   */
  function initQuestionAnswers() {
    if (!document.querySelector('[data-faq]')) {
      return;
    }
    
    $('dt').on('click', function handleClick(e) {
      e.preventDefault();

      $(this).toggleClass('text-green').next().slideToggle();
    });
  }



  /**
   * ---------------------------------------------------------------------------
   * Colors the last word of the given string in green.
   */
  function initColorizeWords() {
    var elements = document.querySelectorAll('[data-action="colorize"]');

    for (let i = 0; i < elements.length; i++) {
      var arr = elements[i].textContent.split(' ');

      if (arr.length <= 1) {
        return;
      }

      elements[i].innerHTML = arr.map(function createMarkup(item, index) {
        if (arr.length === index + 1) {
          return `<span class="text-green">${item}</span>`;
        }

        return item;
      }).join(' ');
    }
  }



  /**
   * ---------------------------------------------------------------------------
   * Makes the responsive navigation clickable and register
   * the button.
   */
  function initMenuToggle() {
    var menuToggleButton = document.querySelector('button[data-action="menu"]'),
      menuWrapper = document.querySelector('.top-navigation');

    menuToggleButton.addEventListener('click', function handleMenuToggle(e) {
      e.preventDefault();

      menuToggleButton.classList.toggle('text-green');
      menuWrapper.classList.toggle('opened');
    });
  }



  /**
   * ---------------------------------------------------------------------------
   * Toggles the contact us section in the service pages.
   */
  function initContactUsSection() {
    $('[data-contact-toggle]').on('click', function toggleContactWrapper(e) {
      e.preventDefault();

      $('[data-contact-wrapper]').slideToggle();
    });
  }



  /**
   * ---------------------------------------------------------------------------
   * Applies the logic for tab menus which dynamically display their content.
   */
  function initTabs() {
    // On page load check if the hash exists and enable to
    // associated tab
    function onPageLoad() {
      if (window.location.hash) {
        enableTab(window.location.hash.replace('#', ''));
      }
    }

    // Enable a specific tab based on the given id
    function enableTab(id) {
      window.location.hash = id;

      // Enable button styles
      for (let i = 0; i < tabButtons.length; i++) {
        if (tabButtons[i].dataset.target === id) {
          tabButtons[i].classList.add('bg-green', 'text-white');

          if (tabButtons[i].firstElementChild) {
            tabButtons[i].firstElementChild.classList.remove('text-green');
          }
        } else {
          tabButtons[i].classList.remove('bg-green', 'text-white');

          if (tabButtons[i].firstElementChild) {
            tabButtons[i].firstElementChild.classList.add('text-green');
          }
        }

        if (tabContents[i].dataset.tab === id) {
          if (tabContents[i].classList.contains('lg:hidden')) {
            tabContents[i].classList.replace('lg:hidden', 'lg:flex');
          } else {
            tabContents[i].classList.replace('hidden', 'block');
          }
        } else {
          if (tabContents[i].classList.contains('lg:flex')) {
            tabContents[i].classList.replace('lg:flex', 'lg:hidden');
          } else {
            tabContents[i].classList.replace('block', 'hidden');
          }
        }
      }
    }

    var tabButtons = document.querySelectorAll('button[data-action="tab"]'),
        tabContents = document.querySelectorAll('[data-tab]');

    if (tabButtons.length <= 0) {
      return;
    }

    window.addEventListener('load', onPageLoad);
    window.addEventListener('hashchange', onPageLoad);

    for (let i = 0; i < tabButtons.length; i++) {
      tabButtons[i].addEventListener('click', function handleTabClick(e) {
        e.preventDefault();

        enableTab(e.currentTarget.dataset.target);
      });
    }
  }

  
  
  /**
   * ---------------------------------------------------------------------------
   * When the page is loaded, register all JS logic and execute it.
   */
  document.addEventListener('DOMContentLoaded', function loadFunctions() {
    initGalleryFilter();
    initLightbox();
    initQuestionAnswers();
    initColorizeWords();
    initMenuToggle();
    initContactUsSection();
    initTabs();
  });

})(document);