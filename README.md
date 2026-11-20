# 📚 StudyHub — Plataforma de Estudos

<p align="center">
  Plataforma desenvolvida para auxiliar estudantes na organização da rotina de estudos, no gerenciamento de conteúdos e na melhoria do aprendizado por meio de ferramentas interativas.
</p>

---

## 📌 Sobre o Projeto

O **StudyHub** é uma plataforma de estudos desenvolvida com o objetivo de centralizar ferramentas e recursos que auxiliam os estudantes em sua rotina acadêmica.

A aplicação oferece funcionalidades que permitem organizar os estudos, acompanhar o tempo dedicado às atividades e utilizar recursos interativos que contribuem para a produtividade e a aprendizagem.

O projeto possui uma arquitetura dividida entre Frontend e Backend, permitindo a separação das responsabilidades, facilitando a manutenção do código e possibilitando a evolução independente de cada camada.

---

## 📸 Demonstração do Projeto

A seguir, estão algumas capturas de tela das funcionalidades e páginas desenvolvidas na plataforma.

### 🔐 Autenticação e Acesso

**Página de login**

<p align="center">
  <img width="1839" alt="Página de login" src="https://github.com/user-attachments/assets/509d14a7-c878-411a-b647-cdb9bcc57171" />
</p>

**Página de cadastro**

<p align="center">
  <img width="1841" alt="Página de cadastro" src="https://github.com/user-attachments/assets/4b36a2cb-d74d-4c31-b27c-8430d11e3dc6" />
</p>

**Recuperação de senha por e-mail**

<p align="center">
  <img width="1841" alt="Página de recuperação de senha" src="https://github.com/user-attachments/assets/b876b4e1-aa4c-4921-9cf9-1a1390aa62d2" />
</p>

### 🏠 Página Inicial

<p align="center">
  <img width="1841" alt="Página inicial do StudyHub" src="https://github.com/user-attachments/assets/52477327-3c05-4487-821a-82dfd2141c5b" />
</p>

### ⏱️ Ferramentas de Estudo

**Cronômetro do método Pomodoro**

<p align="center">
  <img width="1839" alt="Cronômetro Pomodoro" src="https://github.com/user-attachments/assets/c70adb2b-016b-476b-9d39-12f00e88b513" />
</p>

**Cronômetro regressivo**

<p align="center">
  <img width="1841" alt="Cronômetro regressivo" src="https://github.com/user-attachments/assets/2f11f15e-4c08-4d2a-8088-55e39511efbf" />
</p>

**Cronômetro progressivo**

<p align="center">
  <img width="1841" alt="Cronômetro progressivo" src="https://github.com/user-attachments/assets/408bc246-edc5-4662-9db0-b301296becf8" />
</p>

### 📚 Organização dos Estudos

**Histórico de estudos**

<p align="center">
  <img width="1841" alt="Histórico de estudos" src="https://github.com/user-attachments/assets/61278867-7d4c-484d-aaee-1ee19567503b" />
</p>

**Flashcards**

<p align="center">
  <img width="1841" alt="Página de flashcards" src="https://github.com/user-attachments/assets/d55ded59-4b1d-47e9-81b8-f49259cbfa66" />
</p>

### ⚙️ Personalização

**Redefinição de senha**

<p align="center">
  <img width="1841" alt="Página de redefinição de senha" src="https://github.com/user-attachments/assets/e303fe2b-3b3c-4d14-93a0-2fa5635e4a33" />
</p>

**Personalização da foto de perfil**

<p align="center">
  <img width="1841" alt="Personalização da foto de perfil" src="https://github.com/user-attachments/assets/98058efc-77c3-4416-a040-a2ae0cfbb61d" />
</p>

---

## 🗄️ Modelo do Banco de Dados

O banco de dados do StudyHub foi estruturado para organizar e relacionar as informações utilizadas pelas funcionalidades da plataforma.

<p align="center">
  <img width="848" alt="Modelo do banco de dados do StudyHub" src="https://github.com/user-attachments/assets/9155c317-cae1-4e77-adda-5e411bdba7bc" />
</p>

---

## ✨ Funcionalidades

### 🔐 Autenticação e Gerenciamento de Conta

- **Login:** autenticação de usuários e gerenciamento de acesso por meio de tokens JWT.
- **Cadastro:** registro de alunos na plataforma.
- **Recuperação de senha:** envio de mensagem por e-mail para recuperação do acesso.
- **Redefinição de senha:** alteração da senha da conta.
- **Personalização:** atualização da imagem de perfil.

### 📖 Ferramentas de Estudo

- **Pomodoro:** temporizador para organização dos períodos de estudo e descanso.
- **Cronômetro regressivo:** contagem de tempo até um período determinado.
- **Cronômetro progressivo:** acompanhamento do tempo decorrido.
- **Flashcards:** criação e organização de cartões de perguntas e respostas em categorias.
- **Histórico:** consulta de informações relacionadas à utilização das ferramentas de estudo.

---

## 🛠️ Tecnologias Utilizadas

As tecnologias utilizadas no desenvolvimento do StudyHub estão divididas entre Frontend e Backend.

### 💻 Frontend

| Tecnologia | Utilização |
|---|---|
| React.js | Desenvolvimento da interface e dos componentes |
| React Router DOM | Navegação entre as páginas |
| JavaScript | Lógica e interações da aplicação |
| CSS | Estilização e organização visual |
| React Icons | Utilização de ícones na interface |

### ⚙️ Backend

| Tecnologia | Utilização |
|---|---|
| Node.js | Ambiente de execução JavaScript no servidor |
| Express | Criação e gerenciamento das rotas da API |
| MySQL | Armazenamento e gerenciamento dos dados |
| MySQL2 | Comunicação com o banco de dados |
| JSON Web Token (JWT) | Autenticação e validação de acesso |
| Multer | Recebimento e gerenciamento de arquivos enviados |

---

## 🏗️ Arquitetura do Projeto

O StudyHub utiliza uma arquitetura dividida entre **Frontend e Backend**, com o objetivo de separar as responsabilidades da aplicação, facilitar a manutenção do código e permitir a evolução independente de cada camada.

### 📁 Estrutura de Diretórios

```text
meu-projeto/                         # Raiz do projeto
│
├── view/                            # Frontend da aplicação
│   └── plataforma-estudos/          # Projeto desenvolvido em React
│       ├── public/                  # Arquivos públicos e recursos estáticos
│       ├── src/                     # Código-fonte do Frontend
│       │   ├── components/          # Componentes reutilizáveis
│       │   ├── configuracoes/       # Componentes de configuração
│       │   ├── img/                 # Imagens utilizadas na aplicação
│       │   ├── layout/              # Elementos estruturais da interface
│       │   ├── pages/               # Páginas da aplicação
│       │   └── services/            # Serviços e comunicação com a API
│       ├── App.css                  # Estilos do componente principal
│       └── App.js                   # Componente principal do React
│
├── control/                         # Controllers: processamento das requisições
├── model/                           # Models: operações e acesso aos dados
├── router/                          # Definição das rotas da API
├── middleware/                      # Validações e autenticação
│
└── app.js                           # Inicialização e configuração do servidor
```

### 💻 Frontend

Desenvolvido com React.js, é responsável pela interface gráfica e pela interação dos usuários com a plataforma.

Suas principais responsabilidades são:

- Renderização das páginas e componentes.
- Gerenciamento dos estados da aplicação.
- Navegação entre as funcionalidades.
- Comunicação com o Backend por meio de requisições HTTP.
- Apresentação dos dados recebidos da API.

### ⚙️ Backend

Desenvolvido com Node.js e Express, é responsável pelo processamento das requisições, aplicação das regras de negócio e comunicação com o banco de dados MySQL.

Sua organização é dividida em:

- **control:** recebe as requisições, coordena a execução das operações e retorna as respostas ao Frontend.
- **model:** concentra as operações relacionadas aos dados e a comunicação com o banco de dados.
- **router:** define as rotas da API e direciona as requisições para seus respectivos controllers.
- **middleware:** executa validações e verificações intermediárias, como a autenticação por JWT.

### 🗄️ Banco de Dados

O projeto utiliza MySQL para armazenar e gerenciar as informações da plataforma, incluindo dados relacionados aos alunos, professores, disciplinas, turmas e recursos de estudo.

A comunicação com o banco de dados é realizada pelo Backend por meio da biblioteca MySQL2.

### 🔄 Comunicação entre as Camadas

A comunicação ocorre por meio de requisições HTTP entre o Frontend e a API desenvolvida no Backend.

O fluxo de comunicação acontece da seguinte maneira:

1. O usuário realiza uma ação na interface do StudyHub.
2. O Frontend envia uma requisição HTTP para a API.
3. O Backend recebe a solicitação por meio de uma rota.
4. Os middlewares realizam as validações necessárias.
5. O controller coordena a operação solicitada.
6. O model realiza as operações necessárias no banco de dados.
7. O Backend retorna uma resposta, geralmente em formato JSON.
8. O Frontend recebe os dados e atualiza a interface.

---

## 🚀 Como Executar o Projeto

### 📋 Pré-requisitos

Antes de executar o projeto, é necessário possuir as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

Acesse a pasta raiz do projeto:

```bash
cd meu-projeto
```

### 2. Configurar o Banco de Dados

Certifique-se de que o servidor MySQL esteja em execução.

Crie o banco de dados e configure as credenciais de conexão utilizadas pelo Backend.

As informações de conexão devem corresponder às configurações definidas no projeto.

### 3. Configurar o Backend

Na raiz do projeto, instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
node app.js
```

O Backend utiliza o endereço:

```text
http://localhost:3000
```

### 4. Configurar o Frontend

Abra outro terminal e acesse a pasta do React:

```bash
cd view/plataforma-estudos
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm start
```

Após a inicialização, o Frontend poderá ser acessado pelo endereço:

```text
http://localhost:3001
```

---

## 🔒 Segurança

O StudyHub utiliza mecanismos de segurança para controlar o acesso às funcionalidades da aplicação.

Entre eles:

- Autenticação de usuários por meio de JSON Web Tokens (JWT).
- Validação de tokens em rotas protegidas.
- Middlewares para verificação das requisições.
- Separação entre as operações do Frontend e do Backend.

---

## 🎯 Objetivo do Projeto

O StudyHub foi desenvolvido com o propósito de aplicar conhecimentos de desenvolvimento Web, integração entre sistemas, manipulação de dados e construção de interfaces interativas.

Além de oferecer ferramentas de apoio aos estudos, o projeto representa uma oportunidade de aprofundar conhecimentos em tecnologias como React, Node.js, Express e MySQL, trabalhando com uma aplicação estruturada em diferentes camadas.

---

<p align="center">
  Desenvolvido como projeto de estudo e desenvolvimento de habilidades em programação.
</p>
