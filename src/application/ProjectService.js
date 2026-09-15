class ProjectService {
  constructor(projectRepo, taskRepo) {
    this.projectRepo = projectRepo;
    this.taskRepo = taskRepo;
  }

  async createProject(id, name, customerId, ownerId) {
    const Project = require("../domain/project/Project");
    const project = Project.create(id, name, customerId, ownerId);
    await this.projectRepo.save(project);
    return project;
  }

  async addMember(projectId, userId) {
    const project = await this.projectRepo.findById(projectId);
    if (!project) throw new Error("Project not found");
    project.addMember(userId);
    await this.projectRepo.save(project);
    return project;
  }

  async archiveProject(projectId, userId) {
    const project = await this.projectRepo.findById(projectId);
    if (!project) throw new Error("Project not found");

    const unfinishedCount = await this.taskRepo.countUnfinishedByProjectId(projectId);
    const hasUnfinishedTasks = unfinishedCount > 0;

    project.archive(userId, hasUnfinishedTasks);
    await this.projectRepo.save(project);
    return project;
  }
}

module.exports = ProjectService;