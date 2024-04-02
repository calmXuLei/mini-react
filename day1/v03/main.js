// v01
// const app = document.querySelector('#app');

// const oDiv = document.createElement('div');
// oDiv.id = 'app-id';

// const oText = document.createTextNode('');
// oText.nodeValue = 'mini-react';

// oDiv.append(oText);

// app.append(oDiv);

// v02
// 引入 vdom 虚拟dom, 本质就是 js 的一个对象
//  { type, props }

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

// const app = document.querySelector("#app");

// const oDiv = document.createElement(vDiv.type);
// oDiv.id = vDiv.props.id;

// const oText = document.createTextNode("");
// oText.nodeValue = vDiv.props.children.nodeValue;

// oDiv.append(oText);

// app.append(oDiv);

// v03
/**
 * 目标: 动态创建虚拟节点
 */
// const vText = {
//   type: "TEXT_ELEMENT",
//   nodeValue: "mini-react",
// };

function createTextElement(nodeValue) {
  return {
    type: 'TEXT_ELEMENT',
    nodeValue
  }
}

const vText = createTextElement('mini-react');

// const vDiv = {
//   type: "div",
//   props: {
//     id: "app-id",
//     children: vText,
//   },
// };

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children
    }
  }
}

const vDiv = createElement(
  'div', 
  {
    id: 'app-id',
  },
  vText
)

const app = document.querySelector("#app");

const oDiv = document.createElement(vDiv.type);
oDiv.id = vDiv.props.id;

const oText = document.createTextNode("");
oText.nodeValue = vDiv.props.children[0].nodeValue;

oDiv.append(oText);

app.append(oDiv);
