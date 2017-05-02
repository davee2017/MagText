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

// Minimum colour value
// Determines the minimum colour value in a monochrome picture.

function minColVal(picCanvas)
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

   // Find minimum colour value
   var uniqPxVals = -1;                                  // Unique pixel values
   uniqPxVals = uniqVals(pixelVals);         
   console.log("Unique values: ");
   for (var pos = 0; pos < uniqPxVals.length; pos += 1)
   {
      console.log("Pos ", pos, "Val ", uniqPxVals[pos]);
   }
   var minColVal = Math.min.apply(null, uniqPxVals);
   console.log("Min col val in function: ");
   console.log(minColVal);
   
   // Give minimum colour value back to calling function
   return minColVal;
}