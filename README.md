# Simple CRUD API (Node.js + TypeScript + Express)

A beginner-friendly user CRUD API. Data is stored in memory, so it resets when the server restarts.

## Setup

```bash
npm install
npm run dev
```

Server: `http://localhost:5000`

## Build and run compiled code

```bash
npm run build
npm start
```

## Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | API status |
| GET | `/api/users` | List all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Create user example

`POST /api/users`

```json
{
  "name": "Vikash",
  "email": "vikash@example.com"
}
```

### Update user example

`PUT /api/users/1`

```json
{
  "name": "Vikash Updated"
}
```
