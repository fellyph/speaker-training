# Especificações Técnicas: PolyglotPitch

Este documento detalha a arquitetura técnica, as ferramentas e os requisitos de ambiente para o desenvolvimento do **PolyglotPitch**, focando na infraestrutura serverless e integração com IA.

## 1. Arquitetura de Sistema

O sistema seguirá uma arquitetura **Serverless** utilizando o ecossistema do Firebase para backend-as-a-service (BaaS) e Google AI Studio para capacidades de inteligência artificial.

### Diagrama de Alto Nível (Conceitual)

`[Frontend]` <--> `[Firebase SDK]` <--> `[Firebase Auth/Firestore/Storage]`
|
+--> `[Google AI Gemini API] `

---

## 2. Stack Tecnológico

### 2.1. Backend e Infraestrutura (Firebase)

Utilizaremos o **Firebase** como plataforma central para gerenciamento de identidade, banco de dados e hospedagem.

- **Autenticação (Firebase Authentication):**

  - Gerenciamento de usuários (Sign Up, Login, Logout).
  - Provedores: Email/Senha (inicialmente) e Google Sign-In (opcional futuro).
  - Persistência de sessão segura.

- **Banco de Dados (Cloud Firestore):**

  - Banco de dados NoSQL orientado a documentos para armazenar perfis de usuários, histórico de treinos e configurações.
  - Estrutura de dados flexível para acomodar as respostas JSON do Gemini.

- **Hospedagem (Firebase Hosting):**

  - Hospedagem rápida e segura para a aplicação web (se aplicável) ou landing pages do app.
  - Suporte a HTTPS e CDN global.

- **Armazenamento de Arquivos (Firebase Storage):**
  - (Implícito para a funcionalidade de áudio) Armazenamento dos áudios gravados pelos usuários antes de serem processados pela IA.

### 2.2. Inteligência Artificial (Google Gemini)

A inteligência do sistema será provida pelas APIs do modelo **Gemini** (via Google AI Studio ou Vertex AI).

- **Processamento de Linguagem e Áudio (Gemini Multimodal):**

  - **Tradução e Geração de Roteiro:** Utilização do modelo `gemini-1.5-flash` (ou `pro`) para traduzir textos e gerar roteiros estruturados.
  - **Análise de Áudio:** Envio direto de arquivos de áudio para o modelo para avaliação de pronúncia, fluência e feedback qualitativo.

- **Síntese de Voz (Text-to-Speech):**
  - Utilização das capacidades de geração de voz integradas aos endpoints do Google/Gemini para ler os roteiros e fornecer feedback em áudio no idioma alvo.

---

## 3. Requisitos de Ambiente e Configuração

Para iniciar o desenvolvimento, os seguintes pré-requisitos são necessários na máquina local e na nuvem.

### 3.1. Ferramentas Locais (Dev Environment)

- **Node.js:** Versão LTS ativa (v18 ou superior).
- **Gerenciador de Pacotes:** `npm` ou `yarn`.
- **Firebase CLI:** Instalado globalmente para deploy e testes locais (`npm install -g firebase-tools`).

### 3.2. Configuração de Contas e Chaves

1.  **Projeto Firebase:**

    - Criar um novo projeto no [Console do Firebase](https://console.firebase.google.com/).
    - Habilitar **Authentication** e configurar o provedor "Email/Password".
    - Criar um banco de dados **Firestore** (modo de produção ou teste).
    - Habilitar **Storage** para uploads de mídia.
    - Registrar a aplicação (Web/iOS/Android) para obter o objeto de configuração (`firebaseConfig`).

2.  **Google AI Studio (Gemini API):**
    - Obter uma API Key no [Google AI Studio](https://aistudio.google.com/).
    - Garantir que a chave tenha permissões para os modelos multimodais.

---

## 4. Estrutura de Dados (Esboço do Firestore)

Uma sugestão inicial para a modelagem no Firestore:

```json
users/
  {userId}/
    profile: {
      displayName: "Nome",
      nativeLanguage: "pt-BR",
      targetLanguage: "en-US",
      voicePreference: "male_1"
    }
    sessions/
      {sessionId}: {
        createdAt: Timestamp,
        scriptOriginal: "Texto...",
        scriptTranslated: "Text...",
        audioUrl: "gs://...",
        status: "completed",
        feedback: {
          pronunciationScore: 85,
          grammarScore: 90,
          comments: "..."
        }
      }
      }
```

---

## 5. Estratégia de Testes e DevOps

### 5.1. Testes Automatizados

Para garantir a qualidade de todas as telas, fluxos e casos de uso, serão implementadas camadas de testes obrigatórios:

- **Testes Unitários:** Validação de funções isoladas, lógica de negócios e utilitários.
- **Testes End-to-End (E2E):** Simulação de fluxos completos do usuário (Login -> Gravação -> Feedback) para assegurar que a integração entre Frontend, Firebase e Gemini funcione corretamente.

### 5.2. CI/CD e Versionamento

- **Repositório:** O código será versionado no **GitHub**.
- **Pipeline de Integração (GitHub Actions):**
  - Todo push ou Pull Request acionará automaticamente a suíte de testes (Unitários e E2E).
  - O merge para a branch principal (main/master) será bloqueado caso os testes de aceitação ou unidade falhem.
  - Deploy automático (opcional) para o ambiente de staging/produção após aprovação dos testes.
