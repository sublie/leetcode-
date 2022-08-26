

var letterCombinations = function (digits) {
    if (digits.length <= 0)
        return [] ;
    let strTo = [
        undefined,'abc','def',
        'ghi','jkl','mno',
        'pqrs','tuv','wxyz',
    ] ;
    let res = [];
    //遍历回溯树 将所有可能的字符组成放入res
    backTraversal(digits, 0, '') ; 
    return res ;
    function backTraversal(digits, depth, onPath) {
        if (depth >= digits.length) {
            res.push(onPath) ;
            return ;
        }
        // if (digits.length === 0) //方法er操作digits比较低效
        //     return ;
        // 获取第 depth 个数字对应的所有字符
        let str = strTo[digits[depth] - 1] ;
        let len = str.length ;
        // console.log(str);
        // 遍历 str 将str中的每个字符分别与下一个数字对应的所有字符组合
        for (let i = 0; i < len; i++) {
            let char = str[i] ;
            // console.log(digits, depth + 1, onPath + char);
            backTraversal(digits, depth+1, onPath + char) ; //隐藏了回溯
        }
        return ;
    }
};

var digits = "23"
digits = "2"
console.log(letterCombinations(digits));