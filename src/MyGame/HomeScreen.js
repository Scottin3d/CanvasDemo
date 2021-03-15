/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, Scene, vec2, GameObject */

"use strict";

function HomeScreen(){
    this.buttonTexture = "assets/sprites/button.png";
    this.space = "assets/space.png";
    
    this.sceneManager = new SceneManager(this);
    
    this.mBg = null;
    this.mCamera = null;
    this.UI = null;
    
    this.buttons = [];
};


gEngine.Core.inheritPrototype(HomeScreen, Scene);

HomeScreen.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.space);
    gEngine.Textures.loadTexture(this.buttonTexture);
};

HomeScreen.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.space);
    gEngine.Textures.unloadTexture(this.buttonTexture);
};

HomeScreen.prototype.initialize = function () { 
    
    // color variable
    // I wrote the hexToRgb utility to help with better colors -- Scott
    var c;
    this.UI = new UIcanvas();
    
    // main camera
    this.mCamera = new Camera(
        vec2.fromValues(0, 0),                                                  // position of the camera
        250,                                                                    // width of camera
        [0, 0, 940, 640]                                                        // viewport (orgX, orgY, width, height)
    );
    c = hexToRgb("14213d");
    this.mCamera.setBackgroundColor([c.r, c.g, c.b, c.a]);
    
    // Large background image
    var bgR = new SpriteRenderable(this.space);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(250, 250);
    bgR.getXform().setPosition(0, 0);
    this.mBg = new GameObject(bgR);
    
    for (var i = 1; i <= 3; i++) {
        var b = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [50,20], [0,(50 - (25 * i))], [1,1,1,1], ("Level " + i));
        b.SetTexture(this.buttonTexture);
        b.SetHighlightColor([1,0,1,0.5]);
        this.buttons.push(b);
    }
    
    this.buttons[0].AddListener( this.sceneManager.LoadScene, this.sceneManager, 1);
    this.buttons[1].AddListener( this.sceneManager.LoadScene, this.sceneManager, 2);
    this.buttons[2].AddListener( this.sceneManager.LoadScene, this.sceneManager, 3);
};


HomeScreen.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();
    this.mBg.draw(camera);
    
};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
HomeScreen.prototype.draw = function () {
    //**Canvas / UI elements must be drawn last**
    var c = hexToRgb("14213d");
    gEngine.Core.clearCanvas([c.r, c.g, c.b, c.a]);
    
    this.drawCamera(this.mCamera);
    // CanvasAPI -- Implementation
    this.UI.Draw();
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
HomeScreen.prototype.update = function () {
    // update UI
    this.UI.update();
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.One)){
        this.sceneManager.LoadScene(1);
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)){
        this.sceneManager.LoadScene(2);
    }
};


