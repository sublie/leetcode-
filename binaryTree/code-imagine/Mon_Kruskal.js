const { UF } = require('./Mon_uf')
// n = 5
// edges = [[0, 1], [0, 2], [0, 3], [1, 4]]
// 这些边构成的是一棵树，算法应该返回 true：

// 图片
// 但如果输入：

// n = 5
// edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]
// 形成的就不是树结构了，因为包含环, 算法应该返回 false .


function validateTree (n, edges) {
    let uf = new UF (n);
    for (let edge of edges) {
        let u = edge[0] ;
        let v = edge[1] ;
        if (uf.connected(u, v)) {
            return false;
        }
        uf.union(u, v) ;
    } 
    return uf.count === 1 ;
}


/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
    let n = points.length ;
    let uf = new UF (n) ;
    let edges = [] ;
    points.forEach(function (point, i) {
        for (let j = i +1; j < points.length; j++) {
            let difX = Math.abs(point[0] - points[j][0]) ;
            let difY = Math.abs(point[1] - points[j][1]) ;
            let dif = difX + difY; // 曼哈顿距离 ：|xi - xj| + |yi - yj|
            edges.push([i,j,dif]) ;
        }
    }) ;
    edges = edges.sort((a, b) => a[2] - b[2]) ;
    let mst = 0 ;
    let j = 0 ;
    for (let edge of edges) {
        j ++ ;
        let u = edge[0] ;
        let v = edge[1] ;
        if (uf.connected(u,v))
            continue ;
        uf.union(u,v) ;
        mst += edge[2] ;
    }
    return mst ;
};
let points = [[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]
points = [[3, 12], [-2, 5], [-4, 1]]
console.log(minCostConnectPoints(points));
// Output: 18

// let n = 5, edges = [[0, 1], [0, 2], [0, 3], [1, 4]]
// n = 5, edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]
// console.log(validateTree(n, edges));