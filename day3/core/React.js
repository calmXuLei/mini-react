const TEXT_ELEMENT = 'TEXT_ELEMENT';

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        const isTextNode =
          typeof child === 'string' || typeof child === 'number';
        return isTextNode ? createTextNode(child) : child;
      }),
    },
  };
}

function createTextNode(text) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(el, container) {
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el],
    },
  };

  root = nextWorkOfUnit;
}

function createDom(work) {
  return work.type === TEXT_ELEMENT
    ? document.createTextNode('')
    : document.createElement(work.type);
}

function updateProps(work, dom) {
  Object.keys(work.props).forEach((key) => {
    if (key !== 'children') {
      dom[key] = work.props[key];
    }
  });
}

function initChildren(work, children) {
  console.log(work, children);
  let prevChild = null;
  children.forEach((child, index) => {
    // 为了不破坏 vdom,因此新建一个对象
    const newWork = {
      type: child.type,
      props: child.props,
      child: null,
      parent: work,
      sibling: null,
      dom: null,
    };

    if (index === 0) {
      // child
      work.child = newWork;
    } else {
      // sibling
      prevChild.sibling = newWork;
    }
    prevChild = newWork;
  });
}

function performUnitOfWork(fiber) {
  const isFunctionComponent = typeof fiber.type === 'function';

  if (isFunctionComponent) {
    console.log('**function Component: ', fiber.type);
  }

  if (!fiber) return;
  if (!isFunctionComponent) {
    // 1. 创建 dom
    if (!fiber.dom) {
      const dom = (fiber.dom = createDom(fiber));
      // 3. 处理 props
      updateProps(fiber, dom);
    }
  }
  // 4. 建立 链表
  let children = [];
  children = isFunctionComponent
    ? [fiber.type(fiber.props)]
    : fiber.props.children;
  initChildren(fiber, children);

  // 5. 返回要处理的下一个节点
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }
}

let root = null;
let nextWorkOfUnit = null;
function workLoop(deadLine) {
  let shouldYield = false;
  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = performUnitOfWork(nextWorkOfUnit);
    shouldYield = deadLine.timeRemaining() < 1;
    if (!nextWorkOfUnit) {
      commitRoot();
    }
    requestIdleCallback(workLoop);
  }
}

requestIdleCallback(workLoop);

function commitRoot() {
  commitWork(root.child);
}

function commitWork(fiber) {
  // debugger;
  if (!fiber) return;
  let fiberParent = fiber.parent;
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent;
  }
  if (fiber.dom) {
    fiberParent.dom.append(fiber.dom);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

export default {
  render,
  createElement,
};
