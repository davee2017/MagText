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

// MagText "Class"
// Supplies an interface for a webcam to function as a text readability enhancer.

// View environment
// Displays the environment on the screen.
function viewEnv(videoElem)            
{
   console.log("Video elem src: " + videoElem.src);
   if (videoElem.src == "")         // Not already attached
   {
      if ( chkCapCompat() && attachCam(videoElem) )
      {                             // Browser compatible and webcam attached
         startCamStream();
      }
   }
   else                             // Already attached
   {
      startCamStream();
   }
}

// Capture environment
// Takes a picture of the current environment.
// Inputs environment video and a canvas. Draws the 
// current video image on the canvas.
function captureEnv(videoElem, outCanvasElem)
{
   // Pause the current video
   stopCamStream();
   
   // Take a picture of the current video
   takeVidPic(videoElem, outCanvasElem);
}

// Binary content
// Adjusts the content for optimal reading with naked eye
// by making desired features one colour and the rest of 
// the features another colour.
function binContent(videoId, canvasId, txtContDistId)
{  
   // Get out canvas element
   var outCanvasElem = null;
   outCanvasElem = document.getElementById(canvasId);
   
   // Get video element
   var videoElem = null;
   videoElem = document.getElementById('video');     
   
   // Redraw canvas from video
   takeVidPic(videoElem, outCanvasElem);
   
   // Use variations of black and white for colours (grayscale content)
   monoPic(outCanvasElem);
   
   // Invert content
   invPic(outCanvasElem);
   
   // Make text a foreground colour, background a background colour
   // (quantise content)
   var contDistField = null;
   var contDistField = document.getElementById(txtContDistId);
   var contDistNo = 34;                               // Dynamic
   if (contDistField.value != "")                     // distance input
                                                      // exists
   {
      contDistNo = Number(contDistField.value);       // Get it
   }
   var medColValue = -1;                              // Median
   medColValue = medColVal(outCanvasElem);             
   var minTxtColVal = -1;                             // Min text distance
   minTxtColVal = medColValue + contDistNo;
   var maxTxtColVal = -1;                             // Max text distance
   maxTxtColVal = maxColVal(outCanvasElem);
   var dispTxtColVal = -1;
   dispTxtColVal = 255;
   //dispTxtColVal = txtColValField.value;
   var dispBgColVal = -1;
   dispBgColVal = 0;
   //dispBgColVal = bgColValField.value;
   binPic(outCanvasElem, minTxtColVal, maxTxtColVal, dispTxtColVal, 
          dispBgColVal);
   
   // Make colour transitions between text and background distinct (sharpen 
   // content)
   var shpFactor = 1;
   var weights = [ 0, -1 *shpFactor, 0,                  // Sharpening kernel
                   -1*shpFactor, 5*shpFactor, -1*shpFactor,
                   0, -1*shpFactor, 0 ];
   var opaque = false;                
   convPic(outCanvasElem, weights, opaque);
}