//Código base: https://www.geeksforgeeks.org/travelling-salesman-problem-greedy-approach/

class TSPGreedy
{
    // Function to find the minimum
    // cost path for all the paths
    static findMinRoute(tsp)
    {
        var sum = 0;
        var counter = 0;
        var j = 0;
        var i = 0;
        var min = Number.MAX_VALUE;
        var visitedRouteList = new Array();
        // Starting from the 0th indexed
        // city i.e., the first city
        (visitedRouteList.push(0) > 0);
        var route = Array(tsp.length).fill(0);
        // Traverse the adjacency
        // matrix tsp[][]
        while (i < tsp.length && j < tsp[i].length)
        {
            // Corner of the Matrix
            if (counter >= tsp[i].length - 1)
            {
                break;
            }
            // If this path is unvisited then
            // and if the cost is less then
            // update the cost
            if (j != i && !((visitedRouteList.indexOf(j) > -1)))
            {
                if (tsp[i][j] < min)
                {
                    min = tsp[i][j];
                    route[counter] = j + 1;
                }
            }
            j++;
            // Check all paths from the
            // ith indexed city
            if (j == tsp[i].length)
            {
                sum += min;
                min = Number.MAX_VALUE;
                (visitedRouteList.push(route[counter] - 1) > 0);
                j = 0;
                i = route[counter] - 1;
                counter++;
            }
        }
        // Update the ending city in array
        // from city which was last visited
        i = route[counter - 1] - 1;
        for (j = 0; j < tsp.length; j++)
        {
            if ((i != j) && tsp[i][j] < min)
            {
                min = tsp[i][j];
                route[counter] = j + 1;
            }
        }
        sum += min;
        // Started from the node where
        // we finished as well.
        console.log("Minimum Cost is : ");
        console.log(sum);
    }

    // Driver Code
    static main(args)
    {
        // Input Matrix
        var tsp = [[-1, 10, 15, 20], [10, -1, 35, 25], [15, 35, -1, 30], [20, 25, 30, -1]];
        // Function Call
        console.time("Execução");
        TSPGreedy.findMinRoute(tsp);
        console.timeEnd("Execução");

    }
}
TSPGreedy.main([]);
