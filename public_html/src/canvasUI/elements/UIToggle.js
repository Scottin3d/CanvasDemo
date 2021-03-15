/* Developed by 3 Lines of Code
 * Scott Shirley - @scottin3d
 * Kevin Blair - @MadArkadian
 * Nicholas Chambers - @SeleniumEclipse
 * license - MIT
 */

/* global gEngine, GameObject, UIelement */

"use strict";

/*<summary>A UI element toggle is a checkbox that allows the user to switch an option on or off.  </summary>   
 *<param = type>An object, the type of UI toggle.</param>
 *<param = size[2]>A number[2], the size of the UI toggle xform.</param>
 *<param = pos[2]>A number[2], the position of the UI toggle xform within the UI space.</param>
 *<param = text>A string, the text of the toggle</param>  
 *<return = this>An object, return the constructed toggle.</return>
 */
function UIToggle(type, size, pos, text) {
    // init super
    this._initElement(this);
    this.eType = type;

    // main renderable
    this.eToggle = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.eToggle.setColor([1, 0, 0, 1]);
    this.eToggle.getXform().setPosition(pos[0], pos[1]);
    this.eToggle.getXform().setSize(size[0], size[1]);
    
    // main text
    this.eTextRenderable = new FontRenderable(text.toString());
    this.eTextRenderable.setColor([0, 0, 0, 1]);
    this.eTextRenderable.getXform().setPosition(pos[0] - size[0] / 2 + 3,  pos[1]);
    this.eTextRenderable.setTextHeight(size[1] / 4);
    
    // text
    this.eTextDefault = text;
    this.eText = this.eTextDefault;

    // textures
    this.eToggleTextureOFF = null;
    this.eToggleTextureON = null;
    this.eToggleTextureRenderer = null;
    
    // toggle has a single event
    this.onValueChange = new UIEvent('onValueChange');
    this.eVal = null;
    
    // what state the toggle is on (True/False)
    this.eState = false;
    this.eValChange = false;
    
    
    GameObject.call(this, this.eToggle);
    return this;
};
gEngine.Core.inheritPrototype(UIToggle, UIelement);

//==PUBLIC======================================================================

/*<summary>Sets the state of the UI toggle.</summary> 
 * <param = isOn>A bool, the state of the UI toggle.</return>
 */
UIToggle.prototype.SetState = function(isOn) {
    this.eState = true;
};

/*<summary>Gets the state of the UI toggle.</summary> 
 * <return = this.eState>A bool, the state of the UI toggle.</return>
 */
UIToggle.prototype.GetState = function() {
    return this.eState;
};

/*<summary>Sets the UI toggle ON texture.</summary> 
 * <param = texture>An object, the texture for UI toggle.</return>
 */
UIToggle.prototype.SetONTexture = function (texture){
    this.eToggleTextureON = texture;
    
    // init if not made yet
    if(!this.eToggleTextureRenderer){
        this.eToggleTextureRenderer = new TextureRenderable(this.eToggleTextureON);
        var pos = this.eToggle.getXform().getPosition();
        var size = this.eToggle.getXform().getSize();
        this.eToggleTextureRenderer.getXform().setPosition(pos[0], pos[1]);
        this.eToggleTextureRenderer.getXform().setSize(size[0], size[1]);
        this.eToggleTextureRenderer.setColor([1, 1, 1, 1]);
    }else{
        this.eToggleTextureRenderer.setTexture(this.eToggleTextureON);
    }
};

//==============================================================================

//==PRIVATE=====================================================================

/*<summary>Update is the most commonly used function to implement any kind of game script. 
 *Update is called every frame.</summary>   
 */
UIToggle.prototype._update = function() {
    if (!this.eState) {
        if(this.eToggleTextureOFF){
            this.eToggleTextureRenderer.setTexture(this.eToggleTextureOFF);
        }else{
            this.eToggle.setColor([1, 0, 0, 1]);
        }
    }else {
        if(this.eToggleTextureON){
            this.eToggleTextureRenderer.setTexture(this.eToggleTextureON);
        }else{
            this.eToggle.setColor([0, 1, 0, 1]);
        }
    }
    if (this.eValChange) {
        this.onValueChange.Invoke(this.eState);
    }
};

/*<summary>Calls the camera setup and draws object to a specified camera</summary>   
 */
UIToggle.prototype._draw = function (camera) {
     this.eToggle.draw(camera);
     this.eTextRenderable.draw(camera);
};

/*<summary>Addes a listener to a UI toggle.</summary>   
 *<param = func>A function, the hnadle function to be added as a listener.</param>
 *<param = target>An object, the target that the function will bind to.</param>
 *<param = value>A object, a value that can be associated with the listener when invoked.</param>
 */
UIToggle.prototype._addListener = function(func, target, value) {
    this.onValueChange.AddListener(func.bind(target), value);
};


/*<summary>Highlights the UI button if isHighlight is on.</summary> 
 * <param = isOn>A bool, whether or not the button is highlighted.</return>
 */
UIToggle.prototype._highlight = function(isOn) {
    if (isOn) {
        this.eTextRenderable.setColor([0, 0, 1, 1]);
    }else {
        this.eTextRenderable.setColor([0, 0, 0, 1]);
    }
};

/*<summary>Called when the button is clicked.</summary>
 */
UIToggle.prototype._click = function() {
    this.eState = !this.eState;
    this.eValChange = true;
};

/*<summary>Set the UI toggle texture.</summary> 
 * <param = texture>An object, the texture for UI toggle.</return>
 */
UIToggle.prototype._setTexture = function (texture){
    this.eToggleTextureOFF = texture;
    
    // init if not made yet
    if(!this.eToggleTextureRenderer){
        this.eToggleTextureRenderer = new TextureRenderable(this.eToggleTextureOFF);
        var pos = this.eToggle.getXform().getPosition();
        var size = this.eToggle.getXform().getSize();
        this.eToggleTextureRenderer.getXform().setPosition(pos[0], pos[1]);
        this.eToggleTextureRenderer.getXform().setSize(size[0], size[1]);
        this.eToggleTextureRenderer.setColor([1, 1, 1, 1]);
    }else{
        this.eToggleTextureRenderer.setTexture(this.eToggleTextureOFF);
    }
};

//==============================================================================