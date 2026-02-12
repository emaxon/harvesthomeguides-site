document.addEventListener('DOMContentLoaded', function () {
  var searchInput = document.getElementById('search-input');
  var searchHits = document.getElementById('search-hits');
  if (!searchInput || !searchHits) return;

  var fuse = null;

  fetch('/search.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      fuse = new Fuse(data, {
        keys: [
          { name: 'title', weight: 0.7 },
          { name: 'excerpt', weight: 0.3 }
        ],
        threshold: 0.4,
        includeScore: true
      });
    });

  searchInput.addEventListener('input', function () {
    var query = searchInput.value.trim();
    if (!query || !fuse) {
      searchHits.innerHTML = '';
      searchHits.style.display = 'none';
      return;
    }
    var results = fuse.search(query, { limit: 8 });
    if (results.length === 0) {
      searchHits.innerHTML = '<div class="search-no-results">No results found</div>';
      searchHits.style.display = 'block';
      return;
    }
    searchHits.innerHTML = results.map(function (r) {
      var item = r.item;
      return '<a class="search-result" href="' + item.url + '">' +
        '<span class="search-result-title">' + item.title + '</span>' +
        '<span class="search-result-date">' + item.date + '</span>' +
        '<span class="search-result-excerpt">' + item.excerpt + '</span>' +
        '</a>';
    }).join('');
    searchHits.style.display = 'block';
  });

  // Prevent form submission — search is live
  var form = searchInput.closest('form');
  if (form) {
    form.addEventListener('submit', function (e) { e.preventDefault(); });
  }

  // Dismiss on click outside
  document.addEventListener('click', function (e) {
    if (!searchHits.contains(e.target) && e.target !== searchInput) {
      searchHits.style.display = 'none';
    }
  });
});
