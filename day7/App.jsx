import React from './core/React.js';

function Counter() {
  const [count, setCount] = React.useState(0);
  const [num, setNum] = React.useState(1);

  const handleAddCount = () => {
    setCount((c) => c + 1);
  };

  const handleAddNum = () => {
    setNum(20);
  };

  React.useEffect(() => {
    console.log('count', count);
    return () => {
      console.log('cleanup count');
    }
  }, [count]);

React.useEffect(() => {
  console.log('num', num);
  return () => {
    console.log('cleanup num');
  }
}, [num])


  React.useEffect(() => {
    // console.log('init');
    return () => {
      console.log('cleanup 0');
    }
  }, []);

  return (
    <div>
      <div>count: {count}</div>
      <button onClick={handleAddCount}>add count</button>
      <div>num: {num}</div>
      <button onClick={handleAddNum}>add num</button>
    </div>
  );
}

function App() {
  return (
    <div>
      hi-minireact
      <div>
        <Counter />
      </div>
    </div>
  );
}

console.log(App);

export default App;
