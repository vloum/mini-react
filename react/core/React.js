let root = null
const TXT = 'TEXT_ELEMENT'

function createTextNode(text) {
  return {
    type: TXT,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        console.log("createElement--child--", child);

        if(!child) {
          return createTextNode('undefined')
        }

        const isText = typeof child === "string" || typeof child === "number"

        return isText ? createTextNode(child) : child;
      }),
    },
  };
}

function isFunctionComponent(type) {
  return typeof type === 'function'
}

function render(el, container) {
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el],
    },
  };

  root = nextWorkOfUnit
}

function createDom(type) {
  return type === TXT
    ? document.createTextNode("")
    : document.createElement(type);
}
function updateDomAttribute(dom, props) {
  Object.keys(props).forEach((key) => {
    if (key !== "children") {
      dom[key] = props[key];
    }
  });
}

function initFiber(fiber, children){
  // 记录上一个执行的节点，设置它的sibling指向
  let preWork = null;
  children.forEach((child, index) => {
    // 下一个work
    const newWork = {
      type: child?.type,
      dom: null,
      parent: fiber,
      props: child?.props,
      firstChild: null,
      sibling: null,
    };
    // 处理第一个孩子
    if (index === 0) {
      fiber.firstChild = newWork;
    } else {
      // 这里很妙啊，循环的每一次都会跟新preWork,因为指针指向一样，所以在更新sibling的时候更新了newWork的sibling
      preWork.sibling = newWork;
    }

    preWork = newWork;
  });
}

function commitRoot(root){
  commitWork(root.firstChild)
}

// 递归添加dom
function commitWork(fiber){
  if(!fiber) return;

  // 一直往上找到存在dom的parent
  let fiberParent = fiber.parent
  while(!fiberParent.dom) {
    fiberParent = fiberParent.parent
  }

  if(fiber.dom) {
    fiberParent.dom.append(fiber.dom)
  }

  commitWork(fiber.firstChild)
  commitWork(fiber.sibling)
}

// 渲染任务任务移至performWorkOffUnit,原来的render负责数据初始化调配
function performWorkOfUnit(fiber) {
  console.log('fiber--', fiber)

  const isComponent = isFunctionComponent(fiber.type)
  // 避免空节点
  if (!fiber.dom && !isComponent) {
    // 1.构建节点
    const dom = (fiber.dom = createDom(fiber.type));
    // 2.设置节点属性
    updateDomAttribute(dom, fiber.props);
  }

  // 3. vdom转链表,处理子节点
  const children = isComponent ? [fiber.type(fiber.props)] : fiber.props.children
  initFiber(fiber,children)

  // 以上已经处理了一个任务了，下面需要返回下一个任务
  // 先子级，后兄弟，后父级的兄弟
  if (fiber.firstChild) {
    return fiber.firstChild;
  }

  if (fiber.sibling) {
    return fiber.sibling;
  }

  return fiber.parent?.sibling;
}

/**
 * 1.空闲执行 https://developer.mozilla.org/zh-CN/docs/Web/API/IdleDeadline
 * 2.一开始有想到这个nextWorkOfUnit 的数据结构是什么吗？
 * 所以我们需要思考这个nextWorkOfUnit需要什么数据先设定work数据流，从原来的vdom数据结构转为链表执行
 *
 * @param nextWorkOfUnit {
 *  dom: 当前节点
 *  props: {
 *    ...object,
 *    children: []
 * }
 *  type: 节点类型
 *  parent: 父节点
 *  firstChild: 第一个孩子节点
 *  sibling: 兄弟节点
 * }
 */
let nextWorkOfUnit = null;
function workLoop(IdleDeadline) {
  // 任务锁
  let lock = false;
  while (!lock && nextWorkOfUnit) {
    // 执行任务，并返回下一个执行任务
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit);

    // 当有空闲的时候才开锁
    lock = IdleDeadline.timeRemaining() < 1;
  }

  if(!nextWorkOfUnit && root) {
    commitRoot(root)
    root = null
  }

  window.requestIdleCallback(workLoop);
}

const React = {
  createElement,
  createTextNode,
  render,
};
workLoop();

export default React;
