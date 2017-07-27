# Zoomable
#### A simple jQuery plugin for custom zooming
This jQuery plugin is designed to add zooming functionality of an element using zoom controls (increase, decrease, and reset zoom) or alt + mouse wheel scroll.

<a href="https://jsfiddle.net/FeelsLike1929/81okd956/">Demo on JSFiddle</a>

## Options
**inheritScale**
* Accepts INT value
* Default scale of the element (1 will keep the element the same size, 2 will double it on initial load)

**increment**
* Accepts INT value
* The percent increase or decrease between mouse wheel ticks

**minScale**
* Accepts INT value (Interpreted as a percentage -- 0.2 will be 20%) 
* How far a user can zoom out the element

**maxScale**
* Accepts INT value (Interpreted as a percentage -- 1.4 will be 140%) 
* How far a user can zoom into the element

**feedback**
* Accepts BOOLEAN value (true or false)
* Turn on or off the visual feedback of current zoom percentage

**feedbackDuration**
* Accepts INT value (in milliseconds - For example, 1000 for 1 second)
* Determines how long the visual feedback of the curren zom percentage lingers on screen

**feedbackClass**
* Accepts a string
* The class that is added the #zoomable-feedback element 

**origin**
* Accepts NULL or STRING ("mouse")
* Used to overwrite the originX and originY values with the current position of the cursor

**originX**
* Accepts INT value (interpreted as a percentage -- 40 will be 40%) 
* Determines the percent distance from the left edge of the window for horizontal zoom origin 

**originY**
* Accepts INT value (interpreted as a percentage -- 50 will be 50%) 
* Determines the percent distance from the top edge of the window for vertical zoom origin 

**zoomControls**
* Accepts BOOLEAN value (true or false)
* Toggles the zoom controls on or off

**zoomControlsClass**
* Accepts a string
* The class that is added the #zoom-controls element 

**zoomControlsButtonClass**
* Accepts a string
* The class that is added the buttons (reset, increase, and decrease) inside of the #zoom-controls element 

**zoomControlsAppendLocation**
* Accepts a jQuery selector (For example,  $('#container') or $(document) )
* Determines which element the #zoom-controls element will be appended to

**zoomableArea**
* Accepts a jQuery selector (For example,  $('#container') or $(document) )
* Determines which element or section of the page allows for the mouse wheel scroll zoom


