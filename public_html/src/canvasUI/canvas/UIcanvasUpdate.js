/* Developed by 3 Lines of Code
 * Scott Shirley - @scottin3d
 * Kevin Blair - @MadArkadian
 * Nicholas Chambers - @SeleniumEclipse
 * license - MIT
 */

/* global UIcanvas, gEngine */

"use strict";
/*<summary>Update is the most commonly used function to implement any kind of game script.  
 * Update is called every frame.</summary>   
 * <remarks></remarks> 
 */
UIcanvas.prototype.update = function () {
    //check edit key
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.E)){
        this.editMode = !this.editMode;
    }
    
    if(this.editMode){
        // TODO
        // allow users to use mouse to edit UI elements
        this._updateEditMode();
    }else{
        // set variables
        var mouseX = this.UIcamera.mouseWCX();
        var mouseY = this.UIcamera.mouseWCY();
        var mouse = [mouseX, mouseY];
        
        // check mouse position for UI element
        var element = this.IsMouseOverElement(mouse);

        // if mouse is over an element
        if(element[0]){
            // set lastElemnt and highlight
            this.lastElement = element[1];
            element[1].Highlight(true);
        }else{
            if(this.lastElement){
                this.lastElement.Highlight(false);
            }
            this.lastElement = null;
        }

        if(element[0]) {
            switch(element[1].GetType()) {
                case this.UIELEM_TYPES.Slider:
                    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
                        /*for(var i = 0; i < this.UIElements.length; i++){
                            if(this.UIElements[i].GetType() === this.UIELEM_TYPES.Slider) {
                                this.UIElements[i].isPressed = false;
                            }
                        }*/
                        element[1].Click();
                        element[1].isPressed = true;
                    }
                    break;
                case this.UIELEM_TYPES.Dropdown:
                    //break;
                case this.UIELEM_TYPES.Button:
                    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
                        element[1].Click();
                    }
                    break;
                case this.UIELEM_TYPES.Toggle:
                    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
                        element[1].Click();
                    }
                    break;
            }
        }
        for(var i = 0; i < this.UIElements.length; i++){
            if(!gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)) {
                if(this.UIElements[i].GetType() === this.UIELEM_TYPES.Slider) {
                    this.UIElements[i].isPressed = false;
                }
            }
        }
        
        // update UI elements
        for(var i = 0; i < this.UIElements.length; i++){
            this.UIElements[i].Update(this.UIcamera); 
        }
    }
};