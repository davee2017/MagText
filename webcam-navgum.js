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

// Attach camera.
// Inputs a video element with associated width and height.
// Attaches webcam to a video element so it can be accessed. Uses getUserMedia API to access.

function attachCam(videoElem)       
{
   // Assume that attachment is successful initially
   var attached = true;
   
   // Set up webcam video dimensions
   var settings =
   {
      video:
      {
         mandatory:
         {
            maxWidth: videoElem.width,
            maxHeight: videoElem.height
         }
      }
   }; 
   
   // Get getUserMedia API for particular browser (in order of engine)
   navigator.getUserMedia = navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||    // Firefox has new
                            navigator.msGetUserMedia;
   
   // Connect webcam
   navigator.getUserMedia
   (
      settings,    
      function(stream)  // Success
      {
         // Connect webcam stream
         video.src = window.URL.createObjectURL(stream);
      }, 
      function(error)   // Failure
      {
         // Webcam wasn't attached
         attached = false;
         
         // Notify user of error
         switch(error.name)
         {
         case 'PermissionDeniedError':
            alert("Permission to access webcam denied");
            break;
         case 'NotFoundError':
            alert("Webcam not found");
            break;
         default:
            alert("Technical error. Please see log");
            console.log(error.name);
         }
      }
   )
   
   // Return attachment status
   return attached;
}

// Start camera stream
// Starts the webcam video stream. Works with getUserMedia API.

function startCamStream()
{
   video.play();
}

// Stop webcam stream
// Stops the webcam streaming itself. Works via the getUserMedia API.
function stopCamStream()
{
   video.pause();
}

// Take video picture
// Inputs a webcam video and canvas element. 
// Draws video's current image on canvas.

function takeVidPic(videoElem, canvasElem) 
{  
   // Get 2D context of canvas
   var context = canvasElem.getContext('2d');             
   
   // Draw webcam image on canvas
   context.drawImage(videoElem, 0, 0, videoElem.width, videoElem.height); 
}