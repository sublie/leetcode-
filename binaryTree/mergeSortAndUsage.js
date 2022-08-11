var mergeSort = require("./sort");

var countSmaller = function (nums) {
  nums.forEach((value, i) => {
    nums[i] = new Pairs(value, i);
  });
  // 记录每个元素后面比自己小的元素个数
  let count = new Array(nums.length).fill(0);
  mergeSort(nums);
  return count;
  function Pairs(value, id) {
    this.val = value === undefined ? 0 : value;
    this.id = id === undefined ? 0 : id;
  }
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
      // note:这里是左闭右闭区间
      for (let p = low; p <= hi; p++) {
        if (i === mid + 1) {
          // 左半边数组已全部被合并
          ary[p] = temp[j++];
        } else if (j === hi + 1) {
          // 右半边数组已全部被合并
          ary[p] = temp[i++];
          count[ary[p].id] += j - mid - 1;
        } else if (temp[i].val <= temp[j].val) {
          ary[p] = temp[i++];
          count[ary[p].id] += j - mid - 1;
        } else {
          ary[p] = temp[j++];
        }
      }
    }
  }
};

let reversePairs = function (nums) {
  let count = 0,
    temp = new Array(nums.length).fill(0); //辅助排序数组
  // 执行归并排序
  mergeSort(nums);
  return count;
  function mergeSort(nums) {
    // 排序整个数组，改变原数组
    sort(nums, 0, nums.length - 1);
  }
  function sort(nums, lo, hi) {
    // note：这里控制了无法进入叶子节点
    if (lo >= hi) return;
    // 前序遍历由 nums 生成一棵树
    let mid = Math.floor(lo + (hi - lo) / 2);
    sort(nums, lo, mid);
    sort(nums, mid + 1, hi);
    // 后序遍历重构由 nums 生成的树
    merge(nums, lo, mid, hi);
    return;
  }
  function merge(nums, lo, mid, hi) {
    // 先把 nums[lo..hi] 复制到辅助数组中
    // 以便合并后的结果能够直接存入 nums
    for (let i = lo; i <= hi; i++)
      temp[i] = nums[i] ;

    // 进行效率优化，维护左闭右开区间 [mid+1, end) 中的元素乘 2 小于 nums[i]
    // 为什么 end 是开区间？因为这样的话可以保证初始区间 [mid+1, mid+1) 是一个空区间
    let end = mid + 1;
    for (let s = lo; s <= mid; s++) {
      while (end < hi + 1 && BigInt(temp[end] * 2) < BigInt(temp[s])) {
        end++;
      }
      count += end - mid - 1;
    }

    // 数组双指针技巧，合并两个有序数组
    i = lo,
      j = mid + 1;
    for (let p = lo; p <= hi; p++) {
      // note：p遍历 [lo, hi] 区间
      if (i === mid + 1) nums[p] = temp[j++];
      else if (j === hi + 1) nums[p] = temp[i++];
      else if (temp[i] > temp[j]) nums[p] = temp[j++];
      else nums[p] = temp[i++];
    }
  }
};

reversePairs = function (nums) {
  if (nums.length == 0) {
    return 0;
  }
  let count = 0;

  function mergeSort(nums, start, end) {
    if (start == end) {
      return 0;
    }
    const mid = start + ((end - start) >> 1);
    mergeSort(nums, start, mid);
    mergeSort(nums, mid + 1, end);

    // 计算符合条件的子区间数量：count = COUNT(j) WHERE i < j AND nums(i) > 2* nums(j)
    let i = start;
    let j = mid + 1;
    while (i <= mid && j <= end) {
      if (nums[i] > 2 * nums[j]) {
        count += mid - i + 1;
        j++;
      } else {
        i++;
      }
    }
    // 合并两个有序数组
    i = start;
    j = mid + 1;
    const temp = new Array(end - start + 1);
    let index = 0;
    while (i <= mid && j <= end) {
      if (nums[i] < nums[j]) {
        temp[index] = nums[i];
        index++;
        i++;
      } else {
        temp[index] = nums[j];
        index++;
        j++;
      }
    }
    while (i <= mid) {
      temp[index] = nums[i];
      index++;
      i++;
    }
    while (j <= end) {
      temp[index] = nums[j];
      index++;
      j++;
    }
    for (let i = start, k = 0; i <= end; i++, k++) {
      nums[i] = temp[k];
    }
  }

  mergeSort(nums, 0, nums.length - 1);
  return count;
};

let nums = [5, 2, 6, 1];
const count = countSmaller(nums); // [ 2, 1, 1, 0 ]
nums = [1, 3, 2, 3, 1];
nums = require("./testCase/mergeSortAndUsage/reversePairs.js").nums;
console.log(reversePairs(nums));
// console.log(nums);
