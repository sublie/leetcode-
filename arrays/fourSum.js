/**
 * @description: 指针法求满足四数之和的集合
 * @param  {*}
 * @return {*}
 * @param {*} nums 遍历的数组
 * @param {*} target 四数之和 
 */
var fourSum = function (nums, target) {
    console.log('fourSum() called with: nums = ',nums, ', target = ',target);
    const len = nums.length;
    if (len < 4) {
        return [];
    }
    // 数组正排序后有利于下面的去重
    nums.sort((a, b) => a - b);
    const res = [];
    for (let i = 0; i < len - 3; i++) {
        //去重i
        if (i > 0 && nums[i] === nums[i -1]) continue;
        for (let j = i +1; j < len -2; j++) {
            //去重j
            if (j > i +1 && nums[j] === nums[j -1]) continue;
            let l = j +1, r = len -1;
            while (l < r) {
                const sum = nums[i] + nums[j] + nums[l] + nums[r];
                if (sum < 0) {
                    l++;
                    continue;
                } else if (sum > 0) {
                    r--;
                    continue;
                } 
                res.push([nums[i], nums[j], nums[l], nums[r]]);
                while (l < r && nums[l] === nums[++l]);
                while (l < r && nums[r] == nums[--r]);
            }
         }
    }
    console.log('fourSum() return with: res = ', res);
    return res;
};

console.log('双指针', fourSum([1, 0, -1, 0, -2, 2], 0));