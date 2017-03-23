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
function main()
{
   var width = 640;
   var height = 480;
   
   // Check compatibility
   console.log("Checking for webcam capture support....");        // Log process
   if (checkWebcamCompat())
   {   
      // Notify developer of compatibility
      console.log("Webcam capture supported by browser");
      
      // Attach camera
      attachCamera(width, height);
      
      // Capture image
      captureImage(width, height);
      // Note: Part of box content. Capture video can be done 
      // seperate?
   }
   else
   {
      // Notify user of incompatibility
      alert("Webcam capture not supported by your web browser");
   }
}