import React from '../core/React.js';

export function Todos() {
  const [inputValue, setInputValue] = React.useState('');
  const [todos, setTodos] = React.useState([
    {
      id: crypto.randomUUID(),
      title: '吃饭',
    },
    {
      id: crypto.randomUUID(),
      title: '睡觉',
    },
    {
      id: crypto.randomUUID(),
      title: '打游戏',
    },
  ]);

  const handleAdd = () => {
    addTodo(inputValue);
    setInputValue('');
  };

  function addTodo(title) {
    setTodos((todos) => [...todos, { title }]);
  }

  return (
    <div>
      <h1>TODOS</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {...todos.map((todo) => {
          return <li key={todo.id}>{todo.title}</li>;
        })}
      </ul>
    </div>
  );
}
