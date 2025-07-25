# JetAgendamento

Sistema completo para agendamento e gerenciamento de tarefas, com backend em Node.js/Express, banco de dados SQLite (via Prisma), fila de notificações com Redis/BullMQ e frontend em React + TypeScript.

## Estrutura de Pastas

```
JetAgendamento/
├── backend/
│   ├── docker-compose.yml
│   ├── dockerfile
│   ├── entrypoint.sh
│   ├── jest.config.js
│   ├── package.json
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── dev.db
│   │   └── migrations/
│   └── src/
│       ├── app.ts
│       ├── server.ts
│       ├── worker.ts
│       ├── config/
│       ├── controllers/
│       ├── database/
│       ├── middlewares/
│       ├── routes/
│       ├── services/
│       └── __tests__/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── middleware/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   └── public/
└── README.md
```

## Arquitetura Utilizada

### Backend (Node.js + Express + Prisma)
- **Arquitetura em camadas**:
  - `controllers/`: Camada de controle das rotas e requisições HTTP.
  - `services/`: Lógica de negócio e integração com o banco de dados.
  - `middlewares/`: Validações e autenticação JWT.
  - `database/`: Configuração do Prisma Client.
  - `worker.ts`: Worker para processamento assíncrono de notificações (BullMQ/Redis).
- **Banco de dados**: SQLite (pode ser adaptado para outros via Prisma).
- **Fila de tarefas**: BullMQ + Redis para agendamento de notificações e atualização de status.

### Frontend (React + TypeScript + Vite)
- **Componentização**: Componentes reutilizáveis em `components/`.
- **Pages**: Páginas principais em `pages/` (Login, Registro, Home, Criar Tarefa).
- **Context API**: Gerenciamento de autenticação em `context/AuthContext.tsx`.
- **Rotas protegidas**: Middleware de rota em `middleware/ProtectedRoute.tsx`.

## Tecnologias Principais
- **Backend**: Node.js, Express, Prisma, SQLite, BullMQ, Redis, JWT, Jest
- **Frontend**: React, TypeScript, Vite, React Router DOM, Axios, TailwindCSS
- **Infraestrutura**: Docker, Docker Compose

## Como Rodar a Aplicação

### Usando Docker (Recomendado)
1. No diretório `backend/`, crie um arquivo `.env` com as variáveis necessárias (exemplo):
   ```env
   DATABASE_URL="file:./dev.db" // utilizando sqlite
   PORT=3001
   JWT_SECRET=sua_chave_secreta
   WEBHOOK_URL=url_server_webhook
   ```
   Como se trata de um projeto simples foi utilizado o https://webhook.site/ para testar a utilização do webhook. Porém, sinta-se à vontade de utilizar outras opções.
2. Execute:
   ```sh
   cd backend
   docker-compose up --build
   ```
   - Isso irá subir: API, Worker e Redis.
3. O backend estará disponível em `http://localhost:3001`.

4. Para o frontend:
   ```sh
   cd ../frontend
   npm install
   npm run dev
   ```
   - Acesse `http://localhost:5173` (ou porta informada pelo Vite).

### Rodando Manualmente (Sem Docker)
**Pré-requisitos:** Node.js, npm, Redis local

1. Backend:
   ```sh
   cd backend
   npm install
   npx prisma migrate deploy
   npm run dev
   # Em outro terminal, rode o worker:
   npm run start:worker
   ```
2. Frontend:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

## Observações
- O banco de dados padrão é SQLite, salvo em `backend/prisma/dev.db`.
- Para ambiente de produção, adapte as variáveis de ambiente e o banco conforme necessário.
- O sistema utiliza autenticação JWT e validação de dados via middlewares.
- Notificações e atualizações de status de tarefas são processadas de forma assíncrona via fila Redis/BullMQ.

---

Desenvolvido por Kewen Silva. 