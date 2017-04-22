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
// Quantises the picture into black and white.
// Accepts a picture canvas, a black/white threshold colour 
// value and an offset value.
//
function binPic(picCanvas, threshold, offset)
{
   // Get canvas 2D context
   var context = picCanvas.getContext('2d');
   
   // Get pixels from canvas
   var picPixels = context.getImageData(0, 0, picCanvas.width, picCanvas.height);
   
   // Set pixel colour values based on threshold
   for (var redPos = 0; redPos < picPixels.data.length; redPos += 4)
   {
      redVal = picPixels.data[redPos];
      if ( redVal >= (threshold + offset) )   //  Above/= threshold + offset
      {
         // Set pixel to white
         picPixels.data[redPos] = 255;             
         picPixels.data[redPos + 1] = 255;
         picPixels.data[redPos + 2] = 255;
      }
      else                                    // Below theshold + offset
      {
         // Set pixel to black
         picPixels.data[redPos] = 0;             
         picPixels.data[redPos + 1] = 0;
         picPixels.data[redPos + 2] = 0;
      }
   }
   
   // Draw pixels on canvas
   context.putImageData(picPixels, 0, 0);
}