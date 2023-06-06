// const { User } = require("../../models");
// const { HttpError } = require("../../helpers");
// const jwt = require("jsonwebtoken");


// const { SECRET_KEY } = process.env;

// const googleLogin = async (req, res,next) => {

//   try {
//     const { displayName, emails} = req.user;
// const email = emails[0].value 
//     res.json({ displayName,email });
    
//       // Перевіряє, чи існує користувач з такою електронною поштою в базі даних
//       const user = await User.findOne({ email });
//       if (user) {
//     // створення токена
//     const payload = {
//       id: user._id,
//     };

//     // створюємо сам токен, туди передаємо пейлоад, це наш айді, секретний ключ, та вказуємо тривалість дії самого токена
//     const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

//     const result = await User.findByIdAndUpdate(user.id, {
//       token,
//     });
//     const { name: userName, email: userEmail } = result;
    
//     //  res.json({
//     //   token,
//     //   userName,
//     //   userEmail,
//     // });
//     return res.redirect('http://localhost:5173/apartments-app/apartments')
//       }else{

//         const createUser = {
//           name:displayName,
//           email,
//           phone: '+380000000000'

//         }
//   await User.create({ ...createUser });

//         return res.redirect('http://localhost:5173/apartments-app/apartments')
//       }
//   } catch (error) {
//     console.log(error.message, "cath");
//     next(error);
//   }

// };

// module.exports = googleLogin;


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

      // Отримання URL редіректу з параметром token
      const redirectUrl = `http://localhost:5173/apartments-app/apartments?token=${token}`;

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
      const redirectUrl = `http://localhost:5173/apartments-app/apartments?token=${token}`;

      return res.redirect(redirectUrl);
    }
  } catch (error) {
    console.log(error.message, "cath");
    next(error);
  }
};

module.exports = googleLogin;
