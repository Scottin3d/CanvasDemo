/* Developed by 3 Lines of Code
 * Scott Shirley - @scottin3d
 * Kevin Blair - 
 * Nicholas Chambers - 
 * license - MIT
 */

/* global gEngine, GameObject */

"use strict";

/*<summary>UIEvents are a special kind of multicast delegate that can only be invoked 
 * from within the class where they are declared (the publisher class). 
 * If other classes subscribe to the event, their event handler methods 
 * will be called when the publisher class raises the event.</summary>   
 *<param = name>A string, the name of the event.</param> 
 */
function UIEvent (name){
    this.eventName = name;
    this.listeners = [];
    this.values = [];
};

//==PUBLIC======================================================================

/*<summary>Subscribes a listener to the event.</summary>   
 *<param = listener>A object, a bound function to an object acting as a delegate.</param>
 *<param = value>A object, a value that can be associated with the listener when invoked.</param>
 */
UIEvent.prototype.AddListener = function(listener, value){
    this.listeners.push(listener);
    this.values.push(value);
};

/*<summary>Used to signal the event handlers that subscribe to this event.  When 
 * called, all associated handlers will be called.</summary> 
 */
UIEvent.prototype.Invoke = function(){
    for (var i = 0; i < this.listeners.length; i++) {
        var val = (this.values[i] === null)? arguments[0] : this.values[i];
        this.listeners[i](val);
    }
};


//==============================================================================

//==PRIVATE=====================================================================
//==============================================================================

