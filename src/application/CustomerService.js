class CustomerService {
  constructor(customerRepo) {
    this.customerRepo = customerRepo;
  }

  async createCustomer(id, name, email, phone) {
    const Customer = require("../domain/customer/Customer");
    const customer = Customer.create(id, name, email, phone);
    await this.customerRepo.save(customer);
    return customer;
  }

  async deactivateCustomer(id) {
    const customer = await this.customerRepo.findById(id);
    if (!customer) throw new Error("Customer not found");
    customer.deactivate();
    await this.customerRepo.save(customer);
    return customer;
  }
}

module.exports = CustomerService;