import { useEffect, useState } from 'react';
import Switch from 'react-switch';

const setDark = () => {
  localStorage.setItem('theme', 'dark');
  document.documentElement.setAttribute('data-theme', 'dark');
};

const setLight = () => {
  localStorage.setItem('theme', 'light');
  document.documentElement.setAttribute('data-theme', 'light');
};

const storedTheme = localStorage.getItem('theme');

const prefersDark =
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const defaultDark =
  storedTheme === 'dark' || (storedTheme === null && prefersDark);

if (defaultDark) {
  setDark();
}

const DarkMode = () => {
  const [themeCheck, setThemeCheck] = useState(false);

  const toggleTheme = () => {
    if (themeCheck) {
      setLight();
      setThemeCheck(!themeCheck);
    } else {
      setDark();
      setThemeCheck(!themeCheck);
    }
  };
  useEffect(() => {
    if (storedTheme === 'light') {
      setThemeCheck(false);
    } else {
      setThemeCheck(true);
    }
  }, []);
  return (
    <Switch
      onChange={toggleTheme}
      checked={themeCheck}
      height={20}
      width={40}
      onColor={'#4267b2'}
    />
  );
};

export default DarkMode;
