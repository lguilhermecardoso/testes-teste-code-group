export function icon(...classes) {
  const el = document.createElement('i');
  el.className = ['bi', ...classes].join(' ');
  return el;
}
