/*
 * @Description: 239. 滑动窗口最大值
 * @Author: xieql
 * @Date: 2022-11-18 19:36:36
 * @LastEditors: xieql
 * @LastEditTime: 2022-11-18 20:31:34
 * 
 */


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    // 构建一个单调队列（从大到小）
    class MyQueue {
        constructor() {
            this.queue = [];
            return this;
        }
        getLen() {
            return this.queue.length;
        }
        //弹出元素时，比较当前要弹出的数值是否等于队列出口的数值，如果相等则弹出
        //同时判断队列当前是否为空
        shift(val) {
            if (this.getLen() && this.front() === val)
                this.queue.shift();
        }
        //添加元素时，如果要添加的元素大于入口处的元素，就将入口元素弹出
        //保证队列元素单调递减
        //比如此时队列元素3,1，2将要入队，比1大，所以1弹出，此时队列：3,2
        push(val) {
            while (this.getLen() && this.queue[this.getLen() - 1] < val)
                this.queue.pop();
            this.queue.push(val);
        }
        //队列队顶元素始终为最大值
        front() {
            return this.queue[0];
        }
    }

    let res = [];
    let myqueue = new MyQueue();
    for (let i = 0, j = 0; i < nums.length; i++) {
        console.log(myqueue.queue);
        myqueue.push(nums[i]);
        if (i - j >= k) myqueue.shift(nums[j++]);
        // console.log(`i = ${i}, j = ${j}`);
        if (i - j === k - 1) res.push(myqueue.front());
        console.log(myqueue.queue);
    }
    return res;
};

let nums =
    [1, 3, -1, -3, 5, 3, 6, 7]
k =
    3
// nums = [1, -1]
// k = 1
let res = maxSlidingWindow(nums, k);
console.log(res);