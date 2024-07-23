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
  if (event.target.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
  }
});


window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const themeToggle = document.getElementById('theme-toggle');
  if (e.matches) {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
  } else {
    document.body.classList.remove('dark-mode');
    themeToggle.checked = false;
  }
});
  
export {toggleTheme}