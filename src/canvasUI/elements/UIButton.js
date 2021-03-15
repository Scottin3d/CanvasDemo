/* Developed by 3 Lines of Code
 * Scott Shirley - @scottin3d
 * Kevin Blair - @MadArkadian
 * Nicholas Chambers - @SeleniumEclipse
 * license - MIT
 */

/* global gEngine, GameObject, UIelement */

"use strict";
/*<summary>A UI element button is a standard button that can be clicked in order to trigger an event.</summary>   
 *<param = type>An object, the type of UI button.</param>
 *<param = size[2]>A number[2], the size of the UI button xform.</param>
 *<param = pos[2]>A number[2], the position of the UI button xform within the UI space.</param>  
 *<param = color[4]>A number[4], the color of the UI button.</param>  
 *<param = text>A string, the text of the button</param>  
 *<return = this>An object, returns the button constructed.</return>
 */
function UIButton(type, size, pos, color, text) {
    // init super
    this._initElement(this);
    this.eType = type;
    
    // main renderable
    this.eButton = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.eButton.setColor([color[0],color[1],color[2],color[3]]);
    this.eButton.getXform().setPosition(pos[0], pos[1]);
    this.eButton.getXform().setSize(size[0], size[1]);
    
    // main text
    this.eTextRenderable = new FontRenderable(text.toString());
    this.eTextRenderable.setColor([0, 0, 0, 1]);
    
    // text
    this.eTextDefault = text;
    this.eText = this.eTextDefault;
    var textLength = this.eText.length;
    this.eTextRenderable.getXform().setPosition(pos[0] - (textLength / 2),  pos[1]);
    this.eTextRenderable.setTextHeight(5);
    
    // textures
    this.eButtonTexture = null;
    this.eButtonTextureRenderer = null;

    this.enabled = true;

    // button has a single event
    this.onClick = new UIEvent('onClick');
    this.eVal = null;
    
    GameObject.call(this, this.eButton);
    return this;
};

gEngine.Core.inheritPrototype(UIButton, UIelement);

//==PUBLIC======================================================================

/*<summary>Sets the height of the UI button.</summary> 
 * <param = height>A number, the new height of the UI button.</return>
 */
UIButton.prototype.SetHeight = function(height) {
    this.eButton.getXform().setHeight(Math.abs(height));
    if(this.eButtonTextureRenderer){
        this.eButtonTextureRenderer.getXform().setHeight(Math.abs(height));
    }
};

//==============================================================================
//
//==PRIVATE=====================================================================

/*<summary>Update is the most commonly used function to implement any kind of game script. 
 *Update is called every frame.</summary>   
 */
UIButton.prototype._update = function (camera) {
    // not highlighted not clicked
    if(!this.isClicked && !this.isHighlighted){
        this._highlight(false);
        this.eText = this.eTextDefault;
    }
    this.eTextRenderable.setText(this.eText); 
    var textLength = this.eTextDefault.length;
    var pos = this.element.getXform().getPosition();
    this.eTextRenderable.getXform().setPosition(pos[0] - (textLength * 1.25),  pos[1]);
    
    this.isClicked = false;
    this.isHighlighted = false;
};

/*<summary>Calls the camera setup and draws object to a specified camera</summary>   
 */
UIButton.prototype._draw = function (camera) {
    // if texture, only draw texture
    if(this.eButtonTextureRenderer){
        this.eButtonTextureRenderer.draw(camera);
    }else{
        this.eButton.draw(camera);
    }
    
    this.eTextRenderable.draw(camera);
};

/*<summary>Highlights the UI button if isHighlight is on.</summary> 
 * <param = isOn>A bool, whether or not the button is highlighted.</return>
 */
UIButton.prototype._highlight = function(isOn){
    this.isHighlighted = isOn;
    var c = this.highlightColor;
    if(this.isHighlighted){
        if(this.eButtonTextureRenderer){
            this.eButtonTextureRenderer.setColor([c[0],c[1],c[2],c[3]]);
        }else{
            this.eButton.setColor([c[0],c[1],c[2],c[3]]);
        }
    }else{
        if(this.eButtonTextureRenderer){
            this.eButtonTextureRenderer.setColor([1,1,1,0]);
        }else{
            this.eButton.setColor([1,1,1,1]);
        }
        
    }
};

/*<summary>Set the UI button texture.</summary> 
 * <param = texture>An object, the texture for UI element.</return>
 */
UIButton.prototype._setTexture = function (texture){
    this.eButtonTexture = texture;
    
    // init if not made yet
    if(!this.eButtonTextureRenderer){
        this.eButtonTextureRenderer = new TextureRenderable(this.eButtonTexture);
        var pos = this.eButton.getXform().getPosition();
        var size = this.eButton.getXform().getSize();
        this.eButtonTextureRenderer.getXform().setPosition(pos[0], pos[1]);
        this.eButtonTextureRenderer.getXform().setSize(size[0], size[1]);
        this.eButtonTextureRenderer.setColor([1, 1, 1, 1]);
    }else{
        this.eButtonTextureRenderer.setTexture(this.eButtonTexture);
    }
};

/*<summary>Addes a listener to a UI Button.</summary>   
 *<param = func>A function, the hnadle function to be added as a listener.</param>
 *<param = target>An object, the target that the function will bind to.</param>
 *<param = value>A object, a value that can be associated with the listener when invoked.</param>
 */
UIButton.prototype._addListener = function(func, target, value){
    this.onClick.AddListener(func.bind(target), value);
};

/*<summary>Called when the button is clicked.</summary>
 */
UIButton.prototype._click = function(){
    this.isClicked = true;
    // invoke event
    this.onClick.Invoke();
};

/*<summary>Set the UI button text.</summary> 
 * <param = text>A string, the text for UI button.</param>
 */
UIButton.prototype._setText = function(text){
    this.eTextDefault = text;
};

