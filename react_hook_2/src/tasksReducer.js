export function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'add':
      return [...tasks, action.task];
    case 'toggle':
      return tasks.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case 'remove':
      return tasks.filter((t) => t.id !== action.id);
    case 'clearDone':
      return tasks.filter((t) => !t.done);
    case 'clearAll':
      return [];
    case 'addMany':
      return [...tasks, ...action.tasks];
    default:
      throw new Error('Неизвестное действие: ' + action.type);
  }
}
