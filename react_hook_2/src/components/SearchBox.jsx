import { useImperativeHandle, useRef } from 'react';

export function SearchBox({ value, onChange, ref }) {
  const inputRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      focus() {
        inputRef.current.focus();
      },
      clear() {
        onChange('');
        inputRef.current.focus();
      },
    }),
    [onChange]
  );

  return (
    <input
      ref={inputRef}
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Поиск по задачам"
    />
  );
}
