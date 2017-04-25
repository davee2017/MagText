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

function sharpPic(picCanvas, factor)
{
   console.log("Arguments:");
   console.log("Factor ", factor);
   
   // Copy original canvas
   var cpyCanvas = picCanvas;
   
   // Get copy canvas 2D context
   var cpyContext = cpyCanvas.getContext('2d');
   
   // Get pixels from copy canvas
   var cpyPixels = cpyContext.getImageData(0, 0, cpyCanvas.width, cpyCanvas.height);
   
   // Extract monochrome pixel values from copy canvas
   var redVal = -1;
   var cpyPxVals = [];
   for (var redPos = 0; redPos < cpyPixels.data.length; redPos += 4)
   {
      // Get pixel red value
      redVal = cpyPixels.data[redPos];
      cpyPxVals.push(redVal); 
   }
   console.log("Pixel values: ");
   var row = -1;
   var col = -1;
   for (var pos = 0; pos < cpyPxVals.length; pos += 1)     // Debug
   {
      row = Math.floor( (pos / cpyCanvas.width) + 1);
      col = (pos % cpyCanvas.width) + 1;
      console.log("Pos ", pos, " Row ", row, "Col ", col, "Val ", 
                 cpyPxVals[pos]);
   }
   
   // Set first row of copy canvas pixels to black
   for (var pos = 0; pos <= (cpyCanvas.width - 1); pos += 1)
   {
      cpyPxVals[pos] = 0;
   }
   console.log("After row 1 black: ");
   var row = -1;
   var col = -1;
   for (var pos = 0; pos < cpyPxVals.length; pos += 1)     // Debug
   {
      row = Math.floor( (pos / cpyCanvas.width) + 1);
      col = (pos % cpyCanvas.width) + 1;
      console.log("Pos ", pos, " Row ", row, "Col ", col, "Val ", 
                 cpyPxVals[pos]);
   }
}