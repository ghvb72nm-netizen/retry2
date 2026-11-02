import { memo } from 'react';

export const TaskItem = memo(function TaskItem({ task, onToggle, onRemove }) {
  console.log('Рисуем задачу:', task.text);
  return (
    <li className={task.done ? 'done' : ''}>
      <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
      <span>{task.text}</span>
      <button onClick={() => onRemove(task.id)}>×</button>
    </li>
  );
});
