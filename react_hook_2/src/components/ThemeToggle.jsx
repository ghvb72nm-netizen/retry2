import { useTheme } from '../ThemeContext.jsx';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? 'Тёмная' : 'Светлая'}
    </button>
  );
}
