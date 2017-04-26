/* Adapted convoluted function from:
 *
 *  Filterous.js - Simple Photo Filters using Canvas 
 *  https://github.com/girliemac/Filterous/
 *  Tomomi Imura (@girlie_mac) - http://girliemac.com
 *  License under MIT
 *  Updated on: March 2, 2014
 */

/* The MIT License (MIT)

Copyright (c) 2014 Tomomi Imura

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function sharpPic(origCanvas, factor)
{
   // Get canvas 2D context
   var origContext = origCanvas.getContext('2d');
   
   // Get canvas pixels
   var pixels = origContext.getImageData(0, 0, origCanvas.width, 
                                         origCanvas.height);
   
   // Set weights
   var weights = [ 0, -1 *factor, 0,                  // Sharpening kernel
                   -1*factor, 5*factor, -1*factor,
                   0, -1*factor, 0 ];
   
   // Set transparency
   var opaque = false;                                // No transparency
   
   // Perform sharpening convolution
   var side = Math.round(Math.sqrt(weights.length));
   var halfSide = (side/2) >>> 0;
   
   var src = pixels.data;
   var sw = pixels.width;
   var sh = pixels.height;
   
   var w = sw;
   var h = sh;
   var cpyCanvas = document.createElement('canvas');  // Argument is type,
                                                      // not name
   var cpyCanvasContext = cpyCanvas.getContext('2d');
   var output = cpyCanvasContext.createImageData(origCanvas.width, 
                                                 origCanvas.height);
   var dst = output.data;
   
   var alphaFactor = opaque ? 1 : 0;
   
   for (var y = 0; y < h; y++) 
   {
      for (var x = 0; x < w; x++) 
      {
         var sy = y;
         var sx = x;
         var dstOff = (y * w + x)*4;
         var r = 0, g = 0, b = 0, a = 0;
         for (var cy = 0; cy < side; cy++) 
         {
            for (var cx = 0; cx < side; cx++) 
            {
               var scy = Math.min(sh - 1, Math.max(0, sy + cy - halfSide));
               var scx = Math.min(sw - 1, Math.max(0, sx + cx - halfSide));
               var srcOff = (scy * sw + scx) * 4;
               var wt = weights[cy * side + cx];
               r += src[srcOff] * wt;
               g += src[srcOff + 1] * wt;
               b += src[srcOff + 2] * wt;
               a += src[srcOff + 3] * wt;
             }
         }
       
         dst[dstOff] = r;
         dst[dstOff + 1] = g;
         dst[dstOff + 2] = b;
         dst[dstOff + 3] = a + alphaFactor * (255 - a);
      }
   }
	
   // Output copied canvas pixels to original canvas
   origContext.putImageData(output, 0, 0);
}