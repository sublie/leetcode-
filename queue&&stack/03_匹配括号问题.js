/*
 * @Description: 括号匹配是使用栈解决的经典问题
 * @Author: huazj
 * @Date: 2022-02-06 11:12:32
 * @LastEditTime: 2022-02-06 12:52:34
 * @LastEditors: huazj
 */
var isValid = function (s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        const element = s[i];
        switch (element) {
            case '(':
                stack.push(')');
                break;
            case '[':
                stack.push(']');
                break;
            case '{':
                stack.push('}');
                break;
        
            default:
                if (element !== stack.pop()) {
                    return false;
                }
        }
    }
    return stack.length === 0;
}
//simplify
var isValid2 = function(s) {
    const stack = [],
        map = {
            "(": ")",
            "[": "]",
            "{": "}"
        };
    for (const c of s) {
        if (c in map) {
            stack.push(c);
            continue;
        }
        if (map[stack.pop()] !== c) {
            return false;
        }
    }
    return !stack.length;
}

console.log('isValid() return: ', isValid("([)]"));
console.log('isValid2() return: ', isValid2("([)]"));