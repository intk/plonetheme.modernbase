/* This is a bundle that uses RequireJS to pull in dependencies.
   These dependencies are defined in the registry.xml file */


/* do not include jquery multiple times */
if (window.jQuery) {
  define('jquery', [], function() {
    return window.jQuery;
  });
}

var panoramas = [];
var panorama = null;
var interval_time = 55;
var heading_increase = 0.01;
var pov_pitch = 0; /* original pitch */
var acceleration = 0.004;
var heading_high_limit = 300; /* Start point */
var heading_low_limit = 197.98; 
var heading_middle = heading_high_limit - ((heading_high_limit - heading_low_limit) / 2);
var pov_interval = null;

function getPanorama(uid) {
  for (var i = 0; i < panoramas.length; i++) {
    var pano = panoramas[i];
    var curr_uid = pano.uid;
    if (curr_uid == uid) {
      return pano;
    }
  };
  
  return false;
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

  /* Street view functionality */
  if ($(".street-view").length > 0) {
    $(".street-view").each(function(idx, el) {
      var options = {};
      options['lat'] = $(this).data('lat');
      options['lng'] = $(this).data('lng');
      options['heading'] = $(this).data('heading');
      options['pitch'] = $(this).data('pitch');
      options['heading_lower'] = $(this).data('headinglower');
      options['uid'] = $(this).data('uid');
      if ($(this).data('addresscontrol') == "False"){
        options['addressControl'] = false 
      } else {
        options['addressControl'] = true 
      }

      if ($(this).data('zoomcontrol') == "False"){
        options['zoomControl'] = false 
      } else {
        options['zoomControl'] = true 
      }
      
      if ($(this).data('linkscontrol') == "False"){
        options['linksControl'] = false 
      } else{
        options['linksControl'] = true 
      }
      
      if ($(this).data('pancontrol') == "False"){
        options['panControl'] = false 
      } else {
        options['panControl'] = true 
      }
      
      if ($(this).data('enableclosebutton') == "False") {
        options['enableCloseButton'] = false 
      } else {
        options['enableCloseButton'] = true 
      }
      
      if ($(this).data('fullscreencontrol') == "False") {
        options['fullscreenControl'] = false 
      } else {
        options['fullscreenControl'] = true 
      }
      
      var panorama = new google.maps.StreetViewPanorama(
      el,
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

      if (options['heading_lower'] != undefined && options['heading_lower'] != '') {
        pov_pitch = options['pitch'];
        if (options['heading_lower'] > options['heading']) {
          heading_low_limit = options['heading'];
          heading_high_limit = options['heading_lower'];
        } else {
          heading_low_limit = options['heading_lower'];
          heading_high_limit = options['heading'];
        }
        heading_middle = heading_high_limit - ((heading_high_limit - heading_low_limit) / 2);
        options['heading_middle'] = heading_middle;
      }

      options['heading_increase'] = heading_increase;
      var new_panorama = {
        panorama: panorama,
        uid: options['uid'],
        options: options,
        pov_interval: null,
        pov_init: false
      }
      panoramas.push(new_panorama);
    });
  }

  $(".play-button").on('click', function()  {
    var audio_div = $(this).parents('.slick-slide').find('audio')[0];
    if ($(this).hasClass('playing')) {
      $(this).removeClass('playing');
      $(this).addClass('paused');
      $(this).removeClass('hi-icon-volume-up');
      $(this).addClass('hi-icon-volume-off');
      audio_div.player.pause();
    } else if ($(this).hasClass('paused')) {
      $(this).removeClass('paused');
      $(this).addClass('playing');
      $(this).removeClass('hi-icon-volume-off');
      $(this).addClass('hi-icon-volume-up');
      audio_div.player.play();
    } else {
      $(this).addClass('playing');
      audio_div.player.play();
      $(this).removeClass('hi-icon-volume-pff');
      $(this).addClass('hi-icon-volume-up');
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


