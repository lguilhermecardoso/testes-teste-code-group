# GitHub Explorer

Aplicação client-side para buscar perfis e repositórios do GitHub.

## Demo

[https://lguilhermecardoso.github.io/testes-teste-code-group/](https://lguilhermecardoso.github.io/testes-teste-code-group/)

## Tecnologias

- Vanilla JavaScript (ES6+)
- [Parcel](https://parceljs.org/) — bundler com suporte a `bundle-text:` para importar templates HTML
- [Axios](https://axios-http.com/) — requisições HTTP
- [Bootstrap 5](https://getbootstrap.com/) — layout responsivo
- Roteamento via Hash API (sem dependências externas)

## Funcionalidades

- Busca de usuários do GitHub
- Exibição de avatar, bio, e-mail, seguidores e seguindo
- Listagem de repositórios ordenada por estrelas (padrão)
- Ordenação por estrelas, nome ou data de atualização, com inversão de ordem
- Paginação client-side com seletor de 5, 10 ou 20 repositórios por página
- Página de detalhes de cada repositório (estrelas, forks, watchers, linguagem e link externo)

## Instalação e uso

**Pré-requisito:** Node.js 18+

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start
```

Acesse [http://localhost:1234](http://localhost:1234) no navegador.

## Build para produção

```bash
npm run build
```

Os arquivos gerados ficam na pasta `dist/`.

## Estrutura do projeto

```
src/
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── main.js              # entry point + registro de rotas
    ├── router.js            # roteador hash-based
    ├── api.js               # chamadas à API do GitHub (axios)
    ├── utils/
    │   └── dom.js           # helper icon() para criar <i> via DOM
    ├── pages/
    │   ├── home.html        # template da página de busca
    │   ├── home.js
    │   ├── repository.html  # template da página de detalhes
    │   └── repository.js
    │   └── user.js          # perfil + listagem de repos
    └── components/
        ├── template.js      # utilitário createTemplate / clone
        ├── backButton.html + .js   # botão de voltar reutilizável
        ├── errorBox.html + .js     # caixa de erro reutilizável
        ├── spinner.html + .js      # loading spinner
        ├── statBadge.html + .js    # badge de estatística
        ├── userCard.html + .js     # card de perfil do usuário
        ├── repoCard.html + .js     # card de repositório
        └── repoList.js             # lista paginada com controles de ordenação
```

Cada componente segue a convenção de ter um arquivo `.html` com a estrutura e um `.js` responsável apenas por preencher os dados via `querySelector('.js-*')`. Nenhuma marcação HTML está embutida nos arquivos JavaScript.

## Rotas

| Hash | Página |
|------|--------|
| `#/` | Busca |
| `#/user/:username` | Perfil do usuário |
| `#/repo/:owner/:repo` | Detalhes do repositório |

## Deploy (GitHub Pages)

O projeto está configurado para deploy automático via GitHub Actions a cada push na branch `main`.

Para ativar, acesse o repositório no GitHub → **Settings → Pages → Source** e selecione **GitHub Actions**.

A URL pública ficará disponível em `https://<usuario>.github.io/<nome-do-repo>/`.

## Get in touch

Guilherme Cardoso — [lguilhermecardoso.github.io/testes-teste-code-group](https://lguilhermecardoso.github.io/testes-teste-code-group/)

## Decisões técnicas

**Paginação client-side:** a API do GitHub suporta paginação server-side (`per_page` + `page`), mas não oferece ordenação por número de estrelas. Por isso todos os repositórios são buscados de uma vez e a paginação é feita no cliente, garantindo que a ordenação por estrelas funcione corretamente sobre o conjunto completo.
