// ========== Preloader ========== //

jQuery(window).load(function () {
  $("#preloader").fadeOut("slow");
});

// ========== Welcome Section Slider ========== //

$(function () {
  var Page = (function () {
    var $navArrows = $("#nav-arrows"),
      $nav = $("#nav-dots > span"),
      slitslider = $("#slider").slitslider({
        onBeforeChange: function (slide, pos) {
          $nav.removeClass("nav-dot-current");
          $nav.eq(pos).addClass("nav-dot-current");
        }
      }),
      init = function () {
        initEvents();
      },
      initEvents = function () {
        // add navigation events
        $navArrows.children(":last").on("click", function () {
          slitslider.next();
          return false;
        });

        $navArrows.children(":first").on("click", function () {
          slitslider.previous();
          return false;
        });

        $nav.each(function (i) {
          $(this).on("click", function (event) {
            var $dot = $(this);

            if (!slitslider.isActive()) {
              $nav.removeClass("nav-dot-current");
              $dot.addClass("nav-dot-current");
            }

            slitslider.jump(i + 1);
            return false;
          });
        });
      };

    return { init: init };
  })();

  Page.init();
});

// ========== Menu item highlighting ========== //
$(document).ready(function () {

  jQuery("#nav").singlePageNav({
    offset: jQuery("#nav").outerHeight(),
    filter: ":not(.external)",
    speed: 2000,
    currentClass: "current",
    easing: "easeInOutExpo",
    updateHash: true,
    beforeStart: function () {
      console.log("begin scrolling");
    },
    onComplete: function () {
      console.log("done scrolling");
    }
  });

  $(window).scroll(function () {
    if ($(window).scrollTop() > 400) {
      $(".navbar-brand a").css("color", "#fff");
      $("#navigation").removeClass("animated-header");
    } else {
      $(".navbar-brand a").css("color", "inherit");
      $("#navigation").addClass("animated-header");
    }
  });

// ========== Fix Slider Height ========== //

  // Slider Height
  var slideHeight = $(window).height();

  $("#home-slider, #slider, .sl-slider, .sl-content-wrapper").css(
    "height",
    slideHeight
  );

  $(window).resize(function () {
    "use strict",
      $("#home-slider, #slider, .sl-slider, .sl-content-wrapper").css(
        "height",
        slideHeight
      );
  });

  $("#works, #testimonial").owlCarousel({
    navigation: true,
    pagination: false,
    slideSpeed: 700,
    paginationSpeed: 400,
    singleItem: true,
    navigationText: [
      "<i class='fa fa-angle-left fa-lg'></i>",
      "<i class='fa fa-angle-right fa-lg'></i>"
    ]
  });

// ========== Featured Project Lightbox ========== //

  $(".fancybox").fancybox({
    padding: 0,

    openEffect: "elastic",
    openSpeed: 650,

    closeEffect: "elastic",
    closeSpeed: 550,

    closeClick: true,

    beforeShow: function () {
      this.title = $(this.element).attr("title");
      this.title =
        "<h3>" +
        this.title +
        "</h3>" +
        "<p>" +
        $(this.element).parents(".portfolio-item").find("img").attr("alt") +
        "</p>";
    },

    helpers: {
      title: {
        type: "inside"
      },
      overlay: {
        css: {
          background: "rgba(0,0,0,0.8)"
        }
      }
    }
  });
});

// ========== START GOOGLE MAP ========== //
/*
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, "load", init);

function init() {
  // Basic options for a simple Google Map
  // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions

  var myLatLng = new google.maps.LatLng(22.402789, 91.822156);

  var mapOptions = {
    zoom: 15,
    center: myLatLng,
    disableDefaultUI: true,
    scrollwheel: false,
    navigationControl: true,
    mapTypeControl: false,
    scaleControl: false,
    draggable: true,

    // How you would like to style the map.
    // This is where you would paste any style found on Snazzy Maps.
    styles: [
      {
        featureType: "water",
        stylers: [
          {
            color: "#46bcec"
          },
          {
            visibility: "on"
          }
        ]
      },
      {
        featureType: "landscape",
        stylers: [
          {
            color: "#f2f2f2"
          }
        ]
      },
      {
        featureType: "road",
        stylers: [
          {
            saturation: -100
          },
          {
            lightness: 45
          }
        ]
      },
      {
        featureType: "road.highway",
        stylers: [
          {
            visibility: "simplified"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#444444"
          }
        ]
      },
      {
        featureType: "transit",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "poi",
        stylers: [
          {
            visibility: "off"
          }
        ]
      }
    ]
  };

  // Get the HTML DOM element that will contain your map
  // We are using a div with id="map" seen below in the <body>
  var mapElement = document.getElementById("map-canvas");

  // Create the Google Map using our element and options defined above
  var map = new google.maps.Map(mapElement, mapOptions);

  // Let's also add a marker while we're at it
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(22.402789, 91.822156),
    map: map,
    icon: "img/icons/map-marker.png"
  });
}

// ========== END GOOGLE MAP ========== //
*/

var wow = new WOW({
  offset: 75, // distance to the element when triggering the animation (default is 0)
  mobile: false // trigger animations on mobile devices (default is true)
});
wow.init();

// ========== Touch Functions ========== //

// Touch Event Handler
document.addEventListener('DOMContentLoaded', function() {
  // Prüfen ob es sich um ein Touch-Gerät handelt
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isTouchDevice) {
      // Touch-Events für Portfolio-Items
      const portfolioItems = document.querySelectorAll('.portfolio-item');
      
      portfolioItems.forEach(item => {
          // Touch Start
          item.addEventListener('touchstart', function(e) {
              e.preventDefault();
              this.classList.add('touch-active');
          }, { passive: false });
          
          // Touch End
          item.addEventListener('touchend', function() {
              this.classList.remove('touch-active');
          });
          
          // Touch Cancel
          item.addEventListener('touchcancel', function() {
              this.classList.remove('touch-active');
          });
      });
      
      // Touch-Feedback für Buttons
      const buttons = document.querySelectorAll('.btn');
      buttons.forEach(btn => {
          btn.addEventListener('touchstart', function() {
              this.classList.add('touch-active');
          });
          
          btn.addEventListener('touchend', function() {
              this.classList.remove('touch-active');
          });
      });
      
      // Verbesserte Scroll-Performance
      const touchElements = document.querySelectorAll('.portfolio-item, .btn, .navbar-nav > li > a');
      touchElements.forEach(el => {
          el.style.webkitTapHighlightColor = 'transparent';
          el.style.webkitTouchCallout = 'none';
      });
      
      // Prevent default zoom on iOS when focusing inputs
      const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
      inputs.forEach(input => {
          input.style.fontSize = '16px';
      });
  }
});

// ========== Toggle ========== //

document.addEventListener('DOMContentLoaded', function() {
  // Toggle Button und Navbar Content
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  // Event Listener für alle Navigations-Links
  const navLinks = document.querySelectorAll('.navbar-nav > li > a');
  
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          // Wenn das Menü geöffnet ist (hat die Klasse 'in')
          if (navbarCollapse.classList.contains('in')) {
              // Simuliere einen Klick auf den Toggle-Button
              navbarToggle.click();
          }
      });
  });
  
  // Zusätzlich: Schließen beim Klick außerhalb
  document.addEventListener('click', function(e) {
      const isClickInside = navbarCollapse.contains(e.target) || navbarToggle.contains(e.target);
      
      if (!isClickInside && navbarCollapse.classList.contains('in')) {
          navbarToggle.click();
      }
  });
});