import { on, startRouter } from './router.js';
import { renderHome } from './pages/home.js';
import { renderUser } from './pages/user.js';
import { renderRepository } from './pages/repository.js';

const app = document.getElementById('app');

on('/', () => renderHome(app));
on('/user/:username', ({ username }) => renderUser(app, { username }));
on('/repo/:owner/:repo', ({ owner, repo }) => renderRepository(app, { fullName: `${owner}/${repo}` }));

startRouter();
