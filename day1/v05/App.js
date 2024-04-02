import React from './core/React.js'

const vText1 = React.createTextElement('hello-');
const vText2 = React.createTextElement("mini-react");
// const vDiv = React.createElement(
//   "div",
//   {
//     id: "app-id",
//   },
//   vText1,
//   vText2
// );

const vDiv = React.createElement(
    "div",
    {
      id: "app-id",
    },
    'hi-',
    'min-react',
    );


export default vDiv;