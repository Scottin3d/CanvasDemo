/* Developed by 3 Lines of Code
 * Scott Shirley - @scottin3d
 * Kevin Blair - @MadArkadian
 * Nicholas Chambers - @SeleniumEclipse
 * license - MIT
 */

/* global gEngine, GameObject */

"use strict";

/* <summary> UIelement is the base class for all UI element objects used by the
 * UI canvas.  It contains common shared function as well as handles the events 
 * for each of the elements.
 * </summary>
 * <param = element>An object, the element attached to class.</param> 
 * <param = eType>An object, the type of UI element.</param> 
 * <remarks>A list of resources used:
 * https://stackoverflow.com/questions/20835768/addeventlistener-on-custom-object
 * </remarks>
 */
function UIelement() {
    // element
    this.element = null;
    this.eType = null;
    
    this.isHighlighted = false;
    this.highlightColor = null;
    this.isPressed = false;
    
    // text
    this.eTextDefault = null;
    this.eTextClickedDefault = null;
    this.eTextHighlightedDefault = null;
    this.eText = null;
    this.eTextClicked = null;
    this.eTextHighlighted = null;
    this.enabled = true;
    
    GameObject.call(this, this.element);
};
gEngine.Core.inheritPrototype(UIelement, GameObject);

//==PUBLIC======================================================================

/*<summary>Calls the camera setup and draws object to a specified camera</summary>   
 *<param = camera>An object, the UI camera associated with the UI canvas.</param> 
 *<remarks>This is the base class and public Draw call.  It is forwarded to the UI element.</remarks> 
 **/
UIelement.prototype.DrawElement = function (camera) {
    // forwards to subclass
    this.element._draw(camera);
};

/*<summary>Update is the most commonly used function to implement any kind of game script. 
 *Update is called every frame.</summary>   
 *<param = camera>An object, the UI camera associated with the UI canvas.</param> 
 *<remarks>This is the base class and public Update call.  It is forwarded to the UI element.</remarks> 
 */
UIelement.prototype.Update = function (camera) {
    // forwards to subclass
    this.element._update(camera);
};

/*<summary>Enabled or disabled the highlighting of the UI element.</summary>   
 *<param = b>A bool, whether or not the element is to be highlighted or not.</param> 
 *<remarks>This is the base class and public Hightlight call.  It is forwarded to the UI element.</remarks> 
 */
UIelement.prototype.Highlight = function(b){
    // forwards to subclass
    this.element._highlight(b);
};

/*<summary>Called when a UI element is clicked by the user.</summary>
 *<remarks>This is the base class and public Click call.  It is forwarded to the UI element.</remarks>  
 */
UIelement.prototype.Click = function(){
    // forwards to subclass
    this.element._click();
};

/*<summary>Adds a listener to a UI element.</summary>   
 *<param = func>A function, the hnadle function to be added as a listener.</param>
 *<param = target>An object, the target that the function will bind to.</param>
 *<param = value>A object, a value that can be associated with the listener when invoked.</param>
 *<remarks>This is the base class and public AddListener call.  It is forwarded to the UI element.</remarks>
 */
UIelement.prototype.AddListener = function(func, target, value){
    this.element._addListener(func, target, value);
};

/*<summary>Check to see if the UI element is currently being pressed by the user.</summary> 
 *<return = this.isPressed>A bool, if pressed or not.</return> 
 */
UIelement.prototype.IsHeld = function() {
    return this.isPressed;
};

/*<summary>Enables or disables the UI element.</summary> 
 *<param = isEnabled>A bool, whether or not the UI element is to be enabled or not.</param>  
 */
UIelement.prototype.SetEnabled = function(isEnabled) {
    this.enabled = isEnabled;
};

/*<summary>Checks to see if the UI element is enabled.</summary> 
 * <return = this.enabled>A bool, whether or not the UI element is enabled or not.</return>
 */
UIelement.prototype.IsEnabled = function() {
    return this.enabled;
};

/*<summary>Gets the UI element type.</summary> 
 * <return = this.eType>An object, the type of UI element.</return>
 */
UIelement.prototype.GetType = function() {
    return this.eType;
};

/*<summary>Sets the UI element texture.</summary> 
 * <param = texture>An object, the texture for UI element.</return>
 */
UIelement.prototype.SetTexture = function (texture){
    this.element._setTexture(texture);
};

/*<summary>Sets the UI element highlight color.</summary> 
 * <param = color>An number[4], the color of the element when highlighted.</return>
 */
UIelement.prototype.SetHighlightColor = function (color){
    this.highlightColor = color;
};

/*<summary>Sets the UI element default text.</summary> 
 * <param = text>An string, the new text of the UI element.</return>
 */
UIelement.prototype.SetText = function (text){
    // forwards to subclass
    this.element._setText(text);
};

//==============================================================================

//==PRIVATE=====================================================================

/*<summary>Initializes the UI element.</summary>   
 *<param = obj>an object, the element that the class is attached to.</param>
 */
UIelement.prototype._initElement = function(obj){
    this.element = obj;
    this.highlightColor = [1,1,0,0.4];
    
    if(this.eTexture){
        this.eTextureRenderer = new TextureRenderable(this.eTexture);
        var pos = this.element.getXform().getPosition();
        var size = this.element.getXform().getSize();
        this.eTextureRenderer.getXform().setPosition(pos[0], pos[1]);
        this.eTextureRenderer.getXform().setSize(size[0], size[1]);
    }
    
    this.eTextDefault = this.element.name;
    this.eTextClickedDefault = "Clicked!";
    this.eTextHighlightedDefault = "Highlighted!";
    this.eText = this.eTextDefault;
    this.eTextClicked = this.eTextClickedDefault;
    this.eTextHighlighted = this.eTextHighlightedDefault;
    this.enabled = true;
};

/*<summary>Returns the distance between the mouse X position and the UI element
 *X postion.</summary> 
 *<return = > A number.</return>  
 */
UIelement.prototype._mouseDCX = function () {
    return gEngine.Input.getMousePosX() - this.eButton.getXform().getXPos();
};

/*<summary>Returns the distance between the mouse Y position and the UI element
 *Y postion.</summary> 
 *<return = > A number.</return>  
 */
UIelement.prototype._mouseDCY = function () {
    return gEngine.Input.getMousePosY() - this.eButton.getXform().getYPos();
};

//==============================================================================

