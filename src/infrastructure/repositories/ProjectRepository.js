const prisma = require("../database/prisma");
const Project = require("../../domain/project/Project");

class ProjectRepository {
  async save(project) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: { name: project.name, status: project.status },
      create: {
        id: project.id,
        name: project.name,
        customerId: project.customerId,
        ownerId: project.ownerId,
        status: project.status
      }
    });

    // Sync project members
    await prisma.projectMember.deleteMany({ where: { projectId: project.id } });
    const membersData = Array.from(project.members).map(userId => ({
      projectId: project.id,
      userId
    }));
    if (membersData.length > 0) {
      await prisma.projectMember.createMany({ data: membersData });
    }
  }

  async findById(id) {
    const record = await prisma.project.findUnique({
      where: { id },
      include: { members: true }
    });
    if (!record) return null;

    const project = new Project(record.id, record.name, record.customerId, record.ownerId);
    project.status = record.status;
    record.members.forEach(m => project.members.add(m.userId));
    return project;
  }
}

module.exports = ProjectRepository;