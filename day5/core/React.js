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

function createDom(work) {
  return work.type === TEXT_ELEMENT
    ? document.createTextNode('')
    : document.createElement(work.type);
}

function updateProps(dom, nextProps, prevProps) {
  // 2. next 无, prev 有 => 删除
  Object.keys(prevProps).forEach((key) => {
    if (key !== 'children') {
      if (!(key in nextProps)) {
        dom.removeAttribute(key);
      }
    }
  });

  // 1. next 有, prev 无 => 新增
  // 3. next、prev 都存在 => 更新
  Object.keys(nextProps).forEach((key) => {
    if (key !== 'children') {
      if (nextProps[key] !== prevProps[key]) {
        if (key.startsWith('on')) {
          const eventName = key.slice(2).toLowerCase();
          dom.removeEventListener(eventName, prevProps[key]);
          dom.addEventListener(eventName, nextProps[key]);
        } else {
          dom[key] = nextProps[key];
        }
      }
    }
  });
}

function render(el, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [el],
    },
  };

  nextWorkOfUnit = wipRoot;
}

function update() {
  const currentFiber = wipFiber;

  return () => {
    // wipRoot = {
    //   dom: currentRoot.dom,
    //   props: currentRoot.props,
    //   alternate: currentRoot,
    // };

    wipRoot = {
      ...currentFiber,
      alternate: currentFiber,
    };

    nextWorkOfUnit = wipRoot;
  };
}

function reconcileChildren(fiber, children) {
  let oldFiber = fiber.alternate?.child;
  let prevChild = null;

  children.forEach((child, index) => {
    const isSameType = oldFiber && child.type === oldFiber.type;
    if (typeof child === 'function') {
      child = child();
    }
    let newWork;
    if (isSameType) {
      // update
      newWork = {
        type: child.type,
        props: child.props,
        child: null,
        parent: fiber,
        sibling: null,
        dom: oldFiber.dom,
        alternate: oldFiber,
        effectTag: 'update',
      };
    } else {
      if (child) {
        newWork = {
          type: child.type,
          props: child.props,
          child: null,
          parent: fiber,
          sibling: null,
          dom: null,
          effectTag: 'placement',
          insertBeforeNode: null,
        };
      }

      deleitons.push(oldFiber);
      if (oldFiber?.sibling) {
        // 如果 旧几点存在 兄弟节点，插入节点
        newWork.insertBeforeNode = oldFiber.sibling;
      }
    }

    if (oldFiber && oldFiber.sibling) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      fiber.child = newWork;
    } else {
      prevChild.sibling = newWork;
    }
    prevChild = newWork;
  });
}

function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  // console.log(wipFiber);
  let children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function updateComponent(fiber) {
  if (!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber));
    updateProps(dom, fiber.props, {});
  }
  let children = fiber.props.children;
  reconcileChildren(fiber, children);
}

function performUnitOfWork(fiber) {
  if (!fiber) return;
  const isFunctionComponent = typeof fiber.type === 'function';

  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateComponent(fiber);
  }

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }
}

// work in progressing
let wipRoot = null;
let currentRoot = null;
let nextWorkOfUnit = null;
let wipFiber = null;
let deleitons = [];
function workLoop(deadLine) {
  let shouldYield = false;
  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = performUnitOfWork(nextWorkOfUnit);
    if (wipRoot?.sibling?.type === nextWorkOfUnit?.type) {
      console.log('hit', wipFiber, nextWorkOfUnit);
      nextWorkOfUnit = null;
    }
    shouldYield = deadLine.timeRemaining() < 1;
  }
  if (!nextWorkOfUnit) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function commitDeletion(fiber) {
  if (!fiber) return;
  let fiberParent = fiber?.parent;
  while (fiberParent && !fiberParent.dom) {
    fiberParent = fiberParent.parent;
  }
  if (typeof fiber.type !== 'function') {
    fiberParent.dom.removeChild(fiber.dom);
  } else {
    fiberParent.dom.removeChild(fiber.child.dom);
  }
}

function commitRoot() {
  wipRoot && commitWork(wipRoot.child);
  deleitons.forEach(commitDeletion);
  deleitons = [];
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) return;
  let fiberParent = fiber.parent;
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent;
  }

  if (fiber.effectTag === 'update') {
    const oldFiber = fiber.alternate;
    updateProps(fiber.dom, fiber.props, oldFiber.props);
  } else if (fiber.effectTag === 'placement') {
    if (fiber.dom) {
      if (fiber.insertBeforeNode) {
        // 需插入
        fiberParent.dom.insertBefore(fiber.dom, fiber.insertBeforeNode.dom);
      } else {
        // 直接追加
        fiberParent.dom.append(fiber.dom);
      }
    }
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

export default {
  render,
  update,
  createElement,
};
