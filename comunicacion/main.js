(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   
  var backGoToUpElement = document.querySelector(".volver-arriba-govco");
backGoToUpElement.addEventListener("click", backGoToUp, false);

function backGoToUp() {
document.body.scrollTop = document.documentElement.scrollTop = 0;
}*/
  /***/
let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }
  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = document.querySelector('#preloader'); // Cambio aquí: select() a querySelector()

if (preloader) {
  setTimeout(() => {
      preloader.remove();
  }, 1000); // Cambio aquí: 5000 milisegundos (5 segundos)
}


  


  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()

window.addEventListener("load", function() {
  initTopBar();
});


function initTopBar() {
  const translateElement = document.querySelector(".idioma-icon-barra-superior-govco");
  translateElement.addEventListener("click", translate, false);

  function translate() {
      // ... // Implementar traducción
  }
}

document.addEventListener("keyup", detectTabKey);

function detectTabKey(e) {
  if (e.keyCode == 9) {
      const elementsToToggle = [
          "botoncontraste",
          "botonaumentar",
          "botondisminuir"
      ];

      elementsToToggle.forEach((elementId) => {
          const element = document.getElementById(elementId);
          if (element.classList.contains("active-barra-accesibilidad-govco")) {
              element.classList.toggle("active-barra-accesibilidad-govco");
          }
      });
  }
}

function cambiarContexto() {
const botoncontraste = document.getElementById("botoncontraste");
const botonaumentar = document.getElementById("botonaumentar");
const botondisminuir = document.getElementById("botondisminuir");

if (!botoncontraste.classList.contains("active-barra-accesibilidad-govco")) {
    botoncontraste.classList.toggle("active-barra-accesibilidad-govco");
    document.getElementById("titleaumentar").style.display = "";
    document.getElementById("titledisminuir").style.display = "";
    document.getElementById("titlecontraste").style.display = "none";
    
    // Restablecer el color original del texto, excluyendo elementos dentro de listas (ul) con la clase "no-afectar-contraste"
    const ulsWithExcludedItems = document.querySelectorAll(".no-afectar-contraste ul");
    ulsWithExcludedItems.forEach((ul) => {
        const textElements = ul.querySelectorAll("p, h1, h2, h3, h4, li, ul, a, span");
        textElements.forEach((textElement) => {
            textElement.style.color = ""; // Restablecer el color original (puede ser null)
        });
    });
}
if (botondisminuir.classList.contains("active-barra-accesibilidad-govco")) {
    botondisminuir.classList.remove("active-barra-accesibilidad-govco");
}
if (botonaumentar.classList.contains("active-barra-accesibilidad-govco")) {
    botonaumentar.classList.remove("active-barra-accesibilidad-govco");
}

// Asegúrate de que se aplique el contraste a los elementos deseados
const elementsWithContrast = document.querySelectorAll(".elemento-con-contraste");
elementsWithContrast.forEach((element) => {
    element.classList.toggle("modo_oscuro-govco");

    // Cambiar el color del texto a blanco o su color original, excluyendo elementos dentro de listas (ul) con la clase "no-afectar-contraste"
    const textElements = element.querySelectorAll("p, h1, h2, h3, h4, li, ul, a, span");
    textElements.forEach((textElement) => {
        if (!isInsideExcludedList(textElement)) {
            if (textElement.style.color === "white") {
                textElement.style.color = ""; // Restablecer el color original (puede ser null)
            } else {
                textElement.style.color = "white";
            }
        }
    });
});
}

// Función para verificar si un elemento está dentro de una lista excluida
function isInsideExcludedList(element) {
let parent = element.parentElement;
while (parent) {
    if (parent.classList.contains("no-afectar-contraste") && parent.tagName.toLowerCase() === "ul") {
        return true;
    }
    parent = parent.parentElement;
}
return false;
}





function disminuirTamanio(operador) {
  toggleTamanio(operador);
  toggleTextContraste();
}

function aumentarTamanio(operador) {
  toggleTamanio(operador);
  toggleTextContraste();
}

function toggleTamanio(operador) {
  const elementsToToggle = [
      "botoncontraste",
      "botonaumentar",
      "botondisminuir"
  ];

  elementsToToggle.forEach((elementId) => {
      const element = document.getElementById(elementId);
      if (!element.classList.contains("active-barra-accesibilidad-govco")) {
          element.classList.toggle("active-barra-accesibilidad-govco");
      }
  });

  const textElements = [
      "titleaumentar",
      "titledisminuir",
      "titlecontraste"
  ];

  textElements.forEach((elementId) => {
      document.getElementById(elementId).style.display = "";
  });

  const elementsToUpdate = [
      "para-mirar",
      "h1",
      "h2",
      "h3",
      "h4",
      "li",
      "ul",
      "a",
      "p",
      "img",
      "span"
  ];

  elementsToUpdate.forEach((elementTagName) => {
      const elements = document.getElementsByTagName(elementTagName);
      for (let element of elements) {
          const total = tamanioElemento(element);
          const nuevoTamanio = (operador === 'aumentar' ? (total + 1) : (total - 1)) + 'px';
          element.style.fontSize = nuevoTamanio;
      }
  });
}

function tamanioElemento(elemento) {
  const fontSize = window.getComputedStyle(elemento, null).getPropertyValue('font-size');
  return parseFloat(fontSize);
}

function toggleTextContraste() {
  const element = document.getElementById('para-mirar');
  if (element.className == 'modo_oscuro-govco') {
      element.className = "modo_claro-govco";
  } else {
      element.className = "modo_oscuro-govco";
  }
}

window.addEventListener("load", function() {
initHeader();

});

function initHeader() {
initTopBar();
initMenu();
}


// Barra superior
function initTopBar() {
const translateElement = document.querySelector(".idioma-icon-barra-superior-govco");
translateElement.addEventListener("click", translate, false);

function translate() {
    // ... // Implementar traducción
}
}


// Menu de navegacion
function initMenu() {
initSearchBar();

/////// Prevent closing from click inside dropdown
document.querySelectorAll('.dropdown-menu').forEach(function(element){
  element.addEventListener('click', function (e) {
    e.stopPropagation();
  });
});

document.querySelectorAll('.navbar-menu-govco a.dir-menu-govco').forEach(function(element){
  element.addEventListener("click", eventClickItem, false);
});
}

function eventClickItem() {
const parentNavbar = this.closest('.navbar-menu-govco');
parentNavbar.querySelectorAll('a.active').forEach(function(element){
    element.classList.remove('active');
});

this.classList.add('active');
const container = this.closest('.nav-item');
const itemParent =  container.querySelector('.nav-link');
itemParent.classList.add('active');
}


// Buscador
function methodAssign(event, method, elements) {
for (let i of elements) {
  i.addEventListener(event, method, false);
}
}

function initSearchBar() {
const inputSearch = document.querySelectorAll(".input-search-govco:not(.noActive)");
getElementInputSearchBar(inputSearch);
methodAssign("keyup", activeInputSearchBar, inputSearch);
methodAssign("keydown", keydownInputSearchBar, inputSearch);
methodAssign("blur", blurInputSearchBar, inputSearch);
methodAssign("focus", focusInputSearchBar, inputSearch);

const buttonClean = document.querySelectorAll(".search-govco .icon-close-search-govco");
methodAssign("click", cleanInputSearchBar, buttonClean);
methodAssign("blur", blurcleanInputSearchBar, buttonClean);
}

function getElementInputSearchBar(elements) {
for (let i of elements) {
  assignFunctionItemsSearchBar(i);
}
}

function activeInputSearchBar(element) {
const parent = element.target.parentNode;
const existsClass = parent.classList.contains('active');
if (element.target.value === '') {
  parent.classList.remove('active', 'exist-content');
} else if (!existsClass) {
  parent.classList.add('active', 'exist-content');
}
}

function assignFunctionItemsSearchBar(input) {
const parentInput = input.parentNode;
const parentItems = parentInput.nextElementSibling;
const items = parentItems.querySelectorAll("ul li a");

for (let item of items) {
  item.addEventListener("keydown", function(event) {
    keysUpDownSearchBar(event, parentItems, input);
  });

  item.addEventListener("blur", function() {
    const elementI = item.parentNode
    const elementU = elementI.parentNode
    const elementDivOptions = elementU.parentNode
    const elementDivContainerOptions = elementDivOptions.parentNode;
    const elementDivContainerSearch = elementDivContainerOptions.previousElementSibling;
    existFocusContainerSearchBar(elementDivContainerSearch);
  });

  item.addEventListener("click", function() {
    input.value = '';
    parentInput.classList.remove('active', 'exist-content');
  });
}
}

function keydownInputSearchBar(element) {
const parentInput = this.parentNode;
const parentItems = parentInput.nextElementSibling;
const parentUl = parentItems.querySelector('.options-search-govco');

if (parentUl) {
  parentUl.onscroll = function() {
    const visibleItems = this.querySelectorAll("li a");
    if (document.activeElement == visibleItems[0]) {
      this.scrollTop = 0;
    }
  };
  keysUpDownSearchBar(element, parentItems, this);
}
}

function keysUpDownSearchBar(e, container, input) {
// Key up
if (e.which == 38) {
  upSearchBar(container, input);
}
// Key down
if (e.which == 40) {
  downSearchBar(container, input);
}
}

function downSearchBar(container, input) {
const active = document.activeElement;
const items = container.querySelectorAll("li a");
if (active === input) {
  items[0].focus();
} else {
  for (let i = 0; i < items.length - 1; i++) {
    if (active === items[i]) {
      items[i + 1].focus();
    }
  }
}
}

function upSearchBar(container, input) {
const active = document.activeElement;
const itemsList = container.querySelectorAll("li:not(.none) a");
if (active === itemsList[0]) {
  input.focus();
} else {
  for (let i = 1; i < itemsList.length; i++) {
    if (active === itemsList[i]){
      itemsList[i - 1].focus();
    }
  }
}
}

function cleanInputSearchBar() {
const input = this.previousElementSibling;
const parent = this.parentNode;
input.value = '';
parent.classList.remove('active', 'exist-content');
input.focus();
}

function blurInputSearchBar() {
const parent = this.parentNode;
existFocusContainerSearchBar(parent);
}

function existFocusContainerSearchBar(element) {
setTimeout(() => {
  if (!element.parentNode.contains(document.activeElement)) {
    element.classList.remove('active');
  }
}, 100);
}

function focusInputSearchBar(element) {
activeInputSearchBar(element);
}

function blurcleanInputSearchBar() {
const parent = this.parentNode;
existFocusContainerSearchBar(parent);
}
    // Función para redirigir a la página de resultados con la consulta de búsqueda
    function redirectToResults() {
      const searchTerm = document.getElementById('searchInput').value;
      window.location.href = `results.html?q=${encodeURIComponent(searchTerm)}`;
  }

  // Evento para manejar la búsqueda al hacer clic en el botón de búsqueda
  document.getElementById('searchButton').addEventListener('click', function () {
      redirectToResults();  // Redirige a la página de resultados
  });
  function clearSearch() {
    searchInput.value = '';
    searchResults.innerHTML = '';
}
  const clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', clearSearch);
