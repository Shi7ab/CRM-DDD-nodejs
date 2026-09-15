# CRM DDD — Node.js

A backend CRM and project-management system built with **Node.js, Express, TypeScript-style architectural principles, DDD, Prisma, and MySQL**.

The goal of this project is to implement a realistic backend architecture based on **Domain-Driven Design (DDD)** rather than building a simple CRUD application.

The project focuses on:

* Domain modeling
* Business rules
* Aggregate boundaries
* Application use cases
* Repository pattern
* Infrastructure separation
* Database persistence
* RESTful APIs
* Clean architecture principles
* Maintainable and scalable backend design

---

## Architecture

The application follows a layered architecture inspired by **Domain-Driven Design and Clean Architecture**.

```text
                    HTTP Request
                         │
                         ▼
                ┌─────────────────┐
                │   Controllers   │
                │   Presentation  │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │   Application   │
                │    Use Cases    │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │     Domain      │
                │ Entities / Rules│
                └────────┬────────┘
                         │
                  Repository
                   Interface
                         │
                         ▼
                ┌─────────────────┐
                │ Infrastructure  │
                │ Prisma / MySQL  │
                └─────────────────┘
```

The main principle is:

> Business rules belong to the domain, while technical concerns such as databases and HTTP belong outside the domain.

---

## Project Structure

```text
CRM-DDD-nodejs/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   │
│   ├── domain/
│   │   ├── shared/
│   │   │   └── errors/
│   │   │       └── DomainError.js
│   │   │
│   │   ├── user/
│   │   │   ├── User.js
│   │   │   └── UserRepository.js
│   │   │
│   │   ├── customer/
│   │   │   ├── Customer.js
│   │   │   └── CustomerRepository.js
│   │   │
│   │   ├── project/
│   │   │   ├── Project.js
│   │   │   └── ProjectRepository.js
│   │   │
│   │   └── task/
│   │       ├── Task.js
│   │       └── TaskRepository.js
│   │
│   ├── application/
│   │   ├── user/
│   │   │   └── CreateUser.js
│   │   │
│   │   ├── customer/
│   │   │   └── CreateCustomer.js
│   │   │
│   │   ├── project/
│   │   │   ├── CreateProject.js
│   │   │   ├── AddProjectMember.js
│   │   │   └── ArchiveProject.js
│   │   │
│   │   └── task/
│   │       ├── CreateTask.js
│   │       ├── AssignTask.js
│   │       ├── StartTask.js
│   │       └── CompleteTask.js
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │   │   └── prisma.js
│   │   │
│   │   └── repositories/
│   │       ├── UserPrismaRepository.js
│   │       ├── CustomerPrismaRepository.js
│   │       ├── ProjectPrismaRepository.js
│   │       └── TaskPrismaRepository.js
│   │
│   ├── presentation/
│   │   └── http/
│   │       ├── controllers/
│   │       ├── middleware/
│   │       └── routes/
│   │
│   ├── app.js
│   ├── server.js
│   └── container.js
│
├── .env
├── .env.example
├── package.json
├── prisma.config.ts
└── README.md
```

---

# Domain
