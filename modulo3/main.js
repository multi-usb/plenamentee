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

const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('q');
        const searchResults = document.getElementById('searchResults');

        // Mapeo de URL a palabras clave descriptivas
        const urlToKeywordMap = {
            '../index.html': 'Bienestar Personal - Inicio',
            '../../definiciones/definiciones.html': 'Qué son las sustancias psicoactivas?',
            '../../drogas/drogas.html': 'Información sobre las sustancias: efectos y datos complementarios',
            '../../drogas/alcohol/alcohol.html': 'Información sobre el alcohol',
            '../../drogas/tobaco/tobaco.html': 'Información sobre el tabaco',
            '../../drogas/cannabis/cannabis.html': 'Información sobre el cannabis',
            '../../drogas/cocaina/cocaina.html': 'Información sobre la cocaína',
            '../../drogas/anfetas/anfetas.html': 'Información sobre los estimulantes de tipo anfetamínico (ETA)',
            '../../drogas/Sedantes/sedantes.html': 'Información sobre los sedantes',
            '../../drogas/inhalantes/inhalantes.html': 'Información sobre los inhalantes',
            '../../drogas/opioides/opioides.html': 'Información sobre los opioides',
            '../../mitos/mitos.html': 'Desmintiendo mitos',
            '../../objetivos/objetivos.html': 'Objetivos personales y reflexiones',
            '../../objetivos/opcion1/opcion1.html': 'Toma de decisiones: Decisión 1',
            '../../objetivos/opcion2/opcion2.html': 'Toma de decisiones: Decisión 2',
            '../../objetivos/opcion3/opcion3.html': 'Toma de decisiones: Decisión 3',
            '../../comunicacion/comunicacion.html': 'Comunicación en primer plano',
            '../../emociones/emociones.html': 'Manejando emociones',
            '../../decisiones/decisiones.html': 'Decidiendo con conciencia',
            '../../login/login.html': 'Página de ingreso',
            '../../signup/signup.html': 'Página de registro'
        };

        function search(keyword) {
            const pages = [
                { url: '../index.html', content: 'Bienvenido a tu Espacio de Bienestar Personal Este es un espacio para ti en el que puedes consultar información que sea de tu interés según tus propios hábitos y tomar decisiones que favorezcan tu bienestar para que puedas hacer lo que más te motive en tu vida ahora y en el futuro.                 Ten en cuenta que NO TODO EL MUNDO CONSUME SUSTANCIAS PSICOACTIVAS pues según el último Estudio nacional de consumo de sustancias el 66,7% de las personas en Colombia nunca han consumido cigarrillo en su vida, el 95% nunca han consumido cigarrillo electrónico, cerca del 20% no ha consumido en su vida bebidas alcohólicas, el 91,7% nunca ha consumido marihuana, el 98% no ha consumido cocaína, el 99,5% no ha probado el basuco, el 93% no ha probado el extasis, el 99,9% de los colombianos jamas ha consumido heroína, el 99,3% no ha consumido LSD, y el 98,4% no ha probado jamas ningún alucinógeno.' },
                { url: '../../definiciones/definiciones.html', content: '¿Qué son las sustancias psicoactivas? Las sustancias psicoactivas (SPA) son distintos compuestos de origen natural o sintético, que influyen en el funcionamiento del sistema nervioso produciendo cambios en las funciones que regulan los pensamientos, las emociones y el comportamiento. Recuerda: •	El uso de sustancias psicoactivas siempre conlleva un nivel de riesgo de sufrir consecuencias desfavorables sobre distintos sistemas y órganos del cuerpo humano que pueden manifestarse en el corto plazo ya que ocurre un proceso de intoxicación. •	Todas las SPA cambian la manera en que el cerebro funciona porque afectan el modo en que las neuronas se comunican, por ello cualquier uso de SPA afecta el proceso por el cual se envían y reciben señales cerebrales. Por ejemplo ¿has visto cómo las personas que se embriagan hablan enredado?, esto es porque las señales para siquiera hablar bien se están viendo afectadas por el alcohol. •	El uso repetido y prolongado en el tiempo de las SPA favorece el desarrollo de procesos de dependencia caracterizados por la necesidad urgente de consumo de la sustancia y la pérdida de control sobre el consumo a pesar de los efectos negativos sobre el estado de salud o el funcionamiento en las áreas familiar, interpersonal, académica, laboral o legal. Por ejemplo cuando las personas se pierden de compromisos familiares porque perdieron el control mientras se tomaban “unos tragos”. ¿Quieres saber más? ¿Cómo actúan las drogas en el cerebro? ¿Qué efectos tienen?' },
                { url: '../../drogas/drogas.html', content: 'Información sobre las sustancias: efectos y datos complementarios' },
                { url: '../../drogas/alcohol/alcohol.html', content: 'El alcohol ralentiza los procesos del cuerpo y la mente. Su efecto varía según la cantidad ingerida, afectando el comportamiento, el estado de ánimo y la capacidad de procesar información. Aspectos a recordar: La intensidad de los efectos depende de la concentración de alcohol en la sangre y la cantidad consumida (una bebida estándar equivale a 8 gramos de alcohol puro). Los daños del alcohol varían con la edad y desarrollo biológico, siendo más graves en los jóvenes, afectando tanto física como socialmente. Los signos de embriaguez incluyen dificultad para decidir, habla incoherente, falta de coordinación. El consumo excesivo puede exponer a la persona a violencia y abuso. La venta de alcohol a menores es ilegal. Indicadores de consumo excesivo: Consumir en cantidades arriesgadas o en situaciones peligrosas. Incumplir responsabilidades laborales o educativas. Experimentar deseo fuerte por el alcohol y perder control sobre su consumo. Experimentar malestar físico o psicológico al interrumpir su consumo prolongado. ¿Quieres saber más?'},
                { url: '../../drogas/tobaco/tobaco.html', content: 'El tabaco, planta cultivada globalmente, contiene nicotina, generando adicción. Al quemarse, produce químicos dañinos adicionales. Aspectos clave: Fumar inicialmente provoca malestar y eleva frecuencia cardíaca y presión arterial. Causa daños extensos a órganos y afecta piel y dientes. Productos derivados de tabaco y nicotina tienen varias formas de consumo. Cigarrillos electrónicos administran nicotina y saborizantes sin quemar tabaco. La nicotina genera rápida sensación placentera, llevando a adicción. Daños principales provienen de químicos en tabaco y los generados al quemarse. Indicadores de exceso: Necesidad de fumar más para sentir placentera sensación. Persistencia en fumar a pesar del conocimiento de los daños. Cigarrillos electrónicos con nicotina causan adicción y riesgo cardiovascular. ¿Quieres saber más?' },
                { url: '../../drogas/cannabis/cannabis.html', content: 'La marihuana proviene de las flores y hojas de la planta Cannabis sativa o Cannabis indica. El THC es la sustancia que mayormente altera la mente. Puntos clave: La concentración de THC ha aumentado, generando efectos más intensos. Efectos inmediatos incluyen distorsión sensorial, problemas de pensamiento y reacciones lentas. Asociada a depresión, ansiedad y pensamientos suicidas en adolescentes. Impacta negativamente la atención, memoria y aprendizaje, poniendo en riesgo el rendimiento académico. Consumidores habituales enfrentan problemas sociales y están menos satisfechos con sus vidas. Indicadores de exceso: Consumo persistente a pesar de consecuencias negativas. Problemas en salud, escuela, familia y amistades. Dificultad para abandonar el hábito a pesar de interferir en la vida diaria. Mayor riesgo para menores de edad. Posible experimentación de síntomas de abstinencia tras dejar la marihuana. Estos síntomas pueden durar días o semanas después de dejar la droga. ¿Quieres saber más?' },
                { url: '../../drogas/cocaina/cocaina.html', content: 'cocaina Cocaína La cocaína es una sustancia estimulante que resulta del procesamiento de las hojas de la planta de coca, produce euforia, pero luego se experimenta un derrumbe emocional y produce tristeza o cansancio durante varios días. Recuerda: •	La cocaína es presentada a la población en dos formas: Cocaína en forma de polvo de color blanco, científicamente denominada sal de clorhidrato y Crack o cocaína en forma de cristales consiste en una forma de procesamiento que forma un cristal de roca que se fuma. •	Los efectos de esta sustancia son muy rápidos y a su vez desaparecen en pocos minutos o quizás en el transcurso de una hora. •	La duración e intensidad de los efectos dependen de la forma de consumo. •	A largo plazo su consumo produce mala alimentación y pérdida de peso ¿Cómo se manifiesta la adicción? Las personas presentan tolerancia a la cocaína, lo que significa que necesitan consumir mayor cantidad de la sustancia para lograr el efecto deseado. La persona se vuelve adicta en la medida en que debe consumir la droga solamente para poder sentirse “normal”. Una vez que se disipa el efecto de euforia de la cocaína, muchas personas reportan experimentar un derrumbe emocional y se sienten tristes o cansadas durante varios días. Asimismo, reportan sentir una necesidad intensa de consumir cocaína de nuevo para intentar sentirse mejor. ¿Quieres saber más?' },
                { url: '../../drogas/anfetas/anfetas.html', content: 'Estimulantes de tipo anfetamínico (ETA) Los estimulantes del tipo de las anfetaminas incluyen la anfetamina, dexanfetamina, metanfetamina y éxtasis, son producidos químicamente. Sus efectos son variados e incluyen la alerta, mareos, palpitaciones, a largo plazo puede producir depresión, psicosis y daños en el hígado y riñón. Recuerda: •	Puede presentarse como píldoras blancas o rocas brillantes, blancas o transparentes que se denominan cristal. •	La fabricación de la metanfetamina incluye el uso de algunas sustancias químicas tóxicas. •	La depresión se produce por efecto de los cambios químicos en el cerebro •	Existe un grave riesgo de contraer infecciones de transmisión sexual por sostener actividad sexual de riesgo bajo sus efectos. •	Los efectos son las alucinaciones y paranoia. ¿Cómo se manifiesta la adicción? Los efectos del uso prolongado de metanfetamina pueden durar mucho tiempo incluso después de que la persona deja de consumir la sustancia. Los efectos comprenden •	Ansiedad y confusión •	Problemas para dormir •	Cambios en el estado de ánimo, que incluyen ansiedad, depresión, euforia, pánico y manía •	Comportamiento violento •	Psicosis (oír, ver o sentir cosas que no existen) ¿Quieres saber más?' },
                { url: '../../drogas/Sedantes/sedantes.html', content: 'Los sedantes e hipnóticos, como las píldoras para dormir, tienen efectos sedantes y depresores en el cerebro y la médula espinal. Aspectos clave: Recetados para tratar ansiedad, problemas de sueño, dolor muscular, convulsiones, entre otros. Abuso y aumento de dosis pueden llevar a problemas graves. Se dividen en benzodiacepinas, barbitúricos y medicamentos para dormir. Combinarlos con otras sustancias sedantes puede ser peligroso, aumentando el riesgo de sobredosis y muerte. Efectos secundarios incluyen somnolencia, desorientación y falta de coordinación. El abuso implica tomarlos de manera no prescrita, por diversión o mezclados con otras sustancias. Los efectos pueden causar accidentes o lesiones graves. ¿Quieres saber más?' },
                { url: '../../drogas/inhalantes/inhalantes.html', content: 'Los inhalantes son químicos comunes en productos cotidianos que, al ser inhalados, pueden causar alteración de la conciencia. Puntos clave: Se encuentran en productos hogareños y laborales, como encendedores, aerosoles y pegamentos. Inhalación suficiente puede llevar a anestesia y pérdida de conocimiento. Causan mareos, náuseas y vómitos inmediatos. Uso prolongado daña sistemas y órganos vitales, así como el cerebro, afectando memoria y habilidades. Efectos adversos incluyen fatiga, dolores de cabeza, comportamiento agresivo, daño orgánico y más. Permanecen en tejidos cerebrales y nerviosos, causando daño a fibras nerviosas y neuronas. El consumo prolongado puede conducir a graves problemas de salud y riesgo de coma o muerte. ¿Quieres saber más?' },
                { url: '../../drogas/opioides/opioides.html', content: 'Los opioides son sustancias obtenidas de la planta de amapola, naturales o sintéticas, que tienen fuertes efectos analgésicos y pueden causar somnolencia, confusión y problemas respiratorios. Puntos clave: Producen náuseas, prurito y afectan la memoria y concentración. Pueden reducir funciones vitales como la respiración. Uso prolongado causa depresión, disminución del deseo sexual e impotencia. El abuso incluye tomarlos en dosis distintas a las indicadas, buscar placer o mezclarlos con otras sustancias. Los síntomas de abstinencia son diarrea, calambres, vómitos, sudores, entre otros. La sobredosis puede llevar a un estado de coma o muerte, especialmente cuando se combinan con alcohol u otros sedantes. El riesgo de sobredosis es alto cuando se combinan con otras sustancias. ¿Quieres saber más?' },
                { url: '../../mitos/mitos.html', content: 'Mitos Ejercicio de mitos y verdades sobre el alcohol Ejercicio de mitos y verdades sobre la marihuana Beneficios para la salud son un mito, ya que provoca problemas de salud graves. No favorece la amistad y la integración, sino que deteriora las relaciones y causa conflictos. No ayuda a superar dificultades, sino que afecta negativamente el rendimiento laboral y escolar. No activa la creatividad, sino que ocasiona deterioro intelectual y trastornos de memoria. No da alegría, es un depresor del Sistema Nervioso Central asociado a conflictos personales. No proporciona valor, solo desinhibe comportamiento y afecta el juicio, aumentando riesgo de accidentes. Enseñar a beber no es apropiado para niños y adolescentes, ya que les causa daño. No ayuda a tomar decisiones, produce un deterioro psicológico que afecta la toma de decisiones. Marihuana: No es buena solo por ser natural, contiene sustancias tóxicas y su humo es perjudicial. Sí es una sustancia química compuesta por más de 500 sustancias, siendo el THC su principal componente psicotrópico. No se considera medicinal en la forma en que se presenta a la población, tiene componentes tóxicos. No aumenta la creatividad, reduce funciones cognitivas esenciales y el placer. No mejora la capacidad de estudiar, desintegra procesos cognitivos necesarios para el aprendizaje. No es menos perjudicial que el cigarrillo, contiene agentes perjudiciales similares. Sí, es adictiva y la persona continúa consumiéndola a pesar de las consecuencias negativas. Sí ocasiona problemas psiquiátricos, está asociada a depresión, ansiedad y riesgo de psicosis, especialmente en adolescentes.' },
                { url: '../../objetivos/objetivos.html', content: 'Preguntas para plantear objetivos personales sobre el consumo ¿Qué quiero hacer? 1.	No me interesa consumir, pero me preocupa no estar informado al respecto 2.	He probado alcohol, pero quiero evitar consumirlo de nuevo 3.	He probado cigarrillo, pero quiero evitar consumirlo de nuevo 4.	He probado cigarrillo electrónico, pero quiero evitar consumirlo de nuevo 5.	He probado marihuana, pero quiero evitar consumirla de nuevo 6.	He probado otras sustancias, pero quiero evitar consumirlas de nuevo' },
                { url: '../../objetivos/opcion1/opcion1.html', content: '1.	SI quieres estar informado sobre qué son las sustancias psicoactivas y sus efectos 2.	Si te preocupa que tus amigos están consumiendo y no sabes que hacer 3.	Si te preocupa cómo estas manejando tus emociones' },
                { url: '../../objetivos/opcion2/opcion2.html', content: '1.	Si te preocupa que haya ocasiones en que te ofrezcan alcohol pero tu no desees consumir 2.	Si te preocupa cómo estas manejando tus emociones' },
                { url: '../../objetivos/opcion3/opcion3.html', content: '1.	Si te preocupa que haya ocasiones en que te ofrezcan marihuana pero tu no desees consumir  2.	Si te preocupa cómo estas manejando tus emociones' },
                { url: '../../comunicacion/comunicacion.html', content: 'Las habilidades de comunicación son esenciales en situaciones que involucran sustancias psicoactivas. Aquí se resumen las habilidades clave: Comunicación efectiva: Escucha activa y expresión clara y respetuosa de ideas y sentimientos, atendiendo tanto al lenguaje verbal como no verbal. Asertividad: Expresión precisa de ideas y sentimientos en el momento adecuado y de manera directa, respetando derechos propios y ajenos, promoviendo la comunicación efectiva y el auto-respeto. Habilidades de Rechazo: Enfrentamiento: Ser directo, buscar excusas, aplazar invitaciones, usar humor sin herir. Evitación: Unirse a personas que no abusan del consumo, cambiar de actividad en situaciones de riesgo. Negociación: Acuerdos en diferencias de intereses, con respeto, flexibilidad y reconocimiento de errores. Habilidades interpersonales: Construcción y mantenimiento de relaciones positivas, terminación constructiva de relaciones. Habilidades de Cooperación: Trabajar en equipo para objetivos comunes, usando comunicación, asertividad y empatía. Afrontar la presión: Derechos: Decir NO, no dar explicaciones, oponerse a propuestas dañinas, buscar ayuda y alejarse de presiones negativas. Estrategias: Decir NO con claridad, compartir con personas afines, actuar rápidamente para apoyar a otros. Estas habilidades fomentan relaciones saludables y ayudan a enfrentar la presión de manera constructiva, promoviendo la autonomía y el bienestar.' },
                { url: '../../emociones/emociones.html', content: 'El manejo de emociones es esencial para enfrentar situaciones inciertas en la vida. Esto incluye reconocer y comprender tanto nuestras propias emociones como las de los demás, así como cómo estas influyen en nuestras acciones. El locus de control, ya sea interno o externo, también desempeña un papel crucial en cómo enfrentamos las circunstancias. Un locus de control interno implica asumir la responsabilidad de nuestras acciones, mientras que uno externo atribuye las situaciones a factores externos. El control del estrés es fundamental, ya que las drogas no resuelven las fuentes de estrés, sino que las complican. Para manejar el estrés, es importante identificar sus fuentes y tomar medidas para reducirlas, como descansar, dormir adecuadamente, escuchar música, hacer ejercicio y evitar el uso de sustancias adictivas. El estrés puede llevar al uso de sustancias como una forma inadecuada de lidiar con el dolor emocional, lo que aumenta la probabilidad de desarrollar dependencia. Conversar con otros puede brindar nuevas perspectivas y estrategias positivas para afrontar el estrés. Por ejemplo, en lugar de recurrir a la bebida para olvidar el dolor, se puede aprender a aceptar y abrazar el dolor como parte de la vida, lo que conduce a una mejor gestión de las situaciones estresantes. En resumen, el control de emociones y el manejo del estrés son habilidades esenciales para enfrentar los desafíos de la vida y evitar recurrir al uso de sustancias como una vía para lidiar con ellos. Conversar con personas de confianza y buscar formas saludables de enfrentar el estrés son estrategias clave para mantener la salud mental y emocional.' },
                { url: '../../decisiones/decisiones.html', content: 'Toma de decisiones Tu eres la persona que más te conoce por ello, si estás pensando en probar alguna sustancia psicoactiva, ten presente que no es posible saber con exactitud cómo reaccionará tu cuerpo, pues no sólo depende del tipo de sustancia, la cantidad, la pureza o la forma de consumo, sino que depende mucho del momento en el que te encuentres. Por tanto, es importante que estés preparado para la toma de decisiones pues es un proceso que constantemente estamos haciendo. o	¿Qué es una decisión? Una decisión es el producto de un proceso mental que realizamos a partir de valorar una serie de posibilidades, implicando entonces la elección y simultáneamente la renuncia de algo. Miremos este ejemplo: Miguel es un joven tímido e introvertido, sin embargo, desde hace varios meses ha estado pensando en la manera de declararle su amor a Sofía (compañera de colegio). A pesar de su dificultad para expresarse y de lo mucho que lo desafía la situación, ha decidido dejar todas las mañanas, un chocolate en la mesa de Sofía, pensando que en algún momento ella descubrirá quien le hace este tipo de detalles. Sin embargo, han pasado varios días y aún Sofía no da muestras de identificar quien es su “amigo secreto”. En los últimos días Miguel nota que, al salir del colegio, Sofía está compartiendo mucho más tiempo con unos chicos que fuman cigarrillo electrónico. Julián está considerando aprender a fumar para acercarse a ella. o	Piensa sobre: o	Los aspectos positivos de la situación o	Los aspectos negativos de la situación o	¿Cuál habría sido tu decisión? Ahora si te cuento que el sueño de Miguel es convertirse en cantante y ser representante de su cultura, razón por la cual requiere prepararse y proteger su voz, así como manejar muy bien su respiración, ¿Qué le aconsejarías a Miguel? En muchas situaciones estaremos expuestos a momentos de decisión en nuestras vidas por ello las preguntas que debemos hacernos a nosotros mismos son: o	¿Por qué quiero consumir sustancias? ¿Estas razones son más importantes que otras? o	¿El consumo de sustancias es la única forma de poder lograr lo que quiero? o	¿Cómo el consumo de alcohol y cigarrillo podría impedirme lograr lo que me he propuesto en los próximos años?' },
                { url: '../../login/login.html', content: 'ingresar credenciales autorizadas' },
                { url: '../../signup/signup.html', content: 'registro registrarse registrate' }
                
            ];

            let resultsFound = false;  // Variable para rastrear si se encontraron resultados

            for (const page of pages) {
                if (page.content.includes(keyword)) {
                    const li = document.createElement('li');
                    const keywordForURL = urlToKeywordMap[page.url] || 'Palabra clave no especificada';
                    li.innerHTML = `<a href="${page.url}">${keywordForURL}</a>`;
                    searchResults.appendChild(li);
                    resultsFound = true;  // Se encontraron resultados
                }
            }

            if (!resultsFound) {
                const noResultsMessage = document.createElement('p');
                noResultsMessage.innerText = 'No se encontraron resultados para la búsqueda.';
                searchResults.appendChild(noResultsMessage);
            }
        }

        if (searchTerm) {
            document.getElementById('searchInput').value = searchTerm;
            search(searchTerm);
        }

        const clearButton = document.getElementById('clearButton');
        clearButton.addEventListener('click', function () {
            document.getElementById('searchInput').value = '';
            searchResults.innerHTML = '';
        });
