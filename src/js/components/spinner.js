import html from 'bundle-text:./spinner.html';
import { createTemplate, clone } from './template.js';

const template = createTemplate(html);

export function createSpinner() {
  return clone(template);
}
