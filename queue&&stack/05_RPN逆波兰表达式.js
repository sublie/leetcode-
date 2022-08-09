/*
 * @Description: 
 * @Author: huazj
 * @Date: 2022-02-06 14:36:51
 * @LastEditTime: 2022-02-06 14:58:21
 * @LastEditors: huazj
 */

var evalRPN = function(tokens) {
    // 定义一个字典map 运算符映射相应的运算
    const s = new Map([
        ["+", (a, b) => a + b],
        ["-", (a, b) => b - a],
        ["*", (a, b) => b * a],
        ["/", (a, b) => (b / a) | 0]
    ]);
    // 定义一个栈 暂存待运算的数
    const stack = [];
    for (const i of tokens) {
        console.log(i);
        if (!s.has(i)) {
            stack.push(i);
            continue;
        }
        stack.push(s.get(i)(stack.pop(), stack.pop()));
    }
    return stack.pop();
}

console.log('evalRPN()', evalRPN(["2", "1", "+", "3", " * "]));