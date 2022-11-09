/*
 * @Description: 
 * @Author: xieql
 * @Date: 2022-11-08 09:45:52
 * @LastEditors: xieql
 * @LastEditTime: 2022-11-08 12:23:20
 * 
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    // 排序 遍历 [0, len) 区间，寻找三数之和
    // 找到 nums1，接下来寻找 target - nums1最近的二数之和，回到上一步骤 （难点：递归法）

    let len = nums.length;
    nums = nums.sort((a, b) => a - b);
    let res = nums[0] + nums[1] + nums[2];
    // 遍历数组 若有target则找到他的下标，若没有则找到与他最接近较大的元素的下标
    // let ti = bs(nums, 0, nums.length, target);
    console.log(nums, target);
    // 计算离target最近的三数之和
    // 固定第一个数字
    for (let i = 0; i < len; i++) { //固定第一个数字
        let l = i + 1, r = len - 1; //双指针往target靠近
        while (l < r) {
            let temp = nums[i] + nums[l] + nums[r];
            if (temp === target) return temp; //如果遇到了target就返回答案
            else {
                if (Math.abs(target - res) > Math.abs(target - temp)) { //如果遇到一个比target更近的答案就更新答案
                    res = temp;
                } else if (temp > target) {
                    r--; //减小tmp的值
                } else l++; //增大tmp的值
            }
        }
    }
    return res;
    // 如果target存在 [start,end) 中则返回 indexOfTarget，否则返回离target最近且较大的元素的 index
    function bs(nums, start, end, target) {
        if (start >= end) return start;
        let mid = Math.floor(start + (end - start) / 2);
        if (nums[mid] < target) {
            start = mid + 1;
        } else if (target < nums[mid]) {
            end = mid;
        } else if (target === nums[mid]) {
            return mid;
        }
        return bs(nums, start, end, target);
    }
};

let nums =
    [-1, 2, 1, -4],
    target =
        1
let res = threeSumClosest(nums, target);
console.log(res);