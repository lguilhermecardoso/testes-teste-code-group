import html from 'bundle-text:./statBadge.html';
import { createTemplate, clone } from './template.js';

const template = createTemplate(html);

export function createStatBadge(iconClasses, text) {
  const el = clone(template);
  el.querySelector('.js-icon').className = `bi ${iconClasses}`;
  el.querySelector('.js-text').textContent = text;
  return el;
}
