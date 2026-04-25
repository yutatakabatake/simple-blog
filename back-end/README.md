# back-end

Express API server for the `simple-blog` project.

## Overview

This back-end provides:

- User registration and login
- JWT cookie authentication
- Profile editing
- Public post retrieval
- Authenticated post creation, editing, and deletion

## Requirements

- Node.js 18+
- PostgreSQL
- `back-end/.env` with database and JWT settings

## Environment variables

Create `back-end/.env` with the following values:

```env
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=your_db_port
ACCESS_TOKEN_SECRET=your_jwt_secret
```

## Start server

Install dependencies and start the server:

```bash
cd back-end
npm install
npm run dev
```

The API listens on `http://localhost:3000`.

## Available API endpoints

### User

- `POST /api/user/register`
  - Register a new user
  - Request body: `name`, `email`, `password`

- `POST /api/user/login`
  - Login an existing user
  - Request body: `email`, `password`

- `PUT /api/user/edit/:id`
  - Update user profile
  - Requires authentication cookie
  - Request body: `name`, `email`

### Posts

- `GET /api/post/public`
  - Get published public posts

- `POST /api/post/new`
  - Create a new post or draft
  - Requires authentication cookie
  - Request body: `author_id`, `title`, `excerpt`, `content`, `published`

- `GET /api/post/me/:userId`
  - Get posts for the authenticated author
  - Requires authentication cookie

- `PUT /api/post/edit/:id`
  - Edit an existing post
  - Requires authentication cookie

- `DELETE /api/post/delete/:id`
  - Delete a post
  - Requires authentication cookie

## Database notes

- The server expects these tables:
  - `users_test`
  - `posts_test`

- See `back-end/memo.md` for schema examples and SQL patterns.

## Security

- Passwords are hashed with bcrypt before storage.
- Authentication is handled with JWT stored in an HTTP-only cookie.
- CORS is configured for `http://localhost:5173` and credentials are enabled.
