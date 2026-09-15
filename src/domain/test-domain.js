const User = require("./user/User");
const Customer = require("./customer/Customer");
const Project = require("./project/Project");
const Task = require("./task/Task");

// Users
const owner = User.create(
    "user-1",
    "Ahmed",
    "ahmed@example.com"
);

const developer = User.create(
    "user-2",
    "Mohammed",
    "mohammed@example.com"
);

const outsider = User.create(
    "user-3",
    "Ali",
    "ali@example.com"
);

// Customer
const customer = Customer.create(
    "customer-1",
    "Acme Corporation",
    "contact@acme.com",
    "123456789"
);

// Project
const project = Project.create(
    "project-1",
    "E-commerce Platform",
    customer.id,
    owner.id
);

// Add developer
project.addMember(developer.id);

// Task
const task = Task.create(
    "task-1",
    "Implement authentication",
    project.id
);

// Assign task
task.assignTo(developer.id, project);

console.log({
    owner,
    developer,
    customer,
    project,
    task
});