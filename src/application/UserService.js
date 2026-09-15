class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async createUser(id, name, email) {
    const User = require("../domain/user/User");
    const user = User.create(id, name, email);
    await this.userRepo.save(user);
    return user;
  }
}

module.exports = UserService;