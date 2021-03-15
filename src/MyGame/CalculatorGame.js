/* global gEngine, GameObject, Scene, vec2 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Calculator() {
    this.sceneManager = new SceneManager(this);
    
    this.buttonTexture = "assets/sprites/button.png";
    this.toggleOnTexture = "assets/sprites/togglePressed.png";
    this.toggleOffTexture = "assets/sprites/toggle.png";
    this.buttonBlank = "assets/sprites/buttonBlank.png";
    this.buttonBackground = "assets/sprites/background.png";

    // The camera to view the scene
    this.mCamera = null;
    
    // UI Canvas
    this.UI = null;
    
    // example scene
    this.numPad = [9];
    this.bZero = null;
    this.bPer = null;
    this.bEnter = null;
    this.bClear = null;
    this.bAdd = null;
    this.bSub = null;
    this.bMul = null;
    this.bDiv = null;
    
    this.display = null;
    
    this.currentOperator = null;
    this.currentNumber = 0;
    this.runningTotal = 0;
    this.currentSum = 0;
    this.currentEquation = [];
    
    this.dispayString = "";

}
gEngine.Core.inheritPrototype(Calculator, Scene);

Calculator.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.buttonTexture);
    gEngine.Textures.loadTexture(this.toggleOnTexture);
    gEngine.Textures.loadTexture(this.toggleOffTexture);
    gEngine.Textures.loadTexture(this.buttonBlank);
    gEngine.Textures.loadTexture(this.buttonBackground);
};

Calculator.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.buttonTexture);
    gEngine.Textures.unloadTexture(this.toggleOnTexture);
    gEngine.Textures.unloadTexture(this.toggleOffTexture);
    gEngine.Textures.unloadTexture(this.buttonBlank);
    gEngine.Textures.unloadTexture(this.buttonBackground);
};

Calculator.prototype.initialize = function () { 
    
    // color variable
    // I wrote the hexToRgb utility to help with better colors -- Scott
    var c; 
    // objects
    
    this.UI = new UIcanvas();
    
    // main camera
    this.mCamera = new Camera(
        vec2.fromValues(0, 0),                                                  // position of the camera
        300,                                                                    // width of camera
        [0, 0, 800, 250]                                                        // viewport (orgX, orgY, width, height)
    );
    c = hexToRgb("14213d");
    this.mCamera.setBackgroundColor([c.r, c.g, c.b, c.a]);
    
    var count = 1;
    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
            var newButton = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [25,25], [-100 + (30 * y), (-25 + (30 * x))], [1,1,1,1], count.toString());
            newButton.SetTexture( this.buttonBlank);
            newButton.AddListener(this.SetCurrNum, this, count);
            this.numPad.push(newButton);
            count++;
        }
    }
    this.bZero = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [25,25], [-100, -55], [1,1,1,1], "0");
    this.bZero.SetTexture( this.buttonBlank);
    this.bPer = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [25,25], [-70, -55], [1,1,1,1], ".");
    this.bPer.SetTexture( this.buttonBlank);
    // enter
    this.bEnter = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [25,25], [-40, -55], [1,1,1,1], "=");
    this.bEnter.SetTexture( this.buttonBlank);
    this.bEnter.AddListener(this.SetCurrOp, this, "=");
    // add
    this.bAdd = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [25,25], [-10, 35], [1,1,1,1], "+");
    this.bAdd.SetTexture( this.buttonBlank);
    this.bAdd.AddListener(this.SetCurrOp, this, "+");
    // sub
    this.bSub = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [25,25], [-10, 5], [1,1,1,1], "-");
    this.bSub.SetTexture( this.buttonBlank);
    this.bSub.AddListener(this.SetCurrOp, this, "-");
    // multiply
    this.bMul = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [25,25], [-10, -25], [1,1,1,1], "*");
    this.bMul.SetTexture( this.buttonBlank);
    this.bMul.AddListener(this.SetCurrOp, this, "*");
    // divide
    this.bDiv = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [25,25], [-10, -55], [1,1,1,1], "/");
    this.bDiv.SetTexture( this.buttonBlank);
    this.bDiv.AddListener(this.SetCurrOp, this, "/");
    // clear
    this.bClear = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [50,25], [40, -55], [1,1,1,1], "CE");
    this.bClear.SetTexture( this.buttonBlank);
    this.bClear.AddListener(this.Clear, this, null);
    
    
    
    this.display = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [100,50], [60, 25], [1,1,1,1], "");
    this.display.SetTexture(this.buttonBackground);
    
    this.mainMenuButton = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [50,20], [-100, 65], [1,1,1,1], ("Main Menu"));
    this.mainMenuButton.SetTexture(this.buttonTexture);
    this.mainMenuButton.SetHighlightColor([1,0,1,0.5]);
    this.mainMenuButton.AddListener(this.sceneManager.LoadScene, this.sceneManager, 0);
    
};


Calculator.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();
    
};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Calculator.prototype.draw = function () {
    //**Canvas / UI elements must be drawn last**
    var c = hexToRgb("14213d");
    gEngine.Core.clearCanvas([c.r, c.g, c.b, c.a]);
    
    this.drawCamera(this.mCamera);
    // CanvasAPI -- Implementation
    this.UI.Draw();
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Calculator.prototype.update = function () {
    // update UI
    this.UI.update();
    
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Zero)){
        this.sceneManager.LoadScene(0);
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.One)){
        this.sceneManager.LoadScene(1);
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)){
        this.sceneManager.LoadScene(2);
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)){
        this.sceneManager.LoadScene(3);
    }
};

Calculator.prototype.SetCurrNum = function (value) {
    this.currentNumber *= 10;
    this.currentNumber += value;
    console.log(this.currentNumber);
    this.dispayString += value.toString();
    this.DisplayText();
};

Calculator.prototype.SetCurrOp= function (value) {
     this.currentOperator = value;
     
     this.currentEquation.push(this.currentNumber);
     this.currentNumber = 0;
     this.currentEquation.push(this.currentOperator);
     this.dispayString += " " + value.toString() + " ";
     this.DisplayText();
};

Calculator.prototype.Clear = function () {
    this.currentNumber = 0;
    this.runningTotal = 0;
    this.currentEquation = [];
    this.currentOperator = null;
     
    this.dispayString = "";
    this.DisplayText();
};

Calculator.prototype.CalTotal = function () {
    this.runningTotal = 0;
    this.runningTotal +=this.currentEquation[0];
    var op = null;
    for (var i = 1; i < this.currentEquation.length; i++) {
        // operator
        if(i % 2 === 0){
            op = this.currentEquation[i];
        }else{
            switch(op){
                case "+":
                    this.runningTotal += this.currentEquation[i];
                    continue;
                case "-":
                    this.runningTotal -= this.currentEquation[i];
                    continue;
                case "*":
                    this.runningTotal *= this.currentEquation[i];
                    continue;
                case "/":
                    this.runningTotal /= this.currentEquation[i];
                    continue;
            }
            
        }
        
    }
};

Calculator.prototype.DisplayText = function () {
    console.log(this.currentNumber);
    this.CalTotal();
    this.display.SetText(this.dispayString + " (" + this.runningTotal + ")");
};