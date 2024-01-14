## 思路
1. 解决render 性能问题，采用浏览器api，Window.requestIdleCallback()，在空闲时间内render
2. 对原有的树形拆解为链式结构，拆解成多任务执行


## 总结
1. 对fiber有初步认知，印象最深刻是那个dom结构转链表那块
2. 浏览器api，空闲回调，window.requestIdleCallback()实际应用
3. 课程最后的问题，我想到的是加一个渲染完成判断,每个节点存必要的信息，如果超过了某个时间节点，那么主动执行perform
4. [github](https://github.com/vloum/mini-react)
