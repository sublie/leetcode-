/**
 * 归并排序
 * @param {array} ary 要排序的数组
 * @returns undefined
 */
function mergeSort(ary) {
  // 辅助合并有序数组
  const temp = [];
  // 排序整个数组（改变原数组）
  sort(ary, 0, ary.length - 1);
  return;
  function sort(ary, low, hi) {
    if (low >= hi) return;
    const mid = Math.floor(low + (hi - low) / 2);
    sort(ary, low, mid);
    sort(ary, mid + 1, hi);
    merge(ary, low, mid, hi);
    return;
  }
  function merge(ary, low, mid, hi) {
    // 先把 nums[lo..hi] 复制到辅助数组中
    // 以便合并后的结果能够直接存入 nums
    ary.forEach((value, i) => {
      temp[i] = value;
    });

    // 数组双指针技巧，合并两个有序数组
    let i = low,
      j = mid + 1;
    for (let p = low; p <= hi; p++) {
      //note:这里是左闭右闭区间
      if (i === mid + 1) {
        // 左半边数组已全部被合并
        ary[p] = temp[j++];
      } else if (j === hi + 1) {
        // 右半边数组已全部被合并
        ary[p] = temp[i++];
      } else if (temp[i] <= temp[j]) {
        ary[p] = temp[i++];
      } else {
        ary[p] = temp[j++];
      }
    }
  }
}

/** 快速排序 TIME: O(n * log n) 递归的次数（log n）* 执行的操作耗时，即每层节点个数（n） 
 * note：快排使用前序遍历的话需要记住 nums[mid] 的位置，因为他一直在变化
 * @param {array} nums 要排序的数组
 * @returns undefined
 */
function fastSort(nums) {
  if (nums.length < 2) return;
  let temp = [] ; //辅助数组排序
  sort(nums, 0, nums.length - 1);
  return;
  function sort(nums, lo, hi) {
    if (lo >= hi) return;
    // 二分法获取 mid
    let mid = lo + ((hi - lo) >> 1);
    console.log(nums.slice(lo, hi +1), nums[mid]);
    if (nums[mid] === -1) debugger ;
    // 使 nums[lo, mid - 1] <= nums[mid] < nums[mid + 1, hi]
    temp.push(nums[mid]);
    for (let i = lo; i <= hi; i++) {
      if (i === mid)
        continue ;
      if (nums[i] < nums[mid])
        temp.unshift(nums[i]) ;
      else if (nums[i] === nums[mid]) 
        temp.splice(temp.findIndex((val) => val === nums[mid]), 0, nums[i]) ;
      else temp.push(nums[i]) ;    
    }
    // 排序后 nums[mid] 在nums中的位置
    mid = temp.findIndex((val) => val === nums[mid]) + lo ;
    // 改变原数组
    i = 0 ;
    for (let j = lo; j <= hi; i++, j++) {
      nums[j] = temp[i] ;
    }
    // 方便下次辅助
    temp.length = 0 ;
    console.log(nums.slice(lo, hi +1), nums[mid]);
    sort(nums, lo, mid - 1);
    sort(nums, mid + 1, hi);
    return;
  }
}

//快速排序，递归
var sortArray = function (nums) {
  var len = nums.length;
  if (len < 2) {
    return nums;
  }
  let curr = nums[0];
  let left = [];
  let right = [];
  for (let i = 1; i < len; i++) {
    if (nums[i] < curr) {
      left.push(nums[i]);
    } else {
      right.push(nums[i]);
    }
  }
  result = sortArray(left).concat(curr, sortArray(right));
  return result;
};

let nums = [5, 2, 3, 1];
nums = [-4, 0, 7, 4, 9, -5, -1, 0, -7, -1];
// console.log(sortArray(nums));
fastSort(nums) ;
console.log(nums);

// =======================================================================================

module.exports = {
  mergeSort,
  fastSort,
};
