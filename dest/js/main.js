(function() {
    'use strict';

    // Tabs
    // -------------------------------------

    const tabButtons = document.querySelectorAll('button[data-action="tab"]'),
          tabContents = document.querySelectorAll('article.tab');

    [].forEach.call(tabButtons, (button) => {
        button.addEventListener('click', (event) => {
            [].forEach.call(tabButtons, (btn) => {
                btn.classList.remove('-active');
            });

            button.classList.add('-active');

            [].forEach.call(tabContents, (tabContent) => {
                tabContent.dataset.tab === button.dataset.target ? tabContent.removeAttribute('hidden') : tabContent.setAttribute('hidden', true);
            });
        }, false);
    });


    // Navigation Toggle
    // -------------------------------------

    const menuToggle = document.querySelector('button[data-action="menu"]'),
          navigation = document.querySelector('nav.main-navigation');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('-active');
        navigation.classList.toggle('-opened');
    });

})();
