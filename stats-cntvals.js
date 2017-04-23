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

// Count values
// Counts the unique values in a list.
// Accepts three arguments:
// 1. List of random numeric values
// 2. List of unique values in the random list
// Returns an array of numeric values representing the 
// amount of each value in the list of unique values.

// Note: might rename this to cntUniqVals since cntVals could imply
// counting all of the values in the list.
function cntVals(vals, uniqVals)
{
   var valCnts = [];
   var pos = -1;
   for (var uniqPos = 0; uniqPos < uniqVals.length; uniqPos += 1)
   {                             // For given unique value
      var valCnt = 0;
      for (var pos = 0; pos < vals.length; pos += 1)
      {                          // For given value
         if (uniqVals[uniqPos] == vals[pos])    // Same
         {
            valCnt += 1;                        // Tally
         }
      }
      
      // Add value count to value counts
      valCnts.push(valCnt);
   }
   
   // Return value counts
   return valCnts;
}