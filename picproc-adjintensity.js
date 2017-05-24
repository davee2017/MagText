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
// Applies a certain number to a range of pixels in a monochrome picture canvas.
// Accepts:
// 1. Monochrome picture canvas.
// 2. Minimum colour value of pixels.
// 3. Maximum colour value of pixels.
// 4. A number to increase (positive) or decrease (negative) by.

function adjIntensity(picCanvas, minColVal, maxColVal, amt)
{
   // Get canvas 2D context
   var context = picCanvas.getContext('2d');
   
   // Get pixels from canvas
   var picPixels = context.getImageData(0, 0, picCanvas.width,
                   picCanvas.height);
   
   console.log("Before alteration");
   // Adjust pixel values
   for (var redPos = 0; redPos < picPixels.data.length; redPos += 4)
   {
      // Determine average colour values
      console.log("Pixel pos " + (redPos / 4) );
      var redVal = picPixels.data[redPos];
      console.log("Red val: " + redVal);
      var greenVal = picPixels.data[redPos + 1];
      console.log("Green val: " + greenVal);
      var blueVal = picPixels.data[redPos + 2];
      console.log("Blue val: " + blueVal);
      var pxColVals = [redVal, greenVal, blueVal];
      var avg = avgVal(pxColVals);
      console.log("Average col val: " + avg);
      
      if ( (avg >= minColVal) && (avg <= maxColVal) )  
      {                                             // In pixel range
         // Adjust by specified amount
         picPixels.data[redPos] = picPixels.data[redPos] + amt;             
         picPixels.data[redPos + 1] = picPixels.data[redPos + 1] + amt;
         picPixels.data[redPos + 2] = picPixels.data[redPos + 2] + amt;
      }
   }
   
   // Display altered pixel colour values
   console.log("After alteration");
   for (var redPos = 0; redPos < picPixels.data.length; redPos += 4)
   {
      // Determine average colour values
      console.log("Pixel pos " + (redPos / 4) );
      var redVal = picPixels.data[redPos];
      console.log("Red val: " + redVal);
      var greenVal = picPixels.data[redPos + 1];
      console.log("Green val: " + greenVal);
      var blueVal = picPixels.data[redPos + 2];
      console.log("Blue val: " + blueVal);
      var pxColVals = [redVal, greenVal, blueVal];
   }
   
   // Draw pixels on canvas
   context.putImageData(picPixels, 0, 0);
}