const express = require("express");
const authRouter = express.Router();
const loginController = require("../controllers/login");
const registerController = require("../controllers/register");
authRouter.route("/login").post(loginController);

authRouter.route("/register").post(registerController);

module.exports = authRouter;
