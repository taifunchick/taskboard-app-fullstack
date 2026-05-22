# Kanban Task Board

A modern Kanban task board built with Angular 17 and ASP.NET Core 8, containerized with Docker.

## Features

- Drag and drop tasks between columns
- Create new tasks with title and description
- Delete tasks
- Real-time task count per column
- Beautiful gradient UI with smooth animations
- Responsive design

## Project Structure

```
kanban-project/
├── backend/
│   └── KanbanApi/
│       ├── Controllers/
│       │   └── TasksController.cs
│       ├── Data/
│       │   └── TaskRepository.cs
│       ├── Models/
│       │   └── TaskItem.cs
│       ├── Program.cs
│       └── Dockerfile
├── frontend/
│   ├── kanban-ui/
│   │   └── src/
│   │       └── app/
│   │           ├── components/
│   │           │   └── kanban-board/
│   │           ├── models/
│   │           ├── services/
│   │           └── ...
│   ├── Dockerfile
│   └── nginx.conf
└── docker-compose.yml
```

## How to Run

### Using Docker Compose (Recommended)

1. Navigate to the project root:
   ```bash
   cd /workspace/kanban-project
   ```

2. Build and start all services:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:5000/api/tasks
   - Swagger UI: http://localhost:5000/swagger

### Running Without Docker

#### Backend

1. Navigate to backend folder:
   ```bash
   cd backend/KanbanApi
   ```

2. Run the API:
   ```bash
   dotnet run --urls=http://localhost:5000
   ```

#### Frontend

1. Navigate to frontend folder:
   ```bash
   cd frontend/kanban-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm start
   ```

4. Access at http://localhost:4200

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/{id} | Get task by ID |
| POST | /api/tasks | Create new task |
| PUT | /api/tasks/{id} | Update task |
| PATCH | /api/tasks/{id}/status | Update task status |
| DELETE | /api/tasks/{id} | Delete task |

## Technology Stack

### Backend
- ASP.NET Core 8
- RESTful API
- In-memory repository pattern

### Frontend
- Angular 17
- Standalone components
- Reactive forms
- HTTP Client
- Drag and Drop API

### DevOps
- Docker
- Docker Compose
- Nginx reverse proxy
