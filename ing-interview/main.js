/*
 * @Description: b站视频课练习
 * @Author: xieql
 * @Date: 2022-10-25 22:16:24
 * @LastEditors: xieql
 * @LastEditTime: 2022-10-30 20:16:43
 * 
 */

/**
 * 斐波那契数列
 * @param {number} n 斐波那契数列中的第 n 个数
 * @returns 
 */
function fibonacci(n) {
    if (n <= 1) return 1;
    let ary = [1, 1];
    let i = n + 1 - 2;
    // 要生成多少个数
    while (i > 0) {
        let [a, b] = [ary[ary.length - 1], ary[ary.length - 2]];
        ary.push(a + b);
        i--;
    }
    // console.log(ary);
    return ary[ary.length - 1];
}
/**
 * 斐波那契数列 递归法（dfs）
 * @param {number} n 斐波那契数列中的第 n 个数
 * @returns 
 */
function fibonacci(n) {
    function fn(n, cur, next) {
        if (n <= 0) {
            return cur;
        }
        // 将结束时的返回值 cur 继续传递
        let res = fn(n - 1, next, cur + next);
        return res;
    }
    let res = fn(n - 1, 1, 1);
    return res;
}

// let res = fibonacci(5);
// console.log(res);

// 利用闭包隐藏数据，对外只暴露接口实现一个缓存接口
function createCache() {
    let cache = {};
    return {
        getCache(key) {
            return cache[key];
        },
        setCache(key, data) {
            cache[key] = data;
        }
    };
}
// 利用懒汉单例模式只创建一个缓存接口
let createSingleton = function (createCacheFn) {
    let cache = null;
    return () => cache == null ? (cache = createCacheFn()) : cache;
}
let createSingleCache = createSingleton(createCache);

// test my above code 
let a = createSingleCache();
let b = createSingleCache();
console.log(b === a); //true
a.setCache('aname', 'aaaa');
console.log(`b缓存读取a缓存中的名字为：${b.getCache('aname')}`);
b.setCache('bname', 'bbbb');
console.log(`a缓存获取b缓存中的名字为：${a.getCache('bname')}`);