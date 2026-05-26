export function createTemplate(html) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html.trim();
  return tpl;
}

export function clone(template) {
  return template.content.cloneNode(true).firstElementChild;
}
