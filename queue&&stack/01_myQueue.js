/*
 * @Description: 使用两个数组的栈方法（push, pop） 实现队列
 * @Author: huazj
 * @Date: 2022-02-05 19:59:20
 * @LastEditTime: 2022-02-05 21:42:25
 * @LastEditors: huazj
 */
/**
 * @description: 初始化数据 两个数组
 * @param  {*}
 * @return {*}
 */
var MyQueue = function () {
    this.stackIn = [];
    this.stackOut = [];
};

/**
 * @description: 将数据 x 推入到队列末尾
 * @param  {*}
 * @return {*}
 * @param {number} x
 */
MyQueue.prototype.push = function (x) {
    this.stackIn.push(x);
}

/**
 * @description: 移除队列头部元素 并返回
 * @param  {*}
 * @return {*}
 */
MyQueue.prototype.pop = function () {
    const size = this.stackOut.length;
    if (size) {
        return this.stackOut.pop();
    }
    while (this.stackIn.length) {
        this.stackOut.push(this.stackIn.pop());
    }
    return this.stackOut.pop();
}

/**
 * @description: 获取队列的头部元素
 * @param  {*}
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    const x = this.pop();
    this.stackOut.push(x);
    return x;
}

MyQueue.prototype.empty = function() {
    return !this.stackIn.length && !this.stackOut.length;
}

