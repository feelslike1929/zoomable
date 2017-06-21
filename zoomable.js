(function($) {
  $.fn.zoomable = function(options) {
    var self = this;
    var settings = $.extend({
      inheritScale: 1, //INT - original scale
      increment: 0.1,
      minScale: 0.1, //INT - interpreted as percentage
      maxScale: 2, //INT - interpreted as percentage
      feedback: true, //BOOLEAN
      feedbackDuration: 750, //INT
      origin: null, //NULL | STRING - "mouse"
      originX: 0, //INT - interpreted as percentage
      originY: 0, //INT - interpreted as percentage
      zoomControls: true //BOOLEAN
    }, options);
    var currentScale = settings.inheritScale;

    function feedback() {
      $('#currentZoom').remove();
      $('body').append('<div id="currentZoom"></div>');

      $('#currentZoom').text((currentScale * 100).toFixed(0) + '%').fadeOut(settings.feebackDuration);
      var t = setTimeout(function() {
        $('#currentZoom').remove();
      }, settings.feebackDuration);
      clearTimeout(t);
    }

    if (settings.origin == 'mouse') {
      //get mouse position
      $(document).on('mousemove', function(e) {
        settings.originX = ((e.pageX / $(document).width()) * 100).toFixed();
        settings.originY = ((e.pageY / $(document).height()) * 100).toFixed();
      });
    }
    if (settings.zoomControls == true) {
      //show zoom controls
      $('body').append('<div id="zoomControls"><button value="Reset Zoom" id="reset" class="btn">Reset Zoom</button><button value="Increase Zoom" id="increaseZoom" class="btn">Increase Zoom</button><button value="Decrease Zoom" id="decreaseZoom" class="btn">Decrease Zoom</button></div>');

      $(document).on('click', '#reset', function() {
        if (currentScale != settings.inheritScale) {
          currentScale = settings.inheritScale;
          self.css({
            'transform': 'scale(' + settings.inheritScale + ',' + settings.inheritScale + ')',
            'transform-origin': settings.originX + '%' + settings.originY + '%'
          });
          (settings.feedback == true) && feedback();
        }
      });

      $(document).on('click', '#increaseZoom', function() {
        if (currentScale < settings.maxScale) {
          currentScale = parseFloat((currentScale + settings.increment).toFixed(2));
          self.css({
            'transform': 'scale(' + currentScale + ',' + currentScale + ')',
            'transform-origin': settings.originX + '%' + settings.originY + '%'
          });
          settings.feedback == true && feedback();
        }
      });

      $(document).on('click', '#decreaseZoom', function() {
        if (currentScale > settings.increment) {
          currentScale = parseFloat((currentScale - settings.increment).toFixed(2));
          self.css({
            'transform': 'scale(' + currentScale + ',' + currentScale + ')',
            'transform-origin': settings.originX + '%' + settings.originY + '%'
          });
          settings.feedback == true && feedback();
        }
      });
    }

    $(document).on('mousewheel DOMMouseScroll', function(e) {
      if (e.altKey) {
        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
          if (currentScale < settings.maxScale) {
            currentScale = parseFloat((currentScale + settings.increment).toFixed(2));
            settings.feedback == true && feedback();
          }

        } else {
          if (currentScale > settings.minScale) {
            currentScale = parseFloat((currentScale - settings.increment).toFixed(2));
            settings.feedback == true && feedback();
          }
        }
        self.css({
          'transform': 'scale(' + currentScale + ',' + currentScale + ')',
          'transform-origin': settings.originX + '%' + settings.originY + '%'
        });
      }
    });
    return self;
  };
}(jQuery));
