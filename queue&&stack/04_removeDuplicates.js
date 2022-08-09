/*
 * @Description: 1047. 删除字符串中的所有相邻重复项
 * @Author: huazj
 * @Date: 2022-02-06 13:03:07
 * @LastEditTime: 2022-02-06 13:53:54
 * @LastEditors: huazj
 */

/**
 * @description: 双指针
 * @param  {*}
 * @return {*}
 * @param {String} s
 */
// var removeDuplicates2 = function(s) {
//     let fast = 0;
//     let slow = 0;
//     while (fast < s.length) {
//         console.log('fast = ', s[fast], fast, 'slow = ',s[slow], slow);
//         // 直接用fast指针覆盖slow指针的值
//         // 遇到前后相同值的，就跳过，即slow指针后退一步，下次循环就可以直接被覆盖掉了
//         s.
//         if (slow > 0 && s[slow] == s[slow -1]) {
//             slow--;
//         } else {
//             slow++;
//         }
//         fast++;
//     }
//     return s;
// }

// console.log('removeDuplicates2()', removeDuplicates2("abbaca"));

/**
 * @description: 可以把字符串顺序放到一个栈中，然后如果相同的话 栈就弹出
 * @param  {*}
 * @return {*}
 * @param {String} s
 */
var removeDuplicates = function(s) {
    // 用数组（pop, push）模拟栈
    const stack = [];
    for (const x of s) {
        let c = null;
        if (stack.length && x === (c = stack.pop())) {
            continue;
        }
        c && stack.push(c);
        stack.push(x);
    }
    return stack.join("");
}

console.log('removeDuplicates()', removeDuplicates("abbaca"));