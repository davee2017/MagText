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

// Adjust intensity
// Applies a certain number to a range of pixels in a picture canvas.
// Accepts:
// 1. Monochrome picture canvas.
// 2. Minimum colour value of pixels.
// 3. Maximum colour value of pixels.
// 4. A number to increase (positive) or decrease (negative) by.

function adjIntensity(picCanvasId, minColVal, maxColVal, amt)
{  
   // Get picture canvas
   var picCanvas = document.getElementById(picCanvasId);
   
   // Get canvas 2D context
   var context = picCanvas.getContext('2d');
   
   // Get pixels from canvas
   var picPixels = context.getImageData(0, 0, picCanvas.width,
                   picCanvas.height);
   
   // Adjust pixel values
   for (var redPos = 0; redPos < picPixels.data.length; redPos += 4)
   {
      // Determine average colour value
      var redVal = picPixels.data[redPos];
      var greenVal = picPixels.data[redPos + 1];
      var blueVal = picPixels.data[redPos + 2];
      var pxColVals = [redVal, greenVal, blueVal];
      var avg = avgVal(pxColVals);
      
      // Adjust pixel value
      if ( (avg >= minColVal) && (avg <= maxColVal) )  
      {                                             // In colour range
         // Adjust by specified amount
         picPixels.data[redPos] = linearY(picPixels.data[redPos], 1, amt);
         picPixels.data[redPos + 1] = linearY(picPixels.data[redPos + 1], 1, 
                                              amt);
         picPixels.data[redPos + 2] = linearY(picPixels.data[redPos + 2], 1, 
                                              amt);
      }
   }
   
   // Draw pixels on canvas
   context.putImageData(picPixels, 0, 0);
}