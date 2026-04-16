import React from "react";
import { createClient } from "@supabase/supabase-js";

const processosAndamento = [
  {
    id: "AOE-2026",
    titulo: "Agente de Organização Escolar (AOE)",
    area: "Subsecretaria de Articulação Regional",
    prazo: "Inscrições de 16/01/2026 até 31/12/2026",
    tipo: "Banco de Talentos",
    descricao:
      "Cadastro para identificar profissionais para apoio administrativo e organização escolar na Rede Estadual.",
    edital: "https://www.educacao.mg.gov.br",
    anexos: "https://www.educacao.mg.gov.br/edital",
    requisitos: ["Maior de 18 anos", "Ensino médio completo"],
  },
  {
    id: "AED-2026",
    titulo: "Analista Educacional de Dados",
    area: "Superintendência de Tecnologia Educacional",
    prazo: "Inscrições até 22/04/2026",
    tipo: "Processo Interno",
    descricao:
      "Mapeamento de servidores com competências analíticas para apoiar indicadores, monitoramento e projetos estratégicos.",
    edital: "https://www.educacao.mg.gov.br",
    anexos: "https://www.educacao.mg.gov.br/anexos",
    requisitos: ["Experiência com dados", "Domínio de planilhas e BI"],
  },
  {
    id: "FC-2026",
    titulo: "Coordenação de Formação Continuada",
    area: "Escola de Formação da SEE-MG",
    prazo: "Inscrições até 30/04/2026",
    tipo: "Banco de Talentos",
    descricao:
      "Identificação de perfis para concepção e execução de trilhas formativas e iniciativas intersetoriais.",
    edital: "https://www.educacao.mg.gov.br",
    anexos: "https://www.educacao.mg.gov.br/atos",
    requisitos: ["Graduação completa", "Vivência em formação de equipes"],
  },
];

const processosConcluidos = [
  {
    titulo: "Processo Simplificado de Apoio Pedagógico",
    periodo: "Encerrado em 10/12/2025",
    resultado: "Lista final publicada no Diário Oficial",
  },
  {
    titulo: "Banco de Talentos para Projetos de Inovação",
    periodo: "Encerrado em 28/11/2025",
    resultado: "Convocações concluídas",
  },
];

const meusProcessos = [
  {
    processo: "Agente de Organização Escolar - AOE",
    inscricao: "BT-2026-001284",
    data: "23/01/2026 06:54",
    status: "Inscrição confirmada",
  },
  {
    processo: "Processo Seletivo AOE para Educação Especial",
    inscricao: "BT-2026-001613",
    data: "--",
    status: "Inscrição pendente",
  },
  {
    processo: "Banco de Talentos de Gestão Escolar",
    inscricao: "BT-2025-004992",
    data: "10/12/2025 14:03",
    status: "Processo encerrado",
  },
];

const etapas = [
  "Dados pessoais e funcionais",
  "Vínculo e cargo",
  "Formação acadêmica",
  "Competências e habilidades",
  "Ferramentas e setores",
  "Motivação e currículo",
  "Declarações finais",
  "Confirmação + PDF",
];

const blocosFormulario = [
  "Dados pessoais e funcionais",
  "Vínculo e cargo",
  "Formação acadêmica",
  "Competências e habilidades",
  "Ferramentas/sistemas dominados",
  "Interesse em setores da secretaria",
  "Motivação",
  "Currículo e experiências",
  "Declarações finais",
];

function Campo({ label, placeholder, half = false }) {
  return (
    <label className={`campo ${half ? "campo--half" : ""}`}>
      <span>{label}</span>
      <input placeholder={placeholder} />
    </label>
  );
}

function statusClass(status) {
  if (status.toLowerCase().includes("pendente")) return "status status--warning";
  if (status.toLowerCase().includes("encerrado")) return "status status--neutral";
  return "status status--success";
}

export default function App() {
  const [authMessage, setAuthMessage] = React.useState("");
  const [vagaSelecionada, setVagaSelecionada] = React.useState(processosAndamento[0]);

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
        "Configure VITE_SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY (ou NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/VITE_SUPABASE_ANON_KEY) no .env para autenticar com gov.br.",
      );
      return;
    }

    setAuthMessage("Redirecionando para autenticação gov.br... ");
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
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar__inner">
          <div className="brand">
            <div className="brand__badge">MG</div>
            <div>
              <p className="eyebrow">Secretaria de Estado de Educação</p>
              <h1>Banco de Talentos SEE-MG</h1>
            </div>
          </div>
          <div className="topbar__actions">
            <span className="domain-hint">Acesso institucional: @educacao.mg.gov.br</span>
            <button onClick={entrarComSupabase} className="btn btn--primary">
              Entrar com gov.br
            </button>
          </div>
        </div>
      </header>

      <main className="container content">
        {authMessage ? <div className="alert">{authMessage}</div> : null}

        <section className="hero card">
          <div>
            <p className="pill">Protótipo institucional • Alta fidelidade</p>
            <h2>Mapeamento de competências para projetos estratégicos da educação mineira</h2>
            <p>
              Plataforma para identificar formações, experiências e habilidades dos servidores, permitindo
              aproveitamento estratégico em iniciativas, grupos de trabalho e ações intersetoriais da SEE-MG.
            </p>
            <div className="hero__cta">
              <button className="btn btn--light">Acessar Meu Cadastro</button>
              <button className="btn btn--ghost">Ver Meus Processos</button>
            </div>
          </div>
          <aside className="institutional-note">
            <h3>Aviso institucional</h3>
            <p>
              A inscrição no Banco de Talentos não implica nomeação, contratação automática, alteração funcional
              ou remuneratória. O banco é instrumento de planejamento, gestão e composição de equipes técnicas.
            </p>
          </aside>
        </section>

        <section className="grid-two">
          <section className="card">
            <div className="section-title-row">
              <h3>Processos seletivos em andamento</h3>
              <span>{processosAndamento.length} vagas abertas</span>
            </div>
            <div className="cards-grid">
              {processosAndamento.map((vaga) => (
                <article key={vaga.id} className="job-card">
                  <span className="tag">{vaga.tipo}</span>
                  <h4>{vaga.titulo}</h4>
                  <p>{vaga.area}</p>
                  <small>{vaga.prazo}</small>
                  <button className="btn btn--outline" onClick={() => setVagaSelecionada(vaga)}>
                    Ver detalhes
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="card details">
            <h3>Detalhes da vaga</h3>
            <h4>{vagaSelecionada.titulo}</h4>
            <p>{vagaSelecionada.descricao}</p>
            <dl>
              <dt>Prazo</dt>
              <dd>{vagaSelecionada.prazo}</dd>
              <dt>Links importantes</dt>
              <dd>
                <a href={vagaSelecionada.edital}>Edital</a> • <a href={vagaSelecionada.anexos}>Anexos</a>
              </dd>
              <dt>Pré-requisitos</dt>
              <dd>
                <ul>
                  {vagaSelecionada.requisitos.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </dl>
          </section>
        </section>

        <section className="card">
          <h3>Fluxo de inscrição em etapas</h3>
          <ol className="steps">
            {etapas.map((etapa, idx) => (
              <li key={etapa} className={idx < 5 ? "done" : idx === 5 ? "active" : ""}>
                <span>{idx + 1}</span>
                <p>{etapa}</p>
              </li>
            ))}
          </ol>
          <div className="pending-box">
            <strong>Inscrição pendente detectada</strong>
            <p>
              Você possui progresso salvo no processo <em>AOE para Educação Especial</em>. Retome de onde parou,
              sem perder os dados já preenchidos.
            </p>
            <button className="btn btn--primary">Retomar inscrição pendente</button>
          </div>
        </section>

        <section className="candidate-grid">
          <section className="card">
            <h3>Meu Cadastro</h3>
            <p className="subtle">
              Preencha os blocos para mapear competências, formações e experiências com foco em projetos
              estratégicos da SEE-MG.
            </p>

            <div className="form-grid">
              <Campo label="Nome completo" placeholder="Digite o nome completo" half />
              <Campo label="CPF" placeholder="000.000.000-00" half />
              <Campo label="MASP" placeholder="0000000" half />
              <Campo label="Telefone para contato" placeholder="(31) 9 0000-0000" half />
            </div>

            <div className="block-list">
              {blocosFormulario.map((bloco) => (
                <div key={bloco} className="block-list__item">
                  {bloco}
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h3>Meus Processos</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Processo</th>
                    <th>Inscrição</th>
                    <th>Data</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {meusProcessos.map((item) => (
                    <tr key={item.inscricao}>
                      <td>{item.processo}</td>
                      <td>{item.inscricao}</td>
                      <td>{item.data}</td>
                      <td>
                        <span className={statusClass(item.status)}>{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>

        <section className="card">
          <h3>Processos concluídos</h3>
          <div className="closed-grid">
            {processosConcluidos.map((proc) => (
              <article key={proc.titulo} className="closed-card">
                <h4>{proc.titulo}</h4>
                <p>{proc.periodo}</p>
                <small>{proc.resultado}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="card pdf-preview">
          <h3>Comprovante de inscrição (PDF)</h3>
          <div className="pdf-paper">
            <h4>BANCO DE TALENTOS</h4>
            <p>COMPROVANTE DE INSCRIÇÃO</p>
            <div className="pdf-box">
              <p>Nome: Beatriz Souza Camargo (fictício)</p>
              <p>CPF: 158.601.847-78</p>
              <p>Inscrição: BT-2026-001284</p>
              <p>Data: 23/01/2026</p>
            </div>
            <button className="btn btn--primary">Gerar comprovante em PDF</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <p>Secretaria de Estado de Educação de Minas Gerais • Banco de Talentos</p>
          <p>Uso institucional para planejamento e alocação estratégica de servidores.</p>
        </div>
      </footer>
    </div>
  );
}
