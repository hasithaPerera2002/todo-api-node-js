const UserSchema = require("../model/UserSchema");
const User = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const signup = async (req, resp) => {
  UserSchema.findOne({ email: req.body.email })
    .then((result) => {
      if (!result) {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
          if (err) {
            req.status(500).json({ messsage: "something went wrong" });
          }
          const user = new UserSchema({
            userName: req.body.userName,
            fullName: req.body.fullName,
            password: hash,
          });
          user
            .save()
            .then((result) => {
              resp.status(201).json({ message: "user was saved" });
            })
            .catch((err) => {
              resp.status(500).json(err);
            });
        });
      } else {
        resp.status(409).json({ message: "email already exists" });
      }
    })
    .catch((err) => {
      resp.status(500).json(err);
    });
};

const login = async (req, resp) => {
  UserSchema.findOne({ userName: req.body.userName })
    .then((selectedUser) => {
      if (!selectedUser) {
        resp.status(404).json({ message: "username not found" });
      } else {
        bcrypt.compare(
          req.body.password,
          selectedUser.password,
          function (err, result) {
            if (err) {
              return resp.status(500).json(err);
            } else if (result) {
              const expiresIn = 3600;
              const token = jsonwebtoken.sign(
                { userName: selectedUser.userName },
                process.env.SECRET_KEY,
                { expiresIn }
              );
              resp.setHeader("Authorization", `Bearer ${token}`);
              resp.status(200).json({ message: "check the header" });
            } else {
              resp.status(401).json({ message: "password was incorrect" });
            }
          }
        );
      }
    })
    .catch((err) => {
      resp.status(500).json(err);
    });
};

module.exports = {
  signup,
  login,
};
