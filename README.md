# 📚 StudyHub — Plataforma de Estudos

<p align="center">
  Plataforma desenvolvida para auxiliar estudantes na organização da rotina de estudos, no gerenciamento de conteúdos e no acompanhamento do desempenho acadêmico por meio de ferramentas interativas.
</p>

---

## 📌 Sobre o Projeto

O **StudyHub** é uma plataforma de estudos desenvolvida com o objetivo de centralizar ferramentas e recursos que auxiliam estudantes na organização da rotina acadêmica e no acompanhamento de seu progresso.

A aplicação reúne funcionalidades de gerenciamento de tempo, organização de conteúdos, acompanhamento de sessões de estudo e recursos interativos, proporcionando um ambiente que incentiva a produtividade e a consistência nos estudos.

O projeto possui uma arquitetura dividida entre Frontend e Backend, com comunicação por meio de uma API, permitindo a separação das responsabilidades, facilitando a manutenção e possibilitando a evolução independente de cada camada.

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
  <img width="1841" height="1025" alt="Página inicial" src="https://github.com/user-attachments/assets/19565323-dd6a-412d-af1c-98c9d59f57c4" />
</p>

### ⏱️ Ferramentas de Estudo

**Cronômetro do método Pomodoro**

<p align="center">
  <img width="1841" height="1025" alt="Cronômetro Pomodoro" src="https://github.com/user-attachments/assets/7bb05116-f9fc-4438-8359-93a3877217c9" />
</p>

**Cronômetro regressivo**

<p align="center">
  <img width="1841" height="1025" alt="Cronômetro regressivo" src="https://github.com/user-attachments/assets/bf66564d-1153-425d-8594-0889fab34764" />
</p>

**Cronômetro progressivo**

<p align="center">
  <img width="1841" height="1025" alt="Cronômetro progressivo" src="https://github.com/user-attachments/assets/ae6d4a58-a781-49a7-9bb8-0f9c7aa1330b" />
</p>

### 📚 Organização dos Estudos

**Histórico de estudos**

<p align="center">
  <img width="1841" height="1025" alt="Histórico de estudos" src="https://github.com/user-attachments/assets/2468ff36-7c51-4e7c-bfb8-75bd6b8dd0f1" />
</p>

**Flashcards**

<p align="center">
  <img width="1841" height="1025" alt="Flashcards" src="https://github.com/user-attachments/assets/82d824c0-efd8-41a5-a120-d788c4ae90d2" />
</p>

**Ranking de estudos**

<p align="center">
  <img width="1841" height="1025" alt="Ranking de estudos" src="https://github.com/user-attachments/assets/205ef564-5ce5-41c2-9485-f4692fec57df" />
</p>

### ⚙️ Personalização

**Redefinição de senha**

<p align="center">
  <img width="1841" height="1025" alt="Redefinição de senha" src="https://github.com/user-attachments/assets/f4181c01-d3d5-4dc4-8b55-63b963a7a371" />
</p>

**Personalização da foto de perfil**

<p align="center">
  <img width="1841" height="1025" alt="Personalização da foto de perfil" src="https://github.com/user-attachments/assets/6d93d6dc-375b-469d-bc4b-a792e0877051" />
</p>

---

## ✨ Funcionalidades

### 🔐 Autenticação e Gerenciamento de Conta

- **Login:** autenticação de usuários e gerenciamento de acesso por meio de tokens JWT.
- **Cadastro:** registro de alunos na plataforma.
- **Recuperação de senha:** envio de e-mail para recuperação do acesso.
- **Redefinição de senha:** alteração da senha da conta.
- **Personalização:** atualização da imagem de perfil.

### ⏱️ Ferramentas de Estudo

- **Pomodoro:** temporizador baseado na técnica Pomodoro para organização dos períodos de estudo e descanso.
- **Cronômetro regressivo:** contagem de tempo a partir de uma duração definida.
- **Cronômetro progressivo:** acompanhamento do tempo decorrido durante uma atividade.

### 📚 Organização e Acompanhamento

- **Flashcards:** criação de cartões de perguntas e respostas, organizados por categorias, para auxiliar na revisão e fixação de conteúdos.
- **Histórico de estudos:** consulta aos registros das sessões de estudo realizadas na plataforma.
- **Ranking:** classificação dos alunos de acordo com o tempo total de estudo acumulado, permitindo acompanhar o desempenho e incentivar a dedicação à rotina de estudos.

---

## 🏆 Ranking

O Ranking é uma funcionalidade que permite visualizar e comparar o tempo total de estudo registrado pelos alunos na plataforma.

A classificação é construída a partir das sessões de estudo armazenadas no banco de dados, somando os tempos registrados para cada aluno e organizando os resultados em ordem decrescente.

O sistema apresenta:

- Classificação dos alunos de acordo com o tempo acumulado de estudo.
- Identificação das posições no ranking.
- Destaque visual para os três primeiros colocados.
- Exibição do tempo total de estudo convertido em horas e minutos.

A funcionalidade utiliza os registros de sessões de estudo para calcular o desempenho acumulado de cada aluno, atualizando a classificação conforme os dados disponíveis.

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
| XAMPP | Ambiente de desenvolvimento local para gerenciamento do MySQL e Apache |
| JSON Web Token (JWT) | Autenticação e validação de acesso |
| Multer | Recebimento e gerenciamento de arquivos enviados |

---

## 🏗️ Arquitetura do Projeto

O StudyHub utiliza uma arquitetura dividida entre **Frontend e Backend**, com o objetivo de separar as responsabilidades da aplicação, facilitar a manutenção do código e permitir a evolução independente de cada camada.

### 📁 Estrutura de Diretórios

```text
meu-projeto/
│
├── view/                              # Frontend
│   └── plataforma-estudos/
│       ├── public/
│       ├── src/
│       │   ├── components/             # Componentes reutilizáveis
│       │   ├── configuracoes/          # Configurações
│       │   ├── img/                   # Imagens
│       │   ├── layout/                # Elementos estruturais
│       │   ├── pages/                  # Páginas da aplicação
│       │   └── services/               # Comunicação com a API
│       ├── App.css
│       └── App.js
│
├── control/                            # Controllers
├── model/                               # Models e acesso aos dados
├── router/                               # Rotas da API
├── middleware/                            # Middlewares e validações
│
└── app.js                                # Inicialização do servidor
```

### 💻 Frontend

Desenvolvido com React.js, é responsável pela interface gráfica e pela interação dos usuários com a plataforma.

Suas principais responsabilidades são:

- Renderização das páginas e componentes.
- Gerenciamento dos estados da aplicação.
- Navegação entre as funcionalidades.
- Comunicação com o Backend por meio de requisições HTTP.
- Apresentação e atualização dos dados recebidos da API.

### ⚙️ Backend

Desenvolvido com Node.js e Express, é responsável pelo processamento das requisições, aplicação das regras de negócio e comunicação com o banco de dados MySQL.

Sua organização é dividida em:

- **control:** recebe as requisições, coordena a execução das operações e retorna as respostas ao Frontend.
- **model:** concentra as operações relacionadas aos dados e a comunicação com o banco de dados.
- **router:** define as rotas da API e direciona as requisições para seus respectivos controllers.
- **middleware:** executa validações e verificações intermediárias, como a autenticação por JWT.

### 🗄️ Banco de Dados

O projeto utiliza MySQL para armazenar e gerenciar as informações da plataforma, incluindo dados dos alunos, sessões de estudo e conteúdos organizados pelos usuários.

A comunicação com o banco de dados é realizada pelo Backend por meio da biblioteca MySQL2.

Para o ambiente de desenvolvimento local, é utilizado o XAMPP, que disponibiliza ferramentas para gerenciamento do serviço de banco de dados e do servidor Apache.

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

## 🗄️ Modelo do Banco de Dados

O banco de dados do StudyHub foi estruturado para organizar e relacionar as informações utilizadas pelas funcionalidades da plataforma.

<p align="center">
  <img width="848" alt="Modelo do banco de dados do StudyHub" src="https://github.com/user-attachments/assets/9155c317-cae1-4e77-adda-5e411bdba7bc" />
</p>

---

## 🚀 Como Executar o Projeto

### 📋 Pré-requisitos

Antes de executar o projeto, é necessário possuir as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/)
- [XAMPP](https://www.apachefriends.org/)
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

1. Abra o painel de controle do XAMPP.
2. Inicie os módulos MySQL e Apache.
3. Acesse o phpMyAdmin:

```text
http://localhost/phpmyadmin
```

4. Crie o banco de dados utilizado pelo StudyHub.
5. Importe o script SQL do projeto, caso disponível.
6. Configure as credenciais de conexão no Backend de acordo com as configurações definidas no projeto.

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

O desenvolvimento da plataforma possibilitou trabalhar com diferentes tecnologias, estruturar uma aplicação Full Stack e integrar funcionalidades que envolvem autenticação, persistência de dados, gerenciamento de sessões e atualização dinâmica de interfaces.

Além de oferecer ferramentas de apoio aos estudos, o projeto representa uma oportunidade de aprofundar conhecimentos em React, Node.js, Express e MySQL, trabalhando com uma aplicação estruturada em diferentes camadas.

---

<p align="center">
  Desenvolvido como projeto de estudo e desenvolvimento de habilidades em programação.
</p>
