// v03
/**
 * 目标: 动态创建虚拟节点
 */
// const vText = {
//   type: "TEXT_ELEMENT",
//   nodeValue: "mini-react",
// };

// const vDiv = {
//   type: "div",
//   props: {
//     id: "app-id",
//     children: vText,
//   },
// };

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
      children: children.map(child => {
        return typeof child === 'string' 
                            ? createTextElement(child)
                            : child;
      }),
    },
  };
}



function render(vdom, container) {
  console.log(47, vdom);
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

  // 3. 存在 children 处理 chilren
  const children = vdom.props.children;
  if (children) {
    children.forEach((child) => {
      render(child, dom);
    });
  }

  // 4. 真实DOM渲染到页面
  container.append(dom);
}

const app = document.querySelector("#app");
const vText1 = createTextElement('hello-');
const vText2 = createTextElement("mini-react");
const vDiv = createElement(
  "div",
  {
    id: "app-id",
  },
  'mini-react',
  vText1,
  vText2
);

render(vDiv, app);
