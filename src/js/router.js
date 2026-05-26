const routes = {};

export function on(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  window.location.hash = path;
}

function resolve() {
  const hash = window.location.hash.slice(1) || '/';

  for (const [pattern, handler] of Object.entries(routes)) {
    const keys = [];
    const regexStr = pattern.replace(/:([^/]+)(\*)?/g, (_, key, wildcard) => {
      keys.push(key);
      return wildcard ? '(.+)' : '([^/]+)';
    });

    const match = hash.match(new RegExp(`^${regexStr}$`));

    if (match) {
      const params = {};
      keys.forEach((key, i) => {
        params[key] = decodeURIComponent(match[i + 1]);
      });
      handler(params);
      return;
    }
  }

  navigate('/');
}

export function startRouter() {
  window.addEventListener('hashchange', resolve);
  resolve();
}
