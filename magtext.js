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
   
   // Make inverted picture text white, background black (quantise content)
   //var mostBgColVal = mostColVal(outCanvasElem);    // Background colour
   //var alertTxt = "Most bg col val: " + mostBgColVal;
   //alert(alertTxt);
   //var minTxtColValDist = 40;                       // Min distance
                                                      // text is from
                                                      // bg colour
   //console.log("Min txt distance: " + minTxtColValDist);
   //alert(alertTxt);
   //alertTxt = "Min light col val: " + (mostBgColVal + minTxtColValDist);
   //alert(alertTxt);
   
   // Darken content
   //var brightThresh = 160;
   //var darkBy = 40;
   //var brightBy = 0;
   //var alertTxt = "Darkening by " + darkBy;
   //alert(alertTxt);
   //uniBright(outCanvasElem, brightThresh, brightBy, darkBy);
   
   
   // Make text white, background black
   // Note: adjust minimum background distance based on what max colour value is
   // Note: can tell when the brightness is uneven when 
   // max - min is a certain amount. Can apply different 
   // minimum background distances there. THIS WOULD WORK BEST
   // for uneven light coverage. Could leave logic the same then
   // alter the number of pixels picked up for when the light is
   // uneven only
   // Note: going to try to see which statistical values are
   // closest to the required best min and max text colour
   // values. And if not close, off by how much.
   //var maxTxtColVal = -1;
   //maxTxtColVal = maxColVal(outCanvasElem);
   //var minBgColValDist = 100;                         // Min Distance bg
                                                        // is from max
                                                        // text colour
   //console.log("Min Bg col val dist: " + minBgColValDist);
   //var minTxtColVal = maxTxtColVal - minBgColValDist;
   //alertTxt = "Min txt col val: " + minTxtColVal;
   //alert(alertTxt);
   //console.log("Min txt col val: " + minTxtColVal);
   //alertTxt = "Max txt col val: " + maxTxtColVal;
   //alert(alertTxt);
   //console.log("Max txt col val: " + maxTxtColVal);
  
   // Line break
   //console.log("");
   
   // Display statistics
   //var minColValue = -1;                                 // Min col val
   //minColValue = minColVal(outCanvasElem);       
   //console.log("Min col val: ", minColValue);            // View for macOS
   //var alertTxt = "Min col val: " + minColValue;         // View for Android
   //alert(alertTxt);
   
   //var maxColValue = -1;                                 // Max col val
   //maxColValue = maxColVal(outCanvasElem);              
   //console.log("Max col val: ", maxColValue);            // View for macOS
   //alertTxt = "Max col val: " + maxColValue;             // View for Android
   //alert(alertTxt);
   
   //var leastColValue = -1;
   //leastColValue = leastColVal(outCanvasElem);
   //console.log("Least col val: ", leastColValue);          // View for macOS
   //var alertTxt = "Least col val: " + leastColValue;       // View for Android
   //alert(alertTxt);
   
   var avgColValue = avgColVal(outCanvasElem);
   console.log("Avg col val: ", avgColValue);
   //var alertTxt = "Avg col val: " + avgColValue;       // View for Android
   //alert(alertTxt);
   
   // Code median - mid point?
   
   
   // Line break
   //console.log("");
   
   // Display ideal min/max txt colour values
   //var minTxtColVal = 150;                               
   //console.log("Ideal min txt col val: ", minTxtColVal);
   //var maxTxtColVal = 249;
   //console.log("Ideal max txt col val: ", maxTxtColVal);
   //binPic(outCanvasElem, minTxtColVal, maxTxtColVal);
   
   // Note: put distances here:
   // Distance ideal min text col val is from min: etc.
   // Then compare across multiple lighting conditions
   // Display distances ideals are from statistics
   
   // Make colour transitions between text and background distinct (sharpen 
   // content)
   //var shpFactor = 1;
   //console.log("Sharpening factor: ", shpFactor);
   //sharpPic(outCanvasElem, shpFactor);
}