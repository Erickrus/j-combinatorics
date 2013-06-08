var Expressions = [];
var indexes = Combinatorics.getPermutations(4);
var inputs = [5,9,3,1];
var opArray = ["+","-","*","/"];
var values = ["v1", "v2", "v3", "v4"];
var opTrees = [];
var currentExpressionValue = "";

function removeDuplicates(arr){
   var result = new Array();
   for (var i=0;i<arr.length;i++) {
     var s = arr[i];
     var found = false;
     for (var j=0;j<result.length;j++) {
        var ss = result[j];
        if (ss == s) {
           found = true;
           break;
        }
     }
     if (!found) {
       result.push(s);
     }
   }
   return result;
}

//recursively build the trees (with duplicates)
function getOpTrees(vParam) {
   var result = [];
    if (vParam.length == 2) {
       result = ["("+[vParam[0]+"#"+vParam[1]]+")"];
       return result;
    } else {
       for (var i=0;i<vParam.length-1;i++) {
          var s = [];
          for (var j=0;j<vParam.length;j++) {
            if (i==j) {
               s.push("("+vParam[j] +"#" + vParam[j+1]+")");
               j++;
            } else {
               s.push(vParam[j]);
            }
          }
          
          var temp = getOpTrees(s);
          for (var j=0;j<temp.length;j++) {
             result.push(temp[j]);
          }
       }
    }
    return result;
}

//initialize all the expression with + - * /
function initExpression() {
  var r = removeDuplicates(getOpTrees(values));
  for (var i=0;i<r.length;i++) {
    r[i] = r[i].replace("#"," op1 ");
    r[i] = r[i].replace("#"," op2 ");
  r[i] = r[i].replace("#"," op3 ");
  }
  opTrees = r;

  var result = [];
  for (var a=0;a<opTrees.length;a++) {
     for (var i=0;i<opArray.length;i++) {
        for (var j=0;j<opArray.length;j++) {
           for (var k=0;k<opArray.length;k++) {
              var op1 = opArray[i];
              var op2 = opArray[j];
              var op3 = opArray[k];
              var ops = opTrees[a];
              ops = ops.replace(" op1 ",op1);
              ops = ops.replace(" op2 ",op2);
              ops = ops.replace(" op3 ",op3);
              result.push(ops);
           }
        }
     }
  }
  return result;
}



function evalOnce(expressionId, values) {
   var currentExpression = Expressions[expressionId];
   for (var i=1;i<=4;i++) {
      var s = "v" + i;
      currentExpression = currentExpression.replace(s, values[i-1]);
   }
   var result = eval(currentExpression);
   currentExpressionValue = currentExpression;
   return result;
}


function evalAll() {
   var result = [];
   for (var i=0;i<indexes.length;i++) {
      var currentIndex = indexes[i];
      var param = [inputs[currentIndex[0]-1],
                   inputs[currentIndex[1]-1],
                   inputs[currentIndex[2]-1],
                   inputs[currentIndex[3]-1]];
      for (var j=0;j<Expressions.length;j++) {
      	var tmpResult = evalOnce(j, param);
        if ( Math.round(tmpResult*100) == 2400 ) {
           result.push(currentExpressionValue);
        }
      }
   }
   result = removeDuplicates(result);
   if (result.length ==0) result.push("no solution!");
   return result;
}

Expressions = initExpression();
