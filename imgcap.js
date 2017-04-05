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
// Capture image
// Grabs an image from the webcam

function captureImage(outCanvasElem) 
{  
   // Get 2D context of canvas
   var outContext = outCanvasElem.getContext('2d');             
   
   // Draw webcam image on canvas
   outContext.drawImage(video, 0, 0, outCanvasElem.width, outCanvasElem.height);          
}