
class UF {
    constructor(n) {
        // 一开始互不连通
        this.count = n;
        // 父节点指针初始指向自己
        this.parent = new Array(n).fill(0).map((item, index) => index);
        // 最初每棵树只有一个节点
        // 重量应该初始化 1
        this.weight = new Array(n).fill(1);
    }

    // 将节点 p 和节点 q 连通
    union(p, q) {
        let pRoot = this.findRoot(p);
        let qRoot = this.findRoot(q);
        if (pRoot === qRoot)
            return;
        this.weight[qRoot] += this.weight[pRoot];
        // 两个连通分量合并成一个连通分量
        this.count--;
        // note：一个节点的根节点赋成另一个节点的根节点
        this.parent[pRoot] = qRoot;
    }

    // 找到 node 的根节点
    findRoot(node) {
        if (node !== this.parent[node])
            this.parent[node] = this.findRoot(this.parent[node]);
        return this.parent[node];
    }

    // 判断节点 p 和节点 q 是否连通
    connected(p, q) {
        let pRoot = this.findRoot(p);
        let qRoot = this.findRoot(q);
        return pRoot === qRoot;
    }

    // 返回图中的连通分量个数
    count() {
        return this.count;
    }
}
module.exports = { UF };
// 示例 1:

// 输入: n = 5 和 edges = [[0, 1], [1, 2], [3, 4]]

//      0          3
//      |          |
//      1 --- 2    4 

// 输出: 2


var solve = function (board) {
    if (board.length <= 0) 
        return ;
    let m = board.length ;
    let n = board[0].length ;
    // 给 dummy 留一个额外位置
    let uf = new UF(m * n + 1) ;
    let dummy = m * n ;
    // 将首列与末列的 O 与dummy连通
    for (let i = 0; i < m; i++) {
        if (board[i][0] === 'O') {
            uf.union(i * n, dummy) ;
        }
        if (board[i][n - 1] === 'O')
            uf.union(i * n + n - 1, dummy) ;
    }
    // 将首行和末行的 O 与 dummy 连通
    for (let j = 0; j < n; j++) {
        if (board[0][j] === 'O')
            uf.union(j, dummy) ;
        if (board[m-1][j] === 'O')
            uf.union((m-1) * n + j, dummy) ;
    }
    // 方向数组 d 是上下左右搜索的常用手法
    let d = [[0,1],[0,-1],[-1,0],[1,0]] ;
    for (let i = 1; i < m - 1; i++) {
        for (let j = 1; j < n - 1; j++) {
            // if (i === 1 && j === 1)
            //     debugger ;
            if (board[i][j] === 'O') // 将此 O 与上下左右的 O 连通
                for (let k = 0; k < d.length; k++) {
                    let x = i + d[k][0] ;
                    let y = j + d[k][1] ;
                    if (board[x][y] === 'O' && !uf.connected(i * n + j, dummy))
                        uf.union(i * n + j, x * n + y) ;
                }
        }
    }
    // 所有不和 dummy 连通的 O，都要被替换为 X
    for (let i = 1; i < m - 1; i++) {
        for (let j = 1; j < n - 1; j++) {
            if (!uf.connected(dummy, i * n + j))
                board[i][j] = 'X' ;
        }
    }
    return board ;
}

var equationsPossible = function (equations) {
    // 26 个英文字母
    let uf = new UF(26) ;
    let result = true ;
    // console.log(uf.parent);
    // 先让相等的字母形成连通分量
    equations.forEach(function(item, i){
        if (item[1] === '=') {
            let l = item[0] ;
            let r = item[3] ;
            uf.union(l.charCodeAt() - 97, r.charCodeAt() - 97) ;
        }
    }) ;
    // 检查不等关系是否打破相等关系的连通性
    equations.forEach((item, i) => {
        if (item[1] === '!') {
            let l = item[0] ;
            let r = item[3] ;
            // console.log(uf.connected(l.charCodeAt() - 97, r.charCodeAt() - 97));
            if (uf.connected(l.charCodeAt() - 97, r.charCodeAt() - 97))
                result = false ;
        }
    }) ;
    return result ;
};

let equations = ["a==b", "b!=a"]
let res = equationsPossible(equations) ;
// console.log(res);

// let board = [["X", "X", "X", "X"], ["X", "O", "O", "X"], ["X", "X", "O", "X"], ["X", "O", "X", "X"]]
// board = [["O", "O", "O"], ["O", "O", "O"], ["O", "O", "O"]]
// board = [["O", "X", "O", "O", "O", "X"], 
//          ["O", "O", "X", "X", "X", "O"], 
//          ["X", "X", "X", "X", "X", "O"], 
//          ["O", "O", "O", "O", "X", "X"], 
//          ["X", "X", "O", "O", "X", "O"], 
//          ["O", "O", "X", "X", "X", "X"]]
// board = [["O", "X", "X", "X", "X", "X", "O", "O"], 
//          ["O", "O", "O", "X", "X", "X", "X", "O"], 
//          ["X", "X", "X", "X", "O", "O", "O", "O"], 
//          ["X", "O", "X", "O", "O", "X", "X", "X"], 
//          ["O", "X", "O", "X", "X", "X", "O", "O"], 
//          ["O", "X", "X", "O", "O", "X", "X", "O"], 
//          ["O", "X", "O", "X", "X", "X", "O", "O"], 
//          ["O", "X", "X", "X", "X", "O", "X", "X"]]
// let res = solve(board) ;
// console.log(res); 


// let n = 5, edges = [[0, 1], [1, 2], [3, 4]]
// // n = 5 , edges = [[0, 1], [1, 2], [2, 3], [3, 4]]
// let uf = new UF(n);
// edges.forEach((val, i) => {
//     uf.union(val[0], val[1]);
// });
// console.log(uf.count);
// 2
// 1
