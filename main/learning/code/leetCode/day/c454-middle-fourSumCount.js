/**
 * 给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] + C[k] + D[l] = 0。

为了使问题简单化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。所有整数的范围在 -228 到 228 - 1 之间，最终结果不会超过 231 - 1 。

例如:

输入:
A = [ 1, 2]
B = [-2,-1]
C = [-1, 2]
D = [ 0, 2]

输出:
2

解释:
两个元组如下:
1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/4sum-ii
 */

/**
* @param {number[]} A
* @param {number[]} B
* @param {number[]} C
* @param {number[]} D
* @return {number}
*/
var fourSumCount = function (A, B, C, D) {
    let result = 0;
    for (const a of A) {
        for (const b of B) {
            for (const c of C) {
                for (const d of D) {
                    if (a + b + c + d === 0) result++;
                }
            }
        }
    }
    return result;
};

/**
 * 参考官方解答
 */
var fourSumCount2 = function (A, B, C, D) {
    let result = 0;
    const sumAB = {};
    for (const a of A) {
        for (const b of B) {
            sumAB[a + b] = (sumAB[a + b] || 0) + 1;
        }
    }

    for (const c of C) {
        for (const d of D) {
            if (sumAB[-c - d]) {
                result += sumAB[-c - d];
            }
        }
    }
    return result;
};

console.log(fourSumCount2([1, 2], [-2, -1], [-1, 2], [0, 2]))