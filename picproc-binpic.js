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
   var pixelVals = [100, 100, 200, 200, 300, 5, 2, 2];
   //for (var redPos = 0; redPos < picPixels.data.length; redPos += 4)
   //{
      // Get pixel red value
      //redVal = picPixels.data[redPos];
      //pixelVals.push(redVal); 
   //}

   // Determine unique pixel values.... Helper? Math class. Call uniqVals(vals)
   var uniqVals = [];                 // Initialise unique value list
   uniqVals[0] = pixelVals[0];        // First always unique
   var unique = true;                 // Assume unique initially
   // For each pixel value
   for (var pixelPos = 1; pixelPos < pixelVals.length; pixelPos += 1)
   {
      // Compare value to all values in unique list
      var uniqPos = -1;
      do 
      {
         // Go to next value in unique list
         uniqPos++;                       
         
         if ( pixelVals[pixelPos] == uniqVals[uniqPos] )    // Pixel value same 
                                                            // as unique list 
                                                            // value
         {
            unique = false;                                 // Not unique
         }
      } 
      while ( unique && (uniqPos < uniqVals.length) );      // Unique and 
                                                            // and not at unique
                                                            // list end
                                                            
      if (unique)                                           // Different to all
      {
         // Add to unique list
         uniqVals.push( pixelVals[pixelPos] );
      }
      
      // Reset unique indicator for next pixel value
      unique = true;
   }                  

   // Count the occurrence of each unique value in the pixel values.... Helper in Math. Call countVals(uniqVals, valCounts)
   var valCounts = [];
   var pixelPos = -1;
   for (var uniqPos = 0; uniqPos < uniqVals.length; uniqPos += 1)
   {                             // For given unique value
      var valCount = 0;
      for (var pixelPos = 0; pixelPos < pixelVals.length; pixelPos += 1)
      {                          // For given pixel value
         if (uniqVals[uniqPos] == pixelVals[pixelPos])       // Same
         {
            valCount += 1;                                  // Tally
         }
      }
      
      // Add value count to value counts
      valCounts.push(valCount);
   }
   
   // Determine maximum count
   var maxCount = Math.max.apply(null, valCounts);

   // 
   
   // Output pixels to canvas
   // context.putImageData(picPixels, 0, 0);
}