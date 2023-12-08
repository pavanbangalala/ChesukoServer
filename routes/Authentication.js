const router = require("express").Router();
const User = require("../models/Authentication");

const validateRegistrationDetails = (name, email, password) => {
  const validationPromise = new Promise((resolve, reject) => {
    if (name.length < 5) {
      reject(new Error("invalid user name"));
    }
    if (email.length < 5) {
      reject(new Error("invalid email address"));
    }

    if (password.length < 5) {
      reject(new Error("invalid password"));
    }

    resolve({ name, email, password });
  });

  return validationPromise;
};

const validateLoginDetails = (email, password) => {
  const loginDetailsPromise = new Promise((resolve, reject) => {
    if (email.length <= 5) {
      reject(new Error("invalid email address"));
    }
    if (password.length <= 5) {
      reject(new Error("invalid password"));
    }

    resolve({ email, password });
  });
  return loginDetailsPromise;
};

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  validateRegistrationDetails(name, email, password)
    .then(async (response) => {
      const user = new User({ ...response });
      return await user.save();
    })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json({ error: error.message }));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  validateLoginDetails(email, password)
    .then(async (response) => {
      const user = await User.findOne({ email: response.email });
      if (!user) {
        throw new Error("user not found");
      }
      if (user.password !== response.password) {
        throw new Error("user not found");
      }
      return user;
    })
    .then((user) => res.status(200).json(user))
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
