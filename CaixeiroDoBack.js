//Código base: https://acervolima.com/implementacao-do-problema-do-caixeiro-viajante-usando-backtracking/

var fs = require('fs');
// Javascript implementation of the approach
var ans = 1000000000;
// Boolean array to check if a node
// has been visited or not
var v = Array(n).fill(false);
// Mark 0th node as visited
v[0] = true;

// Function to find the minimum weight Hamiltonian Cycle
function tsp(graph, currPos, n, count, cost)
{

    // If last node is reached and it has a link
    // to the starting node i.e the source then
    // keep the minimum value out of the total cost
    // of traversal and "ans"
    // Finally return to check for more possible values
    if (count == n && graph[currPos][0]) {
        ans = Math.min(ans, cost + graph[currPos][0]);
        return;
    }

    // BACKTRACKING STEP
    // Loop to traverse the adjacency list
    // of currPos node and increasing the count
    // by 1 and cost by graph[currPos][i] value
    for (var i = 0; i < n; i++) {
        if (!v[i] && graph[currPos][i]) {

            // Mark as visited
            v[i] = true;
            tsp(graph, i, n, count + 1,
                cost + graph[currPos][i]);

            // Mark ith node as unvisited
            v[i] = false;
        }
    }
};

// Driver code
// n is the number of nodes i.e. V
var n = 4;
var graph = [ [0, 10, 15, 20,], [10, 0, 35, 25], [15, 35, 0, 30], [20, 25, 30, 0]]

//leitura do arquivo com o grafo
try {
  const data = fs.readFileSync('gafo2.txt', 'utf8');
  let text = (data.split(',').map(element => Number(element.trim())));
  n = Number(text[0]);
  text.shift();
  graph = [];
  let tempArray = []
  let counter = 0;
  text.forEach((item) => {
    tempArray.push(item);
    counter++
    if(counter == n){
      graph.push(tempArray);
      tempArray = [];
      counter = 0
    }
  });
  console.log('\nUsando o seguinte grafo:\n', graph);
} catch (err) {
  console.error(err.message, '\n', 'arquivo de texto não encontrado, usando o seguinte grafo: ', graph, '\n');
} finally{
  // Find the minimum weight Hamiltonian Cycle
  console.time("Execução");
  tsp(graph, 0, n, 1, 0);
  console.timeEnd("Execução");
  // ans is the minimum weight Hamiltonian Cycle
  if(ans == 1000000000){
    console.log('não há caminho', ans);
  } else {
    console.log('o menor caminho é de:', ans);
  }
}
