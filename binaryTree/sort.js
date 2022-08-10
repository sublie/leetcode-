/**
 * 归并排序
 * @param {array} ary 要排序的数组
 * @returns undefined
 */
function mergeSort (ary) {
  // 辅助合并有序数组
  const temp = [] ;
  // 排序整个数组（改变原数组）
  sort(ary, 0, ary.length - 1);
  return ;
  function sort (ary, low, hi) {
    if (low >= hi)
      return ;
    const mid = Math.floor(low + (hi - low) /2) ;
    sort(ary, low, mid) ;
    sort(ary, mid + 1, hi) ;
    merge(ary, low, mid, hi) ;
    return ;
  } ;
  function merge (ary, low, mid, hi) {
    // 先把 nums[lo..hi] 复制到辅助数组中
    // 以便合并后的结果能够直接存入 nums
    ary.forEach((value, i) => {
      temp[i] = value ;
    })

    // 数组双指针技巧，合并两个有序数组
    let i = low, j = mid + 1 ;
    for (let p = low;p <= hi;p++) { //note:这里是左闭右闭区间
      if (i === mid + 1) {
        // 左半边数组已全部被合并
        ary[p] = temp[j++] ;
      } else if (j === hi + 1) {
        // 右半边数组已全部被合并
        ary[p] = temp[i++] ;
      } else if (temp[i] <= temp[j]) {
        ary[p] = temp[i++] ;
      } else {
        ary[p] = temp[j++] ;
      }
    } 
  }
}

const nums = [5,2,6,1] ;
mergeSort(nums) ;
console.log(nums);