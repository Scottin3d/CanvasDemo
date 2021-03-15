/* global gEngine, GameObject, Scene, vec2 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
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
    this.sliderOne = null;
    
    // example scene
    this.buttons = [];

    // the hero and the support objects
    this.mHero = null;
    this.mBrain = null;
    this.mPortal = null;
    this.mLMinion = null;
    this.mRMinion = null;
    this.mFocusObj = null;

    this.mChoice = 'D';
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kMinionPortal);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.space);
    
    gEngine.Textures.loadTexture(this.buttonTexture);
    gEngine.Textures.loadTexture(this.toggleOnTexture);
    gEngine.Textures.loadTexture(this.toggleOffTexture);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kMinionPortal);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.space);
    
    gEngine.Textures.unloadTexture(this.buttonTexture);
    gEngine.Textures.unloadTexture(this.toggleOnTexture);
    gEngine.Textures.unloadTexture(this.toggleOffTexture);
};

MyGame.prototype.initialize = function () { 
    
    // color variable
    // I wrote the hexToRgb utility to help with better colors -- Scott
    var c; 
    // objects
    this.mHero = new Hero(this.kMinionSprite);
    this.mHero.setSpeed(1); 
    
    this.vBackground = new Renderable(gEngine.DefaultResources.getConstColorShader());
    c = hexToRgb("14213d");
    this.vBackground.setColor([c.r, c.g, c.b, c.a]);
    this.vBackground.getXform().setPosition(10, 10);
    this.vBackground.getXform().setSize(10, 10);

    this.UI = new UIcanvas();
    
    // main camera
    this.mCamera = new Camera(
        vec2.fromValues(0, 0),                                                  // position of the camera
        250,                                                                    // width of camera
        [0, 0, 940, 640]                                                        // viewport (orgX, orgY, width, height)
    );
    c = hexToRgb("14213d");
    this.mCamera.setBackgroundColor([c.r, c.g, c.b, c.a]);
    
    
    this.sliderOne = this.UI.CreateElement(this.UI.UIELEM_TYPES.Slider, [50,5], [60, 5], [0, 5], 0, 1);
    this.sliderOne.SetTexture(this.toggleOnTexture);
    this.sliderOne.SetSliderBarTexture(this.buttonTexture);


    this.sliderOne.AddListener(this.mHero.SetSpeed, this.mHero, null);
    
    for (var i = 0; i < 4; i++) {
        var b = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [50,20], [-100,(-50 + (25 * i))], [1,1,1,1], ("Button" + i));
        b.SetTexture(this.buttonTexture);
        b.SetHighlightColor([1,0,1,0.5]);
        this.buttons.push(b);
    }
    
    this.buttons[0].SetText("Reset");
    this.buttons[0].AddListener(this.mHero.Reset, this.mHero);
    
    this.buttons[1].SetText("Set Size: 2x");
    this.buttons[1].AddListener(this.mHero.SetSize, this.mHero, 2);
    
    this.buttons[2].SetText("Set Size: 3x");
    this.buttons[2].AddListener(this.mHero.SetSize, this.mHero, 3);
    

    this.buttons[3].SetText("Increase Size");
    this.buttons[3].AddListener(this.mHero.increaseSize, this.mHero, 2);
    this.mainMenuButton = this.UI.CreateElement(this.UI.UIELEM_TYPES.Button, [50,20], [-100, 65], [1,1,1,1], ("Main Menu"));
    this.mainMenuButton.SetTexture(this.buttonTexture);
    this.mainMenuButton.SetHighlightColor([1,0,1,0.5]);
    this.mainMenuButton.AddListener(this.sceneManager.LoadScene, this.sceneManager, 0);

    
    
    // Large background image
    var bgR = new SpriteRenderable(this.space);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(250, 250);
    bgR.getXform().setPosition(0, 0);
    this.mBg = new GameObject(bgR);
    
};


MyGame.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();
    this.mBg.draw(camera);
    this.mHero.draw(camera);
    
};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    //**Canvas / UI elements must be drawn last**
    var c = hexToRgb("14213d");
    gEngine.Core.clearCanvas([c.r, c.g, c.b, c.a]);
    
    this.drawCamera(this.mCamera);
    // CanvasAPI -- Implementation
    this.UI.Draw();
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    // update UI
    this.UI.update();
    
   
    var heroPos = this.mHero.getXform().getPosition();
    var a = heroPos[0] - this.mCamera.mouseWCX();
    var b = heroPos[1] - this.mCamera.mouseWCY();
    var heroMag = Math.sqrt(a*a + b*b);
    if (heroMag > 6) {
        this.mHero.rotateObjPointTo(vec2.fromValues(this.mCamera.mouseWCX(), 
                                                    this.mCamera.mouseWCY()), 0.1);
                          
        GameObject.prototype.update.call(this.mHero);
        
    }
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
