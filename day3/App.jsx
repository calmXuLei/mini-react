import React from './core/React.js';
function Counter({ num }) {
  return <div>count: {num}</div>;
}

function CounterContainer() {
  return <Counter />;
}

function App() {
  return (
    <div>
      hi-mini-react
      <Counter num={10} />
      <Counter num={20} />
      {/* <CounterContainer /> */}
    </div>
  );
}

// console.log(App);
export default App;
