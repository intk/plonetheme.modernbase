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


