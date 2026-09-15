const prisma = require("../database/prisma");
const Customer = require("../../domain/customer/Customer");

class CustomerRepository {
  async save(customer) {
    await prisma.customer.upsert({
      where: { id: customer.id },
      update: { name: customer.name, email: customer.email, phone: customer.phone, status: customer.status },
      create: { id: customer.id, name: customer.name, email: customer.email, phone: customer.phone, status: customer.status }
    });
  }

  async findById(id) {
    const record = await prisma.customer.findUnique({ where: { id } });
    if (!record) return null;
    const customer = new Customer(record.id, record.name, record.email, record.phone);
    customer.status = record.status;
    return customer;
  }
}

module.exports = CustomerRepository;