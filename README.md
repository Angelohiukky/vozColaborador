# 🚀 Voz do Colaborador — TI

Um formulário interativo, dinâmico e moderno construído para dar voz aos colaboradores das unidades de saúde, facilitando o envio de feedbacks, problemas e ideias de melhorias diretamente para a equipe de tecnologia (TI).

---

## 🛠️ Funcionalidades principais

- **Interface em Etapas (Multi-step):** Divisão lógica do formulário em 4 etapas estruturadas para facilitar o preenchimento e evitar fadiga visual.
- **Barra de Progresso Dinâmica:** Indicador visual de progresso que avança ou retorna conforme as etapas do formulário são navegadas.
- **Rascunho Automático (`localStorage`):** Proteção total contra perda de dados. Se o colaborador atualizar a página por acidente ou fechar o navegador, o progresso preenchido e a etapa atual são restaurados automaticamente no próximo acesso.
- **Envio por E-mail Integrado (FormSubmit):** Envio dos feedbacks diretamente para o e-mail da TI (`angelo.riosaude@gmail.com`) via requisições assíncronas (AJAX com Fetch API) e formatado de forma limpa.
- **Feedback Visual de Envio:** Desabilita o botão e exibe um indicador de carregamento durante a transmissão do formulário, prevenindo cliques duplos.
- **Componentes Interativos Premium:** Sistema de avaliação com estrelas (Star Rating), opções em formato de cartões visuais (Card-based selections) e contadores de caracteres para os campos de texto.

---

## 📁 Estrutura de Arquivos

O projeto foi refatorado e modularizado para garantir máxima organização e facilidade de manutenção:

```text
vozColaborador/ (raiz do repositório)
├── index.html   # Estrutura e marcação semântica do formulário
├── style.css    # Estilos CSS, variáveis de design system e animações
├── script.js    # Lógica de validação, rascunhos e envio para API externa
└── README.md    # Documentação geral do projeto
```

---

## ✉️ Como funciona a Integração com E-mail (FormSubmit)

Usamos o **FormSubmit.co** (um serviço gratuito e rápido para envio de dados de páginas estáticas por e-mail).

1. **Configuração:** O e-mail de destino está configurado na constante no início do arquivo `script.js`:
   ```javascript
   const EMAIL_DESTINO = "angelo.riosaude@gmail.com";
   ```
2. **Processo de Ativação (Apenas no Primeiro Envio):**
   - Ao fazer o primeiro teste de envio do formulário, o FormSubmit enviará um e-mail de confirmação para `angelo.riosaude@gmail.com`.
   - Você precisa entrar no seu e-mail e clicar no link de ativação enviado por eles.
   - **Pronto!** Uma vez ativado, todos os envios subsequentes cairão diretamente na sua caixa de entrada formatados em uma tabela organizada.

---

## 💻 Como Executar Localmente

Como o projeto é feito puramente de tecnologias estáticas do ecossistema Web (HTML, CSS e JavaScript), você não precisa instalar nenhuma dependência ou banco de dados no seu computador.

1. Baixe ou clone o repositório em sua máquina:
   ```bash
   git clone https://github.com/Angelohiukky/vozColaborador.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd ideias
   ```
3. Dê dois cliques no arquivo `index.html` ou abra-o em qualquer navegador de sua preferência (Chrome, Edge, Firefox, Safari).
4. *(Opcional)* Se preferir rodar usando um servidor local rápido com o VS Code, você pode usar a extensão **Live Server** para obter recarregamento em tempo real (Hot Reload).

---

## 🎨 Design System e Estética

- **Fontes:** `Sora` (para textos, botões e labels) e `DM Serif Display` (serifa moderna para chamadas importantes no Hero), importadas diretamente do Google Fonts.
- **Esquema de Cores HSL/HEX:** Baseado em tons corporativos verdes e azuis suaves, trazendo sofisticação e profissionalismo.
- **Acessibilidade e Usabilidade:** Foco dinâmico e efeitos de hover suaves dão a sensação de uma aplicação nativa e interativa.
