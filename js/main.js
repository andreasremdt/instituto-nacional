(function() {
  'use strict';

  // Variables
  const tabButtons = document.querySelectorAll('button[data-action="tab"]'),
        tabContents = document.querySelectorAll('[data-tab]');
        

  

  /**
   * Color the last word of the page title in green.
   */
  const pageTitle = document.querySelector('.page-header .title'),
        pageTitleArray = pageTitle.textContent.split(' ');
    
  pageTitle.innerHTML = pageTitleArray.map((item, index) => {
    if (pageTitleArray.length === index + 1) {
      return `<span class="_green">${item}</span>`;
    }

    return item;
  }).join(' ');



  /**
   * Make the responsive navigation clickable and register
   * the button.
   */
  const menuToggle = document.querySelector('button[data-action="menu"]'),
        menu = document.querySelector('nav.page-navigation');
  
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('-active');
    menu.classList.toggle('-opened');
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

})();
