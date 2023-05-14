const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const registration = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Перевіряє, чи існує користувач з такою електронною поштою в базі даних
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email is already in use");
    }

    // Створює нового користувача в базі даних
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

    // Генерує токен для нового користувача
    const payload = {
      id: newUser._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    // Зберігає токен в базі даних
    await User.findByIdAndUpdate(newUser._id, { token });

    // Повертає токен та інформацію про користувача у відповідь
    res.status(201).json({
      token,
      email: newUser.email,
      name: newUser.name,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = registration;
