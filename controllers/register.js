const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");

const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide name, email and password to register" });
  }
  const token = jwt.sign({ name, email }, process.env.JWT_SECRET, {
    expiresIn: "20d",
  });
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const user = await Users.create({ name, email, password: hashedPassword });
    res
      .status(200)
      .json({
        message: "User created",
        user: { name: user.name, email: user.password, token },
      });
  } catch (err) {
    res.status(500).json({ message: "Server Error. Something went wrong" });
  }
};

module.exports = registerController;
