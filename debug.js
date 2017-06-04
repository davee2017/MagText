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


// Show pixel colour values
// Displays canvas pixel red, green and blue colour values at the console.
// Accepts a canvas.
// Outputs pixel number, red value, green value and blue value.

function showPxColVals(canvas)
{  
   // Get pixels
   var context = null;
   context = canvas.getContext('2d');
   var pixels = null;
   pixels = context.getImageData(0, 0, canvas.width,
                   canvas.height);
   
   // Display pixel values at console
   for (var redPos = 0; redPos < pixels.data.length; redPos += 4)
   {
      console.log("Pixel " + ((redPos/4) + 1));
      console.log("R:" + pixels.data[redPos]);
      console.log("G:" + pixels.data[redPos + 1]);
      console.log("B:" + pixels.data[redPos + 2]);
   }
}