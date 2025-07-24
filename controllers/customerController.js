const Customer = require('../models/Customer');

exports.getCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
};

exports.addCustomer = async (req, res) => {
  const newCustomer = await Customer.create(req.body);
  res.status(201).json(newCustomer);
};

exports.updateCustomer = async (req, res) => {
  const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteCustomer = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Customer Deleted' });
};
