
/**
 * 
 * @param {我们把数组 A 中符合下列属性的任意连续子数组 B 称为 “山脉”：

B.length >= 3
存在 0 < i < B.length - 1 使得 B[0] < B[1] < ... B[i-1] < B[i] > B[i+1] > ... > B[B.length - 1]
（注意：B 可以是 A 的任意子数组，包括整个数组 A。）

给出一个整数数组 A，返回最长 “山脉” 的长度。

如果不含有 “山脉” 则返回 0。

 

示例 1：

输入：[2,1,4,7,3,2,5]
输出：5
解释：最长的 “山脉” 是 [1,4,7,3,2]，长度为 5。
示例 2：

输入：[2,2,2]
输出：0
解释：不含 “山脉”。
 

提示：

0 <= A.length <= 10000
0 <= A[i] <= 10000

链接：https://leetcode-cn.com/problems/longest-mountain-in-array
 */
/**
 * @param {number[]} A
 * @return {number}
 */
var longestMountain = function (A) {
    if (!A || A.length < 3) return 0;
    let max = 0;
    let tempMax = 1;
    let findBigger = true;
    for (let i = 1; i < A.length; i++) {
        if (findBigger) {
            if (A[i] > A[i - 1]) {
                tempMax++;
            } else if (A[i] === A[i - 1]) {
                tempMax = 1;
            } else {
                findBigger = tempMax > 1 ? false : true;
            }
        }
        if(!findBigger){
            if (A[i] < A[i - 1]) {
                tempMax++;
            } else if (A[i] >= A[i - 1]) {
                findBigger = true;
                if(tempMax > max && tempMax > 2){
                    max = tempMax
                }
                tempMax = 1;
            } 
        }
        console.log(A[i], i, tempMax);
        
    }
    if(tempMax > max && tempMax > 2 && !findBigger){
        return tempMax
    }
    return max;
};

console.log(longestMountain([875,884,239,731,723,685]));

