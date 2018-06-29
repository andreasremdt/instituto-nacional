(function(document) {
  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20')).toLowerCase().trim();
      }
    }
  }

  var searchTerm = getQueryVariable('q');
  var wrapper = document.getElementById('search-results');
  var results = [];
  var html = '';
  
  if (searchTerm) {
    var counter = 0;

    document.getElementById('search').setAttribute('value', searchTerm);
    
    posts.forEach((post) => {
      var matches = Object.values(post).some((v) => v.toLowerCase().indexOf(searchTerm) >= 0);

      if (matches) {
        results.push({
          post,
          bodyIndex: post.content.toLowerCase().indexOf(searchTerm),
          titleIndex: post.title.toLowerCase().indexOf(searchTerm)
        });

        counter++;
      }
    });

    if (results.length > 0) {
      results.forEach(function (result) {
        html += `
          <article class="border-grey-light border">
            <h3 class="text-black uppercase mb-3 font-medium hover:text-green px-6 mt-6">
              <a href="${result.post.url}">
                ${result.titleIndex === -1 ? `
                  ${result.post.title}
                ` : `
                  ${result.post.title.substring(0, result.titleIndex)}<mark>${result.post.title.substring(result.titleIndex, result.titleIndex + searchTerm.length)}</mark>${result.post.title.substring(result.titleIndex + searchTerm.length)}</a>
                `}
              </a>
            </h3>
            
            <p class="px-6">
              ${result.bodyIndex === -1 ? `
                ${result.post.content}
              ` : `
                ${result.post.content.substring(0, result.bodyIndex)}<mark>${result.post.content.substring(result.bodyIndex, result.bodyIndex + searchTerm.length)}</mark>${result.post.content.substring(result.bodyIndex + searchTerm.length)}</a>
              `}
            </p>
            <footer class="border-t border-grey-light border-solid py-4 px-6 mt-6 text-right text-grey font-light text-sm">
              <span>${result.post.date}</span>
            </footer>
          </article>
        `;
      });
  
      wrapper.innerHTML = html;
    }
  }

  document.querySelector('[data-search-number]').textContent = counter;
})(document);