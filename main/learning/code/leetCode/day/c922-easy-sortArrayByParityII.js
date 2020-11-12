/**
 * 给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。

对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。

你可以返回任何满足上述条件的数组作为答案。

 

示例：

输入：[4,2,5,7]
输出：[4,5,2,7]
解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。
 

提示：

2 <= A.length <= 20000
A.length % 2 == 0
0 <= A[i] <= 1000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sort-array-by-parity-ii
 */


/**
* @param {number[]} A
* @return {number[]}
*/
var sortArrayByParityII = function (A = []) {
    let single = 1;
    for (let double = 0; double < A.length - 1 ; double += 2) {
        if (A[double] % 2 === 1) {
            for (; single < A.length; single += 2) {
                if (A[single] % 2 === 0) {
                    const temp = A[single];
                    A[single] = A[double];
                    A[double] = temp;
                    break;
                }
            }
        }
        if (single >= A.length || double >= A.length - 1) break;
    }
    return A;
};

console.log(sortArrayByParityII([4,2,5,7,5,78,1,2,3,4]))

