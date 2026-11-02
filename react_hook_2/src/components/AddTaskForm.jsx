import { useId, useRef, useState } from 'react';

export function AddTaskForm({ onAdd }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const inputId = useId();

  function handleSubmit(e) {
    e.preventDefault();
    const clean = text.trim();
    if (!clean) return;
    onAdd(clean);
    setText('');
    inputRef.current.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="sr">Новая задача</label>
      <input
        id={inputId}
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Новая задача"
      />
      <button>Добавить</button>
    </form>
  );
}
