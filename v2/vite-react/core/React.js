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

const React = {
  createElement,
  createTextNode,
  render
}

export default React