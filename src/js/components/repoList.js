import { createRepoCard } from './repoCard.js';

const PAGE_SIZES = [5, 10, 20];

let currentSort = 'stars';
let currentOrder = 'desc';
let currentPage = 1;
let pageSize = 10;
let reposCache = [];
let listContainer = null;

export function renderRepoList(repos, container) {
  reposCache = repos;
  currentSort = 'stars';
  currentOrder = 'desc';
  currentPage = 1;
  pageSize = 10;
  listContainer = container;
  _render();
}

function _render() {
  listContainer.innerHTML = '';
  listContainer.appendChild(_buildControls());
  listContainer.appendChild(_buildCards());
  listContainer.appendChild(_buildPagination());
}

function _buildControls() {
  const wrapper = document.createElement('div');
  wrapper.className = 'd-flex align-items-center justify-content-between flex-wrap gap-2 mb-3';

  const counter = document.createElement('span');
  counter.className = 'text-muted';
  counter.style.fontSize = '0.875rem';
  counter.textContent = `${reposCache.length} repositório${reposCache.length !== 1 ? 's' : ''}`;

  const rightSide = document.createElement('div');
  rightSide.className = 'd-flex align-items-center gap-2 flex-wrap';
  rightSide.appendChild(_buildPageSizeSelector());
  rightSide.appendChild(_buildSortControls());

  wrapper.appendChild(counter);
  wrapper.appendChild(rightSide);
  return wrapper;
}

function _buildPageSizeSelector() {
  const wrap = document.createElement('div');
  wrap.className = 'd-flex align-items-center gap-1';

  const label = document.createElement('span');
  label.className = 'text-muted';
  label.style.fontSize = '0.82rem';
  label.textContent = 'Exibir:';
  wrap.appendChild(label);

  PAGE_SIZES.forEach(size => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `btn btn-sm btn-sort ${pageSize === size ? 'btn-secondary' : 'btn-outline-secondary'}`;
    btn.textContent = size;
    btn.addEventListener('click', () => {
      pageSize = size;
      currentPage = 1;
      _render();
    });
    wrap.appendChild(btn);
  });

  return wrap;
}

function _buildSortControls() {
  const sortOptions = [
    { key: 'stars', label: 'Estrelas' },
    { key: 'name', label: 'Nome' },
    { key: 'updated_at', label: 'Atualização' },
  ];

  const wrap = document.createElement('div');
  wrap.className = 'sort-controls d-flex align-items-center gap-1';

  const label = document.createElement('span');
  label.className = 'text-muted';
  label.style.fontSize = '0.82rem';
  label.textContent = 'Ordenar:';
  wrap.appendChild(label);

  sortOptions.forEach(({ key, label: btnLabel }) => {
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
      currentPage = 1;
      _render();
    });
    wrap.appendChild(btn);
  });

  const orderBtn = document.createElement('button');
  orderBtn.type = 'button';
  orderBtn.className = 'btn btn-sm btn-sort btn-outline-secondary';
  orderBtn.title = 'Inverter ordem';
  orderBtn.innerHTML = `<i class="bi bi-arrow-${currentOrder === 'desc' ? 'down' : 'up'}"></i>`;
  orderBtn.addEventListener('click', () => {
    currentOrder = currentOrder === 'desc' ? 'asc' : 'desc';
    currentPage = 1;
    _render();
  });
  wrap.appendChild(orderBtn);

  return wrap;
}

function _buildCards() {
  const sorted = [...reposCache].sort(_comparator());
  const start = (currentPage - 1) * pageSize;
  const page = sorted.slice(start, start + pageSize);

  const list = document.createElement('div');
  list.className = 'd-flex flex-column gap-2';

  page.forEach(repo => list.appendChild(createRepoCard(repo)));

  return list;
}

function _buildPagination() {
  const totalPages = Math.ceil(reposCache.length / pageSize);

  const nav = document.createElement('nav');
  nav.className = 'mt-3';
  nav.setAttribute('aria-label', 'Navegação de páginas');

  if (totalPages <= 1) return nav;

  const ul = document.createElement('ul');
  ul.className = 'pagination pagination-sm justify-content-center mb-0';

  ul.appendChild(_pageItem('&laquo;', currentPage - 1, currentPage === 1));

  const range = _pageRange(currentPage, totalPages);
  range.forEach(p => {
    if (p === '…') {
      const li = document.createElement('li');
      li.className = 'page-item disabled';
      li.innerHTML = '<span class="page-link">…</span>';
      ul.appendChild(li);
    } else {
      ul.appendChild(_pageItem(p, p, false, p === currentPage));
    }
  });

  ul.appendChild(_pageItem('&raquo;', currentPage + 1, currentPage === totalPages));

  nav.appendChild(ul);
  return nav;
}

function _pageItem(label, targetPage, disabled, active = false) {
  const li = document.createElement('li');
  li.className = `page-item${disabled ? ' disabled' : ''}${active ? ' active' : ''}`;

  const btn = document.createElement(disabled ? 'span' : 'button');
  btn.className = 'page-link';
  btn.innerHTML = label;

  if (!disabled && !active) {
    btn.type = 'button';
    btn.addEventListener('click', () => {
      currentPage = targetPage;
      _render();
      listContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  li.appendChild(btn);
  return li;
}

function _pageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [];
  pages.push(1);

  if (current > 3) pages.push('…');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push('…');

  pages.push(total);
  return pages;
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
