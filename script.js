document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 1. MENU MOBILE RESPONSIVO
  // =========================================================================
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Fecha o menu ao clicar em qualquer link
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =========================================================================
  // 2. SIMULADOR INTERATIVO: UM DIA NA COBERTURA DE CAMPO
  // =========================================================================
  const scenarios = {
    festival: {
      title: "Cobertura de Festival de Música Independente",
      description:
        "O jornalista acompanha a passagem de som, entrevista bandas emergentes nos camarins e observa a reação da plateia para produzir uma crônica crítica e boletins em vídeo vertical em tempo real.",
      challenge:
        "Desafio de campo: ruído ambiente elevado, prazos curtos entre um palco e outro e necessidade de traduzir a identidade sonora de artistas pouco conhecidos.",
      checklist: [
        "Gravador direcional / lapela sem fio para entrevistas nos bastidores",
        "Smartphone com estabilizador para boletins e reels ao vivo",
        "Pesquisa prévia sobre a discografia e o cenário musical local",
        "Entrega de resenha crítica publicada até 2 horas após o encerramento"
      ]
    },
    patrimonio: {
      title: "Reportagem sobre Restauro e Patrimônio Histórico",
      description:
        "Em visita técnica a um casarão ou museu em restauração, o repórter entrevista arquitetos, historiadores e moradores antigos para explicar a importância histórica e o destino das verbas públicas.",
      challenge:
        "Desafio de campo: cruzar dados técnicos de editais e orçamentos públicos com a memória afetiva da comunidade local.",
      checklist: [
        "Análise documental de editais de tombamento e leis de incentivo",
        "Entrevistas com restauradores e lideranças comunitárias",
        "Fotografia documental dos detalhes arquitetônicos",
        "Reportagem especial multimídia com infográfico histórico"
      ]
    },
    periferia: {
      title: "Cobertura de Sarau Literário na Periferia",
      description:
        "Imersão noturna em um coletivo cultural de bairro para registrar poetas independentes, batalhas de rima e bibliotecas comunitárias que movimentam a economia criativa fora do centro.",
      challenge:
        "Desafio de campo: praticar a escuta ativa sem estereótipos, valorizando os artistas como protagonistas da própria narrativa.",
      checklist: [
        "Bloco de notas físico para versos e falas espontâneas",
        "Captação de áudio ambiente e declamações para podcast",
        "Mapeamento de coletivos locais e agenda comunitária",
        "Perfil humanizado dos organizadores e impacto social no território"
      ]
    }
  };

  const simPanel = document.getElementById("simPanel");
  const simTabs = document.querySelectorAll(".sim-tab");

  function renderScenario(key) {
    const data = scenarios[key];
    if (!data || !simPanel) return;

    simPanel.innerHTML = `
      <div class="sim-panel-grid">
        <div>
          <h3>${data.title}</h3>
          <p>${data.description}</p>
          <p><strong>${data.challenge}</strong></p>
        </div>
        <aside class="sim-checklist">
          <h4>Kit & Entregas do Repórter</h4>
          <ul>
            ${data.checklist.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </aside>
      </div>
    `;
  }

  simTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      simTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      renderScenario(tab.dataset.scenario);
    });
  });

  // Inicializa com o primeiro cenário
  renderScenario("festival");

  // =========================================================================
  // 3. PERSONALIZAÇÃO DOS CRÉDITOS DO STAND (SALVO NO NAVEGADOR)
  // =========================================================================
  const editModal = document.getElementById("editModal");
  const openEditModal = document.getElementById("openEditModal");
  const closeModal = document.getElementById("closeModal");
  const creditsForm = document.getElementById("creditsForm");

  const studentNameEl = document.getElementById("studentName");
  const studentClassEl = document.getElementById("studentClass");
  const studentSubjectEl = document.getElementById("studentSubject");

  const inputName = document.getElementById("inputName");
  const inputClass = document.getElementById("inputClass");
  const inputSubject = document.getElementById("inputSubject");

  // Carrega dados salvos anteriormente, se houver
  const savedCredits = JSON.parse(localStorage.getItem("feiraProfissoesCredits") || "null");
  if (savedCredits) {
    studentNameEl.textContent = savedCredits.name;
    studentClassEl.textContent = savedCredits.className;
    studentSubjectEl.textContent = savedCredits.subject;
  }

  openEditModal.addEventListener("click", () => {
    inputName.value = studentNameEl.textContent;
    inputClass.value = studentClassEl.textContent;
    inputSubject.value = studentSubjectEl.textContent;
    editModal.hidden = false;
  });

  closeModal.addEventListener("click", () => {
    editModal.hidden = true;
  });

  editModal.addEventListener("click", (e) => {
    if (e.target === editModal) {
      editModal.hidden = true;
    }
  });

  creditsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const updated = {
      name: inputName.value.trim(),
      className: inputClass.value.trim(),
      subject: inputSubject.value.trim()
    };

    studentNameEl.textContent = updated.name;
    studentClassEl.textContent = updated.className;
    studentSubjectEl.textContent = updated.subject;

    localStorage.setItem("feiraProfissoesCredits", JSON.stringify(updated));
    editModal.hidden = true;
  });
});