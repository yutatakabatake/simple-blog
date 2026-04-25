# simple-blog

A full-stack blog project with a React + TypeScript front-end and an Express + PostgreSQL back-end.

## Overview

- `front-end/`: React + TypeScript + Vite application for public blog browsing and authenticated author workflows.
- `back-end/`: Express API server with user authentication, JWT cookie auth, and post management.

## Features

- Public blog listing and post detail pages.
- User registration and login.
- Authenticated dashboard for authors.
- Create, edit, publish, and delete posts.
- Profile settings update.

## Tech stack

- Front-end: React, TypeScript, Vite, Tailwind CSS, Axios, React Router
- Back-end: Node.js, Express, PostgreSQL, bcrypt, JSON Web Token, express-validator

## Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL

## Setup

1. Install dependencies:
   - `cd back-end && npm install`
   - `cd ../front-end && npm install`

2. Configure back-end environment variables by creating `back-end/.env`:

```env
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=your_db_port
ACCESS_TOKEN_SECRET=your_jwt_secret
```

3. Create the required PostgreSQL tables.
   - The back-end code expects `users_test` and `posts_test` tables.
   - See `back-end/memo.md` for example table definitions.

## Run locally

Start the back-end server:

```bash
cd back-end
npm run dev
```

Start the front-end app:

```bash
cd front-end
npm run dev
```

- Front-end: `http://localhost:5173`
- Back-end API: `http://localhost:3000/api`

## Folder structure

- `back-end/`
  - `src/`: Express server code, routes, controllers, services, DB connection
  - `memo.md`: DB schema notes and SQL examples
- `front-end/`
  - `src/`: React application with pages and components
  - `public/`: static files

## Notes

- The back-end uses signed JWT tokens stored in an HTTP-only cookie named `jwt_token`.
- Front-end Axios requests include credentials for authenticated routes.
