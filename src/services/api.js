import axios from 'axios'

export class RateLimitError extends Error {
  constructor(resetAt) {
    super('GitHub API rate limit exceeded')
    this.name = 'RateLimitError'
    this.resetAt = resetAt
  }
}

export class NotFoundError extends Error {
  constructor(resource) {
    super(`"${resource}" não foi encontrado`)
    this.name = 'NotFoundError'
  }
}

export class NetworkError extends Error {
  constructor() {
    super('Erro de conexão. Verifique sua internet.')
    this.name = 'NetworkError'
  }
}

function requestTimingMiddleware() {
  return {
    onFulfilled(config) {
      config.metadata = { startTime: Date.now() }
      return config
    },
  }
}

function authMiddleware() {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  return {
    onFulfilled(config) {
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    },
  }
}

function responseTimingMiddleware() {
  return {
    onFulfilled(response) {
      if (import.meta.env.DEV) {
        const ms = Date.now() - (response.config.metadata?.startTime ?? 0)
        console.debug(
          `[API] ${response.config.method?.toUpperCase()} ${response.config.url} — ${ms}ms`
        )
      }
      return response
    },
  }
}

function rateLimitMiddleware() {
  return {
    onRejected(error) {
      if (error.response?.status === 403) {
        const resetHeader = error.response.headers['x-ratelimit-reset']
        const resetAt = resetHeader ? new Date(Number(resetHeader) * 1000) : null
        throw new RateLimitError(resetAt)
      }
      return Promise.reject(error)
    },
  }
}

function notFoundMiddleware() {
  return {
    onRejected(error) {
      if (error.response?.status === 404) {
        const url = error.config?.url ?? 'Recurso'
        throw new NotFoundError(url)
      }
      return Promise.reject(error)
    },
  }
}

function networkErrorMiddleware() {
  return {
    onRejected(error) {
      if (!error.response && error.code === 'ERR_NETWORK') {
        throw new NetworkError()
      }
      return Promise.reject(error)
    },
  }
}

function retryMiddleware(maxRetries = 2) {
  return {
    onRejected(error) {
      const config = error.config
      if (!config) return Promise.reject(error)

      config.__retryCount = (config.__retryCount ?? 0) + 1
      if (config.__retryCount > maxRetries) return Promise.reject(error)
      if (error.response) return Promise.reject(error)

      const backoff = config.__retryCount * 800
      return new Promise(resolve => setTimeout(resolve, backoff)).then(() =>
        githubAxios(config)
      )
    },
  }
}

const githubAxios = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
  timeout: 12_000,
})

const timing = requestTimingMiddleware()
const auth = authMiddleware()
githubAxios.interceptors.request.use(timing.onFulfilled, null)
githubAxios.interceptors.request.use(auth.onFulfilled, null)

const responseTiming = responseTimingMiddleware()
const rateLimit = rateLimitMiddleware()
const notFound = notFoundMiddleware()
const networkErr = networkErrorMiddleware()
const retry = retryMiddleware(2)

githubAxios.interceptors.response.use(responseTiming.onFulfilled, null)
githubAxios.interceptors.response.use(null, rateLimit.onRejected)
githubAxios.interceptors.response.use(null, notFound.onRejected)
githubAxios.interceptors.response.use(null, networkErr.onRejected)
githubAxios.interceptors.response.use(null, retry.onRejected)

const cache = new Map()
const inFlight = new Map()

function cached(key, fetcher) {
  if (cache.has(key)) return Promise.resolve(cache.get(key))
  if (inFlight.has(key)) return inFlight.get(key)

  const promise = fetcher()
    .then(data => {
      cache.set(key, data)
      inFlight.delete(key)
      return data
    })
    .catch(err => {
      inFlight.delete(key)
      throw err
    })

  inFlight.set(key, promise)
  return promise
}

export function clearCache(pattern) {
  if (!pattern) {
    cache.clear()
    return
  }
  for (const key of cache.keys()) {
    if (key.startsWith(pattern)) cache.delete(key)
  }
}

export function fetchUser(username) {
  return cached(`user:${username}`, async () => {
    const { data } = await githubAxios.get(`/users/${username}`)
    return data
  })
}

export async function fetchRepos(username) {
  return cached(`repos:${username}`, async () => {
    const PER_PAGE = 100
    let page = 1
    let all = []

    while (true) {
      const { data } = await githubAxios.get(`/users/${username}/repos`, {
        params: { per_page: PER_PAGE, page },
      })
      all = all.concat(data)
      if (data.length < PER_PAGE) break
      page++
    }

    return all
  })
}

export function fetchRepo(owner, repo) {
  return cached(`repo:${owner}/${repo}`, async () => {
    const { data } = await githubAxios.get(`/repos/${owner}/${repo}`)
    return data
  })
}
