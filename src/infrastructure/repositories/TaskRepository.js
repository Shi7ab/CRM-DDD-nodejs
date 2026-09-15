const prisma = require("../database/prisma");
const Task = require("../../domain/task/Task");

class TaskRepository {
  async save(task) {
    await prisma.task.upsert({
      where: { id: task.id },
      update: { title: task.title, assigneeId: task.assigneeId, status: task.status },
      create: {
        id: task.id,
        title: task.title,
        projectId: task.projectId,
        assigneeId: task.assigneeId,
        status: task.status
      }
    });
  }

  async findById(id) {
    const record = await prisma.task.findUnique({ where: { id } });
    if (!record) return null;

    const task = new Task(record.id, record.title, record.projectId);
    task.assigneeId = record.assigneeId;
    task.status = record.status;
    return task;
  }

  async countUnfinishedByProjectId(projectId) {
    return await prisma.task.count({
      where: { projectId, status: { not: "COMPLETED" } }
    });
  }
}

module.exports = TaskRepository;