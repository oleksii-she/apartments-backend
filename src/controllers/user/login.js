const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //перевіряє чи нема користувача

    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "email or password is incorrect");
    }

    //авторизація

    const passwordCompare = await bcryptjs.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "email or password is incorrect");
    }

    // створення токена

    const payload = {
      id: user._id,
    };

    // створюємо сам токен, туди передаємо пейлоад, це наш айді, секретний ключ, та вказуємо тривалість дії самого токена
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    const result = await User.findByIdAndUpdate(user.id, {
      token,
    });
    const { name: userName, email: userEmail } = result;
    res.json({
      token,
      userName,
      userEmail,
    });
  } catch (error) {
    console.log(error.message, "cath");
    next(error);
  }
};

module.exports = login;
