class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  async create(req, res) {
    try {
      const { id, title, projectId } = req.body;
      const task = await this.taskService.createTask(id, title, projectId);
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async assign(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const task = await this.taskService.assignTask(id, userId);
      res.json(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async start(req, res) {
    try {
      const { id } = req.params;
      const task = await this.taskService.startTask(id);
      res.json(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async complete(req, res) {
    try {
      const { id } = req.params;
      const task = await this.taskService.completeTask(id);
      res.json(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = TaskController;