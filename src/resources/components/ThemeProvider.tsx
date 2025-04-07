import { ThemeContext } from '../context/ThemeContext';
import {
  applyTheme,
  getStoredTheme,
  observeSystemThemeChange,
} from '../services/themeService';
import React, { useEffect, useState } from 'react';
import { Theme } from '../constants/availableThemes';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>('system');

  useEffect(() => {
    const stored = getStoredTheme();
    setThemeState(stored);
    applyTheme(stored);

    const unobserve = observeSystemThemeChange(() => {
      if (getStoredTheme() === 'system') {
        applyTheme('system');
      }
    });

    return unobserve;
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
