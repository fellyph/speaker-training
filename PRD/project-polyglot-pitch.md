# PRD: PolyglotPitch – App de Treinamento de Apresentações

## 1. Visão Geral do Produto

O **PolyglotPitch** é uma ferramenta de treinamento baseada em IA que ajuda profissionais e estudantes a praticarem apresentações em idiomas estrangeiros. O fluxo consiste em: tradução do roteiro original, prática de fala com transcrição em tempo real, avaliação por IA (Gemini) e acompanhamento de progresso histórico.

---

## 2. Personas

- **Executivo Internacional:** Precisa fazer apresentações em inglês/espanhol e quer garantir que sua pronúncia e gramática estejam corretas.
- **Estudante de Idiomas:** Quer praticar a fluência de forma estruturada sobre temas específicos.

---

## 3. Fluxo do Usuário (User Flow)

1.  **Entrada:** Usuário grava ou digita resumo no idioma nativo.
2.  **Tradução:** Sistema gera o roteiro no idioma alvo.
3.  **Prática:** Usuário lê o roteiro e o sistema grava o áudio.
4.  **Análise:** Gemini analisa o áudio e gera scores e feedback.
5.  **Revisão:** Usuário vê sua evolução no perfil.

---

## 4. Requisitos Funcionais (User Stories & Use Cases)

### US-001: Preparação do Roteiro (Tradução)

**Descrição:** Como usuário, quero descrever minha apresentação em meu idioma nativo para que a IA gere um roteiro estruturado no idioma alvo.

**Critérios de Aceitação:**

- [ ] O usuário deve selecionar o idioma de origem e o idioma de destino.
- [ ] O sistema deve permitir entrada via texto ou gravação de áudio (STT - Speech-to-Text).
- [ ] A tradução deve manter o tom (formal/informal) solicitado.
- [ ] O roteiro gerado deve ser exibido em formato de "Teleprompter".

### US-002: Treinamento e Gravação

**Descrição:** Como usuário, quero ler o roteiro gerado enquanto sou gravado para que minha performance possa ser avaliada.

**Critérios de Aceitação:**

- [ ] Exibir o texto traduzido de forma clara na tela de treino.
- [ ] Botão de "Start/Stop" para gravação de áudio.
- [ ] Indicação visual de que o áudio está sendo captado (onda sonora).
- [ ] Salvar o arquivo de áudio temporariamente para envio à API.

### US-003: Avaliação por IA (Motor Gemini)

**Descrição:** Como usuário, quero que minha fala seja analisada tecnicamente para entender meus pontos fracos e fortes.

**Critérios de Aceitação:**

- [ ] O áudio deve ser enviado para o modelo Gemini (ou similar com suporte a áudio).
- [ ] O retorno deve conter scores de 0 a 100 para: **Pronúncia, Fluidez, Gramática e Vocabulário**.
- [ ] Gerar um feedback textual/áudio personalizado no idioma alvo.
- [ ] Identificar palavras específicas que foram pronunciadas incorretamente.

### US-004: Dashboard de Evolução

**Descrição:** Como usuário, quero ver um histórico das minhas apresentações para acompanhar meu progresso.

**Critérios de Aceitação:**

- [ ] Tela de Perfil listando todas as sessões anteriores.
- [ ] Gráfico de linha/radar mostrando a evolução dos scores ao longo do tempo.
- [ ] Opção de ouvir as gravações anteriores para comparação.

### US-005: Autenticação (Sign Up & Login)

**Descrição:** Como usuário, preciso criar uma conta e realizar login para acessar a área segura da aplicação e meus dados personalizados.

**Critérios de Aceitação:**

- [ ] Tela de Criação de Conta (Sign Up) com campos básicos (Nome, Email, Senha).
- [ ] Tela de Login com validação de credenciais.
- [ ] O login bem-sucedido deve redirecionar o usuário para o Dashboard Principal.
- [ ] Mecanismo de recuperação de senha ("Esqueci minha senha").

### US-006: Dashboard Principal (Home)

**Descrição:** Como usuário logado, quero ter uma visão geral e acesso rápido às principais funcionalidades da aplicação.

**Critérios de Aceitação:**

- [ ] Acesso imediato à criação de um novo treino (atalho para US-001).
- [ ] Visão resumida do progresso recente.
- [ ] Navegação clara para o Histórico Completo e Perfil de Usuário.

### US-007: Perfil e Preferências

**Descrição:** Como usuário, quero personalizar minha experiência definindo meus idiomas preferidos e o tipo de voz da IA.

**Critérios de Aceitação:**

- [ ] Configuração do Idioma de Entrada (Língua Nativa) padrão.
- [ ] Configuração do Idioma de Saída (Língua de Estudo) padrão.
- [ ] Seleção do Tipo de Voz da IA para leitura e feedback (ex: Masculina, Feminina, Variações Regionais).
- [ ] Capacidade de editar dados cadastrais (Nome, Senha).

---

## 5. Requisitos Técnicos e Integrações

### Tecnologias Sugeridas:

- **Frontend:** React Native ou Flutter (para suporte mobile).
- **Backend:** Node.js ou Python (FastAPI).
- **IA de Processamento:** Google Gemini API (Multimodal para análise de áudio e texto).
- **Banco de Dados:** PostgreSQL (para dados de perfil) + Supabase/Firebase (para arquivos de áudio).

### API Prompt Engineering (Exemplo para o Gemini):

> "Analise o áudio anexo comparando-o com o roteiro [TEXTO]. Forneça um JSON com:
>
> 1. Score de pronúncia (0-100).
> 2. Score de gramática (0-100).
> 3. Lista de palavras mal pronunciadas.
> 4. Feedback encorajador em [IDIOMA ALVO]."

---

## 6. Métricas de Sucesso (KPIs)

- **Retenção:** Usuários que realizam pelo menos 3 treinos por semana.
- **Melhoria de Score:** Aumento médio de 15% nos scores de pronúncia após 10 sessões.
- **Precisão da IA:** Baixo índice de "falsos negativos" na detecção de erros de gramática.

---

## 7. Roadmap Futuro

- **Modo Offline:** Treinamento básico sem conexão.
- **Vídeo Feedback:** Análise de linguagem corporal via câmera.
- **Gamificação:** Badges por conquistas (ex: "Apresentador Global").

---

## 8. Especificações de Design (UI/UX)

- **Cores Primárias:** Verde Menta (#A7F3D0), Lilás Suave (#C4B5FD)
- **Fundo:** Off-white cinzento e Preto Puro para contraste
- **Bordas:** Altamente arredondadas (estimado em 32px ou 40px)
- **Tipografia:** Sans-serif geométrica (ex: Inter, Lexend ou Poppins)
- **Estilo de Gráfico:** Formas orgânicas, barras arredondadas e preenchimento sólido
