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

// Copy canvas
//
// Copies the pixels in one canvas to another.
// Accepts:
// 1. Source canvas.
// 2. Destination canvas.

function cpyCanv(srcCanvasId, destCanvasId)
{
   // Get pixels from source canvas
   var srcCanvas = document.getElementById(srcCanvasId);
   var srcContext = srcCanvas.getContext('2d');
   var srcPixels = srcContext.getImageData(0, 0, srcCanvas.width,
                   srcCanvas.height);
   
   // Draw pixels on destination canvas
   var destCanvas = null;
   destCanvas = document.getElementById(destCanvasId);
   var destContext = null;
   destContext = destCanvas.getContext('2d');
   destContext.putImageData(srcPixels, 0, 0);
}