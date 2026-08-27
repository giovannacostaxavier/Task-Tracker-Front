# Task Tracker — Frontend

Frontend de uma aplicação de gestão de tarefas em formato Kanban, com autenticação de utilizador. Consome uma API REST já existente (ver secção **Backend**).

## Funcionalidades

- **Autenticação** — registo e login de utilizador, com token JWT persistido no `localStorage`
- **Rotas privadas** — utilizadores não autenticados são redirecionados para `/login`
- **Interceptor de API** — anexa automaticamente o token às requisições e faz logout se a API responder `401`
- **Quadro Kanban** — três colunas (To Do, Doing, Done) com contador de tasks
- **CRUD de tasks** — criar, editar e excluir
- **Mover tasks** — avançar/voltar entre colunas (To Do → Doing → Done)
- **Validação de formulários** — feedback de erros em tempo real

## Stack

- [React](https://react.dev/) + TypeScript
- [Vite](https://vitejs.dev/) *(assumido — ajustar se o projeto usar outro bundler)*
- [React Router DOM](https://reactrouter.com/) — routing
- [Zustand](https://github.com/pmndrs/zustand) — estado global (auth e tasks), com persistência
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — formulários e validação
- [Axios](https://axios-http.com/) — chamadas HTTP
- [Tailwind CSS](https://tailwindcss.com/) — estilos

## Estrutura de pastas

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── authService.ts
│   │   ├── authStore.ts
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── schemas.ts
│   ├── kanban/
│   │   ├── components/
│   │   ├── KanbanBoard.tsx
│   │   └── KanbanColumn.tsx
│   └── tasks/
│       ├── components/
│       │   ├── TaskCard.tsx
│       │   └── TaskForm.tsx
│       ├── schemas.ts
│       ├── taskService.ts
│       └── taskStore.ts
├── routes/
│   ├── AppLayout.tsx
│   ├── AppRoutes.tsx
│   └── PrivateRoute.tsx
├── services/
│   └── api.ts          # Cliente axios com interceptors (token + logout em 401)
├── shared/
├── App.tsx
├── App.css
└── index.css
```

## Pré-requisitos

- Node.js 18+
- Backend a correr (por omissão em `http://localhost:3000`)

## Instalação

```bash
npm install
```

## Configuração

A URL base da API está definida em `src/services/api.ts`:

```ts
const api = axios.create({
  baseURL: 'http://localhost:3000',
});
```

Se precisares de apontar para outro ambiente, o ideal é extrair isto para uma variável de ambiente (`VITE_API_URL`) em vez de hardcoded.

## Correr em desenvolvimento

```bash
npm run dev
```

## Build de produção

```bash
npm run build
```

## Backend

Este frontend consome a [Task Tracker API](#) — Node.js, Express, PostgreSQL e autenticação via JWT. Consulta o README desse repositório para instruções completas de instalação e configuração.

Resumo dos endpoints usados por este frontend:

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| POST | `/users` | Não | Cadastra um novo utilizador |
| POST | `/login` | Não | Autentica e retorna um token JWT |
| GET | `/tasks` | 🔒 Sim | Lista todas as tasks |
| POST | `/tasks` | 🔒 Sim | Cria uma nova task |
| PUT | `/tasks/:id` | 🔒 Sim | Atualiza título e descrição de uma task |
| PATCH | `/tasks/:id/status` | 🔒 Sim | Atualiza o status de uma task |
| DELETE | `/tasks/:id` | 🔒 Sim | Exclui uma task |

O token JWT é guardado no `localStorage` (via `zustand/persist`) e enviado automaticamente em todas as requisições através do interceptor em `src/services/api.ts`.
