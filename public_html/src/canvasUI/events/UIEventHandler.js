/* Developed by 3 Lines of Code
 * Scott Shirley - @scottin3d
 * Kevin Blair - 
 * Nicholas Chambers - 
 * license - MIT
 */

"use strict";

/*<summary>A object class that stores all associated events of an object.</summary> 
 *<remarks>Not currently used.</remarks>
*/
function UIEventHandler(){
    this.events = [];
};

//==PUBLIC======================================================================

/*<summary>Adds an event to the object event handler.</summary>   
 *<param = event>A object, the event to be added to the event handler.</param>
 */
UIEventHandler.prototype.AddEvent = function(event){
    var name = event.eventName;
    var obj = { name : event};
    this.events.push(obj);
};

// TODO -- stretch goal -- remove event
// TODO -- stretch goal -- get event

//==============================================================================

//==PRIVATE=====================================================================
//==============================================================================




