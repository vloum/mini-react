const rootEl = document.getElementById("root");

// step1 简单实现
// function step1() {

//   // 这里多设置一层便于理解和设计dom
//   const appEl = document.createElement("div");
//   appEl.id = "app";

//   const textEl = document.createTextNode();
//   textEl.nodeValue = "app";

//   appEl.append(textEl);
//   rootEl.appendChild(appEl);
// }

// step2 设计dom树的数据结构，然后重构

// function step2() {
//   const textElement = {
//     type: "TEXT_ELEMENT",
//     props: {
//       nodeValue: "app",
//       children: [],
//     },
//   };

//   const domType = {
//     type: "div",
//     props: {
//       id: "app",
//       children: [textElement],
//     },
//   };

//   // 这里多设置一层便于理解和设计dom
//   const appEl = document.createElement(domType.type);
//   appEl.id = domType.props.id;

//   const textEl = document.createTextNode("");
//   textEl.nodeValue = textElement.props.nodeValue;

//   appEl.append(textEl);
//   rootEl.appendChild(appEl);
// }

// step3 动态创建dom树
function createTextNode(text) {
  return {
    type: "TEXT_ELEMENT",
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
        console.log("child--", child);
        return typeof child === "string" ? createTextNode(child) : child;
      }),
    },
  };
}
// function step3() {

//   const textElement = createTextNode('app')

//   const APP = createElement('div', { id: 'app' }, textElement)

//   const appEl = document.createElement(APP.type);
//   appEl.id = APP.props.id;

//   const textEl = document.createTextNode("");
//   textEl.nodeValue = textElement.props.nodeValue;

//   appEl.append(textEl);
//   rootEl.appendChild(appEl);
// }

// step3()

// step4 重构渲染元素，提炼创建方法
function render(el, container) {
  const dom =
    el.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(el.type);

  // 设置元素attribute
  Object.keys(el.props).forEach((key) => {
    if (key !== "children") {
      dom[key] = el.props[key];
    }
  });

  // 处理子节点
  el.props.children.forEach((element) => {
    render(element, dom);
  });

  container.append(dom);

  return container
}

const textElement = createTextNode("app");
const APP = createElement("div", { class: "app" }, "哈哈哈", "-haha");

// render(APP, rootEl);

// step5 重构模拟react api

const ReactDom = {
  createRoot(root) {
    return {
      render(app) {
        return render(app, root);
      },
    };
  },
};

const reactDom = ReactDom.createRoot(rootEl).render(APP)

console.log(reactDom)
