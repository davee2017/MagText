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

/* NOTE: This may simply need a series of statements to define the getUserMedia
object to receive for a browser. In which case, only a single imgcap file will
be needed (containing compatiblity check, camera attach and image capture 
functions. Update to cross-browser code at a later stage. Test whether this
works for all browsers.*/

// Attach camera
// Attaches webcam to an element so it can be accessed.
// Uses getUserMedia() to access

function attachCam(video, width, height)       
{
   // Set up webcam video dimnesions
   var dimensions =
   {
      video:
      {
         mandatory:
         {
            maxWidth: width,
            maxHeight: height
         }
      }
   }; 
   
   // Get getUserMedia for particular browser (in order of engine)
   navigator.getUserMedia = navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||    // Firefox has new
                            navigator.msGetUserMedia;
   
   // Ask permission and connect webcam
   navigator.getUserMedia
   (
      dimensions,    
      function(stream)  // Success
      {
         // Connect webcam stream
         video.src = window.URL.createObjectURL(stream);
      }, 
      function()        // Failure
      {
         // Notify user
         console.log("Permission denied");
      }
   )
}
