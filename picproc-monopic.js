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

// Monochrome picture.
// Accepts a colour picture canvas. Modifies the picture
// to be monochrome.
function monoPic(picCanvas)
{
   // Get canvas 2D context
   var context = picCanvas.getContext('2d');
   
   // Get pixels from canvas
   console.log("Width: ", picCanvas.width);
   console.log("Height: ", picCanvas.height);
   var picPixels = context.getImageData(0, 0, picCanvas.width, picCanvas.height);
   
   // Go through pixels
   var redVal = -1;
   var greenVal = -1;
   var blueVal = -1;
   var avgColVal = -1;
   for (var redPos = 0; redPos < picPixels.data.length; redPos += 4)
   {
      // Get pixel red value
      redVal = picPixels.data[redPos];
   
      // Get pixel green value
      greenVal = picPixels.data[redPos + 1];
   
      // Get pixel blue value
      blueVal = picPixels.data[redPos + 2];
      
      // Average pixel colour values
      avgColVal = (redVal + greenVal + blueVal) / 3;
      
      // Set pixel values to average
      picPixels.data[redPos] = avgColVal;          // Red
      picPixels.data[redPos + 1] = avgColVal;      // Green
      picPixels.data[redPos + 2] = avgColVal;      // Blue
   }
   
   // Output pixels to canvas
   context.putImageData(picPixels, 0, 0);
}