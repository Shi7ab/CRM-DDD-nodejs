class TaskService {
  constructor(taskRepo, projectRepo) {
    this.taskRepo = taskRepo;
    this.projectRepo = projectRepo;
  }

  async createTask(id, title, projectId) {
    const Task = require("../domain/task/Task");
    const task = Task.create(id, title, projectId);
    await this.taskRepo.save(task);
    return task;
  }

  async assignTask(taskId, userId) {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new Error("Task not found");

    const project = await this.projectRepo.findById(task.projectId);
    if (!project) throw new Error("Project not found");

    task.assignTo(userId, project);
    await this.taskRepo.save(task);
    return task;
  }

  async startTask(taskId) {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new Error("Task not found");
    task.start();
    await this.taskRepo.save(task);
    return task;
  }

  async completeTask(taskId) {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new Error("Task not found");
    task.complete();
    await this.taskRepo.save(task);
    return task;
  }
}

module.exports = TaskService;