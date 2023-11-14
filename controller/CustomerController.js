const Customer = require("../model/CustomerSchema");

const saveCustomer = (req, resp) => {
  console.log(req.body);
  const tempCustomer = new Customer({
    nic: req.body.nic,
    name: req.body.name,
    address: req.body.address,
    salary: req.body.salary,
  });

  tempCustomer
    .save()
    .then((saveCustomer) => {
      resp.status(201).json({ status: true, message: "Customer Saved" });
    })
    .catch((err) => {
      resp.status(500).json({ status: false, message: err });
    });
};

const updateCustomer = (req, resp) => {
  Customer.updateOne(
    { nic: req.headers.nic },
    {
      $set: {
        nic: req.body.nic,
        name: req.body.name,
        address: req.body.address,
        salary: req.body.salary,
      },
    }
  )
    .then((result) => {
      if (result.modifiedCount > 0) {
        resp
          .status(201)
          .json({ status: true, message: "Customer was updated" });
      } else {
        resp.status(200).json({ status: false, message: "not updated" });
      }
    })
    .catch((err) => {
      resp.status(500).json(err);
    });
};

const deleteCustomer = (req, resp) => {
  Customer.deleteOne({ nic: req.headers.nic })
    .then((result) => {
      if (result.deletedCount > 0) {
        resp
          .status(204)
          .json({ status: true, message: "Customer was deleted" });
      } else {
        resp.status(400).json({ status: false, message: "try again" });
      }
    })
    .catch((err) => {
      resp.status(500).json(err);
    });
};

const getCustomer = (req, resp) => {
  Customer.findOne({ nic: req.headers.nic })
    .then((result) => {
      if (result == null) {
        resp.status(404).json({ status: false, message: "Customer not found" });
      } else {
        resp.status(200).json({ status: true, message: result });
      }
    })
    .catch((err) => {
      resp.status(500).json(err);
    });
};

const findAllCustomers = (req, resp) => {
  Customer.find()
    .then((result) => {
      (result) => {
        resp
          .status(200)
          .json({ status: true, message: "Customers fetche", data: result });
      };
    })
    .catch((err) => {
      resp.status(500).json(err);
    });
};

module.exports = {
  saveCustomer,
  findAllCustomers,
  deleteCustomer,
  updateCustomer,
  getCustomer,
};
