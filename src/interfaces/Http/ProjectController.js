class ProjectController {
  constructor(projectService) {
    this.projectService = projectService;
  }

  async create(req, res) {
    try {
      const { id, name, customerId, ownerId } = req.body;
      const project = await this.projectService.createProject(id, name, customerId, ownerId);
      res.status(201).json(project);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async addMember(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const project = await this.projectService.addMember(id, userId);
      res.json(project);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async archive(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const project = await this.projectService.archiveProject(id, userId);
      res.json(project);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = ProjectController;