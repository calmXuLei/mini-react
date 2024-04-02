import React from "./React.js";

function createRoot(container) {
  const render = (el) => {
    React.render(el, container)
  }

  return {
    render
  }
}

export default {
  createRoot
}