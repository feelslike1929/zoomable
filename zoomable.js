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

//v1.2.2

(function($) {
  $.fn.zoomable = function(options) {
    var self = this,
    settings = $.extend({
      inheritScale: 1,
      increment: 0.1,
      minScale: 0.1,
      maxScale: 2,
      feedback: true,
      feedbackDuration: 1000,
      feedbackClass : 'zoomable-feedback',
      origin: null,
      originX: 0,
      originY: 0,
      zoomControls: false,
      zoomControlsClass: 'zoom-controls',
      zoomControlsButtonClass: 'zoomable-button',
      zoomControlsAppendLocation: $('body'),
      zoomableArea: self
    }, options),
    currentScale = settings.inheritScale;

    function feedback() {
      $('#zoomable-feedback').length > 0 && $('#zoomable-feedback').remove();
      $('body').append('<div id="zoomable-feedback" class="'+settings.feedbackClass+'"></div>');
      $('#zoomable-feedback').text((currentScale * 100).toFixed(0) + '%').fadeOut(settings.feedbackDuration, function(){
      $(this).remove()
      });
    }
    function eventChanges() {
      self.css({
        'transform': 'scale(' + currentScale + ',' + currentScale + ')',
        'transform-origin': settings.originX + '%' + settings.originY + '%'
      });
      settings.feedback === true && feedback();
    }

    if (settings.origin === 'mouse') {
      //get mouse position
      self.on('mousemove', function(e) {
        settings.originX = ((e.pageX / $(document).width()) * 100).toFixed();
        settings.originY = ((e.pageY / $(document).height()) * 100).toFixed();
      });
    }
    if (settings.zoomControls === true && $('#zoom-controls').length == 0) {
      //show zoom controls
      settings.zoomControlsAppendLocation.append('<div id="zoom-controls" class="'+settings.zoomControlsClass+'"><button id="zoomable-reset" class="'+settings.zoomControlsButtonClass+'">Reset Zoom</button><button id="zoomable-inc" class="'+settings.zoomControlsButtonClass+'">Increase Zoom</button><button id="zoomable-dec" class="'+settings.zoomControlsButtonClass+'">Decrease Zoom</button></div>');

      settings.zoomControlsAppendLocation.on('click', '#zoomable-reset', function() {
        if (currentScale != settings.inheritScale) {
          currentScale = settings.inheritScale;
          eventChanges();
        }
      });

      settings.zoomControlsAppendLocation.on('click', '#zoomable-inc', function() {
        if (currentScale < settings.maxScale) {
          currentScale = parseFloat((currentScale + settings.increment).toFixed(2));
          eventChanges();
        }
      });

      settings.zoomControlsAppendLocation.on('click', '#zoomable-dec', function() {
        if (currentScale > settings.increment) {
          currentScale = parseFloat((currentScale - settings.increment).toFixed(2));
          eventChanges();
        }
      });
    }

    settings.zoomableArea.on('mousewheel DOMMouseScroll', function(e) {
      if (e.altKey) {
      e.preventDefault();
        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
          if (currentScale < settings.maxScale) {
            currentScale = parseFloat((currentScale + settings.increment).toFixed(2));
          }

        } else {
          if (currentScale > settings.minScale) {
            currentScale = parseFloat((currentScale - settings.increment).toFixed(2));
          }
        }
        eventChanges()
      }
    });
    return self;
  };
}(jQuery));
