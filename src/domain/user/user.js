class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static create(id, name, email) {
        if (!name || name.trim() === "") {
            throw new Error("User name is required");
        }

        if (!email || email.trim() === "") {
            throw new Error("User email is required");
        }

        return new User(id, name, email);
    }
}

module.exports = User;