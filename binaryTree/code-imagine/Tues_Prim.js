class PriorityQueue {
    constructor(sortMode = (a, b) => a - b) {
        this.sortMode = sortMode;
        this.arr = [];
    }
    // poll offer isEmpty
    push(val) {
        this.arr.push(val);
        this.arr.sort(this.sortMode);
    }

    shift() {
        return this.arr.shift();
        // this.arr.sort(this.sortMode) ;
    }

    isEmpty() {
        return this.arr.length === 0;
    }

}

class Prim {
    constructor(graph) {
        // 核心数据结构，存储「横切边」的优先级队列
        this.pq = null ;
        // 类似 visited 数组的作用，记录哪些节点已经成为最小生成树的一部分
        this.inMST = null ;
        // 记录最小生成树的权重和
        this.weightSum = 0 ;
        // graph 是用邻接表表示的一幅图，
        // graph[s] 记录节点 s 所有相邻的边，
        // 三元组 int[]{from, to, weight} 表示一条边
        this.graph = graph ;

        // 图中有 n 个节点
        let n = graph.length ;
        this.pq = new PriorityQueue((a,b) => a[2] - b[2]);
        this.inMST = new Array(n).fill(false) ;
        // // 随便从一个点开始切分都可以，我们不妨从节点 0 开始
        // this.inMST[0] = true ;
        // this.cut(1) ;
        // 从节点 1 开始
        this.inMST[1] = true ;
        this.cut(1) ;
        // 不断进行切分，向最小生成树中添加边
        while (!this.pq.isEmpty()) {
            let edge = this.pq.shift() ;
            let to = edge[1] ;
            let weight = edge[2] ;
            // 节点 to 已经在最小生成树中，跳过
            // 否则这条边会产生环
            if (this.inMST[to]) {
                continue ;
            }
            // 将边 edge 加入最小生成树
            this.inMST[to] = true ;
            this.weightSum += weight ;
            // 节点 to 加入后，进行新一轮切分，会产生更多横切边
            this.cut(to) ;
        }
    }

    // 将 s 的横切边加入优先队列
    cut(s) {
        // 遍历 s 的邻边
        for (let i = 0; i < this.graph[s].length; i++) {
            let edge = this.graph[s][i] ;
            let to = edge[1] ;
            // 相邻接点 to 已经在最小生成树中，跳过
            // 否则这条边会产生环
            if (this.inMST[to])
                continue ;
            // 加入横切边队列
            this.pq.push(edge) ;
        }
    }

    // 最小生成树的权重和
    getWeightSum() {
        return this.weightSum ;
    }

    // 判断最小生成树是否包含图中的所有节点
    allConnected() {
        for (let i in this.inMST) 
            if (!this.inMST[i] && i != 0) return false ;
        return true ; 
    }
}

function minCostConnectPoints (points) {
    let graph = buildGraph(points) ;
    let prim = new Prim(graph) ;
    return prim.allConnected() ? prim.getWeightSum() : -1 ;
    function buildGraph (points) {
        let graph = new Array(points.length).fill(0);
        for (let i in graph) graph[i] = [];
        // 生成所有边及权重
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                let xi = points[i][0], yi = points[i][1];
                let xj = points[j][0], yj = points[j][1];
                let weight = Math.abs(xj - xi) + Math.abs(yj - yi);
                graph[i].push([i, j, weight]);
                graph[j].push([j, i, weight]);
            }
        }
        return graph ;
    }
}

// let points = [[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]
// minCostConnectPoints(points) ;

function minimumCost (n, connections) {
    function buildGraph(n, connections) {
        let graph = new Array(n + 1).fill(0);
        for (let i in graph)
            graph[i] = [];
        for (let i = 0; i < connections.length; i++) {
            let edge = connections[i];
            let from = edge[0];
            let to = edge[1];
            let weight = edge[2];
            graph[from].push([from, to, weight]);
            graph[to].push([to, from, weight]);
        }
        // console.log(graph);
        return graph;
    }
    let graph = buildGraph(N, connections);
    let inst = new Prim(graph);
    // console.log(inst.getWeightSum(), inst.allConnected(), inst.inMST);
    return inst.allConnected() ? inst.getWeightSum() : -1 ;
}

let N = 4, connections = [[1, 2, 3], [3, 4, 4]]
// Output: -1
N = 3, connections = [[1, 2, 5], [1, 3, 6], [2, 3, 1]]
// Output: 6
let res = minimumCost(N, connections) ;
console.log(res);



