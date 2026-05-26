import { fetchUser, fetchRepos } from '../api.js';
import { createUserCard } from '../components/userCard.js';
import { renderRepoList } from '../components/repoList.js';
import { createSpinner } from '../components/spinner.js';

export async function renderUser(app, { username }) {
  app.innerHTML = '';
  app.appendChild(_backButton('#/'));
  app.appendChild(createSpinner());

  try {
    const [user, repos] = await Promise.all([
      fetchUser(username),
      fetchRepos(username),
    ]);

    app.innerHTML = '';
    app.appendChild(_backButton('#/'));

    const row = document.createElement('div');
    row.className = 'row g-4';

    const colProfile = document.createElement('div');
    colProfile.className = 'col-md-4';
    colProfile.appendChild(createUserCard(user));

    const colRepos = document.createElement('div');
    colRepos.className = 'col-md-8';

    row.appendChild(colProfile);
    row.appendChild(colRepos);
    app.appendChild(row);

    renderRepoList(repos, colRepos);
  } catch (err) {
    const msg = err.response?.status === 404
      ? `Usuário <strong>${username}</strong> não encontrado.`
      : 'Erro ao conectar com a API do GitHub. Tente novamente.';

    app.innerHTML = '';
    app.appendChild(_backButton('#/'));
    app.appendChild(_errorBox(msg));
  }
}

function _backButton(href) {
  const wrap = document.createElement('div');
  wrap.className = 'mb-3';

  const a = document.createElement('a');
  a.href = href;
  a.className = 'btn btn-sm btn-outline-secondary';
  a.innerHTML = '<i class="bi bi-arrow-left me-1"></i>Voltar';

  wrap.appendChild(a);
  return wrap;
}

function _errorBox(msg) {
  const div = document.createElement('div');
  div.className = 'error-box';
  div.innerHTML = `<span class="icon">😕</span><p>${msg}</p>`;
  return div;
}
