const EMAIL_DESTINO = "angelo.riosaude@gmail.com";

let currentSection = 1;
const totalSections = 4;

function updateProgress() {
  const pct = ((currentSection - 1) / totalSections) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = `Etapa ${currentSection} de ${totalSections}`;
}

function goTo(n) {
  if (n > currentSection && !validate(currentSection)) return;
  document.getElementById('sec' + currentSection).classList.remove('active');
  currentSection = n;
  document.getElementById('sec' + n).classList.add('active');
  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  saveDraft();
}

function validate(sec) {
  let ok = true;

  if (sec === 1) {
    // Unidade
    const uni = document.getElementById('unidade');
    const fg1 = uni.closest('.field-group');
    if (!uni.value) { fg1.classList.add('has-error'); ok = false; }
    else fg1.classList.remove('has-error');

    // Área
    const area = document.querySelector('input[name="area"]:checked');
    const areaFg = document.getElementById('area1').closest('.card-options').parentElement;
    if (!area) { areaFg.querySelector('.field-error').style.display = 'block'; ok = false; }
    else areaFg.querySelector('.field-error').style.display = 'none';
  }

  if (sec === 2) {
    const tipo = document.querySelector('input[name="tipo_prob"]:checked');
    const tipoFg = document.getElementById('tp1').closest('.card-options').parentElement;
    if (!tipo) { tipoFg.querySelector('.field-error').style.display = 'block'; ok = false; }
    else tipoFg.querySelector('.field-error').style.display = 'none';

    const desc = document.getElementById('descProblema');
    const fg2 = desc.closest('.field-group');
    if (!desc.value.trim()) { fg2.classList.add('has-error'); ok = false; }
    else fg2.classList.remove('has-error');

    const imp = document.querySelector('input[name="impacto"]:checked');
    const impFg = document.getElementById('imp1').closest('.impact-select').parentElement;
    if (!imp) { impFg.querySelector('.field-error').style.display = 'block'; ok = false; }
    else impFg.querySelector('.field-error').style.display = 'none';
  }

  if (sec === 3) {
    const sol = document.getElementById('solucao');
    const fg3 = sol.closest('.field-group');
    if (!sol.value.trim()) { fg3.classList.add('has-error'); ok = false; }
    else fg3.classList.remove('has-error');
  }

  if (!ok) window.scrollTo({ top: 200, behavior: 'smooth' });
  return ok;
}

function selectStar(groupId, btn, hiddenId) {
  const group = document.getElementById(groupId);
  group.querySelectorAll('.star-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById(hiddenId).value = btn.textContent;
  saveDraft();
}

function countChars(el, countId) {
  document.getElementById(countId).textContent = el.value.length + ' caracteres';
}

async function submitForm() {
  if (!validate(4)) return;

  const btnSubmit = document.querySelector('.btn-submit');
  const originalText = btnSubmit.innerHTML;

  // Desabilitar o botão e mostrar carregamento
  btnSubmit.disabled = true;
  btnSubmit.innerHTML = '⏳ Enviando sua voz...';

  // Obter todos os dados do formulário
  const data = {
    Nome: document.getElementById('nome').value || 'Anônimo',
    Unidade: document.getElementById('unidade').value,
    Area: document.querySelector('input[name="area"]:checked')?.value || 'Não informado',
    'Tipo de Problema': document.querySelector('input[name="tipo_prob"]:checked')?.value || 'Não informado',
    'Descrição do Problema': document.getElementById('descProblema').value,
    'Frequência': document.getElementById('freq').value || 'Não informada',
    'Impacto': document.querySelector('input[name="impacto"]:checked')?.value || 'Não informado',
    'Solução Sugerida': document.getElementById('solucao').value,
    'Tentativas Anteriores': document.getElementById('tentativas').value || 'Nenhuma',
    'Quem é afetado': Array.from(document.querySelectorAll('input[name="afetados"]:checked')).map(cb => cb.value).join(', ') || 'Ninguém',
    'Quer participar da solução?': document.querySelector('input[name="participar"]:checked')?.value || 'Não',
    'E-mail para contato': document.getElementById('email').value || 'Não informado',
    'Mensagem Final': document.getElementById('mensagemFinal').value || 'Nenhuma',
    'Avaliação da TI': document.getElementById('aval').value || 'Não informada'
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${EMAIL_DESTINO}`, {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      document.getElementById('sec4').classList.remove('active');
      document.getElementById('progressFill').style.width = '100%';
      document.getElementById('progressText').textContent = '✅ Concluído!';
      document.getElementById('successScreen').classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      localStorage.removeItem('formVozDraft');
    } else {
      throw new Error('Falha no servidor ao enviar o formulário.');
    }
  } catch (error) {
    console.error("Erro no envio:", error);
    alert("Ops! Ocorreu um erro ao enviar sua contribuição. Por favor, verifique sua conexão e tente novamente.");
    btnSubmit.disabled = false;
    btnSubmit.innerHTML = originalText;
  }
}

// Funções para salvar e carregar rascunho (draft)
function saveDraft() {
  const data = {
    currentSection: currentSection,
    nome: document.getElementById('nome').value,
    unidade: document.getElementById('unidade').value,
    area: document.querySelector('input[name="area"]:checked')?.value || '',
    tipo_prob: document.querySelector('input[name="tipo_prob"]:checked')?.value || '',
    descProblema: document.getElementById('descProblema').value,
    freq: document.getElementById('freq').value,
    impacto: document.querySelector('input[name="impacto"]:checked')?.value || '',
    solucao: document.getElementById('solucao').value,
    tentativas: document.getElementById('tentativas').value,
    afetados: Array.from(document.querySelectorAll('input[name="afetados"]:checked')).map(cb => cb.value),
    participar: document.querySelector('input[name="participar"]:checked')?.value || '',
    email: document.getElementById('email').value,
    mensagemFinal: document.getElementById('mensagemFinal').value,
    aval: document.getElementById('aval').value
  };
  
  localStorage.setItem('formVozDraft', JSON.stringify(data));
}

function loadDraft() {
  const draft = localStorage.getItem('formVozDraft');
  if (draft) {
    try {
      const data = JSON.parse(draft);
      
      if(data.nome) document.getElementById('nome').value = data.nome;
      if(data.unidade) document.getElementById('unidade').value = data.unidade;
      
      if(data.area) {
        const el = document.querySelector(`input[name="area"][value="${data.area}"]`);
        if(el) el.checked = true;
      }
      
      if(data.tipo_prob) {
        const el = document.querySelector(`input[name="tipo_prob"][value="${data.tipo_prob}"]`);
        if(el) el.checked = true;
      }
      
      if(data.descProblema) {
        const descEl = document.getElementById('descProblema');
        descEl.value = data.descProblema;
        countChars(descEl, 'count1');
      }
      
      if(data.freq) {
        document.getElementById('freq').value = data.freq;
        const stars = document.getElementById('freqRating').querySelectorAll('.star-btn');
        stars.forEach(btn => {
          if(btn.textContent === data.freq) btn.classList.add('selected');
        });
      }
      
      if(data.impacto) {
        const el = document.querySelector(`input[name="impacto"][value="${data.impacto}"]`);
        if(el) el.checked = true;
      }
      
      if(data.solucao) {
        const solEl = document.getElementById('solucao');
        solEl.value = data.solucao;
        countChars(solEl, 'count2');
      }
      
      if(data.tentativas) {
        const tenEl = document.getElementById('tentativas');
        tenEl.value = data.tentativas;
        countChars(tenEl, 'count3');
      }
      
      if(data.afetados && data.afetados.length > 0) {
        data.afetados.forEach(val => {
          const el = document.querySelector(`input[name="afetados"][value="${val}"]`);
          if(el) el.checked = true;
        });
      }
      
      if(data.participar) {
        const el = document.querySelector(`input[name="participar"][value="${data.participar}"]`);
        if(el) el.checked = true;
      }
      
      if(data.email) document.getElementById('email').value = data.email;
      if(data.mensagemFinal) document.getElementById('mensagemFinal').value = data.mensagemFinal;
      
      if(data.aval) {
        document.getElementById('aval').value = data.aval;
        const stars = document.getElementById('avalRating').querySelectorAll('.star-btn');
        stars.forEach(btn => {
          if(btn.textContent === data.aval) btn.classList.add('selected');
        });
      }
      
      if(data.currentSection && data.currentSection > 1) {
        document.getElementById('sec1').classList.remove('active');
        currentSection = data.currentSection;
        document.getElementById('sec' + currentSection).classList.add('active');
      }
    } catch(e) {
      console.error("Erro ao carregar o rascunho:", e);
    }
  }
}

// Inicializar e configurar eventos
window.addEventListener('DOMContentLoaded', () => {
  loadDraft();
  updateProgress();
  
  // Adiciona evento para salvar a cada mudança em qualquer input, select ou textarea
  document.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('change', saveDraft);
    if(el.tagName === 'TEXTAREA' || el.type === 'text' || el.type === 'email') {
      el.addEventListener('input', saveDraft);
    }
  });
});
