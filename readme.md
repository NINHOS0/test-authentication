
# Projeto Full Stack com Vite e Node.js

Este projeto é um exemplo de uma aplicação `fullstack` utilizando **Vite** no `frontend` e **Node.js** no `backend` para teste de autenticação.

#### Ao testar a aplicação, teste com os seguintes dados:
- **username**: "teste"
- **password**: "123123"
  
## Tecnologias

Durante o desenvolvimento da aplicação `fullstack` foi utilizadas das seguintes tecnologias:

#### Frontend:
-  [React](https://react.dev/)
-  [Typescript](https://www.typescriptlang.org/)
-  [Tailwind CSS](https://tailwindcss.com/)
-  [Vite](https://vitejs.dev/)
-  [Zod](https://zod.dev/)
-  [Axios](https://axios-http.com/)
-  [React-hook-form](https://react-hook-form.com/)
-  [ChakraUI](https://v2.chakra-ui.com/)

#### Backend:
-  [Node.js](https://nodejs.org/)
-  [Fastify](https://fastify.dev/)
-  [Zod](https://zod.dev/)
-  [Prisma](https://www.prisma.io/)
-  [Bcrypt](https://www.npmjs.com/package/bcrypt)

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:  

-  [Git](https://git-scm.com/)
-  [Node.js](https://nodejs.org/) (versão 20 ou superior)
-  [NPM](https://www.npmjs.com/)


# Documentação da API

Esta documentação fornece informações sobre as rotas da API do backend.


## GET /api/validate

Valida o login do usuário usando o `username` e a `password` fornecido no formulário, retornando `200` se sucesso, ou `404/401` com uma mensagem de erro caso falhe.

**Corpo da Requisição:**

```json
{
	"username": "teste",
	"password": "123123"
}
```

## Passo a passo

### 1. Clonar o repositório

Para clonar o repositório, execute o seguinte comando no seu terminal:
```bash
git  clone  https://github.com/seu-usuario/seu-repositorio.git
```

### 2. Navegar até a pasta do projeto
```bash
cd seu-repositorio
```

### 3. Instalar as dependências do backend
Navegue até a pasta `backend` e instale as dependências:
```bash
cd backend
npm install
```

### 4. Iniciar o servidor backend
Para iniciar o servidor backend, execute:
```bash
npm run dev
```

### 5. Instalar as dependências do frontend
Navegue até a pasta `frontend` e instale as dependências:
```bash
cd ../frontend
npm install
```

### 6. Iniciar o servidor frontend
Para iniciar o servidor frontend, execute:
```bash
npm run dev
```

### 7. Acessar a aplicação
Agora você pode acessar a aplicação no seu navegador. O frontend normalmente estará disponível em `http://localhost:3000` e o backend em `http://localhost:5000` (os endereços podem variar conforme a configuração do seu projeto).