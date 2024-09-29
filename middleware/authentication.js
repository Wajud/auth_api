const jwt = require("jsonwebtoken");

const authenticateUser = (req, res) => {
  const headerAuth = req.headers.authorization;
  if (!headerAuth || !headerAuth.startsWith("Bearer")) {
    return res
      .status(400)
      .json({ message: "Invalid Authentication. Please sign in" });
  }
  const token = headerAuth.split(" ")[1];
  req.token = token;
  const data = jwt.verify(token, process.env.JWT_SECRET);
  console.log(data);
};

module.exports = authenticateUser;
