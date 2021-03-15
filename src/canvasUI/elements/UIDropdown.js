/* Developed by 3 Lines of Code
 * Scott Shirley - @scottin3d
 * Kevin Blair - @MadArkadian
 * Nicholas Chambers - @SeleniumEclipse
 * license - MIT
 */

/* global gEngine, GameObject, UIelement */

"use strict";

/*<summary>A UI element dropdown presents a list of options when clicked, of which one can be chosen. When a dropdown event occurs a callback is sent to any registered listeners of onValueChanged.</summary>   
 *<param = type>An object, the type of UI dropdown.</param>
 *<param = size[2]>A number[2], the size of the UI dropdown xform.</param>
 *<param = pos[2]>A number[2], the position of the UI dropdown xform within the UI space.</param>  
 *<param = color[4]>A number[4], the color of the UI dropdown.</param>  
 *<param = text>A string, the text of the dropdown</param>
 *<return = this>An object, return the constructed UI dropdown.</return>
 */
function UIDropdown(type, size, pos, color, text) {
    // init super
    this._initElement(this);
    this.eType = type;

    // main renderable
    this.eButton = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.eButton.setColor([color[0],color[1],color[2],color[3]]);
    this.eButton.getXform().setSize(size[0], size[1]);
    this.eButton.getXform().setPosition(pos[0], pos[1]);
    
    // menu options
    this.eOptions = [];
    
    // main text
    this.eTextRenderable = new FontRenderable(text.toString());
    this.eTextRenderable.setColor([0, 0, 0, 1]);
    this.eTextRenderable.getXform().setPosition(pos[0] - (size[0] / 3),  pos[1]);
    this.eTextRenderable.setTextHeight(size[1] / 4);
    
    // text
    this.eTextDefault = text;
    this.eText = this.eTextDefault;

    this.clickBuffer = false;
    this.isClicked = false;
    
    GameObject.call(this, this.eButton);
    return this;
};

gEngine.Core.inheritPrototype(UIDropdown, UIelement);


//==PUBLIC======================================================================

/*<summary>Adds an option to the UI dropdown.</summary>   
 *<param = option>An object, the UI element to be added to the UI dropdown.</param>
 */
UIDropdown.prototype.AddOption = function(option) {
    option.SetEnabled(false);
    this.eOptions.push(option);
};

/*<summary>Sets the height of the UI dropdown.</summary> 
 * <param = height>A number, the new height of the UI dropdown.</return>
 */
UIDropdown.prototype.SetHeight = function(height) {
    this.eButton.getXform().setHeight(height);
};

//==============================================================================

//==PRIVATE=====================================================================

/*<summary>Update is the most commonly used function to implement any kind of game script. 
 *Update is called every frame.</summary>   
 */
UIDropdown.prototype._update = function (camera) {
    for(var i = 0; i < this.eOptions.length; i++) {
        this.eOptions[i].SetEnabled(false);
    }
    // not highlighted not clicked
    if(!this.isClicked && !this.isHighlighted){
        this._highlight(false);
        this.eText = this.eTextDefault;
    }
    
    // highlighted not clicked
    if(this.isHighlighted && !this.isClicked){
        this.eText = this.eTextHighlighted;
    }
    
    // clicked
    if(this.isClicked){
        this.eText = this.eTextClicked;
        for(var i = 0; i < this.eOptions.length; i++) {
            this.eOptions[i].SetEnabled(true);
        }
    }
    
    this.eTextRenderable.setText(this.eText);
    this.isHighlighted = false;
};

/*<summary>Calls the camera setup and draws object to a specified camera</summary>   
 */
UIDropdown.prototype._draw = function (camera) {
    this.eButton.draw(camera);
    this.eTextRenderable.draw(camera);
};

/*<summary>Addes a listener to a UI toggle.</summary>   
 *<param = func>A function, the hnadle function to be added as a listener.</param>
 *<param = target>An object, the target that the function will bind to.</param>
 *<param = value>A object, a value that can be associated with the listener when invoked.</param>
 *<remarks></remarks> 
 */
UIDropdown.prototype._addListener = function(func, target, options){
    //var listener = func.bind(target);
    console.log("getting a listener");
    for(var i = 0; i < this.eOptions.length; i++) {
        console.log(options[i]);
        this.eOptions[i].AddListener(this._invoke, this, options[i]);
    }
    this.onClick = func.bind(target);
};

/*<summary>Highlights the UI button if isHighlight is on.</summary> 
 * <param = isOn>A bool, whether or not the button is highlighted.</param>
 */
UIDropdown.prototype._highlight = function(isOn){
    this.isHighlighted = isOn;
    if(this.isHighlighted){
         this.eButton.setColor([1,1,0,1]);
    }else{
        this.eButton.setColor([1,1,1,1]);
    }
};

/*<summary>Called when the button is clicked.</summary>
 */
UIDropdown.prototype._click = function(){
    this.isClicked = !this.isClicked;
    this.eButton.setColor([1,0,1,1]);
};

/*<summary>Tiggeres the event listeners.</summary> 
 * <param = value>An obj, the value passed into the event.</param>
 */
UIDropdown.prototype._invoke = function(value){
    this.onClick(value);
};

/*<summary>Sets the UI dropdown default text.</summary> 
 *<param = text>A string, the text for UI button.</param>
 */
UIDropdown.prototype._setText = function(text){
    this.eText = text;
};

//==============================================================================