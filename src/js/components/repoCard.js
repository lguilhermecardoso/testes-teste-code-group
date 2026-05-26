import html from 'bundle-text:./repoCard.html';
import { createTemplate, clone } from './template.js';

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C#': '#178600',
  'C++': '#f34b7d',
  C: '#555555',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dart: '#00B4AB',
  Vue: '#41b883',
};

const template = createTemplate(html);

export function createRepoCard(repo) {
  const el = clone(template);

  el.href = `#/repo/${repo.full_name}`;
  el.querySelector('.js-name').textContent = repo.name;
  el.querySelector('.js-stars').textContent = repo.stargazers_count.toLocaleString();

  const desc = el.querySelector('.js-desc');
  if (repo.description) {
    desc.textContent = repo.description;
  } else {
    desc.remove();
  }

  const langBadge = el.querySelector('.js-lang-badge');
  if (repo.language) {
    const color = LANG_COLORS[repo.language] || '#8b8b8b';
    el.querySelector('.js-lang-dot').style.background = color;
    el.querySelector('.js-lang-name').textContent = repo.language;
  } else {
    langBadge.remove();
  }

  return el;
}
