const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Kindly provide credentials to login" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isCorrectPassword = bcrypt.compareSync(password, user.password);
  if (!isCorrectPassword) {
    return res.status(400).json({ message: "Invalid Credentails" });
  }
  const token = jwt.sign(
    { name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "20d" }
  );
  res
    .status(200)
    .json({ message: "Successfully signed in", user: { ...user._doc, token } });
};

module.exports = loginController;
