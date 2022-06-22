//Código base: https://github.com/Mekrache/Traveling-salesman-problem-exact-solution-javascript
var fs = require('fs')

//======================================================================================
var comb;
var matrix_costs = [[0,4,2,1,3],
                    [4,0,7,3,1],
                    [2,7,0,3,0],
                    [1,3,3,0,4],
                    [3,1,0,4,0]];
var nbNodes = 5;
var costs;
var minCost = 0;
var indMinCost;

try {
  const data = fs.readFileSync('grafo4x80.txt', 'utf8');
  let text = (data.split(',').map(element => Number(element.trim())));
  nbNodes = Number(text[0]);
  text.shift();
  matrix_costs = [];
  let tempArray = []
  let counter = 0;
  text.forEach((item) => {
    tempArray.push(item);
    counter++
    if(counter == nbNodes){
      matrix_costs.push(tempArray);
      tempArray = [];
      counter = 0
    }
  });
  console.log('\nUsando o seguinte grafo:\n', matrix_costs);
} catch (err) {
  console.error(err.message, '\n', 'arquivo de texto não encontrado, usando o seguinte grafo: ', matrix_costs, '\n');
}

//======================================================================================
function combinations(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }
    return results;
  }
  return permute(inputArr);
}

//=======================================================================================
function initialize(nbN){
  var t = new Array();
  comb = new Array();

  for (var i = 1; i < nbN; i++) {
    t[i-1] = i;
  }
 comb = combinations(t);
}

//=======================================================================================
function calculateCosts(nbN){
  costs = new Array();
  path = {};
  for (var i = 0; i < comb.length ; i++) {
    costs[i] = matrix_costs[0][comb[i][0]];
    for (var j = 1; j < nbN-1; j++) {
      costs[i] += matrix_costs[comb[i][j-1]][comb[i][j]];
    }
    path[i]={}
    path[i].caminho = matrix_costs[comb[i][nbN-2]];
    costs[i] += matrix_costs[comb[i][nbN-2]][0];
    path[i].custo = costs[i];
  }
  console.log('custo->', matrix_costs, 'path -> ',path, 'comb -> ',comb, );
}

//=======================================================================================
function minCosts() {
  indMinCost = 0;
  minCost = costs[0];
  for (var i = 0; i < costs.length; i++) {
    if (costs[i] < minCost) {
      minCost = costs[i] ;
      indMinCost = i;
    }
  }
}

//=======================================================================================
function resolveExponential() {
  var t0 = performance.now();
  console.time("Execução");

  if (matrix_costs.length == 0 || nbNodes == 0) alert("number nodes = 0, or matrix_costs empty");
  else {
    initialize(nbNodes);
    calculateCosts(nbNodes);
    minCosts();
    console.log("Custo Minimo : ");
    console.log(minCost);
    console.log("exp"+(performance.now()-t0));
  }
}
resolveExponential();
console.timeEnd("Execução");
