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
   // Check compatibility
   console.log("Checking for webcam image capture support....");        // Log process
   if (chkImgCapCompat())
   {   
      // Notify developer of compatibility
      console.log("Webcam image capture supported by browser");
      
      // Get video element
      var videoElem = document.getElementById('video');
      
      // Get output canvas element
      var outCanvasElem = document.getElementById('outCanvas'); 
      
      // Show camera via video element     
      attachCam(videoElem);
      
      // Take a picture of the current video
      window.setTimeout
      (
            function()           // Can call other functions
            {
               takeVidPic(videoElem, outCanvasElem);
               // Hide video element
               videoElem.style.visibility = "hidden";
            }, 
            5000
      );
     
     // Detach camera
     
     
     
     // Note: Part of box content. Capture video can be done 
      // seperate?
      
      
   }
   else
   {
      // Notify user of incompatibility
      alert("Webcam image capture not supported by your web browser");
   }
}