const express = require("express");
const authRouter = require("./routes/login");
const connectToDb = require("./connectDb");
const authenticateUser = require("./middleware/authentication");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("AUTH API");
});

//middleware
app.use(
  cors({
    "Access-Control-Allow-Origin": "*",
  })
);
app.use(express.json());
app.use("/api/v1/auth", authRouter);

connectToDb(process.env.MONGODB_URI)
  .then(
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    })
  )
  .catch((err) =>
    console.log("Something went wrong. Unable to connect to db ", err)
  );
