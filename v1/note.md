## 实现路程
1. 简单实现
2. 设计dom树的数据结构，然后重构
3. 重构数据结构，改为function形式动态创建dom树
4. 重构渲染元素，实现render
   1. 这里使用render 递归创建节点，如果量级很大，页面会出现卡顿现象，这是因为单线程流，按树形结构构建节点后面的节点会排队，出现渲染延迟还有阻塞其他js的执行
5. 重构，模拟react api
   
### 基础认知
```js
import ReactDom from '……'
import App from '……'

const rootDom = document.getElementById('app')
ReactDom.createRoot(rootDom).render(App)