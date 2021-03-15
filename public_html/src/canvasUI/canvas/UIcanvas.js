/* Developed by 3 Lines of Code
 * Scott Shirley - @scottin3d
 * Kevin Blair - @MadArkadian
 * Nicholas Chambers - @SeleniumEclipse
 * license - MIT
 */

/* global gEngine, GameObject */

"use strict";
/* <summary> A UICanvas is an overlay of the main document that has objects that
 * display information and allow the user to interact with objects in the scene 
 * with out explicited referencing the object themselves.
 * </summary>
 * <param UIELEM_TYPES> An object, a public enum of UI elements that the UI canvas can create.</param>
 * <param = editMode> A bool, if canvas is in edit mode.</param>
 * <param = editModeOverlay> A renderable, acts as a visual cue that the canvas is in editmode.</param>
 * <param = clickHold> A bool, if the user is holding down a mouse button. </param>
 * <param = lastElement> An object, the last element that the user had an interaction with.</param>
 * <param = UIwidth> A number, the width of the UI canvas.  This is pulled from the html document.</param>
 * <param = UIHeight> A number, the height of the UI canvas.  This is pulled from the html document.</param>
 * <param = UIcamera> An object, a camera to render the UI to the scene.</param>
 * <param = UIElements> An [object], a list of UI elements attached to the UI canvas.</param>
 */
function UIcanvas(){
    // new elements need to added here
    // TODO set variables to private
    this.UIELEM_TYPES = {Button : 1, Slider : 2, Toggle: 3, Dropdown : 4};  // public
    this.UIxmlpath  = null;  // stretch goal
    this.UIxml = null;  // stretch goal
    this.editMode = false; // private
    this.editModeOverlay = null; // private
    
    this.clickHold = false;  // private
    this.lastElement = null;  // private
    
    this.UIwidth = null;  // private
    this.UIHeight = null;  // private
    this.UIcamera = null;  // private
    
    // TODO add accessor
    this.UIElements = [];  
    
    this._initCanvas();                                                         // initialize canvas
};


/*<summary>Calls the camera setup and draws object to a specified camera</summary>   
 */
UIcanvas.prototype.Draw = function () {
    if(this.UIElements.length === 0){
        return;
    }
    this.UIcamera.setupCanvas();
    for(var i = 0; i < this.UIElements.length; i++){
        if(this.UIElements[i].IsEnabled() === true) {
            this.UIElements[i].DrawElement(this.UIcamera);
        }

    }
    if( this.editMode){
        this.editModeOverlay.draw(this.UIcamera);
    }
};

/*<summary>Loops through the UI elements attached to the UI canvas and check if the 
 * mouse is over the element.</summary>   
 *<return [2]> A arg[2], arg[0] a bool if mouse is over; arg[1] a reference to the UI element object.</return> 
 */
UIcanvas.prototype.IsMouseOverElement = function (mousePosition){
    for(var i = 0; i < this.UIElements.length; i++){
        if(this.UIElements[i].IsEnabled() === true) {
            var buttonPos = this.UIElements[i].getXform().getPosition(); 
            var buttonH = this.UIElements[i].getXform().getHeight();
            var buttonW = this.UIElements[i].getXform().getWidth();

            if((mousePosition[0] >= buttonPos[0] - (buttonW / 2) &&
               mousePosition[0] <= buttonPos[0] + (buttonW / 2) &&    
               mousePosition[1] <= buttonPos[1] + (buttonH / 2) &&
               mousePosition[1] >= buttonPos[1] - (buttonH / 2))){
               return [true, this.UIElements[i]];
            }
        }
    }
    return [false, null];
};

/*<summary>Initalizes the Ui canvas with the default values.</summary>   
 */
UIcanvas.prototype._initCanvas = function (){
    // TODO -- stretch goal
    // xml
    this.UIxmlpath  = "src/canvasUI/assets/UIcanvas.xml";
    this.UIxml = document.implementation.createDocument("", "", null);

    
    // UI camera
    this.UIwidth = document.getElementById("GLCanvas").width;
    this.UIHeight = document.getElementById("GLCanvas").height;
    
    this.UIcamera = new Camera(
        vec2.fromValues(0, 0),                                                  // position of the camera
        250,                                                                    // width of camera
        [0, 0, this.UIwidth, this.UIHeight]                                     // viewport (orgX, orgY, width, height)
    );
    
    
    // edit mode overlay
    var camVP = this.UIcamera.getViewport();
    this.editModeOverlay = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.editModeOverlay.setColor([0,1,0,.2]);
    this.editModeOverlay.getXform().setPosition(camVP[0], camVP[1]);
    this.editModeOverlay.getXform().setSize(camVP[2], camVP[3]);
    
    // TODO -- stretch goal
    //<Camera CenterX="20" CenterY="60" Width="20" 
    //    Viewport="20 40 600 300"   
    //   BgColor="0 0 1 1.0"
    var camElem = this.UIxml.createElement("Camera");
    camElem.setAttribute("CenterX", "0");
    camElem.setAttribute("CenterY", "0");
    camElem.setAttribute("Width", "250");
    camElem.setAttribute("Viewport", "0 0 " + this.UIwidth + " " + this.UIHeight);
    camElem.setAttribute("BgColor", "0 0 0 0");
    
};