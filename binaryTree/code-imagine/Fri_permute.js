

var permute = function (nums) {
    const res = [];
    bfs();
    return res;
    function bfs(onPath = []) {
        if (onPath.length === nums.length)
            res.push([...onPath]) ;
        for (let i = 0; i < nums.length; i++) {
            if (onPath.includes(nums[i])) // 对决策树进行剪枝
                continue;
            onPath.push(nums[i]);
            bfs(onPath);
            onPath.pop();
        }
    }
};

let nums = [1, 2, 3]
console.log(permute(nums));
// 输出：[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]