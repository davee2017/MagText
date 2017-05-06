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
   if ( chkCapCompat() && attachCam(videoElem) )
   {                             // Browser compatible and webcam attached
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

// Adjust content
// Adjusts the content for optimal reading with naked eye
// and for optimal post-processing.
function adjContent(outCanvasElem, txtDist)
{
   // Use variations of black and white for colours (grayscale content)
   monoPic(outCanvasElem);
   
   // Make black white, white black (invert content)
   invPic(outCanvasElem);
   
   // Make text a foreground colour, background a background colour
   // (quantise content)
   var avgColValue = -1;
   avgColValue = avgColVal(outCanvasElem);            // Rename function if time
   // Note: need to convert txtDist to a number here
   var minTxtColVal = avgColValue + txtDist; 
   var maxTxtColVal = maxColVal(outCanvasElem);
   binPic(outCanvasElem, minTxtColVal, maxTxtColVal);
   
   // Make colour transitions between text and background distinct (sharpen 
   // content)
   var shpFactor = 1;
   sharpPic(outCanvasElem, shpFactor);
}