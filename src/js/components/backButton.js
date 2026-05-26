import html from 'bundle-text:./backButton.html';
import { createTemplate, clone } from './template.js';
import { icon } from '../utils/dom.js';

const template = createTemplate(html);

export function createBackButton(href, label = 'Voltar') {
  const el = clone(template);

  const link = el.querySelector('.js-link');
  link.href = href;

  const labelEl = el.querySelector('.js-label');
  labelEl.prepend(icon('bi-arrow-left', 'me-1'));
  labelEl.append(label);

  return el;
}
