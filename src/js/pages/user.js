import { fetchUser, fetchRepos, RateLimitError } from '../api.js';
import { createUserCard } from '../components/userCard.js';
import { renderRepoList } from '../components/repoList.js';
import { createUserSkeleton, createReposSkeleton } from '../components/skeleton.js';
import { createBackButton } from '../components/backButton.js';
import { createErrorBox } from '../components/errorBox.js';

export async function renderUser(app, { username }) {
  app.innerHTML = '';
  app.appendChild(createBackButton('#/'));
  app.appendChild(_buildSkeletonLayout());

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
    app.innerHTML = '';
    app.appendChild(createBackButton('#/'));

    if (err instanceof RateLimitError) {
      app.appendChild(createErrorBox(_rateLimitMsg(err.resetAt)));
    } else {
      app.appendChild(createErrorBox(
        err.response?.status === 404
          ? _notFoundMsg(username)
          : 'Erro ao conectar com a API do GitHub. Tente novamente.'
      ));
    }
  }
}

function _buildSkeletonLayout() {
  const row = document.createElement('div');
  row.className = 'row g-4';

  const colProfile = document.createElement('div');
  colProfile.className = 'col-md-4';
  colProfile.appendChild(createUserSkeleton());

  const colRepos = document.createElement('div');
  colRepos.className = 'col-md-8';
  colRepos.appendChild(createReposSkeleton(6));

  row.appendChild(colProfile);
  row.appendChild(colRepos);
  return row;
}

function _notFoundMsg(username) {
  const frag = document.createDocumentFragment();
  frag.append('Usuário ');
  const strong = document.createElement('strong');
  strong.textContent = username;
  frag.append(strong, ' não encontrado.');
  return frag;
}

function _rateLimitMsg(resetAt) {
  if (!resetAt) return 'Limite de requisições da API do GitHub atingido. Tente novamente em alguns minutos.';

  const minutes = Math.ceil((resetAt - Date.now()) / 60_000);
  return `Limite de requisições da API do GitHub atingido. Tente novamente em ${minutes} minuto${minutes !== 1 ? 's' : ''}.`;
}
