const prisma = require("../database/prisma");
const User = require("../../domain/user/User");

class UserRepository {
  async save(user) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: { name: user.name, email: user.email },
      create: { id: user.id, name: user.name, email: user.email }
    });
  }

  async findById(id) {
    const record = await prisma.user.findUnique({ where: { id } });
    if (!record) return null;
    return new User(record.id, record.name, record.email);
  }
}

module.exports = UserRepository;