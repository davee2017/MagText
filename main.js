/*  MagText - An application to produce text and speech from content in the 
    surrounding environment under any lighting condition. 
    Copyright (C) 2017 David Ellison

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function main()
{
   // Debug mode?
   
   // Get video element
   var videoElem = null;
   videoElem = document.getElementById('video');     
                                                         // Can be abstracted
                                                         // out? As object?
   
   // Get rendition canvas element                                                      
   var rendCanvasElem = null;
   var rendCanvasElem = document.getElementById('rendCanvas'); 
                                                         // Can be abstracted to
                                                         // out? As object?
                                           
   // View environment
   viewEnv(videoElem);
   
   // After 5 seconds
   window.setTimeout
   (
      function()
      {
         captureEnv('video', 'rendCanvas');
         
         // Apply rendition
         console.log("rend in main(): " + window.rend);
                                                        // Put this into
                                                        // adjContent with
                                                        // constants and 
                                                        // cpyCanv later
         
         var COLOUR_REND = 0;                           // Possible renditions
         var MONO_REND = 1;
         var INV_REND = 2;
         var BIN_REND = 3;                              
         switch (window.rend)                           // Current rendition
         {
            case COLOUR_REND:
               // Render rendition on rendition canvas
               colContent('video', 'rendCanvas');
               break;
            case BIN_REND:
               // Render rendition on rendition canvas
               binContent('video', 'rendCanvas', 'txtContDist');
               break;
         }
         cpyCanv('rendCanvas', 'outCanvas');            // Rendition to out
                                                        // canvas
      },
      5000
   );
}