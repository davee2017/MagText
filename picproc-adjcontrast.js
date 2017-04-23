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

// Adjust contrast
// Accepts:
// 1. A picture canvas.
// 2. A light/dark threshold colour value.
// 3. A threshold offset value for dynamic threshold colour values. Range of
// pixel values at and above this threshold are classified as light pixels.
// Range of pixel values below this threshold are classified as dark pixels.
// 4. A colour value to decrease dark pixels by.
// 5. A colour value to increase light pixels by.

function adjContrast(picCanvas, threshold, offset, darkDec, lightInc)
{
   // Check arguments
   console.log("Arguments:");
   console.log("Threshold", threshold);
   console.log("Offset, ", offset);
   console.log("Darkening by, ", darkDec);
   console.log("Lightening by, ", lightInc);
   
   // Get canvas 2D context
   var context = picCanvas.getContext('2d');
   
   // Get pixels from canvas
   var picPixels = context.getImageData(0, 0, picCanvas.width, picCanvas.height);
   
   // Darken or lighten based on threshold and offset
   for (var redPos = 0; redPos < picPixels.data.length; redPos += 4)
   {                                          // For each pixel
      redVal = picPixels.data[redPos];
      if ( redVal >= (threshold + offset) )   // In light range
      {
         // Make lighter
         picPixels.data[redPos] = picPixels.data[redPos] + lightInc;
         picPixels.data[redPos + 1] = picPixels.data[redPos + 1] + lightInc;
         picPixels.data[redPos + 2] = picPixels.data[redPos + 2] + lightInc;
      }
      else                                    // In dark range
      {
         // Make darker
         picPixels.data[redPos] = picPixels.data[redPos] - darkDec;
         picPixels.data[redPos + 1] = picPixels.data[redPos + 1] - darkDec;
         picPixels.data[redPos + 2] = picPixels.data[redPos + 2] - darkDec;
      }
   }
   
   // Draw pixels on canvas
   context.putImageData(picPixels, 0, 0);
}