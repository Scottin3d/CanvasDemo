/* Developed by 3 Lines of Code
 * Scott Shirley - @scottin3d
 * Kevin Blair - 
 * Nicholas Chambers - 
 * license - MIT
 */

"use strict";

//==PUBLIC======================================================================

/*<summary>Converts a hexadecimal color to RGBA 1.</summary>   
 *<param = hex> An object, the hexadecimal to be converted.</param>  
 *<return = result>A number[4], a dictionary of 0-1 RGBA values or null if invalid.</return> 
 */
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
    a: 1
  } : null;
};


//==============================================================================
//==PRIVATE=====================================================================
//==============================================================================