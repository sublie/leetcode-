

// 给你一个由 n 个节点（下标从 0 开始）组成的无向加权图，该图由一个描述边的列表组成，
// 其中 edges[i] = [a, b] 表示连接节点 a 和 b 的一条无向边，且该边遍历成功的概率为 succProb[i] 。
var maxProbability = function (n, edges, succProb, start, end) {
    // 将求概率最大问题转换为求概率最小问题
    succProb.forEach((val, i) => {
        succProb[i] = 1 - val;
    });
    let graph = getGraph(n, edges, succProb);
    let minProb = bfs(graph, start, end);
    return minProb;
    function bfs(graph, start, end) {
        class OrderedArray {
            constructor(comparator = (a, b) => a[1] - b[1]) {
                this.orderedArr = [];  //二维数组：child：[nodeVal, distToCurNode]
                this.comparator = comparator;
            }
            size() {
                return this.orderedArr.length ;
            }
            push(s) {
                this.orderedArr.push(s);
                this.orderedArr.sort(this.comparator);
                return this.orderedArr.length;
            }
            pop() {
                let item = this.orderedArr[0];
                this.orderedArr.splice(0, 1);
                return item;
            }
        }
        // 标记访问过的节点
        let visited = new Array(n).fill(0);
        // 记录最小的路径权重，你可以理解为 dp table
        // 定义：distTo[i] 的值就是节点 start 到达节点 i 的最小的路径权重
        // 求最小值，所以初始化为正无穷
        let distTo = new Array(n).fill(Number.MAX_SAFE_INTEGER);
        // base case，start 到 start 的最短距离就是 0
        distTo[start] = 0;
        // 定义一个以成功概率为顺序的数组 概率小的在前面
        let queue = new OrderedArray();
        // 从起点 start 开始进行 BFS
        queue.push([start, 0]);
        while (queue.size() > 0) {
            let [curNode, dist] = queue.pop();
            console.log(curNode);
            if (curNode === end)
                return dist ;
            if (visited[curNode]) //因为概率是正数 重复遍历绝对会更大
                continue ;
            visited[curNode] = true;
            // 已经有一条更短的路径到达 curNode 节点了
            if (dist > distTo[curNode]) // note：这里需要剪枝是因为入队时加入了更长的路径 就酱~~
                continue ;
            // 将相邻节点入队列
            for (const n of graph[curNode]) {
                let distToN = distTo[curNode] + n[1] ;
                console.log('distToN = ', distToN);
                console.log('distTo[curNode] = ', distTo[curNode]);
                // 看看从 curNode 达到 n 的距离是否会更短
                if (distToN < distTo[n[0]]) {
                    // 更新 dp table
                    distTo[n[0]] = distToN ;
                    queue.push([n[0], distToN]) ; 
                    console.log(queue.orderedArr);
                }
                // queue.push([n[0], distToN]) ;
            }
        }
        return distTo[end] === Number.MAX_SAFE_INTEGER ? 0 : distTo[end] ;
    }
    function getGraph(n, edges, succProb) {
        let graph = new Array(n).fill(0);
        graph.forEach((val, i) => {
            graph[i] = [];
        });
        // console.log(graph, edges);
        edges.forEach((item, index) => {
            // 无向图可以理解为双向
            let node = item[0],
                node2 = item[1];
            console.log(item, succProb[index]);
            graph[node].push([node2, succProb[index]]);
            graph[node2].push([node, succProb[index]]);
            console.log(graph);
        });
        return graph;
    }
};


var 
// n = 3, edges = [[0, 1], [1, 2], [0, 2]], succProb = [0.7, 0.9, 0.2], start = 0, end = 2 
    n = 3, edges = [[0, 1]], succProb = [0.5], start = 0, end = 2
let res = maxProbability(n, edges, succProb, start, end) ;
console.log(res);