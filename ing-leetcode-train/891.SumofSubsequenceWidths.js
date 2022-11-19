/*
 * @Description: 891. 子序列宽度之和
 * @Author: xieql
 * @Date: 2022-11-18 23:36:34
 * @LastEditors: xieql
 * @LastEditTime: 2022-11-19 15:59:48
 * 
 */


/** 爆搜法 超时
 * 理解题目时没想到 数组元素的顺序对最终结果无影响的
 * @param {number[]} nums
 * @return {number}
 */
var sumSubseqWidths = function (nums) {
    let res = 0;
    let subseqList = [];
    getSubseq(subseqList);
    for (let i = 0; i < subseqList.length; i++) {
        let it = subseqList[i];
        let len = it.length;
        it.sort((a, b) => a - b);
        if (len < 2) {
            res += 0;
            continue;
        }
        res += (it[len - 1] - it[0]);
    }
    return res;
    function getSubseq(ary) {
        if (nums.length < 2) {
            ary.push([...nums]);
            return;
        }
        ds(ary, [], nums, 0);
        return ary;
        function ds(path, node, nums, start) {

            for (let i = start; i < nums.length; i++) {
                let it = nums[i];
                node.push(it);
                ds(path, node, nums, i + 1);
                // console.log(node);
                path.push([...node]);
                node.pop();
            }
            return;
        }
    }
};

// 数学推导一下
var sumSubseqWidths = function (nums) {
    let res = 0;
    nums.sort((a, b) => a - b);
    let M = 1e9 + 7;
    let len = nums.length;
    let pow = new Array(len);
    pow[0] = 1;
    for (let i = 1; i < len; i++) {
        pow[i] = (pow[i - 1] << 1) % M;
    }

    // Math.pow = function (base, compnt) {
    //     if (compnt < 0) throw new Error("The 2th parameters is not expected for less than zero!");
    //     let res = 1;
    //     let x = 1;
    //     for (let i = 1; i <= compnt; i++) {
    //         res *= base;
    //     }
    //     return res;
    // }

    for (let i = 0; i < len; i++) {
        let it = nums[i];
        // Math.pow(base, component) 在 compnt=1024 时就超出边界了
        // res = (res + (Math.pow(2, i) % M - Math.pow(2, len - 1 - i) % M) * it % M) % M;
        res = (res + ((pow[i] - pow[len - i - 1]) % M) * it % M) % M;
    }

    return res;
};



let nums = [3304, 349, 2644, 1667, 3659, 374, 2186, 2080, 2688, 2193, 1691, 551, 852, 3480, 3465, 944, 1788, 2897, 3830, 148, 1110, 55, 3220, 446, 753, 2681, 1872, 2829, 3815, 2714, 3315, 2785, 3450, 955, 260, 3939, 1800, 1409, 1833, 1668, 3401, 2406, 494, 252, 315, 395, 239, 712, 65, 2125, 3427, 1674, 3804, 2057, 3911, 2796, 521, 2538, 3065, 3624, 2537, 3974, 1007, 2706, 2618, 3926, 192, 2347, 81, 1459, 620, 297, 1082, 3995, 3853, 564, 3374, 3974, 3487, 2140, 394, 2114, 1180, 3171, 1237, 1608, 942, 1892, 3986, 422, 1682, 3783, 3118, 427, 414, 145, 726, 1902, 733, 3980, 1327, 2000, 831, 2945, 2446, 1420, 3965, 3150, 3294, 2985, 3278, 751, 1731, 1685, 3520, 1469, 2164, 237, 3828, 2689, 3524, 721, 1541, 2340, 3813, 1474, 1647, 1033, 1493, 1645, 3492, 1947, 9, 2605, 865, 1503, 1378, 1231, 1737, 3502, 3352, 2332, 24, 689, 80, 945, 116, 2221, 1320, 3985, 3160, 645, 2157, 3607, 2362, 1852, 3627, 3253, 3792, 2125, 2500, 2471, 623, 518, 599, 227, 3137, 3662, 2496, 2927, 1568, 1949, 369, 1929, 1429, 3522, 2989, 566, 3528, 3088, 2134, 2758, 2375, 937, 3856, 2350, 1594, 1169, 2585, 2174, 1036, 1648, 3670, 2137, 3780, 244, 613, 322, 524, 1961, 1468, 1720, 257, 3116, 3125, 2086, 3032, 2738, 2131, 1708, 1173, 3208, 1513, 512, 2872, 1723, 414, 2214, 3608, 3336, 3453, 3485, 471, 1294, 471, 2188, 2447, 2223, 3860, 1332, 2099, 3560, 3594, 2019, 2001, 3870, 3122, 2411, 434, 2259, 928, 3625, 2375, 37, 1619, 2129, 1652, 2772, 1619, 3656, 3910, 678, 510, 1932, 3077, 3924, 1916, 3541, 692, 3370, 2289, 2347, 831, 2264, 1354, 1874, 972, 3464, 3461, 3224, 1490, 769, 3773, 3421, 2440, 1304, 793, 501, 1808, 2346, 933, 1034, 456, 3574, 436, 3252, 2533, 3682, 681, 1513, 2043, 1709, 1170, 838, 3187, 1832, 2127, 2856, 1335, 1780, 971, 770, 438, 3860, 448, 1284, 403, 1540, 575, 2853, 91, 1500, 3199, 2973, 1038, 2868, 3080, 2218, 2256, 3624, 3460, 2345, 1560, 1822, 1681, 358, 2457, 2117, 3647, 2737, 144, 1147, 2105, 2189, 1496, 277, 635, 981, 1795, 2712, 3526, 3227, 179, 3987, 2261, 3264, 3680, 3992, 2593, 3754, 2999, 878, 912, 3000, 3135, 3539, 1201, 2291, 1505, 2158, 271, 2988, 2261, 2903, 1034, 693, 712, 1880, 217, 361, 3360, 288, 1511, 2048, 3440, 3738, 3377, 3127, 1153, 1367, 3079, 622, 1159, 2411, 2000, 1929, 3624, 2875, 3679, 1330, 1121, 3754, 3835, 2599, 3323, 3585, 652, 2209, 1700, 1839, 267, 1262, 1025, 3027, 828, 3049, 2426, 488, 2644, 518, 3734, 3773, 3153, 2994, 1064, 2276, 3269, 2721, 333, 3133, 3160, 1028, 1706, 93, 724, 2651, 16, 236, 3507, 1595, 420, 1296, 2128, 2734, 206, 2567, 1731, 2637, 2319, 244, 1367, 836, 2798, 1863, 990, 3976, 1375, 27, 15, 1895, 1616, 3169, 3644, 574, 3168, 823, 2990, 3334, 3110, 3519, 3324, 1072, 1682, 29, 263, 1460, 3584, 1821, 2895, 2819, 1159, 3269, 1448, 3298, 3121, 3286, 2548, 1554, 2744, 608, 1309, 526, 630, 2237, 1256, 2057, 488, 3403, 10, 2382, 1934, 625, 1698, 1418, 3948, 1675, 2388, 823, 2749, 1943, 1229, 789, 1489, 1875, 551, 412, 2816, 437, 2843, 2673, 3950, 650, 3930, 2205, 1689, 3838, 1578, 3981, 510, 2026, 519, 3211, 2807, 3165, 84, 1929, 144, 1315, 1357, 3865, 3185, 3142, 893, 1659, 2093, 3659, 2433, 1201, 3021, 2007, 784, 3241, 2493, 1370, 879, 42, 909, 87, 173, 3986, 1012, 3308, 2134, 2921, 2463, 939, 1179, 317, 590, 3150, 1056, 1595, 2181, 1524, 2721, 2369, 2434, 441, 3113, 1242, 3049, 1807, 560, 2215, 178, 3790, 1106, 414, 3990, 48, 306, 2898, 1643, 1273, 1703, 887, 2554, 1952, 1781, 3094, 2351, 3288, 2350, 1627, 1149, 2767, 2613, 479, 3768, 1985, 75, 2495, 97, 1493, 2674, 3395, 408, 1816, 73, 1177, 2856, 3909, 3631, 3882, 675, 1554, 3198, 3897, 1178, 213, 1317, 2496, 1298, 3508, 1478, 1079, 1601, 3262, 1176, 1092, 1887, 184, 2167, 1154, 3856, 931, 3594, 145, 2818, 1630, 3247, 3312, 2928, 3004, 1941, 1692, 2918, 1444, 13, 1473, 484, 147, 2369, 3106, 3280, 2712, 3045, 32, 1901, 515, 188, 1264, 3552, 1031, 178, 1148, 2157, 1573, 204, 703, 907, 2414, 1733, 3956, 2753, 3842, 3291, 927, 477, 1424, 1005, 2306, 1911, 2431, 2344, 712, 2333, 3099, 3476, 2889, 3559, 1756, 2401, 379, 572, 2059, 2383, 1743, 146, 2998, 2410, 658, 2337, 2839, 3961, 2679, 954, 316, 1207, 922, 3840, 1301, 2203, 3461, 2187, 1997, 3110, 1202, 2004, 1129, 1956, 996, 1337, 2834, 3266, 705, 3832, 3545, 2836, 2792, 2820, 3673, 2529, 3551, 827, 1524, 2827, 2939, 1516, 3304, 1979, 1710, 2640, 1548, 210, 228, 1241, 2347, 364, 490, 2866, 3769, 2730, 2949, 1746, 3070, 3277, 1592, 1455, 3465, 1917, 2588, 2369, 528, 2832, 2355, 3279, 2769, 2578, 2905, 2302, 1143, 2256, 2183, 1224, 1078, 174, 3816, 1534, 903, 3256, 2788, 1760, 1905, 3583, 1222, 417, 2314, 456, 3815, 3492, 1088, 2494, 2369, 3405, 2332, 1365, 795, 709, 1528, 122, 3334, 2896, 3457, 3778, 2994, 2037, 2375, 1342, 1403, 2278, 1070, 3335, 674, 3181, 214, 839, 861, 1259, 2283, 2444, 2193, 373, 1719, 3632, 3752, 1192, 2514, 3208, 3723, 3306, 2721, 3843, 1711, 83, 1532, 1945, 3354, 849, 755, 846, 513, 3632, 41, 1004, 2136, 1426, 3734, 1895, 3583, 1549, 433, 735, 78, 788, 1932, 2990, 152, 363, 737, 1734, 1680, 2802, 1504, 2548, 226, 3086, 1658, 1571, 3324, 2524, 3654, 2620, 3405, 692, 797, 635, 812, 916, 2558, 3735, 2778, 3728, 3763, 2645, 1254, 2194, 2605, 626, 1817, 2586, 2642, 3779, 3992, 3231, 3448, 2525, 796, 599, 3785, 1329, 3069, 1027, 248, 3187, 26, 3555, 2732, 3958, 2117, 3487, 3890, 197, 3764, 2440, 1385, 1035, 3291, 2223, 2186, 134, 2329, 1505, 1510, 437, 2251, 1843, 292, 161, 2004, 2423, 1316, 2717, 3150, 3866, 3500, 3632, 2196, 3644, 866, 2965, 3372, 2677, 1076, 2481, 1986, 1623, 1044, 374, 113, 921, 3702, 3785, 199, 3041, 743, 3003, 3737, 3999, 2951, 1348, 3521, 461, 1549, 288, 3662, 2761, 282, 338, 2475, 1366, 3040, 1795, 587, 2175, 1412, 373, 3301, 3577, 2748, 3885, 2035, 3705, 3883, 888, 3482, 3738, 2958, 1453, 174, 1813, 3391, 504, 2981, 329, 2734, 1495, 1361, 3850, 3743, 742, 399, 3909, 1723, 2263, 1847, 1201, 3194, 2282, 1438, 3959, 1989, 1328, 3018, 2457, 3478, 309, 3057, 3242, 660, 3585, 2604, 1555, 2810, 3859, 839, 760, 1299, 427, 2436, 479, 13, 1236, 1113, 2305, 1008, 2854, 1398, 2882, 1461, 3101, 611, 404, 3332, 2032, 2951, 2904, 2978, 796, 1923, 220, 218, 3680, 1061, 1850, 3243, 3218, 2416, 2622, 3874, 2788, 2406, 3947, 552, 2922, 728, 782, 627, 1121, 319, 2476, 3650, 148, 1876, 1048, 499, 1609, 3826, 1438, 899, 2476, 1639, 1830, 2610, 331, 13, 3762, 3001, 1278, 1902, 3337, 658, 2405, 202, 1335, 1420, 3062, 3530, 1615, 3345, 993, 1406, 1180, 2439, 3810, 2147, 522, 2752, 1225, 3423, 2120, 3463, 2997, 2867, 3696, 2185, 3470, 1416, 1460, 1227, 1875, 2570, 3657, 1649, 1169, 3803, 3373, 3165, 2065, 800, 3845, 1233, 1592, 464, 2136, 2241, 387, 23, 3863, 2241, 1888, 362, 3976, 1377, 1694, 1995, 868, 20, 2012, 3080, 1626, 2927, 2084, 2786, 744, 2761, 301, 2404, 3226, 2929, 1514, 535, 546, 2345, 230, 1917, 2980, 3423, 347, 3754, 2710, 2228, 3993, 597, 2707, 1091, 522, 2218, 2931, 84, 3634, 2890, 3367, 1505, 3719, 1456, 1350, 2504, 284, 3808, 2206, 3242, 2146, 879, 2749, 3719, 3233, 1438, 1389, 2308, 1670, 14, 791, 3901, 3207, 3584, 3546, 266, 1742, 824, 425, 3235, 2705, 708, 2890, 645, 1533, 801, 745, 990, 2675, 3382, 869, 1808, 2666, 1176, 2047, 1394, 191, 632, 165, 241, 2782, 376, 3140, 3873, 3012, 1865, 143, 1452, 2207, 2557, 1477, 1878, 2935, 2162, 3385, 433, 1609, 3165, 2693, 3064, 480, 1269, 3509, 423, 3158, 2291, 3871, 1969, 264, 880, 3107, 1563, 786, 3914, 141, 1166, 2400, 2708, 1249, 1790, 967, 3562, 216, 744, 3941, 2663, 363, 3361, 884, 72, 851, 3260, 3695, 2016, 1692, 1679, 2166, 556, 2716, 65, 3571, 1352, 1803, 3244, 3824, 3711, 3074, 1606, 1257, 633, 3967, 2735, 858, 740, 890, 3113, 2018, 651, 2123, 1450, 12, 2067, 1446, 2096, 1831, 219, 3637, 3870, 2662, 3556, 3508, 2373, 3565, 3720, 232, 1070, 176, 3971, 108, 2576, 3534, 3192, 262, 1877, 2109, 807, 1841, 634, 237, 2770, 3703, 1839, 2427, 3303, 3300, 807, 3843, 3629, 1320, 3251, 1551, 3965, 2902, 2427, 3952, 197, 1427, 3085, 1674, 3488, 474, 1102, 1865, 1480, 816, 60, 2069, 1822, 2290, 1785, 2866, 3424, 3486, 562, 1749, 1938, 1798, 2102, 1237, 1306, 802, 3353, 3364, 2986, 68, 979, 3407, 555, 3316, 2242, 1284, 736, 3716, 3255, 3049, 2103, 1239, 3140, 140, 155, 43, 1917, 2277, 764, 725, 647, 463, 2663, 3512, 3984, 467, 1094, 1165, 1049, 2700, 1938, 3315, 757, 1161, 918, 1853, 975, 2966, 3916, 1896, 3816, 2486, 3653, 1139, 2421, 1058, 2650, 512, 3531, 2273, 3894, 822, 1123, 3552, 2956, 2761, 1180, 2375, 127, 192, 1951, 1924, 733, 1391, 513, 3172, 29, 1408, 1468, 1961, 1317, 3972, 2867, 371, 292, 3463, 1774, 2290, 2960, 2964, 2645, 2813, 1367, 2064, 3914, 1921, 2034, 2119, 2987, 1074, 69, 73, 2752, 3824, 3066, 1961, 2584, 122, 808, 2771, 2360, 1140, 3093, 2117, 390, 3652, 758, 3026, 1962, 907, 2613, 2987, 2778, 3380, 1461, 685, 3007, 685, 3099, 3506, 1, 2203, 451, 1924, 528, 815, 533, 3645, 704, 3663, 555, 1812, 2084, 1572, 2990, 2491, 3035, 1205, 3599, 2267, 302, 2845, 2965, 2798, 2906, 3530, 1231, 2705, 3509, 757, 824, 3501, 2903, 3904, 980, 2730, 23, 821, 1547, 2612, 3723, 2377, 443, 976, 2722, 2394, 2405, 3701, 3069, 1913, 2757, 2366, 3914, 1165, 3850, 2797, 2267, 1308, 3036, 131, 2078, 2481, 512, 2337, 3193, 2722, 463, 2622, 3224, 3498, 3175, 3933, 1882, 2663, 3382, 2702, 3574, 2180, 3766, 2365, 3002, 910, 2629, 919, 2387, 3252, 75, 3513, 316, 328, 1542, 1799, 1299, 350, 865, 2745, 2118, 3604, 3887, 687, 1335, 3040, 2227, 3921, 1922, 3971, 2550, 3709, 1438, 793, 601, 2869, 3480, 1490, 3853, 3549, 2095, 1586, 724, 554, 501, 3904, 2151, 608, 3583, 1497, 121, 450, 1753, 1396, 2637, 870, 1089, 3115, 369, 883, 901, 3539, 840, 919, 3540, 3747, 3605, 2751, 2740, 1772, 1554, 290, 1159, 1425, 2411, 424, 3282, 2654, 3839, 3223, 2377, 2982, 328, 506, 2670, 2792, 2614, 530, 2939, 795, 1210, 784, 2682, 2866, 706, 1294, 948, 1427, 3082, 3305, 195, 2241, 2077, 2711, 1648, 1520, 2237, 875, 3387, 1088, 458, 1179, 1063, 181, 3680, 1183, 1321, 359, 818, 3561, 1004, 1465, 2891, 1894, 1072, 3189, 3181, 2528, 1726, 3807, 3600, 761, 3696, 129, 1799, 2, 3589, 1699, 3090, 1227, 221, 2651, 718, 1842, 2887, 2449, 72, 2634, 70, 2255, 478, 3515, 277, 74, 2088, 275, 1552, 1149, 3827, 2588, 2514, 3768, 155, 1678, 3004, 573, 1305, 273, 3408, 2720, 2660, 207, 2057, 3251, 1173, 356, 2029, 859, 586, 283, 391, 3516, 3553, 1082, 1911, 205, 3074, 3647, 3948, 2783, 866, 3071, 2650, 1564, 959, 2271, 2334, 3261, 1061, 1620, 3348, 1997, 2206, 943, 1169, 1493, 2127, 116, 201, 1978, 868, 3382, 344, 3944, 673, 3247, 505, 3387, 921, 3398, 514, 664, 2375, 47, 1902, 2735, 2486, 2129, 3364, 3648, 112, 3929, 841, 2773, 3774, 989, 1791, 2013, 1960, 766, 310, 1929, 2732, 387, 2786, 1213, 3641, 47, 193, 2167, 1473, 3787, 3873, 3199, 2501, 3220, 954, 1312, 1285, 611, 859, 1392, 3979, 715, 1727, 1518, 2392, 1075, 3049, 958, 745, 3060, 695, 1675, 1008, 783, 237, 1312, 1659, 316, 1867, 2092, 1914, 2234, 2859, 921, 385, 270, 2663, 2340, 2590, 2963, 3621, 127, 3326, 1600, 191, 69, 1327, 1836, 289, 29, 577, 202, 212, 1923, 2600, 3842, 2810, 2343, 367, 1004, 2613, 473, 2666, 1123, 3589, 1936, 922, 1191, 60, 1584, 1934, 1852, 3963, 1438, 1267, 1740, 2407, 3756, 2228, 2085, 1688, 3722, 1250, 3902, 1757, 2711, 1815, 3611, 455, 358, 1299, 1454, 354, 3333, 153, 450, 1346, 3093, 218, 2884, 787, 3849, 243, 3354, 523, 367, 3300, 2668, 2041, 263, 1232, 1525, 3317, 3126, 3037, 970, 1701, 3400, 1667, 277, 1524, 3933, 2402, 3933, 2988, 1618, 2006, 133, 3502, 755, 1040, 2308, 1024, 3310, 989, 2826, 1074, 1314, 1678, 1198, 3765, 912, 3514, 3058, 2277, 2872, 1003, 2438, 2375, 4000, 1825, 3202, 3100, 3600, 1315, 2181, 3949, 215, 1873, 3007, 3827, 3892, 3589, 682, 631]
let res = sumSubseqWidths(nums)
console.log(res)