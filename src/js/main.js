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
        buttons = document.querySelectorAll('[data-filter]'),
        images = document.querySelectorAll('[data-gallery-item]');
    
    if (!gallery) {
      return;
    }

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function(e) {
        e.preventDefault();
        
        filterItems(e.target.dataset.filter, images);
      });
    }
  }



  function filterItems(filter, images) {
    for (let i = 0; i < images.length; i++) {
      var $image = $(images[i]);
      if ($image.data('category') === filter || filter === '*') {
        $image.addClass('block').removeClass('hidden');
      } else {
        $image.addClass('hidden').removeClass('block');
      }
    }
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

      if (arr.length > 1) {
        elements[i].innerHTML = arr.map(function createMarkup(item, index) {
          if (arr.length === index + 1) {
            return `<span class="text-green">${item}</span>`;
          }

          return item;
        }).join(' ');
      }
    }
  }



  /**
   * ---------------------------------------------------------------------------
   * Makes the responsive navigation clickable and register
   * the button.
   */
  function initMenuToggle() {
    var $menuToggleButton = $('button[data-action="menu"]'),
      $menuWrapper = $('.top-navigation');

    $menuToggleButton.on('click', function handleMenuToggle(e) {
      e.preventDefault();

      $menuToggleButton.toggleClass('text-green');
      $menuWrapper.toggleClass('opened');
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
      for (let i = 0; i < $tabButtons.length; i++) {
        var $button = $($tabButtons[i]),
            $tab = $($tabContents[i]);
        
        if ($button.data('target') === id) {
          $button.addClass('bg-green text-white');

          if ($button.firstElementChild) {
            $button.first().removeClass('text-green');
          }
        } else {
          $button.removeClass('bg-green text-white');

          if ($button.firstElementChild) {
            $button.first().addClass('text-green');
          }
        }

        if ($tab.data('tab') === id) {
          if ($tab.hasClass('lg:hidden')) {
            $tab.addClass('lg:flex').removeClass('lg:hidden');
          } else {
            $tab.addClass('block').removeClass('hidden');
          }
        } else {
          if ($tab.hasClass('lg:flex')) {
            $tab.addClass('lg:hidden').removeClass('lg:flex');
          } else {
            $tab.addClass('hidden').removeClass('block');
          }
        }
      }
    }

    var $tabButtons = $('button[data-action="tab"]'),
        $tabContents = $('[data-tab]');

    if ($tabButtons.length <= 0) {
      return;
    }

    window.addEventListener('load', onPageLoad);
    window.addEventListener('hashchange', onPageLoad);

    for (let i = 0; i < $tabButtons.length; i++) {
      $tabButtons[i].addEventListener('click', function handleTabClick(e) {
        e.preventDefault();

        enableTab(e.currentTarget.dataset.target);
      });
    }
  }



  function initOffscreenImages() {
    var lazyImages = [].slice.call(document.querySelectorAll('[data-lazy]'));
    var lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;

          if (lazyImage.tagName === 'IMG' || lazyImage.tagName === 'SOURCE') {
            if (lazyImage.dataset.src) {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.removeAttribute('data-src');
            }

            if (lazyImage.dataset.srcset) {
              lazyImage.srcset = lazyImage.dataset.srcset;
              lazyImage.removeAttribute('data-srcset');
            }
          } else {
            lazyImage.classList.add(lazyImage.dataset.class);
          }

          

          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
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
    initOffscreenImages();
  });

})(document);


/**
 * ---------------------------------------------------------------------------
 * Callback for Google Maps
 */
function initMap() {
  var url = {
    lat: 19.1235663,
    lng: -70.6060518
  };

  var map = new google.maps.Map(document.querySelector('div.map'), {
    zoom: 14,
    center: url,
    disableDefaultUI: true
  });
  var marker = new google.maps.Marker({
    position: url,
    map: map
  });
}