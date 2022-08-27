/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    let res = [];
    let onPath = [];
    (function bt(startIndex) {
        if (startIndex >= nums.length) {
            return;
        }
        res.push([...onPath]);
        for (let i = startIndex; i < nums.length; i++) {
            onPath.push(nums[i]);
            bt(i + 1); //树枝上去重
            onPath.pop();
        }
    })(0);
    return res;
};

var subsetsWithDup = function (nums) {
    let res = [];
    nums = nums.sort() ;
    (
        function st(onPath = [], start = 0, visited = []) {
            // console.log(res);
            // 刚进入这层
            res.push([...onPath]);
            visited = [] ;
            // console.log(onPath);
            // 遍历可选集合 将 nums[i]分发给下一层
            for (let i = start; i < nums.length; i++) {
                // console.log(nums[i], visited);
                //树层上去重 note：去重需要先对集合排序
                if (visited[nums[i]] === true && nums[i] === nums[i - 1]) 
                    continue;
                // 取出 nums[i] 放入onPath作为下一节点的子集（值）
                onPath.push(nums[i]);
                visited[nums[i]] = true; //如果是同一树枝使用过标记为 true
                st(onPath, i + 1); //树枝上去重
                //即将离开这层
                // visited[nums[i]] = false; //从这里标记(易知)同层（而不是同一树枝）使用过nums[i] 
                onPath.pop();
            }
        }
    )()
    return res;
};

let nums = [1, 2, 3]
nums = [1, 2, 2]; //输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
nums = [4, 6, 7, 7]
// nums = [0]
let res = subsets(nums)
res = subsetsWithDup(nums)
console.log(res);