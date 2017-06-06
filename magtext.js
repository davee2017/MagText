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
// Inputs a video element for view of surroundings.
function viewEnv(videoElem)            
{
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
function captureEnv(videoElem, canvasElem)
{
   // Pause the current video
   stopCamStream();
   
   // Take a picture of the current video
   takeVidPic(videoElem, canvasElem);
}

// Colour content
// Renders paused video content in colour on a canvas.
// Accepts: 
// 1. A video element with the paused content.
// 2. A source canvas for the paused content.
// 3. A destination canvas for rendering and adjustments to go on.
// 4. A contrast factor from 0 to 2 for adjusting contrast up/down.
// 5. A brightness amount from -127 to 127 for adjusting brightness 
// up/down.
function colContent(videoElem, inCanvas, outCanvas, contFact, brightAmt)
{  
   // Redraw canvas from video
   takeVidPic(videoElem, inCanvas);
   
   // Apply contrast & brightness
   adjIntensity(inCanvas, outCanvas, 0, 255, contFact, brightAmt);
}

// Mono content
// Renders paused video content in monochrome on a canvas.
// Accepts: 
// 1. A video element with the paused content.
// 2. A source canvas for the paused content.
// 3. A destination canvas for rendering and adjustments to go on.
// 4. A contrast factor from 0 to 2 for adjusting contrast up/down.
// 5. A brightness amount from -127 to 127 for adjusting brightness 
// up/down.
function monoContent(videoElem, inCanvas, outCanvas, contFact, brightAmt)
{  
   // Redraw canvas from video
   takeVidPic(videoElem, inCanvas);
   
   // Use variations of black and white for colours (grayscale content)
   monoPic(inCanvas);
   
   // Apply contrast & brightness
   adjIntensity(inCanvas, outCanvas, 0, 255, contFact, brightAmt);
}

// Invert content
// Renders paused video content as a monochrome inversion on a canvas.
// Accepts: 
// 1. A video element with the paused content.
// 2. A source canvas for the paused content.
// 3. A destination canvas for rendering and adjustments to go on.
// 4. A contrast factor from 0 to 2 for adjusting contrast up/down.
// 5. A brightness amount from -127 to 127 for adjusting brightness 
// up/down.
function invContent(videoElem, inCanvas, outCanvas, contFact, brightAmt)
{  
   // Redraw canvas from video
   takeVidPic(videoElem, inCanvas);
   
   // Use variations of black and white for colours (grayscale content)
   monoPic(inCanvas);
   
   // Invert content
   invPic(inCanvas);
   
   // Apply contrast & brightness
   adjIntensity(inCanvas, outCanvas, 0, 255, contFact, brightAmt);  
}

// Binary content
// Renders paused video content as a monochrome inversion on a canvas.
// Accepts: 
// 1. A video element with the paused content.
// 2. A source canvas for the paused content.
// 3. A destination canvas for rendering and adjustments to go on.
// 4. A text field of the distance text is from median colour value.
// 5. A contrast factor from 0 to 2 for adjusting contrast up/down.
// 6. A brightness amount from -127 to 127 for adjusting brightness 
// up/down
function binContent(videoElem, inCanvas, outCanvas, txtContDistElem, txtR,
                    txtG, txtB, bgR, bgG, bgB, contFact, brightAmt)
{     
   // Redraw canvas from video
   takeVidPic(videoElem, inCanvas);
   
   // Use variations of black and white for colours (grayscale content)
   monoPic(inCanvas);
   
   // Invert content
   invPic(inCanvas);
   
   // Make text a foreground colour, background a background colour
   // (quantise content)
   var contDistNo = 34;                               // Dynamic
   if (txtContDistElem.value != "")                   // distance input
                                                      // exists
   {
      contDistNo = Number(txtContDistElem.value);     // Get it
   }
   var medColValue = -1;                              // Median
   medColValue = medColVal(inCanvas);             
   var minTxtColVal = -1;                             // Min text distance
   minTxtColVal = medColValue + contDistNo;
   var maxTxtColVal = -1;                             // Max text distance
   maxTxtColVal = maxColVal(inCanvas);
   binPic(inCanvas, minTxtColVal, maxTxtColVal, txtR, txtG, txtB, bgR, bgG, 
          bgB);
   
   // Make colour transitions between text and background distinct (sharpen 
   // content)
   var shpFactor = 1;
   var weights = [ 0, -1 *shpFactor, 0,               // Sharpening kernel
                   -1*shpFactor, 5*shpFactor, -1*shpFactor,
                   0, -1*shpFactor, 0 ];
   var opaque = false;                
   convPic(inCanvas, weights, opaque);
   
   // Apply contrast & brightness
   adjIntensity(inCanvas, outCanvas, 0, 255, contFact, brightAmt); 
}