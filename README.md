# Banco de Talentos SEE-MG (Protótipo)

Protótipo em React + Vite para o portal interno de cadastro de competências e inscrição em processos seletivos da SEE-MG, com botão de autenticação OAuth via Supabase.

## Estrutura do projeto

- `src/App.jsx`: interface principal (hero, vagas, cadastro em etapas, tabela de processos e prévia de comprovante).
- `src/main.jsx`: entrypoint React da aplicação.
- `index.html`: entry HTML com a raiz `#root`.
- `package.json`: scripts de desenvolvimento/build e dependências.
- `vite.config.js`: configuração do Vite.
- `vercel.json`: fallback de rotas para SPA (evita `NOT_FOUND` em acesso direto).
- `.env.example`: variáveis de ambiente esperadas para Supabase.
- `.gitignore`: proteção para não versionar segredos locais de `.env`.
- `VERCEL_SETUP.md`: passo a passo para publicar na Vercel.

## Configuração local

1. Instale dependências:

```bash
npm install
```

2. Crie um arquivo `.env` com base no exemplo:

```bash
cp .env.example .env
```

3. Preencha as variáveis com os dados do seu projeto Supabase.

4. Rode em desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível na rota raiz `/` (ex.: `http://localhost:5173/`).

## Build de produção

```bash
npm run build
npm run preview
```

## Variáveis suportadas

Prioridade de leitura no app:

1. `VITE_SUPABASE_URL`
2. `NEXT_PUBLIC_SUPABASE_URL`
3. `VITE_SUPABASE_PUBLISHABLE_KEY`
4. `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
5. `VITE_SUPABASE_ANON_KEY` (legado)

## Deploy no Vercel (recomendado)

- **Framework Preset:** `Vite`
- **Root Directory:** `.`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

O arquivo `vercel.json` já garante fallback para `index.html`, evitando erro `404/NOT_FOUND` em acesso direto a URLs da SPA.
