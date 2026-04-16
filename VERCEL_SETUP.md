# Configuração no Vercel (Supabase)

## 1) Importar o projeto
1. Acesse https://vercel.com/new
2. Importe este repositório.
3. No passo de build, mantenha o preset detectado automaticamente.

## 2) Variáveis de ambiente
No projeto da Vercel, abra:

**Settings → Environment Variables**

Cadastre:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Use os mesmos valores já configurados localmente.

> Se você estiver usando Vite puro, também pode cadastrar:
> - `VITE_SUPABASE_URL`
> - `VITE_SUPABASE_PUBLISHABLE_KEY`

## 3) Domínio de callback no Supabase
No Supabase, configure o redirect da autenticação OAuth com a URL de produção da Vercel:

- `https://SEU-PROJETO.vercel.app`

E, se necessário, inclua callback específica do provider, conforme seu fluxo.

## 4) Re-deploy
Após salvar as env vars, faça um novo deploy em:

**Deployments → Redeploy**

## 5) Checklist rápido
- [ ] Variáveis adicionadas em **Production** na Vercel
- [ ] URL da Vercel liberada em **Auth URL Configuration** no Supabase
- [ ] Login OAuth sem erro de redirect
