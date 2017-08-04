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
    if (settings.zoomControls === true) {
      //show zoom controls
      settings.zoomControlsAppendLocation.append('\n\
      <div id="zoom-controls" class="'+settings.zoomControlsClass+'">\n\
      <button id="zoomable-dec" class="'+settings.zoomControlsButtonClass+'"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g transform="translate(0, 0)"><path fill="#444444" d="M12.7,11.3c0.9-1.2,1.4-2.6,1.4-4.2C14.1,3.2,11,0,7.1,0S0,3.2,0,7.1c0,3.9,3.2,7.1,7.1,7.1 c1.6,0,3.1-0.5,4.2-1.4l3,3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L12.7,11.3z M7.1,12.1 C4.3,12.1,2,9.9,2,7.1S4.3,2,7.1,2s5.1,2.3,5.1,5.1S9.9,12.1,7.1,12.1z"></path> <rect data-color="color-2" x="4" y="6" fill="#444444" width="6" height="2"></rect></g></svg></button>\n\
      <button id="zoomable-reset" class="'+settings.zoomControlsButtonClass+'"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g transform="translate(0, 0)"><path fill="#444444" d="M2,6H0V1c0-0.6,0.4-1,1-1h5v2H2V6z"></path> <path fill="#444444" d="M16,6h-2V2h-4V0h5c0.6,0,1,0.4,1,1V6z"></path> <path fill="#444444" d="M15,16h-5v-2h4v-4h2v5C16,15.6,15.6,16,15,16z"></path> <path fill="#444444" d="M6,16H1c-0.6,0-1-0.4-1-1v-5h2v4h4V16z"></path></g></svg></button>\n\
      <button id="zoomable-inc" class="'+settings.zoomControlsButtonClass+'"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g transform="translate(0, 0)"><path fill="#444444" d="M12.7,11.3c0.9-1.2,1.4-2.6,1.4-4.2C14.1,3.2,11,0,7.1,0S0,3.2,0,7.1c0,3.9,3.2,7.1,7.1,7.1 c1.6,0,3.1-0.5,4.2-1.4l3,3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L12.7,11.3z M7.1,12.1 C4.3,12.1,2,9.9,2,7.1S4.3,2,7.1,2s5.1,2.3,5.1,5.1S9.9,12.1,7.1,12.1z"></path> <polygon data-color="color-2" fill="#444444" points="8,4 6,4 6,6 4,6 4,8 6,8 6,10 8,10 8,8 10,8 10,6 8,6 "></polygon></g></svg></button>\n\
      </div>');

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
