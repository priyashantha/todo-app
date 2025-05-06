# Task Planner – Full Stack Todo App

A full-stack Dockerized task management app built with Laravel, MySQL, React, and Tailwind CSS.

## Features

- Add tasks with title and content
- View 5 latest uncompleted tasks
- Mark tasks as completed
- Responsive, mobile-friendly UI
- RESTful backend API
- Unit, integration, and E2E test coverage
- Fully Dockerized (backend, frontend, database)

## Tech Stack

- Laravel (PHP 8.x)
- MySQL 8
- React (Vite)
- Tailwind CSS
- Docker
- Vitest, Cypress, PHPUnit

## Environment Setup

1. Copy `.env.example` to `.env`:

```bash
cp backend/.env.example backend/.env
```

2. Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:8000/api
```

3. Build and start all containers:

```bash
docker-compose up --build -d
```

4. Install Laravel dependencies:

```bash
docker run --rm -v $(pwd)/backend:/app -w /app composer composer install
```

5. Generate the application key:

```bash
docker-compose exec backend php artisan key:generate
```

6. Run Laravel database migrations:

```bash
docker-compose exec backend php artisan migrate
```

> Laravel will use the default values in `.env`, including:
> - DB host: `mysql`
> - DB name: `todo`
> - DB username: `root`
> - DB password: `root`

---

## Open the App

- Frontend: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:8000/api/tasks](http://localhost:8000/api/tasks)

---

## Running Tests


```bash
docker-compose exec backend php artisan test
```

With coverage:

```bash
docker-compose exec backend bash
XDEBUG_MODE=coverage php artisan test --coverage-html=coverage
```

### Frontend – React (Vitest + Cypress)

#### Using local npm:

```bash
cd frontend
npm install
npm run cy:open       # End-to-End tests (Cypress interactive)
npm run cy:run        # End-to-End tests (Cypress headless)
```

---

## Subproject Docs

- [`backend/README.md`](./backend/README.md)
- [`frontend/README.md`](./frontend/README.md)
