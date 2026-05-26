import userHtml from 'bundle-text:./skeletonUser.html';
import repoCardHtml from 'bundle-text:./skeletonRepoCard.html';
import { createTemplate, clone } from './template.js';

const userTemplate = createTemplate(userHtml);
const repoCardTemplate = createTemplate(repoCardHtml);

export function createUserSkeleton() {
  return clone(userTemplate);
}

export function createReposSkeleton(count = 5) {
  const wrap = document.createElement('div');
  wrap.className = 'd-flex flex-column gap-2';
  for (let i = 0; i < count; i++) {
    wrap.appendChild(clone(repoCardTemplate));
  }
  return wrap;
}
