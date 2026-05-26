import axios from 'axios';

export class RateLimitError extends Error {
  constructor(resetAt) {
    super('rate_limit');
    this.resetAt = resetAt;
  }
}

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

github.interceptors.response.use(null, err => {
  if (err.response?.status === 403) {
    const resetHeader = err.response.headers['x-ratelimit-reset'];
    const resetAt = resetHeader ? new Date(resetHeader * 1000) : null;
    throw new RateLimitError(resetAt);
  }
  throw err;
});

const cache = new Map();

export async function fetchUser(username) {
  const key = `user:${username}`;
  if (cache.has(key)) return cache.get(key);

  const { data } = await github.get(`/users/${username}`);
  cache.set(key, data);
  return data;
}

export async function fetchRepos(username) {
  const key = `repos:${username}`;
  if (cache.has(key)) return cache.get(key);

  const perPage = 100;
  let page = 1;
  let allRepos = [];

  while (true) {
    const { data } = await github.get(`/users/${username}/repos`, {
      params: { per_page: perPage, page },
    });
    allRepos = allRepos.concat(data);
    if (data.length < perPage) break;
    page++;
  }

  cache.set(key, allRepos);
  return allRepos;
}

export async function fetchRepo(fullName) {
  const key = `repo:${fullName}`;
  if (cache.has(key)) return cache.get(key);

  const { data } = await github.get(`/repos/${fullName}`);
  cache.set(key, data);
  return data;
}
