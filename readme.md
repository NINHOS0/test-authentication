***
# Projeto Full Stack com Vite e Node.js
***
Este projeto é um exemplo de uma aplicação `fullstack` utilizando **Vite** no `frontend` e **Node.js** no `backend` para teste de autenticação.

**Ao testar a aplicação, teste com os seguintes dados:**
- **username**: "teste"
- **password**: "123123"
  
## Tecnologias
***
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
-  [React Router](https://reactrouter.com/)

#### Backend:
-  [Node.js](https://nodejs.org/)
-  [Fastify](https://fastify.dev/)
-  [Zod](https://zod.dev/)
-  [Prisma](https://www.prisma.io/)
-  [Bcrypt](https://www.npmjs.com/package/bcrypt)

## Pré-requisitos
***
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:  

-  [Git](https://git-scm.com/)
-  [Node.js](https://nodejs.org/)
-  [NPM](https://www.npmjs.com/)

## Documentação da API
***
Esta documentação fornece informações sobre as rotas da API do backend.


### GET /api/validate

Valida o login do usuário usando o `username` e a `password` fornecido no formulário, retornando `200` se sucesso, ou `404/401` com uma mensagem de erro caso falhe.

**Corpo da Requisição:**

```json
{
	"username": "teste",
	"password": "123123"
}
```

## #GET /api/users

Retorna todos os usuários registrados.

**Exemplo de Requisição:**
```http
GET /api/users
```

**Exemplo de Resposta:**
```json
[
    {
		"id": "92bd800f-5dc7-4883-ac72-1c52dde46067",
		"username": "teste",
		"password": "$2a$10$/4yKcEB3k/.6XJ2B8YfEnOIX4e7WfvUMUTL.u8qnh5cJG.c0d1rnW"
	},
	...
]
```

### POST /api/users

Adiciona um novo usuário com os dados passados.

**Corpo da Requisição:**

```json
{
	"username": "teste",
	"password": "123123"
}
```

**Exemplo de Requisição:**
```http
POST /api/users
```

**Exemplo de Resposta:**
```json
{
	"message": "Usuário criado com sucesso!",
	"data": {
		"id": "92bd800f-5dc7-4883-ac72-1c52dde46067",
		"username": "teste",
		"password": "$2a$10$/4yKcEB3k/.6XJ2B8YfEnOIX4e7WfvUMUTL.u8qnh5cJG.c0d1rnW"
	}
}
```

### PATCH /api/users/:userId

Atualiza um usuário já existente.

**Parâmetros:**

- `userId` (obrigatório): O ID do usuário.

**Corpo da Requisição:**

```json
{
	"username": "teste",
	"password": "123123"
}
```

**Exemplo de Requisição:**
```http
PATCH /api/users/92bd800f-5dc7-4883-ac72-1c52dde46067
```

**Exemplo de Resposta:**
```json
{
	"message": "Usuário editado com sucesso!",
	"data": {
		"id": "92bd800f-5dc7-4883-ac72-1c52dde46067",
		"username": "teste",
		"password": "$2a$10$/4yKcEB3k/.6XJ2B8YfEnOIX4e7WfvUMUTL.u8qnh5cJG.c0d1rnW"
	}
}
```

### DELETE /api/users/:userId

Exclui um usuário registrado.

**Parâmetros:**

- `userId` (obrigatório): O ID do usuário.

**Exemplo de Requisição:**
```http
DELETE /api/users/92bd800f-5dc7-4883-ac72-1c52dde46067
```

**Exemplo de Resposta:**
```json
{
	"message": "Usuário excluído com sucesso!",
}
```

## Passo a passo
***
### 1. Clonar o repositório

Para clonar o repositório, execute o seguinte comando no seu terminal:
```bash
git clone https://github.com/NINHOS0/test-authentication
```

### 2. Navegar até a pasta do projeto
```bash
cd test-authentication
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
Agora você pode acessar a aplicação no seu navegador. O frontend normalmente estará disponível em `http://localhost:5173` e o backend em `http://localhost:3333/api/validate`

## Rotas Frontend

***
`http://localhost:5173/login`
`http://localhost:5173/users`