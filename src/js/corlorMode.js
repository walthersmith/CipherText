/**
 * @author Walther Smith 
 * @version 1.0.0
 * @date 2024-07-11
 * @license MIT License
 */

/**
 * Toggles the theme based on the event target checked status.
 *
 * @param {Event} event - The event object triggering the theme toggle.
 * @return {void} No return value.
 */
function toggleTheme(event) {
  const theme = event.target.checked ? 'dark' : 'light';
  document.body.classList.remove('dark-mode', 'light-mode');
  document.body.classList.add(`${theme}-mode`);
  localStorage.setItem('theme', theme);
}

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.add(`${storedTheme}-mode`);
  themeToggle.checked = storedTheme === 'dark';
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const themeToggle = document.getElementById('theme-toggle');
  const newTheme = e.matches ? 'dark' : 'light';
  document.body.classList.remove('dark-mode', 'light-mode');
  document.body.classList.add(`${newTheme}-mode`);
  themeToggle.checked = e.matches;
});

export { toggleTheme };
