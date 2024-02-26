'use client'

import { useTheme } from 'next-themes'
import { TbMoonFilled, TbMoonStars } from 'react-icons/tb'

import styles from './ToggleTheme.module.css'

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <div className={`d-flex align-items-center gap-10 ${styles.toggleTheme}`}>
      <input
        type="checkbox"
        id="toggle-theme"
        onChange={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        className={styles.toggleTheme_input}
      />
      <label htmlFor="toggle-theme" className={styles.toggleTheme_label}>
        <TbMoonStars />
        <TbMoonFilled />
      </label>
    </div>
  )
}

export default ThemeToggle
