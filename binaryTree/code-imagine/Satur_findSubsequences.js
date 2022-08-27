

/** 找到递增子序列
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums) {
    let res = [];
    (
        function bt(onPath = [], startIndex = 0) {
            if (onPath.length > 1)
                res.push([...onPath]);
            // console.log(res);
            if (startIndex >= nums.length)
                return;
            const visited = [];
            for (let i = startIndex; i < nums.length; i++) {
                if (visited[nums[i]] === true 
                        // note：防止数组索引越界
                        || (onPath.length > 0 && nums[i] < onPath[onPath.length - 1])) {
                    continue;
                }
                onPath.push(nums[i]);
                // console.log(onPath);
                visited[nums[i]] = true;
                bt(onPath, i + 1);
                onPath.pop();
            }
        }
    )()
    return res;
};

let nums = [4, 6, 7, 7]
nums = [4, 4, 3, 2, 1]
let res = findSubsequences(nums)
console.log(res);
// 输出：[[4, 6], [4, 6, 7], [4, 6, 7, 7], [4, 7], [4, 7, 7], [6, 7], [6, 7, 7], [7, 7]]