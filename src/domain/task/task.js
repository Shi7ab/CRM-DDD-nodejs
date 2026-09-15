class Task {
    constructor(id, title, projectId) {
        this.id = id;
        this.title = title;
        this.projectId = projectId;
        this.assigneeId = null;
        this.status = "TODO";
    }

    static create(id, title, projectId) {
        if (!title || title.trim() === "") {
            throw new Error("Task title is required");
        }

        if (!projectId) {
            throw new Error("Project ID is required");
        }

        return new Task(id, title, projectId);
    }

    assignTo(userId, project) {
        if (this.status === "COMPLETED") {
            throw new Error(
                "Completed task cannot be assigned"
            );
        }

        if (!project.members.has(userId)) {
            throw new Error(
                "User is not a member of this project"
            );
        }

        this.assigneeId = userId;
    }

    start() {
        if (this.status !== "TODO") {
            throw new Error(
                "Only TODO tasks can be started"
            );
        }

        this.status = "IN_PROGRESS";
    }

    complete() {
        if (this.status !== "IN_PROGRESS") {
            throw new Error(
                "Only IN_PROGRESS tasks can be completed"
            );
        }

        this.status = "COMPLETED";
    }
}

module.exports = Task;