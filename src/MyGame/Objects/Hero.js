/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture) {
    this.texture = spriteTexture;
    this.kDelta = 0.3;
    this.doubleSpeed = false;
    this.speed = 1;
    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(35, 50);
    this.mDye.getXform().setSize(20, 30);
    this.mDye.setElementPixelPositions(0, 120, 0, 180);
    this.increment  = 5;
    this.mySprite = 1;
    GameObject.call(this, this.mDye);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function () {
    if(this.doubleSpeed) {
        this.speed = 2;
    } else {
        this.speed = 1;
    }
//    // control by WASD
//    var xform = this.getXform();
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
//        xform.incYPosBy(this.kDelta);
//    }
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
//        xform.incYPosBy(-this.kDelta);
//    }
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
//        xform.incXPosBy(-this.kDelta);
//    }
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
//        xform.incXPosBy(this.kDelta);
//    }
};
Hero.prototype.setColor = function(color) {
    this.mDye.setColor(color);
};

Hero.prototype.rotate = function(value) {
    this.getXform().setRotationInDegree(value);
};

Hero.prototype.increaseSize = function(value) {
    this.mDye.getXform().setSize(this.mDye.getXform().getSize()[0] + value, this.mDye.getXform().getSize()[1] + value);
};

Hero.prototype.Reset =  function() {
    this.mDye.getXform().setSize(20, 30);
    this.getXform().setRotationInDegree(0);
};

Hero.prototype.SetSize = function(value) {
    this.mDye.getXform().setSize(20 * value, 30 * value);
};

Hero.prototype.SetShadowSize = function(value) {
    this.mDye.getXform().setSize(0.4 * value, 0.6 * value);
};
Hero.prototype.SetSpeed = function(value) {
    this.setSpeed(Math.abs(value));
};

Hero.prototype.incPosition = function(value) {
    this.mDye.getXform().setPosition(this.mDye.getXform().getXPos() + (value[0] * this.speed), this.mDye.getXform().getYPos() + (value[1]* this.speed));
};

Hero.prototype.setSprite = function(sprite) {
    if(sprite === 1) {
        this.mDye.setElementPixelPositions(0, 120, 0, 180);
    } else if(sprite === 2) {
        this.mDye.setElementPixelPositions(0, 204, 346, 512);
    } else if(sprite === 3) {
        this.mDye.setElementPixelPositions(600, 700, 0, 180);
    } else {
        this.mDye.setElementPixelPositions(510, 595, 23, 153);
    }
    this.mySprite = sprite;
};

Hero.prototype.getSprite = function() {
    return this.mySprite;
};

Hero.prototype._doubleSpeed = function(isDoubled) {
    this.doubleSpeed = isDoubled;
};