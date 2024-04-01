import React from '../core/React.js';

export function Todos() {
  const [inputValue, setInputValue] = React.useState('');
  const [todos, setTodos] = React.useState([
    {
      id: crypto.randomUUID(),
      title: '吃饭',
      done: false,
    },
    {
      id: crypto.randomUUID(),
      title: '睡觉',
      done: true,
    },
    {
      id: crypto.randomUUID(),
      title: '打游戏',
      done: false,
    },
  ]);

  const handleAdd = () => {
    addTodo(inputValue);
    setInputValue('');
  };

  const handleRemove = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleToggle = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }

      return todo;
    });

    setTodos(newTodos);
  };

  function addTodo(title) {
    setTodos((todos) => [...todos, { title, id: crypto.randomUUID() }]);
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
          return (
            <li>
              {/* {todo.title}
              <button onClick={() => handleRemove(todo.id)}>remove</button>
              <button onClick={() => handleToggle(todo.id)}>
                {todo.done ? 'cancel' : 'done'}
              </button> */}

              <TodoItem
                todo={todo}
                handleRemove={handleRemove}
                handleToggle={handleToggle}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function TodoItem({ todo, handleRemove, handleToggle }) {
  return (
    <div className={todo.done ? 'done' : 'active'}>
      {todo.title}
      <button onClick={() => handleRemove(todo.id)}>remove</button>
      <button onClick={() => handleToggle(todo.id)}>
        {todo.done ? 'cancel' : 'done'}
      </button>
    </div>
  );
}
