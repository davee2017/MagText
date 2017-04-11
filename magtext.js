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

// MagText "Class"
// Supplies an interface for a webcam to function as a text readability enhancer.

// View environment
// Displays the environment on the screen.
function viewEnv(videoElem)
{
   if ( chkCapCompat() && attachCam(videoElem) )
   {                             // Browser compatible and webcam attached
      startCamStream();
   }
}

// Capture environment
// Takes a picture of the current environment
// Inputs envronment video and a canvas. Draws the 
// video on the canvas.
function captureEnv(videoElem, outCanvasElem)
{
   // Pause the current video
   stopCamStream();
   
   // Take a picture of the current video
   takeVidPic(videoElem, outCanvasElem);
}