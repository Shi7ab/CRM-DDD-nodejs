class Customer {
    constructor(id, name, email, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.status = "ACTIVE";
    }

    static create(id, name, email, phone) {
        if (!name || name.trim() === "") {
            throw new Error("Customer name is required");
        }

        if (!email || email.trim() === "") {
            throw new Error("Customer email is required");
        }

        return new Customer(id, name, email, phone);
    }

    deactivate() {
        if (this.status === "INACTIVE") {
            throw new Error("Customer is already inactive");
        }

        this.status = "INACTIVE";
    }

    activate() {
        if (this.status === "ACTIVE") {
            throw new Error("Customer is already active");
        }

        this.status = "ACTIVE";
    }
}

module.exports = Customer;