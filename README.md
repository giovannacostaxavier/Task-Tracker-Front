# Task Tracker — Frontend

Frontend de uma aplicação de gestão de tarefas em formato Kanban, com autenticação de utilizador.

A aplicação consome uma API REST desenvolvida com Node.js, Express e PostgreSQL, permitindo autenticação, gestão de tarefas e organização por status.

🔗 **Backend:** [Task-Traker-Back](https://github.com/giovannacostaxavier/Task-Traker-Back)
<br>
🚀 **Projeto online:** [Acessar aplicação](https://task-traker-front.vercel.app/)

<br>

## ✨ Funcionalidades

- 🔐 Autenticação — registo e login de utilizador, com token JWT persistido no `localStorage`
- 🛡️ Rotas privadas — utilizadores não autenticados são redirecionados para `/login`
- 🔄 Interceptor de API — anexa automaticamente o token às requisições e faz logout se a API responder `401`
- 📋 Quadro Kanban — três colunas: To Do, Doing e Done, com contador de tasks
- ➕ CRUD de tasks — criar, editar e excluir
- 🔀 Mover tasks — avançar ou voltar entre as colunas
- ✅ Validação de formulários — feedback de erros em tempo real

<br>

## 🛠️ Stack

- **React** + **TypeScript**
- **Vite**
- **React Router DOM**
- **Zustand** — gerenciamento do estado de autenticação e tasks, com persistência
- **React Hook Form** + **Zod** — formulários e validação
- **Axios** — comunicação com a API
- **Tailwind CSS** — estilização

<br>

## 📁 Estrutura de pastas

```text
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── authService.ts
│   │   ├── authStore.ts
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── schemas.ts
│   │
│   ├── kanban/
│   │   ├── components/
│   │   ├── KanbanBoard.tsx
│   │   └── KanbanColumn.tsx
│   │
│   └── tasks/
│       ├── components/
│       │   ├── TaskCard.tsx
│       │   └── TaskForm.tsx
│       ├── schemas.ts
│       ├── taskService.ts
│       └── taskStore.ts
│
├── routes/
│   ├── AppLayout.tsx
│   ├── AppRoutes.tsx
│   └── PrivateRoute.tsx
│
├── services/
│   └── api.ts
│
├── shared/
├── App.tsx
├── App.css
└── index.css
```

<br>

## ⚙️ Pré-requisitos

- Node.js 18+
- Backend da aplicação em execução

<br>

## 📥 Instalação

Clone o repositório:

```bash
git clone https://github.com/giovannacostaxavier/Task-Traker-Front.git
```

Entre na pasta:

```bash
cd Task-Traker-Front
```

Instale as dependências:

```bash
npm install
```

<br>

## 🔧 Configuração

A aplicação utiliza a variável de ambiente `VITE_API_URL` para definir a URL base da API.

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
```

O cliente Axios utiliza essa variável em:

```text
src/services/api.ts
```

```ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
```

Certifique-se de que o backend esteja em execução antes de iniciar o frontend.

<br>

## ▶️ Rodando em desenvolvimento

```bash
npm run dev
```

<br>

## 📦 Build de produção

```bash
npm run build
```

<br>

## 🔗 Backend

Este frontend consome a **Task Tracker API**, desenvolvida com Node.js, Express, PostgreSQL e autenticação via JWT.

🔗 **Repositório:**  
https://github.com/giovannacostaxavier/Task-Traker-Back

### Endpoints utilizados

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| POST | `/users` | Não | Cadastra um novo utilizador |
| POST | `/login` | Não | Autentica e retorna um token JWT |
| GET | `/tasks` | 🔒 Sim | Lista todas as tasks |
| POST | `/tasks` | 🔒 Sim | Cria uma nova task |
| PUT | `/tasks/:id` | 🔒 Sim | Atualiza título e descrição de uma task |
| PATCH | `/tasks/:id/status` | 🔒 Sim | Atualiza o status de uma task |
| DELETE | `/tasks/:id` | 🔒 Sim | Exclui uma task |

O token JWT é guardado no `localStorage` através do `zustand/persist` e enviado automaticamente nas requisições através do interceptor configurado em:

```text
src/services/api.ts
```
