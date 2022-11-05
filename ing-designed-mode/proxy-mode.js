/*
* @Description: 
* @Author: xieql
* @Date: 2022-11-01 17:13:39
 * @LastEditors: xieql
 * @LastEditTime: 2022-11-05 20:33:30
* 
*/
"use strict";
// 虚拟代理合并 http 请求
// 需求：给 checkbox 绑定事件，并且再点击的同时往另一台服务器同步文件 每隔 5s 同步一次
// base code
// let synchronousFile = function (id) {
//     console.log(`开始同步文件，id为：${id}`);
// }
// let check = document.getElementsByTagName('input');
// // 绑定事件
// for (let i = 0, c; c = check[i++];) {
//     c.onclick = function (ev) {
//         if (this.checked === true) {
//             proxySynchronousFile(this.id);
//         }
//     }
// }

let synchronousFile = function (id) {
    console.log(`开始同步文件，id为：${id}`);
}
let proxySynchronousFile = (function (id) {
    let cache = [], // 一定时间内需要同步的文件
        timer = null; // 定时器
    return function (id) {
        cache.push(id);
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            synchronousFile(cache.toString()); // 5s后向主体发送需要同步的ID集合
            clearTimeout(timer);
            timer = null;
            cache.length = 0; // 清空ID集合
        }, 5000);
    }
})();

let check = document.getElementsByTagName('input');
// 绑定事件
for (let i = 0, c; c = check[i++];) {
    c.onclick = function (ev) {
        if (this.checked === true) {
            proxySynchronousFile(this.id);
        }
    }
}


// 虚拟代理应用于惰性加载
// base code
let cache = [];
let miniConsole = {
    log() {
        let args = arguments;
        cache.push(function () {
            miniConsole.log.apply(this, args);
        });
    }
};
miniConsole.log(1);

let handle = function (ev) {
    if (ev.code === 113) {
        let script = document.createElement('script');
        script.onload = function () {
            for (let i = 0, fn; fn = cache[i++];) {
                fn();
            }
        }
        document.getElementsByTagName('head').appendChild(script);
    }
}

document.addEventListener('keydown', handle, false);

miniConsole = {
    log(id) {
        // 逻辑省略
        console.log(Array.prototype.join.call(arguments));
    }
};


// 用高阶函数动态创建代理
let fnList = [mult, plus];
// 创建缓存代理的工厂
let createProxyFactory = function (fn) {
    let cache = {};
    return function () {
        let args = Array.prototype.join.call(arguments, ',');
        if (cache[args] !== undefined) {
            return cache[args];
        }
        return cache[args] = fn.apply(this, arguments);
    };
}

let proxyMult = createProxyFactory(mult),
    proxyPlus = createProxyFactory(plus);
alert(proxyMult(1, 2));
alert(proxyMult(1, 2));
alert(proxyPlus(1, 2));
alert(proxyPlus(1, 2));



