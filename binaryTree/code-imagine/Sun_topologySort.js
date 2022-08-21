

/**
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
            // console.log(val);
        }) ;
        res.push(cur) ;
        console.log(cur);
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
        console.log(rst);
        return rst ;
    }
};

let numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]] ;
// 输出: [0,1,2,3] or [0,2,1,3]

console.log(findOrder(numCourses, prerequisites));
