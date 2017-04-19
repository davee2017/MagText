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