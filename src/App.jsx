import { useState, useEffect, useReducer, useRef } from 'react'
import './App.css'
import { LocalStorageManagement } from './utils/Localstorage';
import { ThemeManagement } from './utils/Theme';
import TaskCard from './components/TaskCard';

function App() {
  const inputRef = useRef(null);
  const themeManagement = new ThemeManagement();
  const [theme, setTheme] = useState(themeManagement.getTheme())
  const database = new LocalStorageManagement("TASK_APP");

  function TASK_REDUCER(TASKS, ACTION) {
    switch (ACTION.type) {
      case 'ADD':
        return [...TASKS, {
          id: crypto.randomUUID(),
          content: ACTION.content,
          checked: false
        }];
      case 'UPDATE':
        return TASKS.map(item => item.id == ACTION.id ? {
          ...item,
          checked: !item.checked
        } : item);
      case 'DELETE':
        return TASKS.filter(item => item.id !== ACTION.id);
      default:
        break;
    }
  }
  const initalTasks = database.getData();
  const [tasks, dispatch] = useReducer(TASK_REDUCER, initalTasks);

  function changeMode() {
    setTheme(themeManagement.setTheme(theme == 'theme-light' ? 'theme-dark' : 'theme-light'))
  }

  useEffect(() => {
    database.saveData(tasks);
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value) {
      dispatch({ type: 'ADD', content: inputRef.current.value });
      inputRef.current.value = '';
    }
  }

  const DELETE = (id) => confirm('Are you really want to delete this task?') && dispatch({ type: 'DELETE', id })

  return (
    <div id='container' className={theme || ""}>
      <button id='toggle' onClick={() => changeMode()}>{theme == 'theme-dark' ? '☀️' : '🌙'}</button>
      <form onSubmit={addTask}>
        <input type="text" placeholder='What needs to get done?' autoFocus tabIndex={0} ref={inputRef} />
        <ul>
          {
            tasks && tasks.map(item => <TaskCard key={item.id} Task={item} Action={dispatch} Delete={DELETE} />)
          }
        </ul>
        <div>
          <span><strong>{tasks.length}</strong> items</span>
          <span><strong>{tasks.filter(item=>item.checked).length}</strong> completeds</span>
        </div>
      </form>
    </div>
  )
}

export default App
