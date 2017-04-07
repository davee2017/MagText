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

// Check webcam image capture compatibility
// Checks to see if the web browser can capture an image from the webcam.
// Returns true if compatible
// Returns false if incompatible

function chkCapCompat()
{
   // Note: this could eventually return what type of compatible gum as an 
   // integer. 0 could be not compatible at all. 1 could be
   // navigator.getUserMedia(). 2 could be mediaDevices.getUserMedia(). Should
   // do this in another file chkcapcompat.js once others work
   
   // Log process
   console.log("Checking for webcam capture support....");        
   
   // Check compatibility by engine
   var compatible = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
   navigator.msGetUserMedia );
   
   // Notify developer of compatibility
   if (compatible)               // Compatible
   {
      console.log("Navigator.getUserMedia() webcam capture supported by browser");
   }
   else                          // Not compatible
   {
      alert("Navigator.getUserMedia() webcam capture not supported by browser");  
   }
   
   // Return compatibility status
   return compatible;
}