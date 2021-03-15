/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine */

"use strict";

function SceneManager(currentScene){
    this.scene = currentScene;
};

SceneManager.prototype.LoadScene = function( sceneIndex){
    switch(sceneIndex){
        case 0:
            var nextLevel = new HomeScreen();
            gEngine.Core.startScene(nextLevel);
            return;
        case 1:
            var nextLevel = new MyGame();
            gEngine.Core.startScene(nextLevel);
            return;
        case 2:
            var nextLevel = new ShapeGame();
            gEngine.Core.startScene(nextLevel);
            return;
        case 3:
            var nextLevel = new Calculator();
            gEngine.Core.startScene(nextLevel);
            return;
    }
    this.scene.unloadScene();
};