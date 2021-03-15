# CSS452 Final - UI Canvas API  
This document covers the proposed API used for our final project, as well as documentation of the exposed functionality our game engine will provide to users with detailed implementation instructions.  

The UI Canvas API provides centralized support for the game designer to access UI controls such as buttons, sliders, toggles, ect.  Currently in gEngine, 'UI' objects need to be created using renderables and would need new individual behaviors for each different type of object. Our UI Canvas API allows for a modular and easy way to combine all UI into one simple package.

## Style Guide  
### Variables  
* const - Uppercase  
`this.UIELEM_TYPES = {Button : 1, Slider : 2};`  
* public - Camal Case  
`this.editMode;`  
* private - Leading Camal Case  
`this.mClickHold;` 
The leading letter should be relavent to the class.  

### Functions  
* public - Proper CamalCase  
`UIcanvas.prototype.IsMouseOverElement = function (mousePosition){}`  
* private - underscore camalCase  
`UIcanvas.prototype._initCanvas = function (){}`  
***NOTE*** 
* a function with a '_' should ***NOT*** be called from outside of the class it is declared in.  

### Documentation 
#### TODO
* assets/UIcanvas.xml
* ~~canvas/UIcanvas.js~~
* ~~canvas/UIcanvasCreate.js~~
* canvas/UIcanvasEditMode.js
* ~~canvas/UIcanvasUpdate.js~~
* ~~elements/UIelement.js~~
* ~~elements/UIButton.js~~
* ~~elements/UISlider.js~~
* ~~elements/UIDropdown.js~~
* ~~elements/UIToggle.js~~
* ~~events/UIEvent.js~~
* ~~events/UIEventHandler.js~~
* ~~utilities.js~~

### Draw()
  
```javascript
/*<summary>Calls the camera setup and draws object to a specified camera</summary>   
 */
```

### Update() 

```javascript 
/*<summary>Update is the most commonly used function to implement any kind of game script. 
 *Update is called every frame.</summary>   
 */
```

```javascript
<summary>A brief description of what the function does.</summary>   
<param = (name)> A (type), a brief description of the argument</param>  
<return = (name)> A (type), what is returned.</return>  
<remarks>Any additional notes you think is need to clarify your code.</remarks>  
```

#### Templates  
**Function Descriptions**  

```javascript
/*<summary></summary>   
 *<param = ></param>  
 *<return = ></return>  
 *<remarks></remarks>  
 */
```

**Function Separaters**

```javascript
//==PUBLIC======================================================================
//==============================================================================
//==PRIVATE=====================================================================
//==============================================================================
```
[Back to top.](#application)
