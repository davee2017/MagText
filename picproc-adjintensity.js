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

// Adjust contrast
// Adjusts the contrast of canvas pixels within a certain colour value 
// range.
// Accepts:
// 1. Monochrome or colour picture canvas.
// 2. Minimum colour value of pixels.
// 3. Maximum colour value of pixels.
// 4. A numerical factor to increase (whole number) or decrease 
// (fractional number) contrast by.
// 5. A numerical amount to increase (positive) or decrease (negative) 
// brightness by.

function adjIntensity(inCanvas, outCanvas, minColVal, maxColVal, contFact, 
                      brightAmt)
{  
   var inContext = null;
   inContext = inCanvas.getContext('2d');
   var inPixels = null;
   inPixels = inContext.getImageData(0, 0, inCanvas.width,
                   inCanvas.height);
   
   // Adjust pixel values
   for (var redPos = 0; redPos < inPixels.data.length; redPos += 4)
   {
      // Determine average colour value
      var redVal = inPixels.data[redPos];
      var greenVal = inPixels.data[redPos + 1];
      var blueVal = inPixels.data[redPos + 2];
      var pxColVals = [redVal, greenVal, blueVal];
      var avg = avgVal(pxColVals);
      
      // Adjust pixel value
      if ( (avg >= minColVal) && (avg <= maxColVal) )  
      {                                             // In colour range
         // Adjust by specified contFact
         inPixels.data[redPos] = linearY(inPixels.data[redPos], contFact, 
                                         brightAmt);
         inPixels.data[redPos + 1] = linearY(inPixels.data[redPos + 1], 
                                             contFact, brightAmt);
         inPixels.data[redPos + 2] = linearY(inPixels.data[redPos + 2], 
                                             contFact, brightAmt);
      }
   }
   
   // Draw pixels on output canvas
   var outContext = null;
   outContext = outCanvas.getContext('2d');
   outContext.putImageData(inPixels, 0, 0);
}