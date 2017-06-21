// MIT License

// Copyright (c) 2017 Jeffrey Rooks

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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
      $('#cz').remove();
      $('body').append('<div id="cz" style="position:absolute;left:50%;top:50%;font-size:2em;"></div>');
      $('#cz').text((currentScale * 100).toFixed(0) + '%').fadeOut(settings.feebackDuration);
      var t = setTimeout(function() {
        $('#cz').remove();
      }, settings.feebackDuration);
      clearTimeout(t);
    }

    if (settings.origin == 'mouse') {
      //get mouse position
      self.on('mousemove', function(e) {
        settings.originX = ((e.pageX / $(document).width()) * 100).toFixed();
        settings.originY = ((e.pageY / $(document).height()) * 100).toFixed();
      });
    }
    if (settings.zoomControls == true) {
      //show zoom controls
      $('body').append('<div id="zoomControls"><button id="reset" class="btn">Reset Zoom</button><button id="inc" class="btn">Increase Zoom</button><button id="dec" class="btn">Decrease Zoom</button></div>');

      $('#reset').on('click', function() {
        if (currentScale != settings.inheritScale) {
          currentScale = settings.inheritScale;
          self.css({
            'transform': 'scale(' + settings.inheritScale + ',' + settings.inheritScale + ')',
            'transform-origin': settings.originX + '%' + settings.originY + '%'
          });
          (settings.feedback == true) && feedback();
        }
      });

      $('#inc').on('click', function() {
        if (currentScale < settings.maxScale) {
          currentScale = parseFloat((currentScale + settings.increment).toFixed(2));
          self.css({
            'transform': 'scale(' + currentScale + ',' + currentScale + ')',
            'transform-origin': settings.originX + '%' + settings.originY + '%'
          });
          settings.feedback == true && feedback();
        }
      });

      $('#dec').on('click', function() {
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

    self.on('mousewheel DOMMouseScroll', function(e) {
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
