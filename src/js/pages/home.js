import html from 'bundle-text:./home.html';
import { createTemplate, clone } from '../components/template.js';
import { navigate } from '../router.js';

const template = createTemplate(html);

export function renderHome(app) {
  app.innerHTML = '';
  app.appendChild(clone(template));

  const form = app.querySelector('#search-form');
  const input = app.querySelector('#search-input');
  const errorEl = app.querySelector('#search-error');

  input.focus();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const username = input.value.trim();

    if (!username) {
      errorEl.textContent = 'Digite um nome de usuário.';
      errorEl.style.display = 'block';
      return;
    }

    errorEl.style.display = 'none';
    navigate(`/user/${encodeURIComponent(username)}`);
  });
}
