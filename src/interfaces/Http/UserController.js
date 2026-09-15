class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async create(req, res) {
    try {
      const { id, name, email } = req.body;
      const user = await this.userService.createUser(id, name, email);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = UserController0;