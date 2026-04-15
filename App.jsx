import React from "react";
import { createClient } from "@supabase/supabase-js";

const etapasCadastro = [
  "Dados pessoais",
  "Vínculo funcional",
  "Formação e cursos",
  "Competências",
  "Interesses e setores",
  "Confirmação",
];

const vagas = [
  {
    titulo: "Especialista em Projetos Educacionais",
    area: "Subsecretaria de Inovação Pedagógica",
    prazo: "Inscrições até 15/04/2026",
    tipo: "Banco de Talentos",
  },
  {
    titulo: "Analista de Dados para Gestão Escolar",
    area: "Superintendência de Tecnologia Educacional",
    prazo: "Inscrições até 22/04/2026",
    tipo: "Processo Interno",
  },
  {
    titulo: "Coordenação de Formação Continuada",
    area: "Escola de Formação da SEE-MG",
    prazo: "Inscrições até 30/04/2026",
    tipo: "Banco de Talentos",
  },
];

const processos = [
  {
    processo: "Especialista em Projetos Educacionais",
    inscricao: "BT-2026-001284",
    data: "18/03/2026 09:42",
    status: "Inscrição confirmada",
  },
  {
    processo: "Analista de Dados para Gestão Escolar",
    inscricao: "BT-2026-001451",
    data: "--",
    status: "Inscrição pendente",
  },
  {
    processo: "Coordenação de Formação Continuada",
    inscricao: "BT-2025-004992",
    data: "10/12/2025 14:03",
    status: "Processo encerrado",
  },
];

function Campo({ label, placeholder }) {
  return (
    <label className="flex flex-col gap-2 text-sm text-slate-700">
      <span className="font-medium">{label}</span>
      <input
        className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        placeholder={placeholder}
      />
    </label>
  );
}

export default function App() {
  const [authMessage, setAuthMessage] = React.useState("");

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY;

  const supabase = React.useMemo(() => {
    if (!supabaseUrl || !supabaseKey) return null;
    return createClient(supabaseUrl, supabaseKey);
  }, [supabaseKey, supabaseUrl]);

  async function entrarComSupabase() {
    if (!supabase) {
      setAuthMessage(
        "Configure VITE_SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY (ou NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/VITE_SUPABASE_ANON_KEY) no .env.",
      );
      return;
    }

    setAuthMessage("Redirecionando para autenticação...");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });

    if (error) {
      setAuthMessage(`Falha no login: ${error.message}`);
      return;
    }

    setAuthMessage("Fluxo OAuth iniciado com sucesso.");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-gradient-to-br from-blue-700 to-emerald-600 text-xs font-bold text-white">
              MG
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Portal institucional
              </p>
              <h1 className="text-lg font-semibold text-blue-900">
                Banco de Talentos SEE-MG
              </h1>
            </div>
          </div>
          <button
            onClick={entrarComSupabase}
            className="rounded-lg border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            Entrar com gov.br
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
        {authMessage ? (
          <section className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
            {authMessage}
          </section>
        ) : null}

        <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-emerald-700 text-white shadow-xl">
          <div className="grid gap-6 p-8 md:grid-cols-2 md:p-12">
            <div className="space-y-5">
              <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wide">
                Protótipo de Alta Fidelidade
              </p>
              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                Mapeie competências e conecte profissionais aos projetos
                estratégicos da educação mineira.
              </h2>
              <p className="text-sm text-blue-100 md:text-base">
                Ambiente digital para cadastro de servidores, participação em
                processos seletivos internos e acompanhamento de inscrições.
                Integração com autenticação gov.br prevista para próxima fase.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-900 shadow-sm transition hover:bg-blue-50">
                  Acessar meu cadastro
                </button>
                <button className="rounded-lg border border-white/60 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Ver processos em andamento
                </button>
              </div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <h3 className="mb-3 text-lg font-semibold">
                Aviso institucional (texto fictício)
              </h3>
              <p className="text-sm leading-relaxed text-blue-100">
                Este portal é destinado ao registro de competências técnicas,
                acadêmicas e gerenciais para composição de banco interno de
                talentos da SEE-MG. A inscrição não gera nomeação automática,
                sendo utilizada para triagem, planejamento e futuras convocações
                conforme critérios de cada edital.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <h3 className="text-2xl font-bold text-blue-900">
              Processos seletivos em andamento
            </h3>
            <a className="text-sm font-semibold text-emerald-700" href="#">
              Ver todos
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {vagas.map((vaga) => (
              <article
                key={vaga.titulo}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="mb-3 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {vaga.tipo}
                </p>
                <h4 className="mb-2 text-lg font-semibold text-slate-900">
                  {vaga.titulo}
                </h4>
                <p className="mb-4 text-sm text-slate-600">{vaga.area}</p>
                <p className="mb-5 text-sm font-medium text-blue-700">{vaga.prazo}</p>
                <button className="w-full rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">
                  Ver detalhes
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="mb-6 text-2xl font-bold text-blue-900">Meu cadastro</h3>

          <ol className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {etapasCadastro.map((etapa, index) => (
              <li
                key={etapa}
                className={`rounded-lg border p-3 text-center text-xs font-medium ${
                  index === 0
                    ? "border-blue-600 bg-blue-50 text-blue-800"
                    : "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                <p className="mb-1 text-[10px] uppercase tracking-wider">Etapa {index + 1}</p>
                {etapa}
              </li>
            ))}
          </ol>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Campo label="Nome completo" placeholder="Digite o nome completo" />
            <Campo label="CPF" placeholder="000.000.000-00" />
            <Campo label="E-mail institucional" placeholder="nome@educacao.mg.gov.br" />
            <Campo label="MASP" placeholder="0000000" />
            <Campo label="Telefone" placeholder="(31) 9 0000-0000" />
            <Campo label="Município de exercício" placeholder="Ex.: Belo Horizonte" />
            <Campo label="Unidade de lotação" placeholder="Selecione a unidade" />
            <Campo label="Cargo efetivo" placeholder="Descreva o cargo" />
            <Campo label="Tempo na rede" placeholder="Ex.: 8 anos" />
          </div>

          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            Campos e critérios são ilustrativos. Regras finais serão definidas
            em edital oficial da SEE-MG.
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700">
              Salvar rascunho
            </button>
            <button className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
              Avançar para etapa 2
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="mb-4 text-2xl font-bold text-blue-900">Meus processos seletivos</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-xl border border-slate-200 text-sm">
              <thead className="bg-slate-100 text-left text-xs uppercase tracking-wider text-slate-600">
                <tr>
                  <th className="px-4 py-3">Processo</th>
                  <th className="px-4 py-3">Nº inscrição</th>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Ação</th>
                </tr>
              </thead>
              <tbody>
                {processos.map((item) => (
                  <tr key={item.inscricao} className="border-t border-slate-200 even:bg-slate-50">
                    <td className="px-4 py-3">{item.processo}</td>
                    <td className="px-4 py-3 font-medium">{item.inscricao}</td>
                    <td className="px-4 py-3">{item.data}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-sm font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2">
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="mb-4 text-2xl font-bold text-blue-900">
            Prévia de comprovante de inscrição (PDF)
          </h3>
          <div className="mx-auto max-w-3xl rounded-xl border-4 border-slate-200 bg-white p-8 shadow-inner">
            <div className="text-center">
              <p className="text-3xl font-serif font-bold tracking-wide text-blue-900">
                BANCO DE TALENTOS SEE-MG
              </p>
              <p className="mt-3 text-xl font-semibold">COMPROVANTE DE INSCRIÇÃO</p>
              <p className="mt-2 text-sm text-slate-500">Documento ilustrativo • formato PDF</p>
            </div>
            <div className="mt-6 grid gap-3 rounded-lg border border-slate-300 p-4 text-sm sm:grid-cols-2">
              <p><strong>Nome:</strong> Maria da Silva (fictício)</p>
              <p><strong>CPF:</strong> 000.000.000-00</p>
              <p><strong>Inscrição:</strong> BT-2026-001284</p>
              <p><strong>Data:</strong> 18/03/2026</p>
              <p className="sm:col-span-2"><strong>Processo:</strong> Especialista em Projetos Educacionais</p>
            </div>
            <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
              Declaro que as informações prestadas são verdadeiras. Esta é uma
              visualização de protótipo com conteúdo fictício para validação de
              layout e experiência do usuário.
            </p>
            <button className="mt-6 w-full rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800">
              Baixar PDF (placeholder)
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
