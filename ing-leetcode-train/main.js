/* 
 * @Description: leetcode 每日刷题
 * @Author: xieql
 * @Date: 2022-11-06 18:23:22
 * @LastEditors: xieql
 * @LastEditTime: 2022-11-14 12:34:44
 * 
 */


/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
var carPooling = function (trips, capacity) {
    // 利用map内数据本身就有序的特性， 把上车地点和上车乘客人数，以及下车地点和下车人数都放进map中， 然后遍历整个map计算实时乘客人数即可。 12 ms;
    let map = [];
    for (let i = 0, it = null; it = trips[i++];) {
        // pick up
        map[it[1]] = map[it[1]] != null ? (it[0] + map[it[1]]) : it[0];
        // drop off
        map[it[2]] = map[it[2]] != null ? (map[it[2]] - it[0]) : -it[0];
    }
    // console.log(map);
    let passengers = 0;
    for (let t of map) {
        if (t == null) continue;
        passengers += t;
        // console.log(typeof passengers, passengers);
        if (passengers > capacity) return false;
    }
    return true;
};

// 区间更新，单点查询：使用差分数组。 注意，真正算数的区间是[from, to - 1]
carPooling = function (trips, capacity) {
    //solution2
    //diff array 
    //1. create arr 
    //2. [0, 0, 0, 0, 0, 0 ....] [2, 1, 5] => []
    let diff = new Array(1000).fill(0);
    for (let trip of trips) {
        let start = trip[1];
        let end = trip[2];
        let value = trip[0];
        diff[start] += value;
        diff[end] -= value;
    }
    //calulate the result arr;
    let res = 0;
    for (let i = 0; i < diff.length; i++) {
        res += diff[i];
        if (res > capacity) return false;
    }
    return true;
}


// let trips =
//     [[2, 1, 5], [3, 3, 7]],
//     capacity =
//         4
// let res = carPooling(trips, capacity);
// console.log(res);

/** "G"、"()" 和/或 "(al)"
 * @param {string} command
 * @return {string}
 */
var interpret = function (command) {
    let res = [];
    for (let i = 0, it; it = command[i]; i++) {
        if (it === '(')
            if (command[++i] === ")") {
                it = "()";
            }
            else if (command[i] === "a") {
                i += 2;
                it = "(al)";
            }
        console.log(it);
        switch (it) {
            case "G":
                res.push("G");
                break;
            case "()":
                res.push("o");
                break;
            case "/":
                res.push("/");
                break;
            case "(al)":
                res.push("al");
                break;
        }
    }
    return res.join('');
};

// let command = "G()(al)"
// let res = interpret(command);
// console.log(res);
// 输出："Goal"
// 解释：Goal 解析器解释命令的步骤如下所示：
// G -> G
//     () -> o
//         (al) -> al
// 最后连接得到的结果是 "Goal"

// =============================== two days ==================================

/**
 * @param {string} s
 * @return {string[]}
 */
var ambiguousCoordinates = function (s) {
    // 思路：
    // 枚举分隔线，分别计算左右字符串能生成的所有数字，然后从这两个集合中各取一个元素组合成一个坐标（笛卡尔积）。

    //     如何获得一个字符串可以生成的所有合法数字？

    //     首先字符串本身是一个数字，然后同样是枚举分隔位置，加小数点。但是有以下几种特殊情况：

    // 1.如果只有一个数，则不能加小数点，返回它本身。
    // 2.如果字符串第一个数和最后一个数都是 0，则它必不合法。
    // 3.如果字符串第一个数不是 0 但最后一个数是 0，则它不能加小数点，因为会产生多余的 0。
    // 4.如果字符串有前导 0，则它只能以 0. 开头

    // 将 s 中的 "()" 去除
    let len = s.length;
    s = s.substring(1, len - 1);
    console.log(s);
    len -= 2;
    let res = [];
    for (let i = 1; i < len; i++) {
        let l = s.substring(0, i);
        let r = s.substring(i);
        console.log(`l = ${l}, r = ${r}`);
        let left = helpFn(l);
        let right = helpFn(r);
        console.log(typeof left, typeof right);
        console.log(`left = ${left}, right = ${right}`);
        for (let j = 0, x; x = left[j]; j++) {
            for (let k = 0, y; y = right[k]; k++) {
                let p = `(${x}, ${y})`;
                // console.log(p);
                res.push(p);
            }
        }
    }
    return res;
    /**
     * 
     * @param {String} s 
     * @returns 
     */
    function helpFn(s) {
        let res = [];
        if (s.length === 1) {
            res.push(s);
            return res;
        }
        if (s.startsWith("0") && s.endsWith("0")) {
            res.push(null);
            return res;
        }
        if (s.startsWith("0")) {
            res.push(`0.${s.substring(1)}`);
            return res;
        }
        if (s.endsWith("0")) {
            res.push(s);
            return res;
        }
        // 不加小数点
        res.push(s);
        // 加小数点
        for (let i = 1; i < s.length; i++) {
            let a = s.substring(0, i);
            let b = s.substring(i);
            // console.log(res);
            res.push(`${a}.${b}`);
        }
        return res;
    }
};

// let s = "(123)"
// s = "(0123)"
// let res = ambiguousCoordinates(s);
// console.log(res);



// =============================== two days ==================================
/**
 * @param {number} n
 * @param {number[][]} mines
 * @return {number}
 */
var orderOfLargestPlusSign = function (n, mines) {
    // 显而易见的特殊情况预先处理一下
    if (n === 1)
        if (mines.length > 0) return 0;
        else return 1;

    // 生成一个储存元素为 0 的坐标的表
    // 这里使用 集合Map 是不是时空效率更高一点？
    let map = new Array(n).fill(void 0).map(() => new Array(n).fill(1));
    mines.forEach((it, i) => {
        let row = it[0], col = it[1];
        map[row][col] = 0;
    });
    console.log(map);

    let res = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (map[i][j] === 0) continue;
            // 计算十字架是几阶的 
            // 不断递增阶数 同时更新结果的最大值
            let level = 0;
            while (++level) {
                console.log(level);
                res = Math.max(res, level);
                if (i < level || j < level || j > n - 1 - level || i > n - 1 - level) break;
                if (map[i][j - level] === 0 || map[i - level][j] === 0 ||
                    map[i][j + level] === 0 || map[i + level][j] === 0)
                    break;
            }
        }
    }
    return res;
};

// let n =
//     5,
//     mines =
//         [[4, 2]]
// n =
//     2
// mines =
//     [[0, 0], [0, 1], [1, 0]]
// let res = orderOfLargestPlusSign(n, mines);
// console.log(res);



// =============================== three days ==================================
/** 864. Shortest Path to Get All Keys
 * @param {string[]} grid
 * @return {number}
 */
// 题解：BFS + 位运算。
// 看到最短路径很容易想到用 BFS。
var shortestPathAllKeys = function (grid) {
    let dx = [0, 0, -1, 1],
        dy = [-1, 1, 0, 0];
    class State {
        constructor(x, y, key) {
            this.x = x === undefined ? null : x;
            this.y = y === undefined ? null : y;
            this.key = key === undefined ? 0 : key;
            return this;
        }
    }
    // 查找起点
    let start = null;
    let keycnt = 0,
        allkey = 0;
    let n = grid.length, m = grid[0].length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === '@') {
                start = new State(i, j, 0);
                continue;
            }
            if ('a'.charCodeAt() <= grid[i][j].charCodeAt() && grid[i][j].charCodeAt() <= 'z'.charCodeAt()) {
                console.log(grid[i][j]);
                allkey |= (1 << grid[i][j].charCodeAt() - 'a'.charCodeAt());
                keycnt++;
            }
        }
    }
    console.log(`allkey = ${allkey}, keycnt = ${keycnt}`);

    let res = 0;
    res = bs(grid, start, allkey);
    return res;
    function bs(grid, start, allkey) {
        let steps = 0;
        let queue = [];
        queue.push(start);
        // let allkey = (1 << keycnt) - 1; // 0b11 表示表示有两把钥匙 每一个 1 表示一把钥匙
        // BFS 中的状态由他的 坐标+获得的钥匙 决定。
        let visited = new Array(n).fill(void 0).map(() => new Array(m).fill(void 0).map(() => new Array('z'.charCodeAt() + 1)));
        visited[start.x][start.y][start.key] = true;
        while (queue.length > 0) {
            // 向周边扩散一步
            let len = queue.length; //note
            for (let j = 0; j < len; j++) {
                let cur = queue.shift();
                console.log(`遍历节点：( ${cur.x}, ${cur.y}, ${cur.key} )`);
                // 如果所有钥匙都被找到
                if (allkey === cur.key) return steps;
                // 遍历下一个状态
                for (let i = 0; i < 4; i++) {
                    // if (i === 0 && j === 2) debugger;
                    let x = cur.x + dx[i], y = cur.y + dy[i];
                    if (x < 0 || y < 0 || x >= n || y >= m) continue;
                    let c = grid[x][y];
                    let key = cur.key;
                    if (c === '#') continue;
                    if (isupper(c) && (key >> (c.charCodeAt() - 'A'.charCodeAt()) & 1) === 0) continue;
                    if (islower(c)) {
                        key |= 1 << (c.charCodeAt() - 'a'.charCodeAt());
                    }
                    if (visited[x][y][key] === true) continue;

                    visited[x][y][key] = true;
                    queue.push(new State(x, y, key));
                }
            }
            steps++;
        }
        return -1;
    }
    function isupper(str) {
        let res = 0;
        if (str.charCodeAt() >= 'A'.charCodeAt() && str.charCodeAt() <= 'Z'.charCodeAt())
            res ^= 1;
        return res;
    }
    function islower(str) {
        let res = 0;
        if (str.charCodeAt() >= 'a'.charCodeAt() && str.charCodeAt() <= 'z'.charCodeAt())
            res ^= 1;
        return res;
    }
};

let grid = ["@.a..", "###.#", "b.A.B"]
let res = shortestPathAllKeys(grid);
console.log(res);