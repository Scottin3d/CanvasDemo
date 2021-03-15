# CSS452 Final - UI Canvas API  
This document covers the proposed API used for our final project, as well as documentation of the exposed functionality our game engine will provide to users with detailed implementation instructions.  

The UI Canvas API provides centralized support for the game designer to access UI controls such as buttons, sliders, toggles, ect.  Currently in gEngine, 'UI' objects need to be created using renderables and would need new individual behaviors for each different type of object. Our UI Canvas API allows for a modular and easy way to combine all UI into one simple package.

## Application 
**Table of Contents**

1. [Release](#release)
    * [Download](#download)
2. [Installation](#installation)
3. [UI Canvas Overview](#ui-canvas )
4. [UI Canvas Elements](#adding-elements)
	* [Button](#button)  
	* [Slider](#slider)
	* [Toggle](#toggle)
	* [Dropdown](#dropdown) 
5. [UI Events](#ui-events)
6. [Utilities](#utilities)
7. [Coding Style Guide](#style-guide)

## Release  
1.0 - 20210315

### Download
[download](https://github.com/Scottin3d/CanvasAPI/releases/tag/UIcanvas)  

## Installation  
### Script
`TODO` script install 

### Manual  
Or, to install the API manuall:  

1. Download UICanvasAPI.zip
2. Unzip and place canvasUI in srs folder of project. 
3. Add the following lines in your `index.html` for your project:

```javascript
<!-- API Scripts -->
<script src="src/canvasUI/utilities.js"></script>
<script src="src/canvasUI/canvas/UIcanvas.js"></script>
<script src="src/canvasUI/canvas/UIcanvasUpdate.js"></script>
<script src="src/canvasUI/canvas/UIcanvasCreate.js"></script>
<script src="src/canvasUI/canvas/UIcanvasEditMode.js"></script>

<script src="src/canvasUI/events/UIEvent.js"></script>
<script src="src/canvasUI/events/UIEventHandler.js"></script>

<script src="src/canvasUI/elements/UIelement.js"></script>
<script src="src/canvasUI/elements/UIButton.js"></script>
<script src="src/canvasUI/elements/UISlider.js"></script>
<script src="src/canvasUI/elements/UIDropdown.js"></script>
<script src="src/canvasUI/elements/UIToggle.js"></script>
```

### UI Canvas 
A UI canvas is an overlay of the main document with objects that display information and allow the user to interact with objects in the scene with out explicitly referencing the object themselves. It requires no arguements.  

#### Properties  
* UIElements - The list of UIElements attached to the UI Canvas.  

#### Public Functions  
* IsMouseOverElement - Returns true if mouse is over a UI element.  
* CreateElement - Creates a UI element.  

#### Implementation  
A sample implement looks like the following:  
`this.UI = new UIcanvas();` 

### Adding Elements  
Currently, the UI Canvas API supports four (4) elements:
1. [Button](#button)  
2. [Slider](#slider)
3. [Toggle](#toggle)
4. [Dropdown](#dropdown) 

To add an element to the UI canvas, call the `CreateElement()` function.  The `CreateElement()` function can take unlimited arguments, but will throw an error if an invalid combination of arguments is given.  

See below for details on valid arguments for each UI element type. When calling `CreateElement()`, the first argument is ***always*** the type as defined by the UI Canvas.  

#### Base Properties  
* element - The element attached to the class.  
* eType - The type of UI element.  

#### Base Public Functions  
* DrawElement - Calls the camera setup and draws object to a specified camera. 
* Update - Update is the most commonly used function to implement any kind of game script. Update is called every frame.  
* Highlight - Enabled or disabled the highlighting of the UI element.  
* Click - Called when a UI element is clicked by the user.  
* AddListener - Adds a listener to a UI element.  
* IsHeld - Check to see if the UI element is currently being pressed by the user.  
* SetEnabled - Enables or disables the UI element.  
* IsEnabled - Checks to see if the UI element is enabled.  
* GetType - Gets the UI element type.  
* SetTexture - Sets the UI element texture.  
* SetHighlightColor - Sets the UI element highlight color.  
* SetText - Sets the UI element default text.  

[Back to top.](#application)
### Button  
A UI element button is a standard button that can be clicked in order to trigger an event.  

#### Properties
* onClick - Callback executed when the button is clicked.   

#### Public Functions  
* SetHeight - Sets the height of the UI button.

#### Implementation  
Argument list: type, size, position, color, text.  

A sample implement looks like the following:  

```javascript
this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [50,20], 
                      [20,60], [1,1,1,1], "Button");
```

[Back to top.](#application)
### Slider  
A UI element slider can be moved between a minimum and maximum value. When a change to the slider value occurs, a callback is sent to any registered listeners of Slider.onValueChanged.  

#### Properties  
* minValue - The minimum allowed value of the slider.  
* maxValue - The maximum allowed value of the slider.  
* steps - The step increment of the slider.  
* sliderValue - The current value of the slider.  
* onValueChanged - Callback executed when the value of the slider is changed.  

#### Public Functions  
* SetValue - Sets the value of the UI slider.
* SetSliderNobSize - Sets the size of the UI slider nob.
* SetSliderBarTexture - Sets the UI slider bar texture.
* SetMaxValue - Sets the max value of the UI slider.  
* SetMinValue - Sets the min value of the UI slider.  
* SetStepValue - Sets the UI slider step value.  

#### Implementation  
Argument list: type, size, position, range, default value, step increment.  

A sample implement looks like the following:   
```javascript
this.UI.CreateElement(this.UI.UIELEM_TYPES.Slider ,[50,5], 
                      [60, 5], [-100, 100], 0, 1);
``` 

[Back to top.](#application)
### Toggle  
A UI element toggle is a checkbox that allows the user to switch an option on or off.  

#### Properties
* onValueChanged - Callback executed when the value of the toggle is changed.  
* eState - The state of the UI toggle.  

#### Public Functions  
* SetState - Sets the state of the UI toggle.  
* GetState - Gets the state of the UI toggle.  
* SetOnTexture - Sets the UI toggle ON texture.  

#### Implementation  
Argument list: type, size, position, text

A sample implement looks like the following:  
```javascript
this.UI.CreateElement(this.UI.UIELEM_TYPES.Toggle, [20,20], 
                      [-50, 10], "Toggle");
```  

[Back to top.](#application)
### Dropdown  
A UI element dropdown presents a list of options when clicked, of which one can be chosen. When a dropdown event occurs a callback is sent to any registered listeners of onValueChanged.

#### Properties
* onValueChanged - Callback executed when the value of the dropdown is changed. 

#### Public Functions  
* AddOption - Adds an option to the UI dropdown.  
* SetHeight - Sets the height of the UI dropdown.  

#### Implementation  
Argument list: type, size, position, color, text.  

A sample implement looks like the following:  
```javascript
this.UI.CreateElement(this.UI.UIELEM_TYPES.Dropdown, [50,20], 
                      [100,75], [1,1,1,1], "Sprite", opts);
```

[Back to top.](#application)
### UI Events
UI Events are a special kind of multicast delegate that can only be invoked from within the class where they are declared (the publisher class). If other classes subscribe to the event, their event handler methods will be called when the publisher class raises the event.  

UI Events can:  
1. Pass values when invoked.     
`this.onValueChange.Invoke(this.eSliderValue.toFixed(this.decimalPlaces));`  
This invoke will pass the slider value to all of the handlers subscribed to the event.

2. Utilize a static value passed when the listener was created.  
`this.onClick.Invoke();`  
This invoke will use the value set when the listener was created.

The value used by the handler is determined in the event when invoked. As the event executes the listener, it checks the value associated with the same index. If the value is `null`, the value is taken from the default `arguments`.  
```javascript
UIEvent.prototype.Invoke = function(){
    for (var i = 0; i < this.listeners.length; i++) {
        var val = (this.values[i] === null)? arguments[0] : this.values[i];
        this.listeners[i](val);
    }
};
```

#### Properties
* eventName -  The name of the event.

#### Public Functions  
* AddListener - Subscribes a listener to the event.  
* Invoke - Used to signal the event handlers that subscribe to this event.  When called, all associated handlers will be called.  

#### Implementation  
Argument list: function, handler, value

A sample implement looks like the following:  
`this.UI.UIElements[0].AddListener(this.UI.UIElements[1].SetValue, this.UI.UIElements[1], 50);`

This line of code will add an event listener to the object stored in `UIElements[0]`.  The function associated with the event handler is `this.UI.UIElements[1].SetValue` and the object it is called from on being invoked is `this.UI.UIElements[1]`.  Additionally, when subscribing a handler to an event, a `value` can be associated with that listener. If a value is not passed, it will use the default `arguments` passed by the function when it is invoked.  

[Back to top.](#application)

### Utilities  
A collection of global helper functions used throughout the API.  

#### Public Functions 
* hexToRgb - Converts a hexadecimal color to RGBA 1.  

[Back to top.](#application)