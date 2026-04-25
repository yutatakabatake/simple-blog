# front-end

React + TypeScript + Vite front-end for the `simple-blog` application.

## Overview

This front-end provides:

- Public blog list and post detail pages
- User registration and login
- Authenticated dashboard for managing posts
- Create, edit, publish, and delete posts
- Profile settings page

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

## Install

```bash
cd front-end
npm install
```

## Run

```bash
npm run dev
```

The app runs on `http://localhost:5173`.

## Application structure

- `src/App.tsx`: route definitions and authentication state management
- `src/components/`: login, register, dashboard, post editor, public blog, settings
- `src/types/`: TypeScript definitions for `User` and `Post`

## Backend integration

The front-end communicates with the back-end API at `http://localhost:3000/api`.

- `axios.defaults.withCredentials = true` is enabled for cookie-based JWT auth.
- Protected routes require login before access.

## Routes

- `/`: public blog list
- `/post/:id`: public post details
- `/login`: login page
- `/register`: registration page
- `/dashboard`: author dashboard
- `/admin/new-post`: create a new post
- `/admin/post/:id/edit`: edit an existing post
- `/settings`: user profile settings
