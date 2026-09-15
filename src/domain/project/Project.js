class Project {
    constructor(id, name, customerId, ownerId) {
        this.id = id;
        this.name = name;
        this.customerId = customerId;
        this.ownerId = ownerId;

        this.status = "ACTIVE";

        this.members = new Set();
    }

    static create(id, name, customerId, ownerId) {
        if (!name || name.trim() === "") {
            throw new Error("Project name is required");
        }

        if (!customerId) {
            throw new Error("Customer ID is required");
        }

        if (!ownerId) {
            throw new Error("Project owner is required");
        }

        const project = new Project(
            id,
            name,
            customerId,
            ownerId
        );

        // Owner automatically becomes a member
        project.members.add(ownerId);

        return project;
    }

    addMember(userId) {
        if (this.status === "ARCHIVED") {
            throw new Error(
                "Cannot add members to an archived project"
            );
        }

        if (this.members.has(userId)) {
            throw new Error(
                "User is already a project member"
            );
        }

        this.members.add(userId);
    }

    removeMember(userId) {
        if (!this.members.has(userId)) {
            throw new Error(
                "User is not a project member"
            );
        }

        if (userId === this.ownerId) {
            throw new Error(
                "Project owner cannot be removed"
            );
        }

        this.members.delete(userId);
    }

    archive(userId, hasUnfinishedTasks) {
        if (userId !== this.ownerId) {
            throw new Error(
                "Only the project owner can archive the project"
            );
        }

        if (this.status === "ARCHIVED") {
            throw new Error("Project is already archived");
        }

        if (hasUnfinishedTasks) {
            throw new Error(
                "Cannot archive project with unfinished tasks"
            );
        }

        this.status = "ARCHIVED";
    }
}

module.exports = Project;