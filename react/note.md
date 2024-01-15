# day3 task
1. 解决部分渲染问题
   1. 改为计算完dom树以后递归append到dom上
      1. 什么时候才算计算完？即当nextWork的时候就是已经计算完成
      2. 最后提交需要根节点
      3. 记得兄弟姐妹也要做append
2. 支持function component