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
   
   // Get monochrome pixel values
   var redVal = -1;
   var pixelVals = [];
   for (var redPos = 0; redPos < picPixels.data.length; redPos += 4)
   {
      // Get pixel red value
      redVal = picPixels.data[redPos];
      pixelVals.push(redVal); 
   }

   // Determine unique pixel values
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
      while (unique && (uniqPos < uniqVals.length) );       // Unique and 
                                                            // and not at unique
                                                            // list end
                                                            
      if (unique)                                           // Different to all
      {
         // Add to unique list
         uniqVals.push(pixelVals[pixelPos]);
      }
      
      // Reset unique indicator for next pixel value
      unique = true;
   }
   
   //console.log("Unique values: ");
   //for (var pos = 0; pos < uniqVals.length; pos += 1)
   //{
      //console.log(uniqVals[pos]);
   //}
   
   // Output pixels to canvas
   // context.putImageData(picPixels, 0, 0);
}