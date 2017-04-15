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
   // Debug mode?
   
   // Get video element
   var videoElem = document.getElementById('video');
      
   // Get output canvas
   var outCanvasElem = document.getElementById('outCanvas'); 
     
   // View environment
   viewEnv(videoElem);
   
   // Capture environment after 2 seconds
   window.setTimeout
   (
      function()
      {
         captureEnv(videoElem, outCanvasElem);
      },
      2000
   );
   // Note: Part of box content. Capture video can be done 
   // seperate?
   
   // Monochrome picture after 4 seconds
   window.setTimeout
   (
      function()
      {
         monoPic(outCanvasElem);
      },
      4000
   );

   // Invert picture after 6 seconds
   window.setTimeout
   (
      function()
      {
         invPic(outCanvasElem);
      },
      6000
   );
   
   // Binary picture after 8 seconds
   window.setTimeout
   (
      function()
      {
         binPic(outCanvasElem);
      },
      8000
   );
}