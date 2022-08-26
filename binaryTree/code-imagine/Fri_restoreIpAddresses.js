

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
    let res = [] ;
    backTraversal(s,[]) ;
    return res ;
    function backTraversal (s, onPath) {
        // console.log(s.length, onPath);
        if (s.length <= 0) {
            res.push(onPath.join('.')) ;
            return ;
        }
        // 选出有效的 IP地址字段
        for (let i = 1 ; i < 4 ; i++) {
            let cur = s.slice(0, i) ;
            let numTo = Number.parseInt(cur) ;
            if (numTo <= 255 && s.length - i >= 3-onPath.length) {
                if (onPath.length >= 4 || (cur.charAt(0) === '0' && cur.length > 1)) 
                continue ;
                onPath.push(cur) ; //将合法字段推入 onPath
                // console.log(s, onPath);
                backTraversal(s.slice(i, s.length), onPath) ;
                onPath.pop() ;
            }
        }
    }
};

var s = "25525511135"
s = "0000"
s = "101023"
let res = restoreIpAddresses(s) ;
console.log(res);