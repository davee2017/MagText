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
   console.log("Amount: " + amt);
   console.log("Min col val: " + minColVal);
   console.log("Max col val: " + maxColVal);
   
   // Get canvas 2D context
   var context = picCanvas.getContext('2d');
   
   // Get pixels from canvas
   var picPixels = context.getImageData(0, 0, picCanvas.width,
                   picCanvas.height);
   
   // Display original single colour values
   console.log("Pixel values before: ");
   for (var redPos = 0; redPos < picPixels.data.length; redPos += 4)
   {
      // Show value
      console.log("Pos " + redPos + " Val " + picPixels.data[redPos]);
   }
   
   // Adjust pixel values
   for (var redPos = 0; redPos < picPixels.data.length; redPos += 4)
   {
      redVal = picPixels.data[redPos];
      if ( (redVal >= minColVal) && (redVal <= maxColVal) )  
      {                                             // In colour value range
         // Adjust by specified amount
         picPixels.data[redPos] = redVal + amt;             
         picPixels.data[redPos + 1] = redVal + amt;
         picPixels.data[redPos + 2] = redVal + amt;
      }
   }
   
   // Display single colour values after change
   
   // Draw pixels on canvas
}