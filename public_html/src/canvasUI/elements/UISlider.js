/* Developed by 3 Lines of Code
 * Scott Shirley - @scottin3d
 * Kevin Blair - @MadArkadian
 * Nicholas Chambers - @SeleniumEclipse
 * license - MIT
 */

/* global gEngine, GameObject, UIelement */

"use strict";

/*<summary>A UI element slider can be moved between a minimum and maximum value. 
 * When a change to the slider value occurs, a callback is sent to any registered 
 * listeners of Slider.onValueChanged.</summary>   
 *<param = type>An object, the type of UI slider.</param>
 *<param = size[2]>A number[2], the size of the UI slider xform.</param>
 *<param = pos[2]>A number[2], the position of the UI slider xform within the UI space.</param>
 *<param = range[2]>A number[2], the minimum and maximum values of the UI slider.</param>
 *<param = dValue>A number, the default value of the slider.  When reset, the UI slider
 *will reset to this number.</param>
 *<param = vStep>A number, the increment that the UI slider changes.</param>  
 *<return = this>An object, return the constructed UI slider.</return>
 *<remarks>Size specifically refers to the slider **BAR**.  The UI slider nob by default
 *is a square, based on the size[1] value.  The main texture of the UI slider is assigned
 *to the UI slider bar.  There is a separate texture, this.eSliderNobTextureRenderer, for the
 * UI slider nob.</remarks> 
 */
function UISlider (type, size, pos, range, dValue, vStep){
    // init super
    this._initElement(this);
    this.eType = type;
    
    // values
    this.minValue = range[0];
    this.minPos = null;
    this.maxValue = range[1];
    this.maxPos = null;
    this.eSliderValue = dValue;
    this.steps = vStep;
    var stringSteps = this.steps.toString();
    this.decimalPlaces = (stringSteps.indexOf('.') !== -1 ? stringSteps.split('.')[1].length : 0);
    
    // slider has a single event
    this.onValueChange = new UIEvent('onValueChange');
    
    // two renderables -- bar and nob
    this.eSlidierBar = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.eSlidierBar.setColor([1,1,1,1]);
    this.eSlidierBar.getXform().setPosition(pos[0], pos[1]);
    this.eSlidierBar.getXform().setSize(size[0], size[1]);
    
    this.eTextRenderable = new FontRenderable(dValue.toString());
    this.eTextRenderable.setColor([1, 1, 1, 1]);
    this.eTextRenderable.getXform().setPosition(pos[0], pos[1] + 10);
    this.eTextRenderable.setTextHeight(5);
    
    // slider nob texture
    this.eSliderBarTexture = null;
    this.eSliderBarTextureRenderer = null;
    this.eSliderNobTexture = null;
    this.eSliderNobTextureRenderer = null;
    
    
    // pos = (x - (size / 2)) + size * (dvalue / range[1])
    this.minPos = (pos[0]- (size[0] / 2));
    this.maxPos = (pos[0]+ (size[0] / 2));
    var nobXPos = (pos[0]- (size[0] / 2)) + size[0] * (dValue / range[0] - range[1]);
    
    this.eSliderNob = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.eSliderNob.setColor([0,0,1,1]);
    this.eSliderNob.getXform().setPosition(nobXPos, pos[1]);
    this.eSliderNob.getXform().setSize(size[1] * 2, size[1] * 2);
 
    
    this.isPressed = false;
    
    GameObject.call(this, this.eSliderNob);
    return this;
};
gEngine.Core.inheritPrototype(UISlider, UIelement);


//==PUBLIC======================================================================

/*<summary>Sets the value of the UI slider.</summary>   
 *<param = value>A number, the value of the UI slider is to be set.</param>  
 */
UISlider.prototype.SetValue = function (value){
    this.eSliderValue = value;
    this._setPosition(this.eSliderValue);
    // invoke change
    this.onValueChange.Invoke(this.eSliderValue.toFixed(this.decimalPlaces));
};

/*<summary>Sets the size of the UI slider nob.</summary>   
 *<param = size[2]>A number[2], the size to set the UI slider nob.</param>  
 */
UISlider.prototype.SetSliderNobSize = function(size){
    // check the size to make sure that the nob is not bigger than the size of the
    // slider bar
    var nobSize = this.eSliderNob.getXform().getSize();
    if(nobSize[0] < size[0]){
        return;
    }
    this.eSliderNob.getXform().setSize(size[0], size[1]);
};

/*<summary>Sets the UI slider bar texture.</summary> 
 * <param = texture>An object, the texture for UI slider nob.</return>
 */
UISlider.prototype.SetSliderBarTexture = function (texture){
    this.eSliderBarTexture =  texture;
    
    // init if not made yet
    if(!this.eSliderBarTextureRenderer){
        this.eSliderBarTextureRenderer = new TextureRenderable(this.eSliderBarTexture);
        var pos = this.eSlidierBar.getXform().getPosition();
        var size = this.eSlidierBar.getXform().getSize();
        this.eSliderBarTextureRenderer.getXform().setPosition(pos[0], pos[1]);
        this.eSliderBarTextureRenderer.getXform().setSize(size[0], size[1]);
        //this.eSliderNobTextureRenderer.setColor([1, 1, 1, 1]);
    }else{
        this.eSliderBarTextureRenderer.setTexture(this.eSliderBarTexture);
    }
};

/*<summary>Sets the max value of the UI slider.</summary>   
 *<param = value>A number, the value of the new maximum value to be set.</param>  
 */
UISlider.prototype.SetMaxValue = function (value){
    if(value < this.minValue){
        alert("Cannot set max value to less than min value!");
        return;
    }
    this.maxValue = value;
};

/*<summary>Sets the min value of the UI slider.</summary>   
 *<param = value>A number, the value of the new minimum value to be set.</param>  
 */
UISlider.prototype.SetMinValue = function (value){
    if(value > this.maxValue){
        alert("Cannot set min value to greater than max value!");
        return;
    }
    this.minValue = value;
};

/*<summary>Sets the UI slider step value.</summary>   
 *<param = value>A number, the value of the step value./param>  
 */
UISlider.prototype.SetStepValue = function (value){
    if(value <= 0){
        alert("Step value must be greater than zero (0)!");
        return;
    }
    this.steps = value;
};

//==============================================================================

//==PRIVATE=====================================================================

/*<summary>Update is the most commonly used function to implement any kind of game script. 
 *Update is called every frame.</summary>
 *<remarks>TODO -- something specific about this class</remarks>
 */
UISlider.prototype._update = function (camera) {
    if(this.isPressed){
        var mouseX = camera.mouseWCX();
        var pos = this.eSliderNob.getXform().getPosition();
        var size = this.eSliderNob.getXform().getSize();
        if (this.isPressed) {
            if (mouseX >= this.maxPos) mouseX = this.maxPos;
            else if (mouseX <= this.minPos) mouseX = this.minPos;
        }

        var tempValue = (pos[0] - this.minPos);// / (this.maxPos - this.minPos))) * this.maxValue;
        var changeValue = (this.maxPos - this.minPos) / ((this.maxValue - this.minValue) / this.steps);
        tempValue = ((tempValue / changeValue) / ((this.maxValue - this.minValue) / this.steps)) * (this.maxValue - this.minValue) + this.minValue;
        this.eSliderValue = tempValue - (tempValue % this.steps);
        // calc mouse directon
        // apply to nob
        // clamp value
        if(mouseX <= this.maxPos && mouseX >= this.minPos){
            this.eSliderNob.getXform().setPosition(mouseX, pos[1]);
            if(this.eSliderNobTextureRenderer){
                this.eSliderNobTextureRenderer.getXform().setPosition(mouseX, pos[1]);
            }
            
            // invoke event
            this.onValueChange.Invoke(this.eSliderValue.toFixed(this.decimalPlaces));
        }
        
    }else{
        this._setPosition(this.eSliderValue);
    }
    this.eTextRenderable.setText(this.eSliderValue.toString());
};

/*<summary>Calls the camera setup and draws object to a specified camera</summary>   
 */
UISlider.prototype._draw = function (camera) {
    // UI slider bar
    if(this.eSliderBarTextureRenderer){                                         // if bar texture
        this.eSliderBarTextureRenderer.draw(camera);                            // draw texture
    }else{
        this.eSlidierBar.draw(camera);                                          // if not, draw default bar
    }
    
    // UI slider nob
    if(this.eSliderNobTextureRenderer){                                         // if nob texture
        this.eSliderNobTextureRenderer.draw(camera);                            // draw texture
    }else{
        this.eSliderNob.draw(camera);                                           // if not, draw default nob
    }
    
    // UI slider text
    this.eTextRenderable.draw(camera);      
};

/*<summary>Set the UI slider nob texture.</summary> 
 * <param = texture>An object, the texture for UI slider.</return>
 */
UISlider.prototype._setTexture = function (texture){
    this.eSliderNobTexture = texture;
    
    // init if not made yet
    if(!this.eSliderNobTextureRenderer){
        this.eSliderNobTextureRenderer = new TextureRenderable(this.eSliderNobTexture);
        var pos = this.eSliderNob.getXform().getPosition();
        var size = this.eSliderNob.getXform().getSize();
        this.eSliderNobTextureRenderer.getXform().setPosition(pos[0], pos[1]);
        this.eSliderNobTextureRenderer.getXform().setSize(size[0], size[1]);
        this.eSliderNobTextureRenderer.setColor([1, 1, 1, 0]);
        
    }else{
        this.eSliderNobTextureRenderer.setTexture(this.eSliderNobTexture);
    }
};

/*<summary>Highlights the UI slider if isHighlight is on.</summary> 
 * <param = isOn>A bool, whether or not the slider is highlighted.</return>
 */
UISlider.prototype._highlight = function(isOn){
    this.isHighlighted = isOn;
    var c = this.highlightColor;
    if(this.isHighlighted){
        
        if(this.eSliderNobTextureRenderer){
            
            this.eSliderNobTextureRenderer.setColor([c[0],c[1],c[2],c[3]]);
        }else{
            this.eSliderNob.setColor([c[0],c[1],c[2],c[3]]);
        }
    }else{
        if(this.eSliderNobTextureRenderer){
            this.eSliderNobTextureRenderer.setColor([1,1,1,0]);
        }else{
            this.eSliderNob.setColor([1,1,1,1]);
        }
    }
};

/*<summary>Called when the UI slider is clicked.</summary>
 */
UISlider.prototype._click = function(){
    this.eSliderNob.setColor([1,0,1,1]);
};

/*<summary>Addes a listener to a UI slider.</summary>   
 *<param = func>A function, the hnadle function to be added as a listener.</param>
 *<param = target>An object, the target that the function will bind to.</param>
 *<param = value>A object, a value that can be associated with the listener when invoked.</param>
 */
UISlider.prototype._addListener = function(func, target, value){
    this.onValueChange.AddListener(func.bind(target), value);
};

/*<summary>Sets the position of the Ui sldier nob.</summary>   
 *<param = value>A number, the value of the UI slider.</param> 
 */
UISlider.prototype._setPosition = function (value) {
    var newPos = ((value - this.minValue) / (this.maxValue - this.minValue)) * (this.maxPos - this.minPos) + this.minPos;
    var posY = this.eSliderNob.getXform().getPosition()[1];
    this.eSliderNob.getXform().setPosition(newPos, posY);
    if(this.eSliderNobTextureRenderer){
        this.eSliderNobTextureRenderer.getXform().setPosition(newPos, posY);
    }
};

//==============================================================================