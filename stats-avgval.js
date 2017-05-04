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

// Average value
// Calculates the average of a list of values.

function avgVal(vals)
{
   // Sum values
   var valSum = vals.reduce                 // Sum
   (
      function(total, curVal)                      // Running total
                                                   // Current value
      {
         // Tally current value to running total
         return total + curVal;
      }
   )
   
   // Determine amount of values
   var valAmt = vals.length;
   
   // Calculate average
   var avgVal = valSum/valAmt;               // Raw
   
   // Round result to nearest whole number
   avgVal = Math.round(avgVal);
   
   return avgVal;
}