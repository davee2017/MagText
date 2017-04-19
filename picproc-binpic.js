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
// Accepts a picture canvas. Quantises the picture into black and white.
function binPic(picCanvas)
{
   // Get canvas 2D context
   var context = picCanvas.getContext('2d');
   
   // Get pixels from canvas
   var picPixels = context.getImageData(0, 0, picCanvas.width, picCanvas.height);
   
   // Get monochrome pixel values.... 
   //var redVal = -1;
   //var pixelVals = [];
   var pixelVals = [100, 100, 200, 200, 300, 5, 2, 2];
   //for (var redPos = 0; redPos < picPixels.data.length; redPos += 4)
   //{
      // Get pixel red value
      //redVal = picPixels.data[redPos];
      //pixelVals.push(redVal); 
   //}

   // Compile histogram
   var uniqPxVals = -1;                      // Unique pixel values
   uniqPxVals = uniqVals(pixelVals);         
   console.log("Unique values: ");
   for (var pos = 0; pos < uniqPxVals.length; pos += 1)
   {
      console.log(uniqPxVals[pos]);
   }
   var valCounts = -1;                       // Unique pixel value amounts
   valCounts = cntVals(pixelVals, uniqPxVals);
   for (var pos = 0; pos < uniqPxVals.length; pos += 1)
   {
      console.log("Pos ", pos, "Val ", uniqPxVals[pos], "Cnt ", valCounts[pos]);
   }
   
   // Determine maximum count
   var maxCount = Math.max.apply(null, valCounts);
   console.log("Max count: ", maxCount);

   // Determine maximum count position
   var maxCountPos = valCounts.indexOf(maxCount);
   console.log("Max count position: ", maxCountPos);
   
   // Determine unique value whose position is the maximum count position
   var threshold = uniqVals[maxCountPos];
   console.log("Max count value: ", threshold);
   
   // Set pixel colour values based on threshold
   for (var redPos = 0; redPos < picPixels.data.length; redPos += 4)
   {
      redVal = picPixels.data[redPos];
      if ( redVal >= (threshold + 30) )       //  Above/= threshold + offset
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
   
   // Output pixels to canvas
   context.putImageData(picPixels, 0, 0);
   // NOTE: this should be put into ebApp. Strictly, the image processing functions are associated with image processing, not the display of canvas.
   //This serves as a test.
   // Maybe the programmer wants to do more than just display it
}