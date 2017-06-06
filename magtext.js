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
function colContent(videoElem, inCanvas, outCanvas, contFact, brightAmt)
{  
   // Redraw canvas from video
   takeVidPic(videoElem, inCanvas);
   
   // Apply contrast & brightness
   adjIntensity(inCanvas, outCanvas, 0, 255, contFact, brightAmt);
}

// Mono content
function monoContent(videoId, inCanvas, outCanvas, contFact, brightAmt)
{  
   // Get video element
   var videoElem = null;
   videoElem = document.getElementById(videoId);
   
   // Redraw canvas from video
   takeVidPic(videoElem, inCanvas);
   
   // Use variations of black and white for colours (grayscale content)
   monoPic(inCanvas);
   
   // Apply contrast & brightness
   adjIntensity(inCanvas, outCanvas, 0, 255, contFact, brightAmt);
}

// Invert content
function invContent(videoId, inCanvas, outCanvas, contFact, brightAmt)
{  
   // Get video element
   var videoElem = null;
   videoElem = document.getElementById(videoId);
   
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
// Adjusts the content for optimal reading with naked eye
// by making desired features one colour and the rest of 
// the features another colour.
function binContent(videoId, inCanvas, outCanvas, txtContDistId, contFact, brightAmt)
{  
   // Get video element
   var videoElem = null;
   videoElem = document.getElementById(videoId);
   
   // Redraw canvas from video
   takeVidPic(videoElem, inCanvas);
   
   // Use variations of black and white for colours (grayscale content)
   monoPic(inCanvas);
   
   // Invert content
   invPic(inCanvas);
   
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
   medColValue = medColVal(inCanvas);             
   var minTxtColVal = -1;                             // Min text distance
   minTxtColVal = medColValue + contDistNo;
   var maxTxtColVal = -1;                             // Max text distance
   maxTxtColVal = maxColVal(inCanvas);
   var dispTxtR = -1;
   var txtRField = document.getElementById('txtR');   // Pass elements in
   dispTxtR = Number(txtRField.value);
   var dispTxtG = -1;
   var txtGField = document.getElementById('txtG');
   dispTxtG = Number(txtGField.value);
   var dispTxtB = -1;
   var txtBField = document.getElementById('txtB');
   dispTxtB = Number(txtBField.value);
   var dispBgR = -1;
   var bgRField = document.getElementById('bgR');
   dispBgR = Number(bgRField.value);
   var dispBgG = -1;
   var bgGField = document.getElementById('bgG');
   dispBgG = Number(bgGField.value);
   var dispBgB = -1;
   var bgBField = document.getElementById('bgB');
   dispBgB = Number(bgBField.value);
   binPic(inCanvas, minTxtColVal, maxTxtColVal, dispTxtR, dispTxtG, 
          dispTxtB, dispBgR, dispBgG, dispBgB);
   
   // Make colour transitions between text and background distinct (sharpen 
   // content)
   var shpFactor = 1;
   var weights = [ 0, -1 *shpFactor, 0,                  // Sharpening kernel
                   -1*shpFactor, 5*shpFactor, -1*shpFactor,
                   0, -1*shpFactor, 0 ];
   var opaque = false;                
   convPic(inCanvas, weights, opaque);
   
   // Apply contrast & brightness
   adjIntensity(inCanvas, outCanvas, 0, 255, contFact, brightAmt); 
}