# GitHub Explorer

Aplicação client-side para buscar perfis e repositórios do GitHub.

## Tecnologias

- Vanilla JavaScript (ES6+)
- [Parcel](https://parceljs.org/) — bundler
- [Axios](https://axios-http.com/) — requisições HTTP
- [Bootstrap 5](https://getbootstrap.com/) — layout responsivo
- Roteamento via Hash API (sem dependências externas)

## Funcionalidades

- Busca de usuários do GitHub
- Exibição de avatar, bio, e-mail, seguidores e seguindo
- Listagem de repositórios ordenada por estrelas (padrão)
- Ordenação por estrelas, nome ou data de atualização
- Inversão da ordem (crescente/decrescente)
- Página de detalhes de cada repositório com link externo

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
    ├── main.js          # entry point + registro de rotas
    ├── router.js        # roteador hash-based
    ├── api.js           # chamadas à API do GitHub (axios)
    ├── pages/
    │   ├── home.js      # página de busca
    │   ├── user.js      # perfil + listagem de repos
    │   └── repository.js # detalhes de um repositório
    └── components/
        ├── userCard.js  # card de perfil do usuário
        ├── repoList.js  # lista com controles de ordenação
        └── spinner.js   # loading spinner
```

## Rotas

| Hash | Página |
|------|--------|
| `#/` | Busca |
| `#/user/:username` | Perfil do usuário |
| `#/repo/:owner/:repo` | Detalhes do repositório |
