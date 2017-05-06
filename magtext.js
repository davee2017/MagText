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
   
   // Display colour value statistics on Android
   var minColValue = -1;                                 // Min col val
   minColValue = minColVal(outCanvasElem);       
   var txtOutput = "Min col val: " + minColValue;
   var txtMinColValElem = document.getElementById("txtMinColVal");
   txtMinColValElem.innerHTML = txtOutput;
   
   var maxColValue = -1;                                 // Max col val
   maxColValue = maxColVal(outCanvasElem);       
   txtOutput = "Max col val: " + maxColValue;
   var txtMaxColValElem = document.getElementById("txtMaxColVal");
   txtMaxColValElem.innerHTML = txtOutput;
   
   var leastColValue = -1;                               // Least col val
   leastColValue = leastColVal(outCanvasElem);       
   txtOutput = "Least col val: " + leastColValue;
   var txtLeastColValElem = document.getElementById("txtLeastColVal");
   txtLeastColValElem.innerHTML = txtOutput;
   
   var mostColValue = -1;                                // Most col val
   mostColValue = mostColVal(outCanvasElem);       
   txtOutput = "Most col val: " + mostColValue;
   var txtMostColValElem = document.getElementById("txtMostColVal");
   txtMostColValElem.innerHTML = txtOutput;
   
   var avgColValue = -1;                                // Avg col val
   avgColValue = avgColVal(outCanvasElem);       
   txtOutput = "Avg col val: " + avgColValue;
   var txtAvgColValElem = document.getElementById("txtAvgColVal");
   txtAvgColValElem.innerHTML = txtOutput;
   
   var medColValue = -1;                                // Med col val
   medColValue = medColVal(outCanvasElem);       
   txtOutput = "Med col val: " + medColValue;
   var txtMedColValElem = document.getElementById("txtMedColVal");
   txtMedColValElem.innerHTML = txtOutput;
   
   // Display ideal colour values
   var inIdealMinElem = document.getElementById("inIdealMin");
   var minTxtColVal = inIdealMinElem.value;                             
   txtOutput = "Ideal min txt col val: " + minTxtColVal;
   var txtIdealMinElem = document.getElementById("txtIdealMin");
   txtIdealMinElem.innerHTML = txtOutput;
   
   var inIdealMaxElem = document.getElementById("inIdealMax");
   var maxTxtColVal = inIdealMaxElem.value;                             
   txtOutput = "Ideal max txt col val: " + maxTxtColVal;
   var txtIdealMaxElem = document.getElementById("txtIdealMax");
   txtIdealMaxElem.innerHTML = txtOutput;
   
   // Display distances from ideal min
   txtOutput = "Ideal min distance from min: " + (minTxtColVal - minColValue);
   var txtIdealMinMinElem = document.getElementById("txtIdealMinMin");
   txtIdealMinMinElem.innerHTML = txtOutput;
   
   txtOutput = "Ideal min distance from max: " + (minTxtColVal - maxColValue);
   var txtIdealMinMaxElem = document.getElementById("txtIdealMinMax");
   txtIdealMinMaxElem.innerHTML = txtOutput;
   
   txtOutput = "Ideal min distance from least: " + (minTxtColVal - leastColValue);
   var txtIdealMinLeastElem = document.getElementById("txtIdealMinLeast");
   txtIdealMinLeastElem.innerHTML = txtOutput;
   
   txtOutput = "Ideal min distance from most: " + (minTxtColVal - mostColValue);
   var txtIdealMinMostElem = document.getElementById("txtIdealMinMost");
   txtIdealMinMostElem.innerHTML = txtOutput;
   
   txtOutput = "Ideal min distance from avg: " + (minTxtColVal - avgColValue);
   var txtIdealMinAvgElem = document.getElementById("txtIdealMinAvg");
   txtIdealMinAvgElem.innerHTML = txtOutput;
   
   txtOutput = "Ideal min distance from med: " + (minTxtColVal - medColValue);
   var txtIdealMinMedElem = document.getElementById("txtIdealMinMed");
   txtIdealMinMedElem.innerHTML = txtOutput;
   
   // Make text a foreground colour, background a background colour
   // (quantise content)
   //var avgColValue = -1;
   //avgColValue = avgColVal(outCanvasElem);            // Rename function if time
   //var txtDist = 50;                                  // Abstract out if static
   //var minTxtColVal = avgColValue + txtDist; 
   //var maxTxtColVal = 247;
   binPic(outCanvasElem, minTxtColVal, maxTxtColVal);
   
   // Make colour transitions between text and background distinct (sharpen 
   // content)
   var shpFactor = 1;
   sharpPic(outCanvasElem, shpFactor);
}