/**
 * 给你一个整数 n ，请你找出并返回第 n 个 丑数 。

丑数 就是只包含质因数 2、3 和/或 5 的正整数。

 

示例 1：

输入：n = 10
输出：12
解释：[1, 2, 3, 4, 5, 6, 8, 9, 10, 12] 是由前 10 个丑数组成的序列。
示例 2：

输入：n = 1
输出：1
解释：1 通常被视为丑数。
 

提示：

1 <= n <= 1690

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/ugly-number-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber2 = function (n) {
  if (n == 1) return 1;

  return result;
};

const isChou = function (num, chouList = []) {
  if (num % 2 !== 0 && num % 3 !== 0 && num % 5 !== 0) return false;
  if (chouList.indexOf(num) !== -1) return true;
  if (num === 2 || num === 3 || num === 5 || num === 0) return true;
  return isChou(num / 5) || isChou(num / 3) || isChou(num / 2);
};

/**
 * 题解 + 动态规划
 *  https://leetcode-cn.com/problems/ugly-number-ii/solution/chou-shu-ii-by-leetcode-solution-uoqd/
 */

var nthUglyNumber = function (n) {
  const chouList = [undefined,1];
  // pi有资格同i相乘的最小丑数的位置, 见https://leetcode-cn.com/problems/ugly-number-ii/solution/san-zhi-zhen-fang-fa-de-li-jie-fang-shi-by-zzxn/
  let p2 = 1,
    p3 = 1,
    p5 = 1;
  for (let i = 2; i <= n; i++) {
    const dp2 = chouList[p2] * 2;
    const dp3 = chouList[p3] * 3;
    const dp5 = chouList[p5] * 5;
    chouList[i] = Math.min(Math.min(dp2, dp3), dp5);
    if(chouList[i] == dp2){
      p2++;
    }
    if(chouList[i] == dp3){
      p3++;
    }
    if(chouList[i] == dp5){
      p5++;
    }
  }
  return chouList[n];
};

console.log(nthUglyNumber(10));
