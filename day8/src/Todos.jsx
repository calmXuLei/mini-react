import React from '../core/React.js';

export function Todos() {
  const [inputValue, setInputValue] = React.useState('');
  const [todos, setTodos] = React.useState([]);
  const [currentTodos, setCurrentTodos] = React.useState([]);
  const [type, setType] = React.useState('all');

  React.useEffect(() => {
    console.log('useEffect1');
    setTodos(JSON.parse(localStorage.getItem('todos') || '[]'));
  });

  React.useEffect(() => {
    const todos = getNewTodosByType();
    console.log(todos);
    setCurrentTodos(todos);
  }, [type, todos]);


  function getNewTodosByType() {
    switch (type) {
      case 'all':
        return todos;
      case 'done':
        return todos.filter((todo) => todo.done);
      case 'active':
        return todos.filter((todo) => !todo.done);
      default:
        break;
    }
  }

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

  const handleSave = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleRadioChange = (e) => {
    console.log(e.target.value);
    setType(e.target.value);
  };

  function addTodo(title) {
    setTodos((todos) => [
      ...todos,
      { title, id: crypto.randomUUID(), done: false },
    ]);
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
      <button onClick={handleSave}>save</button>
      <br />
      <div>
        <input
          type="radio"
          id="all"
          name="type"
          value="all"
          checked
          onChange={handleRadioChange}
        />
        <label for="all">all</label> |
        <input
          type="radio"
          id="done"
          name="type"
          value="done"
          onChange={handleRadioChange}
        />
        <label for="done">done</label> |
        <input
          type="radio"
          id="active"
          name="type"
          value="active"
          onChange={handleRadioChange}
        />
        <label for="active">active</label>
      </div>

      <ul>
        {...currentTodos.map((todo) => {
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
                onChange={handleRadioChange}
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
