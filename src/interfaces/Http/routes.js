const express = require("express");
const router = express.Router();

// Repositories
const UserRepository = require("../../infrastructure/repositories/UserRepository");
const CustomerRepository = require("../../infrastructure/repositories/CustomerRepository");
const ProjectRepository = require("../../infrastructure/repositories/ProjectRepository");
const TaskRepository = require("../../infrastructure/repositories/TaskRepository");

const userRepo = new UserRepository();
const customerRepo = new CustomerRepository();
const projectRepo = new ProjectRepository();
const taskRepo = new TaskRepository();

// Application Services
const UserService = require("../../application/UserService");
const CustomerService = require("../../application/CustomerService");
const ProjectService = require("../../application/ProjectService");
const TaskService = require("../../application/TaskService");

const userService = new UserService(userRepo);
const customerService = new CustomerService(customerRepo);
const projectService = new ProjectService(projectRepo, taskRepo);
const taskService = new TaskService(taskRepo, projectRepo);

// Controllers
const UserController = require("./UserController");
const CustomerController = require("./CustomerController");
const ProjectController = require("./ProjectController");
const TaskController = require("./TaskController");

const userCtrl = new UserController(userService);
const customerCtrl = new CustomerController(customerService);
const projectCtrl = new ProjectController(projectService);
const taskCtrl = new TaskController(taskService);

// User Routes
router.post("/users", (req, res) => userCtrl.create(req, res));

// Customer Routes
router.post("/customers", (req, res) => customerCtrl.create(req, res));
router.patch("/customers/:id/deactivate", (req, res) => customerCtrl.deactivate(req, res));

// Project Routes
router.post("/projects", (req, res) => projectCtrl.create(req, res));
router.post("/projects/:id/members", (req, res) => projectCtrl.addMember(req, res));
router.patch("/projects/:id/archive", (req, res) => projectCtrl.archive(req, res));

// Task Routes
router.post("/tasks", (req, res) => taskCtrl.create(req, res));
router.patch("/tasks/:id/assign", (req, res) => taskCtrl.assign(req, res));
router.patch("/tasks/:id/start", (req, res) => taskCtrl.start(req, res));
router.patch("/tasks/:id/complete", (req, res) => taskCtrl.complete(req, res));

module.exports = router;