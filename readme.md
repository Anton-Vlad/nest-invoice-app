# 🧾 Nest Invoice App

A full-stack invoicing application built with **NestJS**, **Prisma**, **React**, and **Tailwind CSS**. Includes a PostgreSQL database via **Docker**.

---

## 🚀 Prerequisites

Ensure you have the following installed:

- **Node.js** ≥ `v20.11.1`
- **npm** ≥ `10.2.4`
- **Docker** ≥ `28.1.1`, build `4eba377`

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Anton-Vlad/nest-invoice-app.git
cd nest-invoice-app
```

### 2. Setup the Server
```bash
cd server
npm install
docker-compose up -d
```

Apply the database schema and seed initial data:
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

Start the server:
```bash
npm start
```

### 3. Setup the Client
Open another terminal:

```bash
cd client
npm install
npm run dev
```

---
## 👥 Test Users
You can log in using one of the seeded test accounts:

| Email                                   | Password |
| --------------------------------------- | -------- |
| [john@test.com](mailto:john@test.com)   | 123456   |
| [alice@test.com](mailto:alice@test.com) | 123456   |
| [bob@test.com](mailto:bob@test.com)     | 123456   |


## 🛠 Tech Stack

- Backend: NestJS, Prisma, PostgreSQL, Docker
- Frontend: React, TypeScript, Tailwind CSS, Vite
- Auth: JWT (JSON Web Tokens)
- ORM: Prisma
