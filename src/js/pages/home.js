import { navigate } from '../router.js';

export function renderHome(app) {
  app.innerHTML = `
    <div class="search-wrapper">
      <h1>GitHub Explorer</h1>
      <p>Busque um usuário para ver o perfil e os repositórios.</p>
      <form id="search-form">
        <div class="input-group">
          <input
            id="search-input"
            type="text"
            class="form-control form-control-lg"
            placeholder="ex: torvalds"
            autocomplete="off"
            spellcheck="false"
          />
          <button class="btn btn-dark btn-lg" type="submit">
            <i class="bi bi-search"></i>
          </button>
        </div>
        <div id="search-error" class="text-danger mt-2 small" style="display:none"></div>
      </form>
    </div>
  `;

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
