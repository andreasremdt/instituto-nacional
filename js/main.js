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
   * Make the image gallery buttons filter the 
   * associated images.
   */
  const filters = document.querySelectorAll('[data-action="filter"]'),
  images = document.querySelectorAll('[data-action="image"]');


  /**
   * Lightbox
  */
  class Lightbox {
    constructor(images) {
      this.images = images || document.querySelectorAll('[data-action="image"]');
      this.wrapper = document.querySelector('.image-lightbox');
      this.image = this.wrapper.querySelector('.image');
      this.caption = this.wrapper.querySelector('.caption');
      this.buttons = this.wrapper.querySelectorAll('button');
      this.currentImage = null;

      this.registerEvents();
    }

    registerEvents() {
      document.addEventListener('keydown', this.handleKeyboardEvents.bind(this));
      images.forEach(image => image.addEventListener('click', this.open.bind(this)));
      this.buttons.forEach(button => button.addEventListener('click', this.handleClickEvents.bind(this)));
    }

    open(e) {
      e.preventDefault();

      this.currentImage = Array.prototype.indexOf.call(this.images, e.currentTarget);
      
      this.setContent();
      
      this.wrapper.classList.remove('-hidden');
    }
    
    setContent() {
      this.image.src = this.images[this.currentImage].href;
      this.caption.textContent = this.images[this.currentImage].title;
    }

    nextImage() {
      if ((this.currentImage + 1) === this.images.length) {
        return;
      }

      this.currentImage++;      
      this.setContent();
    }
    
    prevImage() {
      if (this.currentImage === 0) {
        return;
      }

      this.currentImage--;
      this.setContent();
    }

    destroy() {
      this.wrapper.classList.add('-hidden');
      this.currentImage = null;

      this.deleteKeyboardEvents();
    }

    deleteKeyboardEvents() {
      document.removeEventListener('keydown', this.handleKeyboardEvents);
    }

    handleKeyboardEvents(e) {
      switch (e.keyCode) {
        case 39:
          this.nextImage();
          break;
        case 37:
          this.prevImage();
          break;
        case 27:
          this.destroy();
          break;
      }
    }

    handleClickEvents(e) {
      switch (e.currentTarget.className) {
        case 'next':
          this.nextImage();
          break;
        case 'prev':
          this.prevImage();
          break;
        case 'close':
          this.destroy();
      }
    }
  }
  
  if (images.length > 0) {
    function filterGallery(e) {
      filters.forEach(filter => {
        if (filter.classList.contains('-green')) {
          filter.classList.remove('-green');
        }
      });
      
      e.currentTarget.classList.add('-green');

      images.forEach(image => {
        if (image.dataset.categories.includes(e.currentTarget.dataset.filter)) {
          image.style.display = 'block';
        } else {
          image.style.display = 'none';
        }
      });
    }

    filters.forEach(filter => filter.addEventListener('click', filterGallery));
    new Lightbox(images);
  }
})();
