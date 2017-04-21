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
// Unify brightness
// Attempts to unify the brightness across an entire monochrome picture.
// Accepts:
// 1. A canvas containing a monochrome picture.
// 2. A colour value threshold for determining too light and dark pixels.
// 3. An offset to add to the colour value threshold for determining too light
// and dark pixels.
// 4. A colour value to increase by when a pixel is too dark.
// 5. A colour value to decrease by when a pixel is too bright.

function uniBright(picCanvas, threshold, offset, darkInc, lightDec)
{
   console.log("Uni bright threshold: ", threshold);
   console.log("Offset: ", offset);
   console.log("Brighten by: ", darkInc);
   console.log("Darken by: ", lightDec);
   
   // Get canvas 2D context
   var context = picCanvas.getContext('2d');
   
   // Get pixels from canvas
   var picPixels = context.getImageData(0, 0, picCanvas.width, picCanvas.height);
   
   // Adjust pixel values
   for (var redPos = 0; redPos < picPixels.data.length; redPos += 4)
   {
      redVal = picPixels.data[redPos];
      if ( redVal >= (threshold + offset) )  // Too bright
      {
         // Darken pixel
         picPixels.data[redPos] = redVal - lightDec;             
         picPixels.data[redPos + 1] = redVal - lightDec;
         picPixels.data[redPos + 2] = redVal - lightDec;
      }
      else                                   // Too dark
      {
         // Lighten pixel
         picPixels.data[redPos] = redVal + darkInc;             
         picPixels.data[redPos + 1] = redVal + darkInc;
         picPixels.data[redPos + 2] = redVal + darkInc;
      }
   }
   
   // Draw pixels on canvas
   context.putImageData(picPixels, 0, 0);
}