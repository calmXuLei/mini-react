const TEXT_ELEMENT_TYPE = "TEXT_ELEMENT";

function createTextElement(nodeValue) {
  return {
    type: TEXT_ELEMENT_TYPE,
    props: {
      nodeValue,
      children: []
    },
  };
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "string" ? createTextElement(child) : child;
      }),
    },
  };
}

function render(vdom, container) {
  // 1. 创建对应真实 DOM
  const dom =
    vdom.type === TEXT_ELEMENT_TYPE
      ? document.createTextNode("")
      : document.createElement(vdom.type);

  // 2. 处理 非 children 的 props
  Object.keys(vdom.props).forEach((key) => {
    if (key !== "children") {
      dom[key] = vdom.props[key];
    }
  });

  // 3.处理 children
  const children = vdom.props.children;
  children.forEach(child => {
    render(child, dom);
  })

  // 4. 真实DOM渲染到页面
  container.append(dom);
}

export default {
  createTextElement,
  createElement,
  render
};
