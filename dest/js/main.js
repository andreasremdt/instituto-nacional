(function() {
    'use strict';

    // Tabs
    // -------------------------------------

    const tabButtons = document.querySelectorAll('button[data-action="tab"]'),
          tabContents = document.querySelectorAll('article.tab');

    [].forEach.call(tabButtons, (button) => {
        button.addEventListener('click', (event) => {
            [].forEach.call(tabContents, (tabContent) => {
                tabContent.dataset.tab === button.dataset.target ? tabContent.removeAttribute('hidden') : tabContent.setAttribute('hidden', true);
            });
        }, false);
    });


})();
