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
   
   // Capture environment after 6 seconds
   window.setTimeout
   (
      function()
      {
         captureEnv(videoElem, outCanvasElem);
      },
      7000
   );
   // Note: Part of box content. Capture video can be done 
   // seperate?
   
   // Monochrome picture after 8 seconds
   window.setTimeout
   (
      function()
      {
         monoPic(outCanvasElem);
      },
      8000
   );

   // Invert picture after 12 seconds
   window.setTimeout
   (
      function()
      {
         invPic(outCanvasElem);
      },
      12000
   );
   
   // Calculate black/white threshold after 16 seconds
   var bwThreshold = -1;
   window.setTimeout
   (
      function()
      {
         bwThreshold = mostColVal(outCanvasElem);
         console.log("Most colour value (bw threshold): ", bwThreshold);
      },
      16000
   );
   
   // Set threshold offset after 20 seconds
   var bwThreshOffset = -1;
   window.setTimeout
   (
      function()
      {
         bwThreshOffset = 30;
      },
      20000
   )
   
   // Unify brightness after 21 seconds
   window.setTimeout
   (
      function()
      {
         uniBright(outCanvasElem, bwThreshold, bwThreshOffset, 5, 0);
      },
      21000
   );
   
   // Binary picture after 24 seconds
   window.setTimeout
   (
      function()
      {
         binPic(outCanvasElem, bwThreshold, bwThreshOffset);
      },
      26000
   );
}