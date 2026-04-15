# Banco de Talentos SEE-MG (Protótipo)

Protótipo em React para o portal interno de cadastro de competências e inscrição em processos seletivos da SEE-MG, com botão de autenticação OAuth via Supabase.

## Arquivos principais

- `App.jsx`: interface principal (hero, vagas, cadastro em etapas, tabela de processos e prévia de comprovante).
- `.env.example`: variáveis de ambiente esperadas para Supabase.
- `.gitignore`: proteção para não versionar segredos locais de `.env`.
- `VERCEL_SETUP.md`: passo a passo para publicar na Vercel com variáveis e callback OAuth.

## Configuração local

1. Crie um arquivo `.env` com base no exemplo:

```bash
cp .env.example .env
```

2. Preencha as variáveis com os dados do seu projeto Supabase.

3. Integre este `App.jsx` ao seu projeto React/Vite (ou ajuste o setup equivalente), garantindo que `@supabase/supabase-js` esteja instalado.

## Variáveis suportadas

Prioridade de leitura no app:

1. `VITE_SUPABASE_URL`
2. `NEXT_PUBLIC_SUPABASE_URL`
3. `VITE_SUPABASE_PUBLISHABLE_KEY`
4. `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
5. `VITE_SUPABASE_ANON_KEY` (legado)

## Deploy

Consulte `VERCEL_SETUP.md` para configurar variáveis de ambiente e callback OAuth no Supabase em produção.
