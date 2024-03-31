import React from './core/React.js';

let count = 10;
function Counter({ num }) {
  const handleClick = () => {
    console.log('click');
    count++;
    React.update();
  };

  return (
    <div>
      count: {count}
      <button onClick={handleClick}>click</button>
    </div>
  );
}

function CounterContainer() {
  return <Counter />;
}

function App() {
  return (
    <div>
      hi-mini-react
      <Counter num={10} />
    </div>
  );
}

export default App;
