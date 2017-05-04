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

// Median value
// Calculates the median of a list of values.
// Accepts an array of numbers in any order.

function medVal(vals)
{
   console.log("Values: ");
   for (var pos = 0; pos < vals.length; pos += 1)
   {
      console.log("Pos ", pos, "Val ", vals[pos]);
   }
   
   // Sort values
   vals.sort
   (
      function(val1, val2)
      {
         return val1 - val2;           // Negative - value 1 before value 2
                                       // (ascending)
                                       // Positive - value 2 before value 1
                                       // (descending)
      }
   );
   console.log("Sorted values: ");
   for (var pos = 0; pos < vals.length; pos += 1)
   {
      console.log("Pos ", pos, "Val ", vals[pos]);
   }
   
}