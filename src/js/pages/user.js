import { fetchUser, fetchRepos } from '../api.js';
import { createUserCard } from '../components/userCard.js';
import { renderRepoList } from '../components/repoList.js';
import { createSpinner } from '../components/spinner.js';
import { createBackButton } from '../components/backButton.js';
import { createErrorBox } from '../components/errorBox.js';

function _notFoundMsg(username) {
  const frag = document.createDocumentFragment();
  frag.append('Usuário ');
  const strong = document.createElement('strong');
  strong.textContent = username;
  frag.append(strong, ' não encontrado.');
  return frag;
}

export async function renderUser(app, { username }) {
  app.innerHTML = '';
  app.appendChild(createBackButton('#/'));
  app.appendChild(createSpinner());

  try {
    const [user, repos] = await Promise.all([
      fetchUser(username),
      fetchRepos(username),
    ]);

    app.innerHTML = '';
    app.appendChild(createBackButton('#/'));

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
      ? _notFoundMsg(username)
      : 'Erro ao conectar com a API do GitHub. Tente novamente.';

    app.innerHTML = '';
    app.appendChild(createBackButton('#/'));
    app.appendChild(createErrorBox(msg));
  }
}
