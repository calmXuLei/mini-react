// v1
// const oApp = document.querySelector('#app');

// const root = document.createElement('div');
// root.id = 'app-id';
// const oText = document.createTextNode('');
// oText.class = 'text';
// oText.nodeValue = 'hi-mini-react';

// root.append(oText);

// oApp.append(root);

// v2
/**
 * vdom -> {
 *   type: 'xxx',
 *   props: {
 *      id: xxx,
 *      ...,
 *      children
 *   }
 * }
 */
const TEXT_ELEMENT = 'TEXT_ELEMENT';

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  };
}

function createTextNode(text) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: []
    },
  };
}

function render(el, container) {
  // 1. 生成真实 DOM
  const dom =
    el.type === TEXT_ELEMENT
      ? document.createTextNode('')
      : document.createElement(el.type);

  // 2. 处理 props
  Object.keys(el.props).forEach((key) => {
    if (key !== 'children') {
      dom[key] = el.props[key];
    }
  });

  container.append(dom)
  // 3. 渲染
  const children = el.props.children;
  children.forEach(child => {
    render(child, dom)
  });
}

const oApp = document.querySelector('#app');
const vText = createTextNode('hi-minireact');
const el = createElement('div', { id: 'app-id'}, vText)

console.log(el);
render(el, oApp);
