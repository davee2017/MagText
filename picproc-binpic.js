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

// Binary picture
// Quantises the picture into a forground and background colour.
// Accepts:
// 1. A picture canvas. 
// 2. Minimum foreground colour value
// 3. Maximum foreground colour value
// 4. Foreground colour value
// 5. Background colour value

function binPic(picCanvas, fgMin, fgMax, fgR, fgG, fgB, bgR, bgG, bgB)
{
   // Get canvas 2D context
   var context = picCanvas.getContext('2d');
   
   // Get pixels from canvas
   var picPixels = context.getImageData(0, 0, picCanvas.width, picCanvas.height);
   
   // Set pixel colour values based on white range
   for (var redPos = 0; redPos < picPixels.data.length; redPos += 4)
   {
      redVal = picPixels.data[redPos];
      if ( (redVal >= fgMin) && (redVal <= fgMax) )      // Foreground range
      {
         // Set pixel to foreground colour
         picPixels.data[redPos] = fgR;             
         picPixels.data[redPos + 1] = fgG;
         picPixels.data[redPos + 2] = fgB;
      }
      else                                               // Background range
      {
         // Set pixel to background colour
         picPixels.data[redPos] = bgR;             
         picPixels.data[redPos + 1] = bgG;
         picPixels.data[redPos + 2] = bgB;
      }
   }
   
   // Draw pixels on canvas
   context.putImageData(picPixels, 0, 0);
}