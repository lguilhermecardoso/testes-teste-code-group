import html from 'bundle-text:./userCard.html';
import { createTemplate, clone } from './template.js';

const template = createTemplate(html);

export function createUserCard(user) {
  const el = clone(template);

  el.querySelector('.js-avatar').src = user.avatar_url;
  el.querySelector('.js-avatar').alt = `Avatar de ${user.login}`;
  el.querySelector('.js-name').textContent = user.name || user.login;
  el.querySelector('.js-login').textContent = `@${user.login}`;
  el.querySelector('.js-followers').textContent = formatCount(user.followers);
  el.querySelector('.js-following').textContent = formatCount(user.following);

  const bio = el.querySelector('.js-bio');
  if (user.bio) {
    bio.textContent = user.bio;
  } else {
    bio.remove();
  }

  const emailWrapper = el.querySelector('.js-email-wrapper');
  if (user.email) {
    el.querySelector('.js-email').textContent = user.email;
  } else {
    emailWrapper.remove();
  }

  return el;
}

function formatCount(n) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n;
}
