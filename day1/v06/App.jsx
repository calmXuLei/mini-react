import React from './core/React.js'

// const vText1 = React.createTextElement('hello-');
// const vText2 = React.createTextElement("mini-react");
// const App = React.createElement(
//   "div",
//   {
//     id: "app-id",
//   },
//   vText1,
//   vText2
// );

function cApp () {
  return <div id="app-id">hi-mini-react</div>
}
const App = <div>hi-mini-react</div>

console.log(cApp);
// cApp 处理会默认 调用我们的 React.createElement
// ƒ cApp() {
//   return /* @__PURE__ */ React.createElement("div", { id: "app-id"}, "hi-mini-react");
// }


export default App;