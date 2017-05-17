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
function binContent(outCanvasElem, contDistNo)
{
   // Use variations of black and white for colours (grayscale content)
   monoPic(outCanvasElem);
   
   // Make black white, white black (invert content)
   invPic(outCanvasElem);
   
   // Make text a foreground colour, background a background colour
   // (quantise content)
   var minColValue = -1;
   minColValue = minColVal(outCanvasElem);            // Rename function if time
   console.log("Min col val: " + minColValue);        // (calcMinColVal)
   var txtOutput = "Min col val: " + minColValue;
   var minColValElem = document.getElementById("minColValOut");
   minColValElem.innerHTML = txtOutput;
   
   var mostColValue = -1;
   mostColValue = mostColVal(outCanvasElem);          // Rename function if time
   console.log("Most col val: " + mostColValue);      // (calcMostColVal)
   var txtOutput = "Most col val: " + mostColValue;
   var mostColValElem = document.getElementById("mostColValOut");
   mostColValElem.innerHTML = txtOutput;
   
   var leastColValue = -1;
   leastColValue = leastColVal(outCanvasElem);        // Rename function if time
   console.log("Least col val: " + leastColValue);      // (calcLeastColVal)
   var txtOutput = "Least col val: " + leastColValue;
   var leastColValElem = document.getElementById("leastColValOut");
   leastColValElem.innerHTML = txtOutput;
   
   var avgColValue = -1;
   avgColValue = avgColVal(outCanvasElem);            // Rename function if time
   console.log("Avg col val: " + avgColValue);
   var txtOutput = "Avg col val: " + avgColValue;
   var avgColValElem = document.getElementById("avgColValOut");
   avgColValElem.innerHTML = txtOutput;
   
   var medColValue = -1;
   medColValue = medColVal(outCanvasElem);            // Rename function if time
   console.log("Med col val: " + medColValue);
   var txtOutput = "Med col val: " + medColValue;
   var medColValElem = document.getElementById("medColValOut");
   medColValElem.innerHTML = txtOutput;
   
   console.log("Cont dist: " + contDistNo);
   txtOutput = "Cont dist: " + contDistNo;
   var contDistNoElem = document.getElementById("txtDistOut");
   contDistNoElem.innerHTML = txtOutput;
   
   var minTxtColVal = medColValue + contDistNo;
   console.log("Min txt col val: " + minTxtColVal);
   txtOutput = "Min txt col val: " + minTxtColVal;
   var minTxtColValElem = document.getElementById("minTxtOut");
   minTxtColValElem.innerHTML = txtOutput;
   
   var maxTxtColVal = maxColVal(outCanvasElem);
   console.log("Max txt col val: " + maxTxtColVal);
   txtOutput = "Max txt col val: " + maxTxtColVal;
   var maxTxtColValElem = document.getElementById("maxTxtOut");
   maxTxtColValElem.innerHTML = txtOutput;
   
   binPic(outCanvasElem, minTxtColVal, maxTxtColVal);
   
   // Make colour transitions between text and background distinct (sharpen 
   // content)
   var shpFactor = 1;
   sharpPic(outCanvasElem, shpFactor);
}