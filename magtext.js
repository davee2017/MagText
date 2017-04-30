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
function adjContent(outCanvasElem)
{
   // Use variations of black and white for colours (grayscale content)
   monoPic(outCanvasElem);
   
   // Make black white, white black (invert content)
   invPic(outCanvasElem);
   
   // Make colour transitions between text and background distinct (sharpen 
   // content)
   var shpFactor = 1;
   sharpPic(outCanvasElem, shpFactor);
   
   // Make inverted picture text white, background black (quantise content)
   //var mostBgColVal = mostColVal(outCanvasElem);    // Background colour
   //var alertTxt = "Most bg col val: " + mostBgColVal;
   //alert(alertTxt);
   //var minTxtColValDist = 70;                       // Min distance
                                                      // text is from
                                                      // bg colour
   //alertTxt = "Min txt distance: " + minTxtColValDist;
   //alert(alertTxt);
   //alertTxt = "Min light col val: " + (mostBgColVal + minTxtColValDist);
   //alert(alertTxt);
   
   // Set minimum text colour value in lightest invert, darkest straight
   var minTxtColVal = 210;
   
   // Bring inverted dark areas up
   var brightBy = 50;
   var darkBy = 0;
   var alertTxt = "Brightening by " + brightBy;
   alert(alertTxt);
   uniBright(outCanvasElem, minTxtColVal, brightBy, darkBy);
   
   // Make text white, background black
   //alertTxt = "Min txt col val: " + minTxtColVal;
   //alert(alertTxt);
   //binPic(outCanvasElem, minTxtColVal, 0);
}