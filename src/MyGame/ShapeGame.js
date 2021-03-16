/* Developed by 3 Lines of Code
 * Scott Shirley - @scottin3d
 * Kevin Blair - @MadArkadian
 * Nicholas Chambers - @SeleniumEclipse
 * license - MIT
 */

/* global gEngine, GameObject, Scene, vec2 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ShapeGame() {
    this.sceneManager = new SceneManager(this);
    
    this.buttonTexture = "assets/sprites/button.png";
    this.toggleOnTexture = "assets/sprites/togglePressed.png";
    this.toggleOffTexture = "assets/sprites/toggle.png";
   
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kMinionPortal = "assets/minion_portal.png";
    this.kBg = "assets/bg.png";
    this.space = "assets/space.png";

    // The camera to view the scene
    this.mCamera = null;
    this.mBg = null;
    
    // UI Canvas
    this.UI = null;
    this.buttonOne = null;
    this.toggleOne = null;
    this.sliderOne = null;
    this.dropdownOne = null;
    
    // example scene
    this.buttons = [];

    // the hero and the support objects
    this.mShadow = null;
    this.mHero = null;
    this.mBrain = null;
    this.mPortal = null;
    this.mLMinion = null;
    this.mRMinion = null;
    this.mFocusObj = null;

    this.mChoice = 'D';
}
gEngine.Core.inheritPrototype(ShapeGame, Scene);

ShapeGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kMinionPortal);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.space);
    
    gEngine.Textures.loadTexture(this.buttonTexture);
    gEngine.Textures.loadTexture(this.toggleOnTexture);
    gEngine.Textures.loadTexture(this.toggleOffTexture);
};

ShapeGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kMinionPortal);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.space);
    
    gEngine.Textures.unloadTexture(this.buttonTexture);
    gEngine.Textures.unloadTexture(this.toggleOnTexture);
    gEngine.Textures.unloadTexture(this.toggleOffTexture);
};

ShapeGame.prototype.initialize = function () { 
    
    this.UI = new UIcanvas();
    
    // main camera
    this.mCamera = new Camera(
        vec2.fromValues(0, 0),                                                  // position of the camera
        250,                                                                    // width of camera
        [0, 0, 940, 640]                                                        // viewport (orgX, orgY, width, height)
    );
    c = hexToRgb("AAAAAA");
    this.mCamera.setBackgroundColor([c.r, c.g, c.b, c.a]);
    
    // color variable
    // I wrote the hexToRgb utility to help with better colors -- Scott
    var c; 
    // objects
    var xPos = -90 + Math.random() * 120;
    var yPos = -20 + Math.random() * 80;
    xPos -= xPos % 2;
    yPos -= yPos %2;
    this.mHero = new Hero(this.kMinionSprite);
    this.mHero.setSpeed(1);   
    this.mHero.getXform().setPosition(0,0);
    this.mPortal = new TextureObject(this.kMinionPortal, 50, 30, 10, 10);
    
    this.mLMinion = new Minion(this.kMinionSprite, 30, 30);
    this.mRMinion = new Minion(this.kMinionSprite, 70, 30);
    this.mFocusObj = this.mHero;
    this.mShadow = new Hero(this.kMinionSprite);
    this.mShadow.setColor([0,0,0,1]);
    this.mShadow.getXform().setPosition(xPos, yPos);
    this.mShadow.getXform().setRotationInDegree(Math.random() * 360);
    this.mShadow.SetShadowSize(10 + Math.random() * 90);
    var randSprite = 1 + Math.random() * 4;
    randSprite -= randSprite % 1;
    this.mShadow.setSprite(randSprite);
//    this.vBackground = new Renderable(gEngine.DefaultResources.getConstColorShader());
//    c = hexToRgb("14213d");
//    this.vBackground.setColor([c.r, c.g, c.b, c.a]);
//    this.vBackground.getXform().setPosition(10, 10);
//    this.vBackground.getXform().setSize(10, 10);


    
    this.sliderOne = this.UI.CreateElement(this.UI.UIELEM_TYPES.Slider, [50,5], [-80, -40], [0, 360], 0, 1);
    this.sliderOne.SetTexture(this.toggleOnTexture);
    this.sliderOne.SetSliderBarTexture(this.buttonTexture);
    this.sliderOne.AddListener(this.mHero.rotate, this.mHero, null);
    
    this.sliderTwo = this.UI.CreateElement(this.UI.UIELEM_TYPES.Slider, [50,5], [-80,-55], [10, 100], 50, 1);
    this.sliderTwo.SetTexture(this.toggleOnTexture);
    this.sliderTwo.SetSliderBarTexture(this.buttonTexture);
    this.sliderTwo.AddListener(this.mHero.SetShadowSize, this.mHero, null);
    
    
    var opts = ["Hero", "Minion", "Brain", "DyePack"];
    this.dropdownOne = this.UI.CreateElement(this.UI.UIELEM_TYPES.Dropdown, [50,20], [100,75], [1,1,1,1], "Sprite", opts);
    this.dropdownOne.AddListener(this.mHero.setSprite, this.mHero, [1, 2, 3, 4]);
    
    
    this.toggleOne = this.UI.CreateElement(this.UI.UIELEM_TYPES.Toggle, [20, 20], [90, -70], "Double Speed");
    this.toggleOne.AddListener(this.mHero._doubleSpeed, this.mHero, null);
//    this.toggleOne.SetTexture(this.toggleOffTexture);
//    this.toggleOne.SetONTexture(this.toggleOnTexture);

    this.buttonOne = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [50,20], [-100, -75], [1,1,1,1], ("Button"));
    this.buttonOne.SetText("Reset");
    this.buttonOne.SetTexture(this.buttonTexture);
    this.buttonOne.SetHighlightColor([1,0,1,0.5]);
    this.buttonOne.AddListener(this.sliderOne.SetValue, this.sliderOne, 0);
    this.buttonOne.AddListener(this.sliderTwo.SetValue, this.sliderTwo, 1);
    
    this.buttonTwo = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [50,20], [-50, -75], [1,1,1,1], ("Button"));
    this.buttonTwo.SetText("Move Left");
    this.buttonTwo.SetTexture(this.buttonTexture);
    this.buttonTwo.SetHighlightColor([1,0,1,0.5]);
    this.buttonTwo.AddListener(this.mHero.incPosition, this.mHero, [-2,0]);
    
    this.buttonThree = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [50,20], [0, -75], [1,1,1,1], ("Button"));
    this.buttonThree.SetText("Move Down");
    this.buttonThree.SetTexture(this.buttonTexture);
    this.buttonThree.SetHighlightColor([1,0,1,0.5]);
    this.buttonThree.AddListener(this.mHero.incPosition, this.mHero, [0,-2]);
    
    this.buttonFour = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [50,20], [50, -75], [1,1,1,1], ("Button"));
    this.buttonFour.SetText("Move Right");
    this.buttonFour.SetTexture(this.buttonTexture);
    this.buttonFour.SetHighlightColor([1,0,1,0.5]);
    this.buttonFour.AddListener(this.mHero.incPosition, this.mHero, [2,0]);
    
    this.buttonFive = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [50,20], [0, -55], [1,1,1,1], ("Button"));
    this.buttonFive.SetText("Move Up");
    this.buttonFive.SetTexture(this.buttonTexture);
    this.buttonFive.SetHighlightColor([1,0,1,0.5]);
    this.buttonFive.AddListener(this.mHero.incPosition, this.mHero, [0,2]);
    
    this.mainMenuButton = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [50,20], [-100, 65], [1,1,1,1], ("Main Menu"));
    this.mainMenuButton.SetTexture(this.buttonTexture);
    this.mainMenuButton.SetHighlightColor([1,0,1,0.5]);
    this.mainMenuButton.AddListener(this.sceneManager.LoadScene, this.sceneManager, 0);
    

};


ShapeGame.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();
    //this.mBg.draw(camera);
    this.mShadow.draw(camera);
    this.mHero.draw(camera);
    
    
};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
ShapeGame.prototype.draw = function () {
    //**Canvas / UI elements must be drawn last**
    var c = hexToRgb("AAAAAA");
    gEngine.Core.clearCanvas([c.r, c.g, c.b, c.a]);
    
    this.drawCamera(this.mCamera);
    // CanvasAPI -- Implementation
    this.UI.Draw();
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
ShapeGame.prototype.update = function () {
    
    var xDiff = Math.abs(this.mShadow.getXform().getXPos() - this.mHero.getXform().getXPos());
    var yDiff = Math.abs(this.mShadow.getXform().getYPos() - this.mHero.getXform().getYPos());
    var rotDiff = Math.abs(this.mShadow.getXform().getRotationInDegree() - this.mHero.getXform().getRotationInDegree());
    var sizeDiff = Math.abs(this.mShadow.getXform().getHeight() - this.mHero.getXform().getHeight());
    var totalDiff = rotDiff + sizeDiff;
    
    if(totalDiff < 5 && this.mShadow.getSprite() === this.mHero.getSprite() && xDiff === 0 && yDiff === 0) {
        var xPos = -90 + Math.random() * 120;
        var yPos = -20 + Math.random() * 80;
        xPos -= xPos % 2;
        yPos -= yPos %2;
        this.mShadow.getXform().setPosition(xPos, yPos);
        this.mShadow.getXform().setRotationInDegree(Math.random() * 360);
        this.mShadow.SetShadowSize(10 + Math.random() * 90);
        var randSprite = 1 + Math.random() * 4;
        randSprite -= randSprite % 1;
        this.mShadow.setSprite(randSprite);
    }
    // update UI
    this.UI.update();
    
   
//    var heroPos = this.mHero.getXform().getPosition();
//    var a = heroPos[0] - this.mCamera.mouseWCX();
//    var b = heroPos[1] - this.mCamera.mouseWCY();
//    var heroMag = Math.sqrt(a*a + b*b);
//    if (heroMag > 6) {
//        this.mHero.rotateObjPointTo(vec2.fromValues(this.mCamera.mouseWCX(), 
//                                                    this.mCamera.mouseWCY()), 0.1);
//                          
//        GameObject.prototype.update.call(this.mHero);
//        
//    }
    this.mHero.update();
    
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


