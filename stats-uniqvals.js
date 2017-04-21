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

// Unique values
// Determines the unique values in a list of random values.
// Accepts an array of random numeric values.
function uniqVals(vals)
{
   var uniqVals = [];                 // Initialise unique value list
   uniqVals[0] = vals[0];             // First always unique
   var unique = true;                 // Assume unique initially
   // For each pixel value
   for (var pos = 1; pos < vals.length; pos += 1)
   {
      // Compare value to all values in unique list
      var uniqPos = -1;
      do 
      {
         // Go to next value in unique list
         uniqPos++;                       
         
         if ( vals[pos] == uniqVals[uniqPos] )              // Pixel value same 
                                                            // as unique list 
                                                            // value
         {
            unique = false;                                 // Not unique
         }
      } 
      while ( unique && (uniqPos < uniqVals.length) );      // Unique and 
                                                            // and not at unique
                                                            // list end
                                                            
      if (unique)                                           // Different to all
      {
         // Add to unique list
         uniqVals.push( vals[pos] );
      }
      
      // Reset unique indicator for next pixel value
      unique = true;
   }
   
   // Return unique values
   return (uniqVals);
}