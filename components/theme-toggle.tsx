"use client";

import { MoonIcon, SunIcon } from "./icons";
import styles from "./theme-toggle.module.css";

export function ThemeToggle() {
  const handleClick = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Switch colour theme"
      className={styles.toggle}
    >
      <MoonIcon className={styles.moon} />
      <SunIcon className={styles.sun} />
    </button>
  );
}
