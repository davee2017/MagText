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

// Most colour value
// Determines the most occurring colour in a picture.
// Accepts a picture canvas.

function mostColVal(picCanvas)
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

   // Compile histogram
   var uniqPxVals = -1;                      // Unique pixel values
   uniqPxVals = uniqVals(pixelVals);         
   var valCounts = -1;                       // Unique pixel value amounts
   valCounts = cntVals(pixelVals, uniqPxVals);
   
   // Determine most occurring colour value
   var maxCount = Math.max.apply(null, valCounts);
   var maxCountPos = valCounts.indexOf(maxCount);
   var mostVal = uniqPxVals[maxCountPos];
   
   return mostVal;
}