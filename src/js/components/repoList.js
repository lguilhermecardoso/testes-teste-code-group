import { createRepoCard } from './repoCard.js';

let currentSort = 'stars';
let currentOrder = 'desc';
let reposCache = [];
let listContainer = null;

export function renderRepoList(repos, container) {
  reposCache = repos;
  currentSort = 'stars';
  currentOrder = 'desc';
  listContainer = container;
  _render();
}

function _render() {
  listContainer.innerHTML = '';
  listContainer.appendChild(_buildControls());
  listContainer.appendChild(_buildCards());
}

function _buildControls() {
  const sorted_options = [
    { key: 'stars', label: 'Estrelas' },
    { key: 'name', label: 'Nome' },
    { key: 'updated_at', label: 'Atualização' },
  ];

  const wrapper = document.createElement('div');
  wrapper.className = 'd-flex align-items-center justify-content-between flex-wrap gap-2 mb-3';

  const counter = document.createElement('span');
  counter.className = 'text-muted';
  counter.style.fontSize = '0.875rem';
  counter.textContent = `${reposCache.length} repositório${reposCache.length !== 1 ? 's' : ''}`;

  const controls = document.createElement('div');
  controls.className = 'sort-controls';

  const label = document.createElement('span');
  label.className = 'text-muted me-1';
  label.style.fontSize = '0.82rem';
  label.textContent = 'Ordenar por:';
  controls.appendChild(label);

  sorted_options.forEach(({ key, label: btnLabel }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `btn btn-sm btn-sort ${currentSort === key ? 'btn-secondary' : 'btn-outline-secondary'}`;
    btn.textContent = btnLabel;
    btn.addEventListener('click', () => {
      if (currentSort === key) {
        currentOrder = currentOrder === 'desc' ? 'asc' : 'desc';
      } else {
        currentSort = key;
        currentOrder = key === 'name' ? 'asc' : 'desc';
      }
      _render();
    });
    controls.appendChild(btn);
  });

  const orderBtn = document.createElement('button');
  orderBtn.type = 'button';
  orderBtn.className = 'btn btn-sm btn-sort btn-outline-secondary ms-1';
  orderBtn.title = 'Inverter ordem';
  orderBtn.innerHTML = `<i class="bi bi-arrow-${currentOrder === 'desc' ? 'down' : 'up'}"></i>`;
  orderBtn.addEventListener('click', () => {
    currentOrder = currentOrder === 'desc' ? 'asc' : 'desc';
    _render();
  });
  controls.appendChild(orderBtn);

  wrapper.appendChild(counter);
  wrapper.appendChild(controls);
  return wrapper;
}

function _buildCards() {
  const sorted = [...reposCache].sort(_comparator());

  const list = document.createElement('div');
  list.className = 'd-flex flex-column gap-2';

  sorted.forEach(repo => list.appendChild(createRepoCard(repo)));

  return list;
}

function _comparator() {
  return (a, b) => {
    let valA, valB;

    if (currentSort === 'stars') {
      valA = a.stargazers_count;
      valB = b.stargazers_count;
    } else if (currentSort === 'name') {
      valA = a.name.toLowerCase();
      valB = b.name.toLowerCase();
    } else {
      valA = new Date(a.updated_at);
      valB = new Date(b.updated_at);
    }

    if (valA < valB) return currentOrder === 'asc' ? -1 : 1;
    if (valA > valB) return currentOrder === 'asc' ? 1 : -1;
    return 0;
  };
}
