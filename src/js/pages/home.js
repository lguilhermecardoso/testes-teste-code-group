import html from 'bundle-text:./home.html';
import { createTemplate, clone } from '../components/template.js';
import { navigate } from '../router.js';
import { debounce } from '../utils/debounce.js';

const template = createTemplate(html);

export function renderHome(app) {
  app.innerHTML = '';
  app.appendChild(clone(template));

  const form = app.querySelector('#search-form');
  const input = app.querySelector('#search-input');
  const errorEl = app.querySelector('#search-error');

  input.focus();

  const search = username => {
    if (!username) return;
    errorEl.style.display = 'none';
    navigate(`/user/${encodeURIComponent(username)}`);
  };

  input.addEventListener('input', debounce(e => {
    const value = e.target.value.trim();
    if (value.length >= 2) search(value);
  }, 450));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const username = input.value.trim();

    if (!username) {
      errorEl.textContent = 'Digite um nome de usuário.';
      errorEl.style.display = 'block';
      return;
    }

    search(username);
  });
}
