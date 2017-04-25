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

function sharpPic(origCanvas, factor)
{
   console.log("Arguments:");
   console.log("Factor ", factor);
   
   // Get original canvas 2D context
   var origContext = origCanvas.getContext('2d');
   
   // Get pixels from original canvas
   var origPixels = origContext.getImageData(0, 0, origCanvas.width, origCanvas.height);
   
   // Extract monochrome pixel values from original canvas
   var redVal = -1;
   var origPxVals = [];
   for (var redPos = 0; redPos < origPixels.data.length; redPos += 4)
   {
      // Get pixel red value
      redVal = origPixels.data[redPos];
      origPxVals.push(redVal); 
   }
   console.log("Original pixel values: ");
   var row = -1;
   var col = -1;
   for (var pos = 0; pos < origPxVals.length; pos += 1)     // Debug
   {
      row = Math.floor( (pos / origCanvas.width) + 1);
      col = (pos % origCanvas.width) + 1;
      console.log("Pos ", pos, " Row ", row, "Col ", col, "Val ", 
                 origPxVals[pos]);
   }
   
   // Set first row of original canvas pixels to black
   for (var pos = 0; pos <= (origCanvas.width - 1); pos += 1)
   {
      origPxVals[pos] = 0;
   }
   console.log("After row 1 black: ");
   var row = -1;
   var col = -1;
   for (var pos = 0; pos < origPxVals.length; pos += 1)     // Debug
   {
      row = Math.floor( (pos / origCanvas.width) + 1);
      col = (pos % origCanvas.width) + 1;
      console.log("Pos ", pos, " Row ", row, "Col ", col, "Val ", 
                 origPxVals[pos]);
   }
   
   // Set last row of original canvas pixels to black
   //var endInd = (cpyCanvas.width - 1);                     // End index
   //var startPos = endInd;                                  // Start at end index
   //var endPos = endInd - (cpyCanvas.width - 1);            // End at end index -
                                                           // ( width - 1 )
   //for (var pos = startPos; endPos; pos -= 1)              // Going backwards
   //{
   //   cpyPxVals[pos] = 0;
   //}
   //console.log("After last row black: ");
   //var row = -1;
   //var col = -1;
   //for (var pos = 0; pos < cpyPxVals.length; pos += 1)     // Debug
   //{
   //   row = Math.floor( (pos / cpyCanvas.width) + 1);
   //   col = (pos % cpyCanvas.width) + 1;
   //   console.log("Pos ", pos, " Row ", row, "Col ", col, "Val ", 
   //              cpyPxVals[pos]);
   //}
   // Note: could be abstracted to drawHPxLine(picCanvas, row, colour) & 
   // drawVPxLine(picCanvas, col, colour) later. These would be called by
   // adjContent() (means sharpPic() can exist/ be called on own).
   
   // Copy original canvas
   // var cpyCanvas = origCanvas;
   
   
}