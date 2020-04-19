// hamburgermenu
let menuKnop = document.querySelector(".menu");
let menuKnop2 = document.querySelector(".menu2");
let navMenu = document.querySelector("nav");

function verbergMenu() {
	navMenu.classList.add("onzichtbaar");
}
menuKnop2.addEventListener("click",verbergMenu);
function toonMenu() {
	navMenu.classList.remove("onzichtbaar");
}
menuKnop.addEventListener("click",toonMenu);

let project = document.querySelector(".onzichtbaar");
function slide() {
  window.scrollBy({
    top: 800,
    left: 0,
    behavior: 'smooth'
  });
}
project.addEventListener("click",slide);
project.addEventListener("click",verbergMenu);


// filteren
function onButtonGroupClick( event ) {
  // only button clicks, zorgt ervoor dat als één knop bij de sort buttons geselecteerd ^w dat de andere gedeselecteerd ^w
  if ( !matchesSelector( event.target, '.button' ) ) {
    return;
  }
  let button = event.target;
  button.parentNode.querySelector('.is-checked').classList.remove('is-checked');
  button.classList.add('is-checked');
}

// init Isotope filter
let filtering = new Isotope( '.art', {
  itemSelector: '.element-item',
  layoutMode: 'fitRows',
});

// bind filter button click
let filtersElem = document.querySelector('.filter-button-group');
filtersElem.addEventListener("click", function( event ) {
  // only work with buttons
  if ( !matchesSelector( event.target, 'button' ) ) {
    return;
  }
  let filterValue = event.target.getAttribute('data-filter');
  // use matching filter function
  filtering.arrange({ filter: filterValue });
});

// change is-checked class on buttons
let buttonGroups = document.querySelectorAll('.button-group');
for ( var i=0; i < buttonGroups.length; i++ ) {
  buttonGroups[i].addEventListener( 'click', onButtonGroupClick );
}




// zoekfunctie werkt jammer genoeg niet but I tried ...
// quick search regex
var qsRegex;
// init Isotope
var $art = $('.art').isotope({
	itemSelector: '.element-item',
	layoutMode: 'fitRows',
	filter: function() {
		return qsRegex ? $(this).text().match( qsRegex ) : true;
	},
	getSortData: {
		category: '[data-category]',
	}
});

var $quicksearch = $('.search').keyup( debounce( function() {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  $art.isotope();
}, 200 ) );

function debounce( fn, threshold ) {
  var timeout;
  threshold = threshold || 100;
  return function debounced() {
    clearTimeout( timeout );
    var args = arguments;
    var _this = this;
    function delayed() {
      fn.apply( _this, args );
    }
    timeout = setTimeout( delayed, threshold );
  };
}
