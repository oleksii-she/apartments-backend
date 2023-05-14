const mangoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();
const { getAllCountries } = require("./src/controllers/other");

// routers import

const apartmentsRouter = require("./src/routes/api/Apartments");
const authRouter = require("./src/routes/api/auth");
const userRouter = require("./src/routes/api/users");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// routers

app.use("/api/apartments", apartmentsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/countries", getAllCountries);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "server error" } = err;
  res.status(status).json({ message });
});

const { DB_HOST, PORT = 4000 } = process.env;

// Configuration

mangoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(`...starting server port ${PORT} `);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
