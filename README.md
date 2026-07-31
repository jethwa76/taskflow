# TaskFlow

TaskFlow is a production-minded task management workspace for planning, prioritizing, and finishing meaningful work. It includes a responsive React dashboard, task list/card/kanban views, theme support, local demo persistence, and a matching Express + MongoDB API.

## Product tour

- Dashboard with task health, completion rate, weekly momentum, and priority mix.
- Task management with search, status/priority filters, sort, list, card, and kanban views.
- Create, edit, delete, and update task status from the board.
- Profile and settings screens with profile preferences and appearance controls.
- Demo mode works without a database so the UI can be reviewed instantly.
- Backend includes JWT authentication, bcrypt password hashing, protected task CRUD, validation, CORS, Helmet, and rate limiting.

## Quick start

Requirements: Node.js 20+ and npm 10+.

```bash
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`. The API runs at `http://localhost:5000`.

The UI starts in demo mode using browser storage. To connect it to the API, set `VITE_API_URL=/api` in `client/.env` and provide the server variables below. The client API layer is ready for swapping demo persistence for a real authenticated session.

## Environment variables

Create `server/.env` from `server/.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/taskflow
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

Optional `client/.env`:

```env
VITE_API_URL=/api
```

## API reference

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Start a session |
| POST | `/api/auth/logout` | End a session |
| POST | `/api/auth/forgot-password` | Request a reset token |
| POST | `/api/auth/reset-password` | Set a new password |
| GET | `/api/users/profile` | Read the signed-in profile |
| PUT | `/api/users/profile` | Update the signed-in profile |
| GET | `/api/tasks` | List the signed-in user's tasks |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/:id` | Read one task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

Protected endpoints use `Authorization: Bearer <token>`.

## Architecture

```text
taskflow/
├── client/                  # Vite + React + TypeScript frontend
│   └── src/
│       ├── components/      # App shell, task cards, modals
│       ├── context/          # Auth, tasks, theme, toast state
│       ├── data/             # Demo data
│       ├── pages/            # Landing, dashboard, tasks, profile, settings
│       └── services/         # Axios API client
└── server/                  # Express REST API
    └── src/
        ├── config/           # Mongo connection
        ├── controllers/      # Request handlers
        ├── middleware/       # Auth and errors
        ├── models/           # Mongoose schemas
        └── routes/            # REST route modules
```

## Database design

`User` stores the display name, unique email, hashed password, optional profile image, and timestamps. `Task` stores the owner reference, title, description, category, priority, status, due date, and timestamps. All task queries are scoped by the authenticated user.

## Deployment

- Frontend: deploy `client` to Vercel with `VITE_API_URL` set to the deployed API URL.
- Backend: deploy `server` to Render, Railway, or AWS with the server environment variables.
- Database: use MongoDB Atlas and restrict network access to the deployed backend.

## Resume-ready description

Built TaskFlow, a full-stack task management platform with JWT authentication, protected REST APIs, responsive React views, task analytics, kanban workflows, and a scalable MongoDB data model.

## Interview talking points

1. The client uses a feature-oriented structure and a single app context for the demo session, making state transitions explicit and easy to replace with a server cache later.
2. The server enforces ownership at the query layer, so a valid token cannot access another user's tasks.
3. Security middleware is layered at the HTTP boundary: Helmet, CORS, rate limiting, validation, password hashing, and centralized errors.
4. The UI keeps dashboard analytics derived from task state, avoiding stale duplicated counts.

## Future improvements

- Replace demo persistence with TanStack Query and refresh-token rotation.
- Add Socket.io room events for multi-device updates.
- Add email verification and password reset delivery with Nodemailer.
- Add recurring tasks, team workspaces, audit logs, and calendar integrations.
