import logoDark from '../assets/imgs/logo-dark.svg';
import logoLight from '../assets/imgs/logo-light.svg';

type ThemeType = 'dark' | 'light';

const defaultTheme: ThemeType = 'dark';

export const themeCheckbox: HTMLInputElement =
  document.querySelector('#theme-button input[type="checkbox"]')!;

themeCheckbox.onclick = () => {
  let theme: ThemeType = 'dark';

  if (!themeCheckbox.checked) {
    theme = 'light';
  }

  setTheme(theme);
};

window.onload = () => {
  const htmlTag = document.documentElement;

  const theme: ThemeType =
    window.localStorage.getItem('theme') as ThemeType ?? defaultTheme;

  htmlTag.removeAttribute('class');
  htmlTag.classList.add(theme);

  setTheme(theme);
};

function setTheme(theme: ThemeType) {
  const logoImg = theme === 'dark' ? logoDark : logoLight;

  const htmlTag = document.documentElement;
  const logo = document.getElementById('logo')!;

  htmlTag.removeAttribute('class');
  htmlTag.classList.add(theme);

  themeCheckbox.checked = theme === 'dark';
  logo.setAttribute('src', logoImg);

  window.localStorage.setItem('theme', theme);
}
