const mongoose = require("mongoose");
const express = require("express");
const session = require('express-session');
const cors = require("cors");
const logger = require("morgan");
// const {isLoggedIn} = require('./src/middleware')
require("dotenv").config();

const { getAllCountries } = require("./src/controllers/other");
const passport = require('passport');
require('./src/utils/authGoogle');
const apartmentsRouter = require("./src/routes/api/Apartments");
const reservesRouter = require("./src/routes/api/Reserves");
const authRouter = require("./src/routes/api/auth");
const userRouter = require("./src/routes/api/users");
const app = express();

mongoose.set('strictQuery', false);
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.set('view engine', 'ejs');
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//google

app.use(session({ secret: process.env.SESSION_SECRET_KAY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use("/api/apartments", apartmentsRouter);
app.use("/api/reserves", reservesRouter);
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

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
