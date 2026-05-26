import html from 'bundle-text:./repository.html';
import { createTemplate, clone } from '../components/template.js';
import { fetchRepo, RateLimitError } from '../api.js';
import { createSpinner } from '../components/spinner.js';
import { createBackButton } from '../components/backButton.js';
import { createErrorBox } from '../components/errorBox.js';
import { createStatBadge } from '../components/statBadge.js';
import { icon } from '../utils/dom.js';

const template = createTemplate(html);

export async function renderRepository(app, { fullName }) {
  app.innerHTML = '';
  app.appendChild(createBackButton('#/'));
  app.appendChild(createSpinner());

  try {
    const repo = await fetchRepo(fullName);

    app.innerHTML = '';
    app.appendChild(
      createBackButton(`#/user/${encodeURIComponent(repo.owner.login)}`, `Voltar para ${repo.owner.login}`)
    );
    app.appendChild(_buildDetail(repo));
  } catch (err) {
    app.innerHTML = '';
    app.appendChild(createBackButton('#/'));
    const msg = err instanceof RateLimitError
      ? 'Limite de requisições da API do GitHub atingido. Tente novamente em alguns minutos.'
      : 'Repositório não encontrado.';
    app.appendChild(createErrorBox(msg));
  }
}

function _buildDetail(repo) {
  const el = clone(template);

  el.querySelector('.js-owner-avatar').src = repo.owner.avatar_url;
  el.querySelector('.js-owner-avatar').alt = repo.owner.login;
  el.querySelector('.js-owner-login').textContent = repo.owner.login;
  el.querySelector('.js-repo-name').textContent = repo.name;

  const desc = el.querySelector('.js-repo-desc');
  if (repo.description) {
    desc.textContent = repo.description;
  } else {
    desc.remove();
  }

  const stats = el.querySelector('.js-stats');
  const badges = [
    { iconClasses: 'bi-star-fill text-warning', text: `${repo.stargazers_count.toLocaleString()} estrelas` },
    repo.language && { iconClasses: 'bi-code-slash', text: repo.language },
    { iconClasses: 'bi-git', text: `${repo.forks_count.toLocaleString()} forks` },
    { iconClasses: 'bi-eye', text: `${repo.watchers_count.toLocaleString()} watchers` },
  ].filter(Boolean);

  badges.forEach(b => stats.appendChild(createStatBadge(b.iconClasses, b.text)));

  const link = el.querySelector('.js-repo-link');
  link.href = repo.html_url;

  const linkLabel = el.querySelector('.js-link-label');
  linkLabel.prepend(icon('bi-box-arrow-up-right', 'me-2'));
  linkLabel.append('Ver no GitHub');

  return el;
}
