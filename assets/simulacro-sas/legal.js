// Índice generado a partir de los h2 del documento: añadir o quitar una
// sección no obliga a tocar el índice. Sin JavaScript la página se lee igual,
// solo que sin índice (por eso los contenedores empiezan con `hidden`).
(function () {
  var heads = document.querySelectorAll('.doc h2[id]');
  var lists = document.querySelectorAll('[data-toc]');
  if (!heads.length || !lists.length) return;

  lists.forEach(function (list) {
    heads.forEach(function (head, i) {
      var num = document.createElement('span');
      num.className = 'toc__num';
      num.textContent = String(i + 1).padStart(2, '0');

      var link = document.createElement('a');
      link.href = '#' + head.id;
      link.append(num, document.createTextNode(head.textContent));

      var item = document.createElement('li');
      item.append(link);
      list.append(item);
    });
    list.closest('.toc').hidden = false;
  });

  // Al elegir una sección en el móvil, el índice se pliega para no tapar el texto.
  document.querySelectorAll('.toc--inline a').forEach(function (link) {
    link.addEventListener('click', function () {
      link.closest('details').open = false;
    });
  });

  // Marca en el índice lateral la sección que se está leyendo.
  if (!('IntersectionObserver' in window)) return;
  var sideLinks = document.querySelectorAll('.toc--side a');
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sideLinks.forEach(function (link) {
          link.setAttribute(
            'aria-current',
            link.getAttribute('href') === '#' + entry.target.id ? 'true' : 'false'
          );
        });
      });
    },
    { rootMargin: '0px 0px -75% 0px' }
  );
  heads.forEach(function (head) { observer.observe(head); });
})();
