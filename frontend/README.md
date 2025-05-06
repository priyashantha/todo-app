# Task Planner – Frontend (React + Vite)

React frontend for the Task Planner app. Connects to the Laravel backend.

## Features

- Create and list tasks
- Mark tasks as completed
- Mobile responsive layout
- Tailwind styled cards and forms
- Unit and E2E tests

## Setup

```bash
cd frontend
npm install
npm run dev
```

Or run using Docker with:

```bash
docker-compose up --build
```

## Tests

### Unit + Integration (Vitest)

```bash
npm run test
```

### End-to-End (Cypress)

```bash
npm run cy:open
```

## Notes

- Make sure `.env` includes correct `VITE_API_URL`
- Default API URL: `http://localhost:8000/api`
