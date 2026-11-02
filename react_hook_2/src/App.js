import {
  useCallback, useDeferredValue, useMemo, useReducer, useRef, useState, useTransition,
} from 'react';
import { tasksReducer } from './tasksReducer.js';
import { useTheme } from './ThemeContext.jsx';
import { AddTaskForm } from './components/AddTaskForm.jsx';
import { SearchBox } from './components/SearchBox.jsx';
import { TaskList } from './components/TaskList.jsx';
import { ThemeToggle } from './components/ThemeToggle.jsx';

function makeTestTasks() {
  return Array.from({ length: 2000 }, (_, i) => ({
    id: 'test-' + Date.now() + '-' + i,
    text: 'Тестовая задача ' + (i + 1),
    done: false,
  }));
}

export default function App() {
  const { theme } = useTheme();
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [filter, setFilter] = useState('all');

  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [isPending, startTransition] = useTransition();
  const searchRef = useRef(null);

  const handleAdd = useCallback((text) => {
    dispatch({ type: 'add', task: { id: Date.now(), text, done: false } });
  }, []);
  const handleToggle = useCallback((id) => dispatch({ type: 'toggle', id }), []);
  const handleRemove = useCallback((id) => dispatch({ type: 'remove', id }), []);

  const visibleTasks = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return tasks.filter((t) => {
      const byFilter = filter === 'all' || (filter === 'done' ? t.done : !t.done);
      return byFilter && t.text.toLowerCase().includes(q);
    });
  }, [tasks, deferredQuery, filter]);

  const doneCount = useMemo(() => tasks.filter((t) => t.done).length, [tasks]);

  return (
    <div className={'app ' + theme}>
      <div className="card">
        <header className="top">
          <h1>Менеджер задач</h1>
          <ThemeToggle />
        </header>
        <AddTaskForm onAdd={handleAdd} />

        <div className="toolbar">
          <SearchBox ref={searchRef} value={query} onChange={setQuery} />
          <button onClick={() => searchRef.current.clear()}>Сбросить</button>
        </div>

        <div className="tabs">
          {[['all', 'Все'], ['active', 'Активные'], ['done', 'Готовые']].map(([key, label]) => (
            <button
              key={key}
              className={filter === key ? 'active' : ''}
              onClick={() => startTransition(() => setFilter(key))}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="muted">
          Всего: {tasks.length}, выполнено: {doneCount}
          {isPending && ' · обновляем…'}
        </p>
        <TaskList tasks={visibleTasks} onToggle={handleToggle} onRemove={handleRemove} />
        <div className="toolbar">
          <button onClick={() => dispatch({ type: 'clearDone' })}>Удалить выполненные</button>
          <button onClick={() => dispatch({ type: 'addMany', tasks: makeTestTasks() })}>+2000 тестовых</button>
          <button onClick={() => dispatch({ type: 'clearAll' })}>Удалить все</button>
        </div>
      </div>
    </div>
  );
}
