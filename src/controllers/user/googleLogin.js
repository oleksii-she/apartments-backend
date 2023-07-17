const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const googleLogin = async (req, res, next) => {
  try {
    const { displayName, emails } = req.user;
    const email = emails[0].value;

    // Перевіряє, чи існує користувач з такою електронною поштою в базі даних
    const user = await User.findOne({ email });

    if (user) {
      // створення токена
      const payload = {
        id: user._id,
      };

      // створюємо сам токен
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user.id, {
        token
      });
      // Отримання URL редіректу з параметром token
      const redirectUrl = `https://apartments-app.vercel.app/?token=${token}`;

      return res.redirect(redirectUrl);
    } else {
      const createUser = {
        name: displayName,
        email,
      };

      await User.create({ ...createUser });

      const user = await User.findOne({ email });
      const payload = {
        id: user._id,
      };

      // створюємо сам токен
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

      await User.findByIdAndUpdate(user.id, {
        token
      });
      const redirectUrl = `https://oleksii-she.github.io/apartments-app?token=${token}`;

      return res.redirect(redirectUrl);
    }
  } catch (error) {
    console.log(error.message, "cath");
    next(error);
  }
};

module.exports = googleLogin;
