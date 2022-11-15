/*
 * @Description: 31.下一个排列
 * @Author: xieql
 * @Date: 2022-11-15 20:58:43
 * @LastEditors: xieql
 * @LastEditTime: 2022-11-15 20:59:20
 * 
 */


/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
    // 1.找到一个较小的数，在找到一个较大的数 交换位置
    // 2.要想下一个排列大于且最接近原排列
    //      a.较小的数要尽量接近右边
    //      b.较大的数要尽量小
    //      c.交换位置后 升序排列最小的数的索引右边的数组区间
    // 难点：第一个步骤，找到一个较小的数和一个较大的数
    // 解决：这两个数是成对存在的，要想在较小的数右边有较大的数，必须满足较小的数小于右边的数
    let len = nums.length;
    let l = len - 2,
        r = len - 1;
    while (l >= 0 && nums[l] >= nums[l + 1]) {
        l--;
    }
    if (l === -1) return nums.sort((a, b) => a - b);
    while (r > l && nums[r] <= nums[l]) {
        r--;
    }
    if (nums[r] > nums[l]) {
        // console.log(`l = ${l}, r = ${r}, len = ${len}`);
        swap(l, r, nums);
        console.log(nums);
        reverse(l, nums);
    }
    return nums;
    function reverse(start, nums) {
        let ary = nums.slice(start, start + 1).join(' ') + ' ' + nums.slice(start + 1).sort((a, b) => a - b).join(' ');
        ary = ary.split(' ');
        for (let i = start, j = 0; i < nums.length; i++, j++) {
            nums[i] = parseFloat(ary[j]);
        }
        // console.log(start, ary);
        return nums;
    }
    function swap(l, r, nums) {
        let temp = nums[l];
        nums[l] = nums[r];
        nums[r] = temp;
        return;
    }
};