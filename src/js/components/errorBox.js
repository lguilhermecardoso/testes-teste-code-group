import html from 'bundle-text:./errorBox.html';
import { createTemplate, clone } from './template.js';

const template = createTemplate(html);

export function createErrorBox(msg) {
  const el = clone(template);
  const p = el.querySelector('.js-msg');

  if (msg instanceof Node) {
    p.appendChild(msg);
  } else {
    p.textContent = msg;
  }

  return el;
}
