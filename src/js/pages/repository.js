import { fetchRepo } from '../api.js';
import { createSpinner } from '../components/spinner.js';

export async function renderRepository(app, { fullName }) {
  app.innerHTML = '';
  app.appendChild(_backButton('#/'));
  app.appendChild(createSpinner());

  try {
    const repo = await fetchRepo(fullName);

    app.innerHTML = '';
    app.appendChild(_backButton(`#/user/${encodeURIComponent(repo.owner.login)}`, `Voltar para ${repo.owner.login}`));
    app.appendChild(_buildDetail(repo));
  } catch {
    app.innerHTML = '';
    app.appendChild(_backButton('#/'));
    app.appendChild(_errorBox('Repositório não encontrado.'));
  }
}

function _buildDetail(repo) {
  const card = document.createElement('div');
  card.className = 'repo-detail-card';

  const ownerRow = document.createElement('div');
  ownerRow.className = 'd-flex align-items-center gap-2 mb-1';
  ownerRow.innerHTML = `
    <img src="${repo.owner.avatar_url}" alt="${repo.owner.login}" style="width:28px;height:28px;border-radius:50%">
    <span class="text-muted" style="font-size:0.9rem">${repo.owner.login}</span>
  `;

  const title = document.createElement('h2');
  title.className = 'repo-title mb-2';
  title.textContent = repo.name;

  card.appendChild(ownerRow);
  card.appendChild(title);

  if (repo.description) {
    const desc = document.createElement('p');
    desc.className = 'text-muted mb-3';
    desc.textContent = repo.description;
    card.appendChild(desc);
  }

  card.appendChild(_buildStats(repo));

  const link = document.createElement('a');
  link.href = repo.html_url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'btn btn-dark';
  link.innerHTML = '<i class="bi bi-box-arrow-up-right me-2"></i>Ver no GitHub';
  card.appendChild(link);

  return card;
}

function _buildStats(repo) {
  const badges = [
    { icon: 'bi-star-fill text-warning', text: `${repo.stargazers_count.toLocaleString()} estrelas` },
    repo.language && { icon: 'bi-code-slash', text: repo.language },
    { icon: 'bi-git', text: `${repo.forks_count.toLocaleString()} forks` },
    { icon: 'bi-eye', text: `${repo.watchers_count.toLocaleString()} watchers` },
  ].filter(Boolean);

  const wrap = document.createElement('div');
  wrap.className = 'd-flex flex-wrap gap-2 mb-4';

  badges.forEach(({ icon, text }) => {
    const badge = document.createElement('span');
    badge.className = 'stat-badge';
    badge.innerHTML = `<i class="bi ${icon}"></i> ${text}`;
    wrap.appendChild(badge);
  });

  return wrap;
}

function _backButton(href, label = 'Voltar') {
  const wrap = document.createElement('div');
  wrap.className = 'mb-3';

  const a = document.createElement('a');
  a.href = href;
  a.className = 'btn btn-sm btn-outline-secondary';
  a.innerHTML = `<i class="bi bi-arrow-left me-1"></i>${label}`;

  wrap.appendChild(a);
  return wrap;
}

function _errorBox(msg) {
  const div = document.createElement('div');
  div.className = 'error-box';
  div.innerHTML = `<span class="icon">😕</span><p>${msg}</p>`;
  return div;
}
