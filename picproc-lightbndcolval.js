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

// Light boundary colour value
// Determines the colour value at the interface goling from light pixels to
// dark pixels.
// Accepts a picture canvas. Returns the colour value.

function lightBndColVal(picCanvas)
{
   // Get canvas 2D context
   var context = picCanvas.getContext('2d');
   
   // Get pixels from canvas
   var picPixels = context.getImageData(0, 0, picCanvas.width, picCanvas.height);
   
   // Get pixel values 
   var redVal = -1;
   var pixelVals = [];
   for (var redPos = 0; redPos < picPixels.data.length; redPos += 4)
   {
      // Get pixel red value
      redVal = picPixels.data[redPos];
      pixelVals.push(redVal); 
   }
   console.log("Px vals: ");
   for (var pos = 0; pos < pixelVals.length; pos += 1)
   {
      console.log(pixelVals[pos]);
   }
   
   // Compile list of unique pixel values
   var uniqPxVals = uniqVals(pixelVals);
   console.log("Unique px vals: ");
   for (var pos = 0; pos < uniqPxVals.length; pos += 1)
   {
      console.log(uniqPxVals[pos]);
   }
   
   // Sort unique values in ascending order
   // Note: this could be stats-sortByNum(vals, order)
   uniqPxVals.sort
   (
      function (num1, num2)
      {
         return num1 - num2;        // Result -ve: num 1 before num 2
                                    // Result +ve: num 1 after num 2
      }
   )
   console.log("Sorted unique px vals: ");
   for (var pos = 0; pos < uniqPxVals.length; pos += 1)
   {
      console.log(uniqPxVals[pos]);
   }
}