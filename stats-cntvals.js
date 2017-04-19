// Count values
// Counts the values in a list.
// Accepts three arguments:
// 1. List of random numeric values
// 2. List of unique values in the random list
// Returns an array of numeric values representing the 
// amount of each value in the list of unique values.
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