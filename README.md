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

# Domain Model

The system contains four main domain entities and a project-membership relationship.

```text
Customer
   │
   │ owns
   ▼
Project
   │
   ├───────────────┐
   │               │
   ▼               ▼
Members          Tasks
   │               │
   ▼               ▼
 User           Assignee
```

## User

Represents a system user.

Responsibilities include:

* User identity
* Name
* Email
* Project ownership
* Project membership
* Task assignment

---

## Customer

Represents a customer or organization using the CRM.

A customer can have multiple projects.

Business rules include:

* Customer name is required.
* Customer email is required.
* Customers can be active or inactive.
* Inactive customers cannot create new projects.

---

## Project

Represents a project belonging to a customer.

A project contains:

* Customer
* Owner
* Members
* Tasks
* Status

Project states:

```text
ACTIVE
ARCHIVED
```

Business rules include:

* Every project belongs to a customer.
* Every project has an owner.
* The owner automatically becomes a member.
* A user cannot be added twice.
* The project owner cannot be removed.
* Archived projects cannot receive new members.
* Archived projects cannot receive new tasks.
* Only the owner can archive a project.
* A project cannot be archived while unfinished tasks exist.

---

## Task

Represents work that needs to be completed inside a project.

Task states:

```text
TODO
   │
   ▼
IN_PROGRESS
   │
   ▼
COMPLETED
```

Business rules include:

* Every task belongs to exactly one project.
* Task title is required.
* New tasks start in `TODO`.
* Only `TODO` tasks can move to `IN_PROGRESS`.
* Only `IN_PROGRESS` tasks can move to `COMPLETED`.
* Completed tasks cannot be assigned.
* Tasks can only be assigned to project members.

---

# DDD Concepts Demonstrated

This project is designed to demonstrate practical DDD concepts.

## Entities

Entities have identity and behavior.

Examples:

```text
User
Customer
Project
Task
```

The entities are responsible for enforcing their own domain invariants.

For example:

```js
project.addMember(userId);
```

instead of allowing application code to directly manipulate:

```js
project.members.push(userId);
```

This keeps business rules inside the domain model.

---

## Aggregates

The project uses aggregate boundaries to control consistency.

Current aggregate candidates include:

```text
Customer Aggregate
Project Aggregate
Task Aggregate
User Aggregate
```

For example, the `Project` aggregate controls project membership:

```text
Project
 ├── ownerId
 └── members
```

External code should interact with the aggregate through its behavior rather than directly modifying its internal state.

---

## Value Objects

Value objects can be introduced as the project evolves.

Potential examples include:

```text
Email
UserId
CustomerId
ProjectId
TaskId
```

The purpose is to move validation and domain concepts away from primitive strings.

---

## Repository Pattern

The domain defines repository contracts while infrastructure provides the implementation.

Example:

```text
Domain
   │
   └── UserRepository
          │
          ▼
Infrastructure
   │
   └── UserPrismaRepository
```

This means the domain does not depend on Prisma.

The domain only knows that it can persist and retrieve users through a repository.

---

# Application Layer

The application layer contains **use cases**.

Examples:

```text
CreateUser
CreateCustomer

CreateProject
AddProjectMember
ArchiveProject

CreateTask
AssignTask
StartTask
CompleteTask
```

A use case coordinates the domain and infrastructure without containing the core business rules itself.

Example flow:

```text
Create Project
      │
      ▼
Check Customer
      │
      ├── Customer doesn't exist → Error
      │
      └── Customer inactive → Error
      │
      ▼
Check Owner
      │
      ▼
Create Project Aggregate
      │
      ▼
Owner automatically becomes member
      │
      ▼
Repository.save()
```

---

# Infrastructure Layer

Infrastructure contains technical implementations.

Current technology:

* Prisma ORM
* MySQL
* Database connection
* Prisma repositories

Prisma is intentionally kept outside the domain layer.

```text
Domain
   ❌ Prisma
   ❌ SQL
   ❌ Express
   ❌ HTTP

Infrastructure
   ✅ Prisma
   ✅ MySQL
   ✅ Database access
```

This separation makes the business logic easier to test and maintain.

---

# API

The HTTP layer exposes the application use cases through REST APIs.

## Health Check

```http
GET /health
```

## Users

```http
POST /api/users
```

## Customers

```http
POST /api/customers
```

## Projects

```http
POST /api/projects
```

Add a project member:

```http
POST /api/projects/:projectId/members
```

Archive a project:

```http
POST /api/projects/:projectId/archive
```

## Tasks

Create a task:

```http
POST /api/projects/:projectId/tasks
```

Assign a task:

```http
POST /api/tasks/:taskId/assign
```

Start a task:

```http
POST /api/tasks/:taskId/start
```

Complete a task:

```http
POST /api/tasks/:taskId/complete
```

---

# Technology Stack

### Backend

* Node.js
* Express.js
* JavaScript

### Architecture

* Domain-Driven Design
* Clean Architecture principles
* Layered Architecture
* Repository Pattern
* Use Case / Application Service Pattern
* Dependency Inversion

### Database

* MySQL
* Prisma ORM

### Development

* Git
* GitHub
* Docker
* Docker Compose
* Jest

---

# Installation

Clone the repository:

```bash
git clone https://github.com/Shi7ab/CRM-DDD-nodejs.git
```

Enter the project:

```bash
cd CRM-DDD-nodejs
```

Install dependencies:

```bash
npm install
```

---

# Environment Configuration

Create a `.env` file:

```env
DATABASE_URL="mysql://root:@localhost:3306/crm_ddd"
PORT=3000
```

Create the database:

```sql
CREATE DATABASE crm_ddd;
```

---

# Prisma Setup

Generate the Prisma Client:

```bash
npx prisma generate
```

Validate the schema:

```bash
npx prisma validate
```

Format the schema:

```bash
npx prisma format
```

Create the initial migration:

```bash
npx prisma migrate dev --name init
```

Open Prisma Studio:

```bash
npx prisma studio
```

---

# Running the Application

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

The API will be available at:

```text
http://localhost:3000
```

Health check:

```text
http://localhost:3000/health
```

---

# Testing

Run the test suite:

```bash
npm test
```

The project will eventually contain tests for:

* Domain entities
* Business rules
* Use cases
* Repository implementations
* HTTP endpoints

Example domain test:

```text
Project
 ├── should add a member
 ├── should reject duplicate member
 ├── should prevent owner removal
 └── should prevent adding members to archived project
```

---

# Database Design

Main relationships:

```text
User
 │
 ├───────────────┐
 │               │
 ▼               ▼
Project        Task
 │               │
 │               └── Assignee → User
 │
 ├── Customer
 │
 └── ProjectMember
          │
          └── User
```

The many-to-many relationship between projects and users is represented through:

```text
ProjectMember
```

```text
Project
   │
   ├── ProjectMember
   │       │
   │       └── User
   │
   └── Task
```

---

# Architectural Goals

This project is intentionally built around business behavior rather than simply exposing database operations.

Instead of:

```text
POST /projects
GET /projects
PUT /projects
DELETE /projects
```

and putting all logic inside controllers, the system models business operations such as:

```text
CreateProject
AddProjectMember
ArchiveProject

CreateTask
AssignTask
StartTask
CompleteTask
```

This makes the architecture closer to how a real business system behaves.

---

# Future Improvements

Planned improvements include:

* Authentication and authorization
* JWT / refresh tokens
* Role-based access control
* Request validation
* DTOs
* Value Objects
* Domain Events
* Event-driven workflows
* Transaction boundaries
* Unit tests
* Integration tests
* API documentation with OpenAPI / Swagger
* Structured logging
* Redis caching
* Background jobs
* Dockerized production deployment
* CI/CD with GitHub Actions
* Observability and metrics
* Pagination and filtering
* Audit logs
* Notification system

---

# Learning Objectives

This project is primarily a practical backend architecture and DDD learning project.

The main objectives are to understand:

1. How to model business rules in the domain.
2. How to design aggregate boundaries.
3. How application use cases coordinate domain operations.
4. How repositories abstract persistence.
5. How to keep Prisma and database concerns outside the domain.
6. How to structure a maintainable Node.js backend.
7. How to evolve a monolithic backend without immediately jumping to microservices.
8. How architectural decisions should be driven by business requirements.

---

# Author

**Shihab Bukri**

Software Engineer focused on:

* Backend Engineering
* Node.js / NestJS
* Laravel
* DevOps
* System Design
* Domain-Driven Design
* Machine Learning

GitHub:

https://github.com/Shi7ab

LinkedIn:

https://linkedin.com/in/shihab-bakri-ba568a262
