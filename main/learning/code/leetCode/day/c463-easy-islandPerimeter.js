

/**
 * 给定一个包含 0 和 1 的二维网格地图，其中 1 表示陆地 0 表示水域。

网格中的格子水平和垂直方向相连（对角线方向不相连）。整个网格被水完全包围，但其中恰好有一个岛屿（或者说，一个或多个表示陆地的格子相连组成的岛屿）。

岛屿中没有“湖”（“湖” 指水域在岛屿内部且不和岛屿周围的水相连）。格子是边长为 1 的正方形。网格为长方形，且宽度和高度均不超过 100 。计算这个岛屿的周长。

 
https://leetcode-cn.com/problems/island-perimeter/
示例 :

输入:
[[0,1,0,0],
 [1,1,1,0],
 [0,1,0,0],
 [1,1,0,0]]

输出: 16

解释: 它的周长是下面图片中的 16 个黄色的边：

 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function (grid) {
    if (!grid) return 0;
    let result = 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == 1) {
                if (i == 0 || grid[i - 1][j] == 0) result += 1;
                if (j == 0 || grid[i][j - 1] == 0) result += 1;
                if (i == grid.length - 1 || grid[i + 1][j] == 0) result += 1;
                if (j == grid[0].length - 1 || grid[i][j + 1] == 0) result += 1;
            }
        }
    }
    return result;
};

// 题解, 深度优先遍历

var islandPerimeter2 = function (grid) {
    if (!grid) return null;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 1) {
                return dfs(grid, i, j)
                // console.log(grid[i][j])
            }
        }
    }
    return 0;
};

const dfs = (grid, i, j) => {
    if (i < 0 || j < 0 || i > grid.length - 1 || j > grid[0].length - 1 || grid[i][j] == 0) {
        return 1;
    }
    if (grid[i][j] === 1) {
        grid[i][j] = 2;
        return dfs(grid, i - 1, j) + dfs(grid, i + 1, j) + dfs(grid, i, j - 1) + dfs(grid, i, j + 1);
    }
    return 0;
}

console.log(islandPerimeter2(
    [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0]
    ]
));