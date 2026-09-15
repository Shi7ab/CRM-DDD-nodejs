class CustomerController {
  constructor(customerService) {
    this.customerService = customerService;
  }

  async create(req, res) {
    try {
      const { id, name, email, phone } = req.body;
      const customer = await this.customerService.createCustomer(id, name, email, phone);
      res.status(201).json(customer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deactivate(req, res) {
    try {
      const { id } = req.params;
      const customer = await this.customerService.deactivateCustomer(id);
      res.json(customer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = CustomerController;