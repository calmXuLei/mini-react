import React from './core/React.js';

// const bar = <div>bar</div>;
// const foo = <p>foo</p>;

// v1
// function Bar() {
//   return <div>bar</div>
// }

// function Foo() {
//   return <p>foo</p>
// }

// v2

// function Foo () {
//   return (
//     <div>
//       Foo
//       <div>child</div>
//       <div>child2</div>
//     </div>
//   )
// }

// function Bar() {
//   console.log("Bar reRender");
//   return <div>bar</div>
// }

// let count = 10;
// let showBar = false;
// function Counter({ num }) {
//   const handleClick = () => {
//     showBar = !showBar;
//     React.update()
//   };

//   return (
//     <div>
//       count: {count}
//       <div>{ showBar ? <Bar /> : <Foo /> }</div>
//       <button onClick={handleClick}>showBar</button>
//     </div>
//   );
// }

// function Counter({ num }) {
//   console.log("Counter reRender");

//   const handleClick = () => {
//     showBar = !showBar;
//     React.update()
//   };

//   return (
//     <div>
//       <div>{ showBar && <Bar /> }</div>
//       count: {count}
//       {/* <div>{ showBar && <Bar /> }</div> */}
//       <button onClick={handleClick}>showBar</button>
//       {/* <div>{ showBar && <Bar /> }</div> */}
//     </div>
//   );
// }

// function App() {
//   console.log("App reRender");
//   return (
//     <div>
//       hi-mini-react
//       <Counter num={10} />
//     </div>
//   );
// }

// v3 优化更新 demo

let num = 0;
let num2 = 0;
let num3 = 0;
function Counter() {
  console.log('Counter update');
  const update = React.update();
  function handleClick() {
    num++;
    update();
  }
  return (
    <div>
      count: {num}
      <button onClick={handleClick}>click</button>
    </div>
  );
}

function Bar() {
  console.log('Bar update');
  const update = React.update();
  function handleClick() {
    num2++;
    update();
  }
  return (
    <div>
      count: {num2}
      <button onClick={handleClick}>click</button>
    </div>
  );
}

function Foo() {
  console.log('Foo update');
  const update = React.update();
  function handleClick() {
    num3++;
    update();
  }
  return (
    <div>
      count: {num3}
      <button onClick={handleClick}>click</button>
    </div>
  );
}

let numApp = 0;
function App() {
  console.log('App update');
  const update = React.update();
  function handleClick() {
    numApp++;
    update();
  }
  return (
    <div>
      hi-minireact
      {/* count: { numApp }
      <button onClick={ handleClick }>click</button> */}
      <div>
        <Counter />
        <Bar />
        <Foo />
      </div>
    </div>
  );
}

console.log(App);

export default App;
