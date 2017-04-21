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
         // What is the most often occuring colour value anyway? It seems to be
         // a grey. Is it the spaces in-between the text? I would have thought
         // that because the colour values vary, that it would possibly be 
         // the text itself?
         // Will need to institute objective tests using numbers.
         // Possibly output the most colour value then enter it into a website
         // that shows what it looks like.
         bwThreshold = mostColVal(outCanvasElem);
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
         // Note: may need to use different values to
         // unify the brightness for different lighting conditions
         // Note: the midpoint between the maximum and minimum colour values
         // could be a good threshold. 
         // Note: probably going to need to test all the different values.
         // Arrange them in a table of some sort.
         // Note: midpoint/median? would represent the middle of the black/white 
         // transition. Useful for unifying the brightness when light is on
         // one side of the paper
         var brightThresh = 200;
         var brightThreshOffset = 0;
         var incBy = 5;
         var decBy = 0;
         uniBright(outCanvasElem, brightThresh, brightThreshOffset, incBy, decBy);
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