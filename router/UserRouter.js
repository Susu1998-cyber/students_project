// const express = require("express");
// const router = express.Router();
// const User = require("../model/User");

// router.route("/").get((req, res) => {
//   User.find()
//     .then((user) => res.json(user))
//     .catch((err) => res.status(400).json("Error", err));
// });

// router.route("/add").post((req, res) => {
//   const { name, username, age, email, password, phone } = req.body;

//   const newUser = new User({
//     name,
//     username,
//     age,
//     email,
//     password,
//     phone,
//   });

//   newUser
//     .save()
//     .then((saveduser) => res.json(saveduser))
//     .catch((err) => res.status(400).json("Error",  err));
// });

// module.exports = router

const express = require("express");
const router = express.Router();
const User = require("../model/User");
const mongoose = require("mongoose");

// GET all users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// POST to add a new user
router.route("/add").post((req, res) => {
  const { name, username, age, email, password, phone } = req.body;

  const newUser = new User({ name, username, age, email, password, phone });

  newUser
    .save()
    .then((savedUser) => res.json(savedUser))
    .catch((err) => res.status(400).json({ error: err.message }));
});

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.name = req.body.name;
      user.username = req.body.username;
      user.age = req.body.age;
      user.email = req.body.email;
      user.password = req.body.password;
      user.phone = req.body.phone;

      user
        .save()
        .then(() => res.json("Use updated succesfully"))
        .catch((err) => res.status(404).json("Error updating user", err));
    })
    .catch((err) => res.status(404).json("Error", err));
});

router.route("/delete/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    })

    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router; // Correctly export the router
