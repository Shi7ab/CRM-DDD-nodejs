const Task = require("./Task");

const task = Task.create(
    "task-1",
    "Implement authentication",
    "project-1"
);

console.log(task.status);

task.start();

console.log(task.status);

task.complete();

console.log(task.status);