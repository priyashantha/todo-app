# Task Planner – Backend API

This is the Laravel-based REST API for the Task Planner app. It handles creating and retrieving tasks stored in a MySQL database.

## Features

- Create new to-do tasks (`POST /api/tasks`)
- List the latest 5 incomplete tasks (`GET /api/tasks`)
- Mark tasks as completed (`PATCH /api/tasks/{id}/complete`)
- CORS enabled for frontend integration

## Tech Stack

- PHP 8.x
- Laravel 10/11
- MySQL
- Docker

## Setup

```bash
# From project root
cd backend
cp .env.example .env
# Edit DB connection if needed
docker-compose exec backend composer install
docker-compose exec backend php artisan migrate
```

## Running Tests

```bash
# Inside the backend container
XDEBUG_MODE=coverage vendor/bin/phpunit

# Code coverage (HTML)
open coverage/index.html
```

## API Endpoints

| Method | Endpoint                     | Description              |
|--------|------------------------------|--------------------------|
| POST   | `/api/tasks`                 | Create a new task        |
| GET    | `/api/tasks`                 | Get latest 5 incomplete  |
| PATCH  | `/api/tasks/{id}/complete`   | Mark task as completed   |


