

/** DFS
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    // 记录图的后序遍历结果
    let res = [] ; 
    // 记录是否有环
    let hasCycle = false ;
    let visited = [], onPath = [] ;
    const graph = buildGraph(numCourses, prerequisites) ;
    // 遍历图
    graph.forEach(function(value, key) {
        traverse(graph, key) ;
    }) ;
    // 有环图无法进行拓扑排序
    if (hasCycle) {
        return [] ;
    }
    // 后序遍历的倒序 即拓扑排序的结果
    res.reverse() ;
    return res ;
    function traverse(graph, cur) {
        if (onPath[cur]) //有环
            hasCycle = true; 
        // note：终止条件：有环或者节点已经遍历过了他也不会再进入该节点
        if (visited[cur] || hasCycle)
            return ;
        visited[cur] = true ;
        onPath[cur] = true ;
        // 遍历 cur 的相邻节点
        graph[cur].forEach((val, i) => {
            traverse(graph,val) ;
        }) ;
        res.push(cur) ;
        onPath[cur] = false ;
    }
    function buildGraph (numCourses, prerequisites) {
        const rst = new Array(numCourses).fill(undefined) ;
        rst.forEach((val, i) => {
            rst[i] = [] ;
        }) ;
        prerequisites.forEach((val, i) => {
            let from = val[1], to = val[0] ;
            rst[from].push(to) ;
        }) ;
        return rst ;
    }
};

var bfs = function (numCourses, prerequisites) {
    let graph = buildGraph(numCourses, prerequisites) ;
    // 初始化节点的入度列表
    let inDegree = new Array(numCourses).fill(0) ;
    prerequisites.forEach((val, i) => {
        let from = val[1], to = val[0] ;
        inDegree[to]++ ;
    }) ;
    // 根据入度初始化队列中的节点
    let que = [] ;
    inDegree.forEach((val, i) => {
        if (val === 0)
            que.push(i) ;
    }) ;
    // 记录拓扑排序的结果
    let res = [] ;
    // 记录遍历节点的顺序（索引）即遍历完所有节点后 count=节点个数
    let count = 0 ;
    // bfs
    while (que.length > 0) {
        let cur = que.shift() ;
        // 弹出节点的顺序即为拓扑排序结果
        res.push(cur) ;
        count++ ;
        graph[cur].forEach((val, i) =>{
            inDegree[val]-- ;
            if (inDegree[val] === 0)
                que.push(val) ;
        }) ;
    }
    if (count !== numCourses)
        return [] ;
    return res ;
    function buildGraph (numCourses, prerequisites) {
        const res = new Array(numCourses).fill(undefined) ;
        res.forEach((val, i) => {
            res[i] = [] ;
        }) ;
        for (let item of prerequisites) {
            let from = item[1], to = item[0] ;
            res[from].push(to) ;
        }
        return res ;
    }
}

let numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]] ;
// 输出: [0,1,2,3] or [0,2,1,3]

console.log(findOrder(numCourses, prerequisites));
console.log(
    bfs(numCourses, prerequisites)
);
