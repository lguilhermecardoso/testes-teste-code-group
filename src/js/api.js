import axios from 'axios';

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

export async function fetchUser(username) {
  const { data } = await github.get(`/users/${username}`);
  return data;
}

export async function fetchRepos(username) {
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

  return allRepos;
}

export async function fetchRepo(fullName) {
  const { data } = await github.get(`/repos/${fullName}`);
  return data;
}
