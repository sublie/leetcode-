let {} = require('../buildTree')

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    const graph = buildGraph(numCourses, prerequisites) ;
    let visited = new Array(numCourses.length),
        onPath = [], 
        isCycle = false ;
    traverse(graph, 0) ;
    for (let i = 0; i < numCourses; i++) {
        // 遍历图中的所有节点
        traverse(graph, i);
    }
    // 只要没有循环依赖可以完成所有课程
    return !isCycle ;
    function traverse (graph, cur) {
        if (cur == 5) debugger;
        if (onPath[cur] === true)
            isCycle = true ;
        if (isCycle === true || visited[cur] === true )
            return ;
        visited[cur] = true ;
        // 开始遍历节点 cur
        onPath[cur] = true ;
        for (let i = 0; i < graph[cur].length; i++) {
            traverse(graph, graph[cur][i]) ;
        }
        // 节点 cur 遍历完成
        onPath[cur] = false ;
    }
    function buildGraph (numCourses, prerequisites) {
        const rst = new Array(numCourses).fill(undefined) ;
        // note：foreach 会跳过那些已删除或者未初始化的项
        rst.forEach((val, i) => { //数组初始化元素为 [] 表示相邻节点列表
            rst[i] = [] ;
        }) ;
        console.log(rst, numCourses);
        prerequisites.forEach((val, i) => {
            let from = val[0], to = val[1] ;
            rst[from].push(to) ;
        }) ;
        console.log(rst);
        return rst ;
    }
};

let
//  numCourses = 2, prerequisites = [[0,1]] ;
numCourses = 20, prerequisites = [[0,10],[3,18],[5,5],[6,11],[11,14],[13,1],[15,1],[17,4]]
console.log(
    canFinish(numCourses, prerequisites) 
);