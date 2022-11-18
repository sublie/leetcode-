/*
 * @Description: 
 * @Author: xieql
 * @Date: 2022-11-09 23:31:32
 * @LastEditors: xieql
 * @LastEditTime: 2022-11-10 10:17:04
 * 
 */
/** 难点：处理排重的操作
 * 解决：当i固定的情况，对于j的遍历，我们要保证每次循环j所对应的数字都是不同的，不然就会出现重复的解，而数组是排序过的，我们保证j的不重复，就可以保证剩下两个数字的不重复。
 *       如果不是首次循环j（相同的i下），那么我们要判断当前的nums[j]是否和nums[j-1]相等，如果相等，说明是重复解，直接跳过。
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    let res = [];
    let len = nums.length;
    if (len < 4) return res;
    nums = nums.sort((a, b) => a - b);
    // 双指针查找 target made by 4sum
    for (let i = 0; i < len; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        for (let j = i + 1; j < len; j++) {
            let l = j + 1, r = len - 1;
            if (nums[j] === nums[j - 1] && j > i + 1) continue;
            while (l < r) {
                if (nums[l] === nums[l - 1] && l > j + 1) {
                    l++;
                    continue;
                }
                let sum = nums[i] + nums[j] + nums[l] + nums[r];
                if (sum < target)
                    l++;
                else if (target < sum)
                    r--;
                else if (target === sum) {
                    console.log(`i = ${i}, j = ${j}, l = ${l}, r = ${r}`);
                    res.push([nums[i], nums[j], nums[l], nums[r]]);
                    l++;
                }
            }
        }
    }
    return res;
};

let nums =
    [0, 0, 0, 0],
    target =
        1
nums =
    [-2, -1, -1, 1, 1, 2, 2]
target =
    0
// nums =
//     [1, 0, -1, 0, -2, 2]
// target =
//     0
let res = fourSum(nums, target);
console.log(res);