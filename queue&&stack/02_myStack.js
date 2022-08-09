/*
 * @Description: 使用队列实现栈
 * @Author: huazj
 * @Date: 2022-02-05 21:40:49
 * @LastEditTime: 2022-02-06 10:55:07
 * @LastEditors: huazj
 */

// 使用两个队列实现
/**
 * @description: 初始化数据 使用数组（push, shift）模拟队列
 * @param  {*}
 * @return {*}
 */
var MyStack = function() {
    this.queue1 = [];
    this.queue2 = [];
}

/**
 * @description: 入栈
 * @param  {*}
 * @return {*}
 * @param {*} x
 */
MyStack.prototype.push = function(x) {
    this.queue1.push(x);
}

/**
 * @description: 移除栈顶元素并返回
 * @param  {*}
 * @return {number}
 */
MyStack.prototype.pop = function() {
    // 减少两个队列交换的次数， 只有当queue1为空时，交换两个队列
    if (!this.queue1.length) {
        [this.queue1, this.queue2] = [this.queue2, this.queue1];
    }
    while (this.queue1.length > 1) {
        this.queue2.push(this.queue1.shift());
    }
    return this.queue1.shift();
}

/**
 * @description: Get the top element.
 * @param  {*}
 * @return {*}
 */
MyStack.prototype.top = function() {
    const x = this.pop();
    this.push(x);
    return x;
}

MyStack.prototype.empty = function() {
    return !this.queue1.length && !this.queue2.length;
}

//使用一个队列实现
/**
 * @description: Initialize your date structure here.
 * @param  {*}
 * @return {*}
 */
var MyStack2 = function() {
    this.queue = [];
}

/**
 * @description: Push element x onto stack.
 * @param  {*}
 * @return {*}
 * @param {*} x
 */
MyStack2.prototype.push = function(x) {
    this.queue.push(x);
}

/**
 * @description: Removes the element on the top of stack and returns the element.
 * @param  {*}
 * @return {*}
 */
MyStack2.prototype.pop = function() {
    let size = this.queue.length;
    size--;
    while (size-- > 0) {
        this.queue.push(this.queue.shift());
    }
    return this.queue.shift();
}

/**
 * @description: Get the top element of stack.
 * @param  {*}
 * @return {*}
 */
MyStack2.prototype.top = function() {
    let x = this.pop();
    this.push(x);
    return x;
}
/**
 * @description: Returns whether the stack is empty.
 * @param  {*}
 * @return {*}
 */
MyStack2.prototype.empty = function() {
    return !this.queue.length;
}
//栈提供push 和 pop 等等接口，所有元素必须符合先进后出规则，所以栈不提供走访功能，也不提供迭代器(iterator)。 不像是set 或者map 提供迭代器iterator来遍历所有元素。
/**
 * @description: 这里我用栈的底层容器（queue）来实现符合栈先进先出规则的遍历
 * @param  {*}
 * @return {*}
 */
MyStack2.prototype.show = function() {
    let size = this.queue.length;
    // 第一层循环控制循环次数
    // 定义打印的结果集
    let logResult = '';
    while (size-- > 0) {
        // 第二层循环按顺序打印栈顶元素
        let size2 = size;
        while (size2-- > 1) {
            this.queue.push(this.shift());
        }
        //暂存栈顶元素
        let top = this.queue.shift();
        this.queue.push(top);
        logResult += (' ' + top);
    }
    console.log(logResult);
}