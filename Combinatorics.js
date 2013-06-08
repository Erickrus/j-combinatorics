var Combinatorics = {

   /*
      factorial: n!
      permutation: P(n,m) = n!/(n-m)!
      combination: C(n,m) = n!/(m!*(n-m)!)
   */

   factorialArray : new Array(),
   factorial : function(n) {
      // This implementation utilize the memo-izing technique to speed up the processing
      // In javascript, it only calculates from 0! - 170! (171! is out of range)
      var result = 1;
      var i = 1;
   
      //CASE 0 : n = 0
      if (n==0) return 1;

      //CASE 1 : n = 1
      if (this.factorialArray.length == 0) {
         i = 1;
         result = 1;
      } else {
      //CASE 2 : n already calculated, lookup the array
         if ( n <= this.factorialArray.length ) {
            return this.factorialArray[n-1];
         } else {
      //CASE 3 : n is partially calculated
            result = this.factorialArray[this.factorialArray.length-1];
            i = this.factorialArray.length+1;
         }
      }
      for (;i<=n;i++) {
         result *= i;
         if (this.factorialArray.length < i) {
            this.factorialArray.push(result);
         }
      }
      return result;
   },
   
   permutationCount : function (n, m) {
      return this.factorial(n) / this.factorial(n - m);
   },
   
   combinationCount : function (n, m) {
      return this.permutationCount(n, m) / this.factorial(m);
   },
   
   // Defines 2 aliases for both permutation and combination
   P : function (n, m) { return this.permutationCount(n, m); },
   C : function (n, m) { return this.combinationCount(n, m); },
   

   // Stirling's approximation formula for large factorials
   // Still, there's a limit to calculate over 170!
   // Prefer the implementation of factorial() with Memo-ization
   // http://en.wikipedia.org/wiki/Stirling's_approximation
   stirlingFactorial : function (n) {
      return Math.sqrt( 2 * Math.PI * n ) *
             Math.pow ( n / Math.E, n );
   },
      
   // Generate the combinations of n
   // indexed by 1 .. n
   getPermutations : function (n) {
      if (n == 1) {
        return new Array([1]);
      } else {
        var result = new Array();
        var lowResult = this.getPermutations(n-1);
        for (var i = 0;i<lowResult.length; i++) {
           for (var j=0;j<lowResult[i].length+1;j++) {
              var tempComb = [];
              tempComb = lowResult[i].slice();
              tempComb.splice(j, 0, n);
              result.push(tempComb);
           }          
        }
        return result;
      }
   },

   alertArray : function (s) {
      var result = "";
      for (var i=0;i<s.length;i++) {
         if (i==0) {
            result = s[i];
         } else {
            result += ", " + s[i];
         }
      }
      alert("[ " +result+" ]");
   },

   alertArrays : function(arr) {
      for (var i=0;i<arr.length;i++) {
         this.alertArray(arr[i]);
      }
   }
}
