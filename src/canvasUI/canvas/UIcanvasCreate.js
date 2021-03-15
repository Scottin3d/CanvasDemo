/* Developed by 3 Lines of Code
 * Scott Shirley - @scottin3d
 * Kevin Blair - @MadArkadian
 * Nicholas Chambers - @SeleniumEclipse
 * license - MIT
 */

/* global UIcanvas */

"use strict";

//==PUBLIC======================================================================

/*<summary>Adds a UI element to the UIelements array.</summary>   
 *<param = element> An object, a UI element to be added to the canvas.</param>   
 */
UIcanvas.prototype._AddElement = function (element){
    if(this.UIElements === null){
        this.UIElements = [];
    }
    this.UIElements.push(element);
};

/*<summary>Creates a UI element.</summary>   
 *<param = arguments> Any number of arguments can be passed into this function.</param>   
 *<remarks>Arg[0] is the element type, Arg[1+] are the arguments for the element constructor.
 *A stretch goal is to include texturs in the constructor.</remarks>
 */
UIcanvas.prototype.CreateElement = function(){
    var type = arguments[0];                                                    // gets the type from UIELEM_TYPES.  No need to validate.  Invalid types doto default which is error.
    switch(type){
        case this.UIELEM_TYPES.Button:
            if(arguments.length !== 5){ alert("Invalid arguments"); }           // a button has five (5) arguments
            return this._createButton(arguments);
            //return;
        case this.UIELEM_TYPES.Slider:
            if(arguments.length !== 6){ alert("Invalid arguments"); }           // a slider has six (6) arguments
            return this._createSlider(arguments);
            //return;
        case this.UIELEM_TYPES.Toggle:
            if(arguments.length !== 4){ alert("Invalid arguments"); }       // a toggle has ### arguments
            return this._createToggle(arguments);
        case this.UIELEM_TYPES.Dropdown:
            if(arguments.length !== 6){ alert("Invalid arguments"); }           // a slider has six (6) arguments
            return this._createDropdown(arguments);
            //return;
        default:
            alert("Invalid UI element type");
            return null;
    }
};

//==============================================================================

//==PRIVATE=====================================================================

/*<summary>Creates a button UI elements.  A user defined event controller.</summary>   
 *<param = args> An array[5], [type, size[2], pos[2], color[4], text""].</param>   
 */
UIcanvas.prototype._createButton = function(args){
    // function UIButton(size, pos, color, text)
    // check args
    console.log(args[1]);
    var type = args[0];
    var size = args[1];                                                         
    if(size.length !== 2){ return; }
    var pos = args[2];
    if(pos.length !== 2){ return; }
    var color = args[3];
    if(color.length !== 4){ return; }
    var text = args[4];
    
    var newButton = new UIButton(type, size, pos, color, text);
    
    this._AddElement(newButton);
    
    return newButton;
};

/*<summary>Creates a slider UI elements.  A user defined event controller.</summary>   
 *<param = args> An array[6], [type, size[2], pos[2], range[2], default value, step value].</param>   
 */
UIcanvas.prototype._createSlider = function(args){
    //function UISlider (size, pos, range, dValue, vStep)
    // check args
    var type = args[0];
    var size = args[1];
    if(size.length !== 2){ return; }
    var pos = args[2];
    if(pos.length !== 2){ return; }
    var range = args[3];
    if(range.length !== 2){ return; }
    var dValue = args[4];
    if(typeof dValue !== 'number'){ return; }
    var vStep = args[5];
    if(typeof vStep !== 'number'){ return; }
    var newSlider = new UISlider(type, size, pos, range, dValue, vStep);
    this._AddElement(newSlider);
    
    return newSlider;
};

/*<summary>Creates a toggle UI elements.  A user defined event controller.</summary>   
 *<param = args>TODO</param>   
 */
UIcanvas.prototype._createToggle = function(args){
    // TODO -- Impelement
    var type = args[0];
    var size = args[1];
    var pos = args[2];
    var text = args[3];
    var newToggle = new UIToggle(type, size, pos, text);
    this._AddElement(newToggle);
    return newToggle;
};

/*<summary>Creates a dropdown UI elements.  A user defined event controller.</summary>   
 *<param = args> An array[5], [type, size[2], pos[2], color[4], text""].</param>   
 */
UIcanvas.prototype._createDropdown = function(args){
    //[50,20], [0,0], [1,1,1,1], "Button", opts)
    // check args
    console.log(args[1]);
    var type = args[0];
    var size = args[1];                                                         
    if(size.length !== 2){ return; }
    var pos = args[2];
    if(pos.length !== 2){ return; }
    var color = args[3];
    if(color.length !== 4){ return; }
    var text = args[4];
    var options = args[5];
    
    var newDropdown = new UIDropdown(type, size, pos, color, text);
    this._AddElement(newDropdown);
    for(var i = 0; i < options.length; i++) {
        console.log(i);
        console.log(size[0]);
        console.log(size[1]);
        var newOpt = new UIButton(1, [size[0], size[1] / 2], [pos[0], pos[1] - ((size[1] / 2) * (i + 1) + (size[1] / 4))], [color[0],color[1],color[2] - 0.1 * i,color[3]], options[i]);
        console.log(newOpt.IsEnabled());
        newDropdown.AddOption(newOpt);
        // the dropdown object should track the options not the canvas
        // this adds it the the list of canvas elements
        this._AddElement(newOpt);
    }
    
    return newDropdown;
};

//==============================================================================