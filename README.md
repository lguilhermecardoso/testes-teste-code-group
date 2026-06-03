# GitHub Explorer

Aplicação client-side para explorar perfis e repositórios do GitHub, reescrita em **React 19** com foco em boas práticas, componentes reutilizáveis, responsividade extrema e os hooks mais recentes do ecossistema React.

## Demo

[https://lguilhermecardoso.github.io/testes-teste-code-group/](https://lguilhermecardoso.github.io/testes-teste-code-group/)

---

## Tecnologias

| Camada | Biblioteca | Versão |
|--------|-----------|--------|
| UI Framework | React | 19 |
| Roteamento | React Router DOM | 7 |
| Estilização | Styled Components | 6 |
| HTTP | Axios | 1.7 |
| Ícones | Lucide React | latest |
| Error Boundary | react-error-boundary | 5 |
| Bundler | Vite | 6 |

---

## Funcionalidades

- Busca de usuários do GitHub com formulário gerenciado por `useActionState`
- Hint de busca reativo com `useDeferredValue` (sem bloquear o input)
- Perfil completo: avatar, bio, localização, empresa, e-mail, site, contagens de seguidores
- Listagem de repositórios com paginação client-side (5 / 10 / 20 por página)
- Ordenação por estrelas, nome A–Z ou data de atualização, com inversão de ordem
- Transições de paginação/ordenação não-bloqueantes com `useTransition`
- Feedback de página selecionada instantâneo com `useOptimistic`
- Detalhes de repositório: estrelas, forks, watchers, linguagem com cor e link para o GitHub
- Skeleton loading via `Suspense` + `use(Promise)` — sem `useEffect` para dados
- Tratamento de erros granular: Rate Limit (com countdown), Not Found, Network Error
- Notificações toast globais via **Context API** (Snackbar)
- Alternância de tema claro/escuro com persistência em `localStorage`
- Responsividade completa: 6 breakpoints (375 → 1536 px)

---

## Instalação e uso

**Pré-requisito:** Node.js 20+

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173).

```bash
# Build para produção
npm run build

# Preview do build
npm run preview
```

### Token da API do GitHub (opcional)

Sem token, a API do GitHub permite **60 requisições/hora** por IP. Com token, sobe para 5.000.

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_GITHUB_TOKEN=ghp_seu_token_aqui
```

O token é injetado automaticamente no header `Authorization` pelo middleware de auth do Axios.

---

## Estrutura do projeto

```
src/
├── main.jsx                        # Entry point — React 19 createRoot
├── App.jsx                         # Providers + HashRouter + Routes
│
├── contexts/
│   ├── SnackbarContext.jsx          # Context API: notificações toast globais
│   └── ThemeContext.jsx             # Context API: tema dark/light
│
├── services/
│   └── api.js                      # Axios com 6 middlewares + cache + deduplicação
│
├── hooks/
│   └── useDebounce.js              # Debounce genérico
│
├── constants/
│   └── languageColors.js           # 30 cores de linguagem + opções de sort/paginação
│
├── styles/
│   ├── theme.js                    # Tokens de design dark/light + helpers de media query
│   └── GlobalStyles.js             # CSS global + keyframes via styled-components
│
├── components/
│   ├── common/
│   │   ├── Snackbar/               # Toast com progress bar, 4 tipos, animações
│   │   ├── Spinner/                # Loader acessível (sm / md / lg)
│   │   ├── Skeleton/               # Shimmer para UserCard e RepoCard
│   │   ├── ErrorBox/               # Componente de erro polimórfico
│   │   ├── BackButton/             # Botão "voltar" com navigate(-1)
│   │   └── Pagination/             # Paginação com ellipsis — React.memo
│   ├── layout/
│   │   ├── Navbar/                 # Glassmorphism + toggle de tema
│   │   └── Layout/                 # Container responsivo
│   ├── user/
│   │   └── UserCard/               # Perfil completo — React.memo
│   └── repository/
│       ├── RepoCard/               # Card clicável — React.memo
│       ├── RepoFilters/            # Controles de sort/order/pageSize — React.memo
│       └── RepoList/               # Lista com paginação — useTransition + useOptimistic
│
└── pages/
    ├── HomePage/                   # useActionState + useDeferredValue + useId
    ├── UserPage/                   # use(Promise) + Suspense + ErrorBoundary
    ├── RepositoryPage/             # use(Promise) + Suspense + ErrorBoundary
    └── NotFoundPage/               # Página 404
```

---

## Hooks React 19 — onde e por quê

| Hook | Arquivo | Função |
|------|---------|--------|
| `use(promise)` | `UserPage`, `RepositoryPage` | Lê Promises diretamente no render — suspende até resolver |
| `useActionState` | `HomePage` | Gerencia estado + ação assíncrona do formulário de busca |
| `useDeferredValue` | `HomePage` | Hint de busca com update adiado sem bloquear o input |
| `useOptimistic` | `RepoList` | Número da página atualiza imediatamente enquanto transição ocorre |
| `useTransition` | `RepoList` | Sort, filtro e paginação marcados como não-urgentes |
| `useId` | `HomePage` | IDs únicos e estáveis para `label`/`input`/`aria-describedby` |
| `useMemo` | `UserCard`, `RepoList`, `Pagination`... | Memoiza computações caras (sort, metadados de usuário) |
| `useCallback` | `RepoList`, `SnackbarContext`... | Callbacks estáveis para filhos memoizados |
| `React.memo` | `RepoCard`, `UserCard`, `Pagination`... | Previne re-renders desnecessários |
| `<Context value>` | `SnackbarContext`, `ThemeContext` | Sintaxe React 19 — sem `.Provider` |
| `use(Context)` | `useSnackbar`, `useTheme` | Substitui `useContext` no React 19 |

---

## Padrão Suspense com `use()`

O `UserPage` e `RepositoryPage` usam o padrão de React 19 onde a página-pai cria
Promises estáveis com `useMemo`, e componentes-filhos as lêem com `use()`. O Suspense
exibe o skeleton automaticamente enquanto as Promises estão pendentes:

```jsx
// Pai: cria a Promise uma vez por username
const userPromise = useMemo(() => fetchUser(username), [username])

// Filho: lê com use() — suspende até resolver
function UserContent({ userPromise }) {
  const user = use(userPromise) // ← React 19
  return <UserCard user={user} />
}

// Suspense exibe skeleton, ErrorBoundary captura erros de API
<ErrorBoundary FallbackComponent={UserPageError}>
  <Suspense fallback={<UserCardSkeleton />}>
    <UserContent userPromise={userPromise} />
  </Suspense>
</ErrorBoundary>
```

---

## Axios — middlewares em cadeia

O `src/services/api.js` registra 6 interceptors independentes:

1. **requestTiming** — marca `startTime` em cada config de request
2. **auth** — injeta `Authorization: Bearer <VITE_GITHUB_TOKEN>` se configurado
3. **responseTiming** — loga método, URL e duração no console (apenas em `dev`)
4. **rateLimit** — intercepta status `403` → lança `RateLimitError` com `resetAt`
5. **notFound** — intercepta status `404` → lança `NotFoundError`
6. **retry** — retenta erros de rede (não 4xx/5xx) até 2x com backoff exponencial

O cache em memória usa deduplicação de requests: requisições idênticas simultâneas
compartilham a mesma Promise, sem disparo duplicado.

---

## Rotas

| Hash | Página |
|------|--------|
| `#/` | Busca |
| `#/user/:username` | Perfil do usuário |
| `#/repo/:owner/:repo` | Detalhes do repositório |

`HashRouter` garante compatibilidade com GitHub Pages sem configuração de servidor.

---

## Deploy (GitHub Pages)

O deploy é automático via GitHub Actions a cada push na branch `main`.

**Para ativar no repositório:**
1. Acesse **Settings → Pages → Source**
2. Selecione **GitHub Actions**

**Token opcional (aumenta rate limit de 60 → 5.000 req/hora):**
1. Acesse **Settings → Secrets and variables → Actions**
2. Crie o secret `VITE_GITHUB_TOKEN` com seu token do GitHub

A URL pública ficará em `https://<usuario>.github.io/<nome-do-repo>/`.

---

## Decisões técnicas

**Paginação client-side:** a API do GitHub não suporta ordenação por estrelas server-side. Todos os repositórios são buscados de uma vez (paginando a API com `per_page=100`) e a paginação/ordenação é feita no cliente, garantindo resultados corretos independentemente do total de repos.

**HashRouter vs BrowserRouter:** GitHub Pages não tem suporte a reescrita de URLs server-side. `HashRouter` elimina a necessidade de um `404.html` de fallback, mantendo o deploy simples e sem configuração extra.

**`base: './'` no Vite:** gera caminhos relativos nos assets do build (`./assets/...`), o que funciona tanto em deploy no raiz quanto em subdiretórios do GitHub Pages.

---

## Autor

Guilherme Cardoso — [lguilhermecardoso.github.io/testes-teste-code-group](https://lguilhermecardoso.github.io/testes-teste-code-group/)
