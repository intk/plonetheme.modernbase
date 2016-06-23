/* This is a bundle that uses RequireJS to pull in dependencies.
   These dependencies are defined in the registry.xml file */


/* do not include jquery multiple times */
if (window.jQuery) {
  define('jquery', [], function() {
    return window.jQuery;
  });
}

$(document).ready(function($){
  var isLateralNavAnimating = false;
  
  //open/close lateral navigation
  $('.cd-nav-trigger').on('click', function(event) {
    event.preventDefault();
    //stop if nav animation is running 

    if (slickSlideshow != undefined) {
      if (slickSlideshow.playing) {
        slickSlideshow.pauseCurrentSlide();
      }
    }

    if( !isLateralNavAnimating ) {
      if($(this).parents('.csstransitions').length > 0 ) isLateralNavAnimating = true; 
      
      $('body').toggleClass('navigation-is-open');
      $('.cd-navigation-wrapper').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
        //animation is over
        isLateralNavAnimating = false;
      });
    }
  });

  if ($("#street-view").length > 0) {

    options = {};
    options['lat'] = $("#street-view").data('lat');
    options['lng'] = $("#street-view").data('lng');
    options['heading'] = $("#street-view").data('heading');
    options['pitch'] = $("#street-view").data('pitch');
    if ($("#street-view").data('addresscontrol') == "False"){
      options['addressControl'] = false 
    }
    else{
      options['addressControl'] = true 
    }
    if ($("#street-view").data('zoomcontrol') == "False"){
      options['zoomControl'] = false 
    }
    else{
      options['zoomControl'] = true 
    }
    
    if ($("#street-view").data('linkscontrol') == "False"){
      options['linksControl'] = false 
    }
    else{
      options['linksControl'] = true 
    }
    
    if ($("#street-view").data('pancontrol') == "False"){
      options['panControl'] = false 
    }
    else{
      options['panControl'] = true 
    }
    
    if ($("#street-view").data('enableclosebutton') == "False") {
      options['enableCloseButton'] = false 
    }
    else{
      options['enableCloseButton'] = true 
    }
    
    if ($("#street-view").data('fullscreencontrol') == "False") {
      options['fullscreenControl'] = false 
    }
    else {
      options['fullscreenControl'] = true 
    }
    

    var panorama = new google.maps.StreetViewPanorama(
    document.getElementById('street-view'),
    {
      position: {lat: options['lat'], lng: options['lng']},
      pov: {heading: options['heading'], pitch: options['pitch']},
      zoom: options['zoom'],
      addressControl: options['addressControl'],
      zoomControl: options['zoomControl'],
      linksControl: options['linksControl'],
      panControl: options['panControl'],
      enableCloseButton: options['enableCloseButton'],
      fullscreenControl: options['fullscreenControl'],
    });
  }
});



require([
  'jquery',
], function($, dep1, logger){
  'use strict';

  // initialize only if we are in top frame
  if (window.parent === window) {
    $(document).ready(function() {
      $('body').addClass('modernbase-main');
    });
  }
});


