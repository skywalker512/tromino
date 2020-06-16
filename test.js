/**
 * 找到数组中第一个为 true 的下标
 * @param {Array} arr 
 */
function indexOfFirstTruthy(arr) {
    for (var k = 0; k < arr.length; k++) {
        if (arr[k])
            return k;
    }
    return -1;
}

// 变换数组，确定按照顺时针进行的时候下一个空位的位置
const offsets = [[0, -1], [0, 0], [-1, 0], [-1, -1], [0, -1], [0, 0]];

class TreeGrid {
    /**
     * 构建函数
     * @param {Number} size 整体正方形大小
     * @param {Number} x 列坐标
     * @param {Number} y 行坐标
     */
    constructor(size, x, y) {
        this.size = size;
        this.root = []; // node 的根节点
        this.items = []; // 最后排列结果
        this._setCell(this.root, this.size, x, y);
    }

    /**
     * 确定 Tromino 以何种方式摆放，同时也确定了空位的位置
     * @param {Array} node 空出来的位置
     * @param {Number} size 格子的大小
     * @param {*} x 列坐标
     * @param {*} y 行坐标
     */
    _setCell(node, size, x, y) {
        let half = Math.floor(size / 2) // 向下取一半
        let index = 0; // 默认左上角
        if (x >= half) { index += 1; x -= half; } // 将空位置按顺时针移动一位，并将列坐标移动到所求格子中
        if (y >= half) { index = 3 - index; y -= half; } // 将空位上下位置进行颠倒，并将行坐标移动到所求格子中
        if (size > 2) { // 递归调用条件判断，就是没有到最小的单位可以空位
            if (!node[index]) node[index] = []; // 创建一个记录放置空位的数组
            this._setCell(node[index], half, x, y) // 递归调用
        } else
            node[index] = true;
    }


    /**
     * 创建 item 确定填充所用的数组
     * @param {Array} node 空出来的位置 (传递到这里来的一定是处理好了的)
     * @param {*} size 格子的大小
     * @param {*} left 列坐标
     * @param {*} top 行坐标
     */
    _fill(node, size, left, top) {
        let index = indexOfFirstTruthy(node) // 找到 node 中第一个 true 即是顺时针时的空位
        let half = Math.floor(size / 2);
        // 推入最终的填充数组中
        this.items.push([left + half, top + half, index]);

        // 计算下一个空位位置，并完成相应 node 的 创建
        offsets.slice(index, index + 3).forEach((delta) => {
            this._setCell(node, size, half + delta[0], half + delta[1]);
        });

        if (size > 2) { // 递归调用结束条件
            this._fill(node[0], half, left, top);
            this._fill(node[1], half, left + half, top);
            this._fill(node[2], half, left + half, top + half);
            this._fill(node[3], half, left, top + half);
        }
    }

    fill() {
        this._fill(this.root, this.size, 0, 0);
        return this.items;
    }
}

console.log(new TreeGrid(4, 0, 0).fill());