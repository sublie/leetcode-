

// 示例 1:

// 输入: n = 5 和 edges = [[0, 1], [1, 2], [3, 4]]

//      0          3
//      |          |
//      1 --- 2    4 

// 输出: 2

class UF {
    constructor(n) {
        // 一开始互不连通
        this.count = n ;
        // 父节点指针初始指向自己
        this.parent = new Array(n).fill(0).map((item,index) => index) ;
        // 最初每棵树只有一个节点
        // 重量应该初始化 1
        this.weight = new Array(n).fill(1) ;
    }

    // 将节点 p 和节点 q 连通
    union(p, q) {
        let pRoot = this.findRoot(p) ;
        let qRoot = this.findRoot(q) ;
        if (pRoot === qRoot)
            return ;    
        this.weight[qRoot] += this.weight[pRoot] ;
        // 两个连通分量合并成一个连通分量
        this.count -- ;
    }

    // 找到 node 的根节点
    findRoot (node) {
        if (node !== this.parent[node])
            this.parent[node] = findRoot(this.parent[node]) ;
        return this.parent[node] ;
    }

    // 判断节点 p 和节点 q 是否连通
    connected (p,q) {
        let pRoot = this.findRoot(p);
        let qRoot = this.findRoot(q);
        return pRoot === qRoot ;
    }

    // 返回图中的连通分量个数
    count () {
        return this.count ;
    }
}

let n = 5, edges = [[0, 1], [1, 2], [3, 4]]
n = 5 , edges = [[0, 1], [1, 2], [2, 3], [3, 4]]
let uf = new UF(n) ;
edges.forEach((val, i) => {
    uf.union(val[0], val[1]) ;
}) ;
console.log(uf.count);